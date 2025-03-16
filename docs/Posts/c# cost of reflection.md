---
title: Avoid of Reflection in C#
layout: post
published: true
parent: My Blog
created_at: 2024-03-08 20:00:00
modified_at: 2025-03-16 18:00:00
---


A few years back I had to write a base view model which is not aware of the model that will be used with it as generic. Only thing that the base view model knows is that every model will definitely have a `Name` property. And I had to write all the logic to set the properties of this Model in the base only as it was common and we used to receive the property name(string) and value(object) from SignalR. I used reflection as I am not aware of the properties of Model's used in child view models. Slowly as the number of child viewmodels increased and the list of object's(Model's) inside each child view model, I started seeing the problem. Then I clearly understood that reflection is the major reason for the performance issue. 


Then after some thorough research, I did some benchmarks to see how much does reflection cost me vs using an interface and implementing those methods in every model and making it strongly typed and avoiding reflection. 

## Version 1:

I wrote a new simple interface. 

```csharp
public interface IObject
{
    bool SetValue(string propertyName, object value);
    object GetValue(string propertyName);
    T GetValue<T>(string propertyName); // I skipped the implementation of this in this post. Please find that in source code. 
}
```

and it's implementation is like.

```csharp
public class FooV1 : IObject
{
    public int Integer { get; set; } = int.MaxValue;
    public string String { get; set; } = "some random string";
    
    public object GetValue(string propertyName)
    {
        return propertyName switch
        {
            nameof(Integer) => Integer,
            nameof(String) => String,
            _ => null,
        };
    }

    public bool SetValue(string propertyName, object value)
    {
        switch (propertyName)
        {
            case nameof(Integer):
                {
                    Integer = (int)value;
                    return true;
                }
            case nameof(String):
                {
                    String = (string)value;
                    return true;
                }
            default:
                return false;
        }
    }
}
```

When I did the benchmarks for setting a value using reflection, I saw using an interface brought down the time taken to set a property to a min of 70% and max of 91%.

### Here are the V1 Benchmarks: 
{% include_relative reflection-benchmarks-v1-net8.md %}
[V1 Source Code](https://github.com/sj-net/DotNet.Benchmarks/tree/main/Dotnet.Benchmarks)


As this worked out very well, and I had too many model's so I built our own source generator using a console app as I was using .NET6 where the source generators are still experimental. And this whole implementation brought down our app launch time from 60+ seconds to less than 20 seconds. Btw, the properties inside the Model used to change very rarely. So when they did, we used to run the generator again and copy the files. And we ensure these generated files should never be changed manually and named them something like Foo.g.cs which helps me review the PR's easily from the team. And ofcourse, I wrote an API to return the properties and their metadata in the way that I need so that my generator can generate the classes for me. 


## Version 2: (Update on  16th March 2025) 

I read in multiple blogs that .NET invested a lot in performance improvement using ReadOnlySpan over the years. I was wondering if we can still make this better. So I tried again with ChatGPT help. Now compared to V1, V2 had at least 40% improvement over V1. 

I renamed the interface like 

```csharp
 public interface INoReflection
 {
    bool SetValue(string propertyName, object value);
    object GetValue(string propertyName);
    T GetValue<T>(string propertyName); // I skipped the implementation of this in this post. Please find that in source code.
 }
```

Nothing changed in my interface. But the implementation changed a bit.

```csharp
[TypedAccessorAttribute]
public partial class Foo
{
    public int Integer { get; set; } = int.MaxValue;
    public string String { get; set; } = "some random string";

}
```

Notice the `TypedAccessorAttribute` on top of class. And yes this time I used Incremental Source Generators as they are stable.

And my implementation is like 

```csharp

[MethodImpl(MethodImplOptions.AggressiveInlining)]
public bool SetValue(string propertyName, object value)
{
    ReadOnlySpan<char> span = propertyName;
    switch (span.Length)
    {
        case 7 when span.SequenceEqual("Integer"):
            Integer = (int)value;
            return true;
        case 6 when span.SequenceEqual("String"):
            String = (string)value;
            return true;
    }
    return false;
}

[MethodImpl(MethodImplOptions.AggressiveInlining)]
public object GetValue(string propertyName)
{
    ReadOnlySpan<char> span = propertyName;
    switch (span.Length)
    {
        case 7 when span.SequenceEqual("Integer"):
            return Integer;
        case 6 when span.SequenceEqual("String"):
            return String;
    }
    return null;
}

```

As I said, I took ChatGPT help, I am not 100% sure how `MethodImpl` helps. But this code brought down time taken to set a property from V1 to a min of 40% and max of 55%. 

### Here are the V2 Benchmarks: 

.NET 8 only.
{% include_relative reflection-benchmarks-v2-net8.md %}

.NET6, .NET7, .NET8, .NET9
{% include_relative reflection-benchmarks-v2-net6-net7-net8-net9.md %}

[V2 Source Code](https://github.com/DotNetExtended/Default/tree/main/src/DotNetExtended.NoReflection)
[V2 Benchmarks Source Code](https://github.com/DotNetExtended/Default/tree/main/src/DotNetExtended.NoReflection.Tests)
[V2 Source Generator](https://github.com/DotNetExtended/Default/tree/main/src/DotNetExtended.NoReflection.SourceGenerators)


This is one of my best performance improvements I have ever done. This might not be significant in many places  but for situations like mine, this saves a lot of time during run time.