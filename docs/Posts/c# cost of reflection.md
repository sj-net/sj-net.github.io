---
title: "C# : How to avoid reflection ?"
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

As this worked out very well, and I had too many model's so I built our own source generator using a console app as I was using .NET6 where the source generators are still experimental. And this whole implementation brought down our app launch time from 60+ seconds to less than 20 seconds. Btw, the properties inside the Model used to change very rarely. So when they did, we used to run the generator again and copy the files. And we ensure these generated files should never be changed manually and named them something like Foo.g.cs which helps me review the PR's easily from the team. And ofcourse, I wrote an API to return the properties and their metadata in the way that I need so that my generator can generate the classes for me. 

## Version 2: (Update on  16th March 2025)
Uses `ReadOnlySpan<char>` but same like V3.

## Version 3: (Update on  22th March 2025) 

I read in multiple blogs that .NET invested a lot in performance improvement using ReadOnlySpan over the years. I was wondering if we can still make this better. So I tried again with ChatGPT help. Now compared to V1, V2 had at least 40% improvement over V1. 

Nothing changed in my interface. But the implementation changed a bit.

```csharp
public class Foo : IObject
{
    public int Integer { get; set; } = int.MaxValue;
    public string String { get; set; } = "some random string";

}
```

And my implementation is like 

```csharp

[MethodImpl(MethodImplOptions.AggressiveInlining)]
public bool SetValue(string propertyName, object value)
{
    switch (propertyName.Length)
    {
        case 6 when string.CompareOrdinal(propertyName, "String") == 0:
            String = (string)value;
            return true;
        case 7 when string.CompareOrdinal(propertyName, "Integer") == 0:
            Integer = (int)value;
            return true;
    }
    return false;
}

[MethodImpl(MethodImplOptions.AggressiveInlining)]
public object GetValue(string propertyName)
{
    return propertyName.Length switch
    {
        6 when string.CompareOrdinal(propertyName, "String") == 0 => String,
        7 when string.CompareOrdinal(propertyName, "Integer") == 0 => Integer,
        _ => Unsafe.NullRef<object>(),
    };
}

```

As I said, I took ChatGPT help, I am not 100% sure how `MethodImpl` helps.

Major benefits I saw are switch case speed was improved by 20% at least when I was checking the lenhth of the property name first.

### Here are the benchmarks ([Source Models]([here](https://github.com/DotNetExtended/Default/blob/main/src/DotNetExtended.NoReflection.Tests/ReflectionBenchmarkModels.cs)))

1. Reflection_Without_Cache
2. Reflection_With_Cache
3. V1 - use `nameof(Integer)` inside switch 
4. V2 - use `case 8 when span.SequenceEqual("DateTime")` inside switch
5. V3 - use ` case 4 when string.CompareOrdinal(propertyName, "Guid") == 0` inside switch

For some scenarios, V1 and V2 are better than V3. But ultimately V1, V2, V3 are found to be much faster than reflection. 


.NET 8 only.   
{% include_relative reflection-benchmarks-v1-v2-v3-net8.md %}
- [Source Code](https://github.com/DotNetExtended/Default/tree/main/src/DotNetExtended.NoReflection)    
- [Benchmarks Source Code](https://github.com/DotNetExtended/Default/tree/main/src/DotNetExtended.NoReflection.Tests)    
- [Source Generator](https://github.com/DotNetExtended/Default/tree/main/src/DotNetExtended.NoReflection.SourceGenerators)    


This is one of my best performance improvements I have ever done. This might not be significant in many places  but for situations like mine, this saves a lot of time during run time.


Note: I tried to use this logic in `System.Text.Json` but couldn't beat it though it was using reflection. It was highly optimized and I gave up.