---
title: Cost of Reflection in C#
layout: post
published: true
parent: My Blog
created_at: 2024-03-08 20:00:00
modified_at: 2024-04-08 20:00:00
---

## Problem:

Reflection takes too much time to set or get the properties if the property info is not cached. Even if it's cached it still some imapct or its slower than it should be.

## Solution: 

``` c#
public interface IObject
{
    bool SetValue(string propertyName, object value);

    object GetValue(string propertyName);
}

public static class IObjectExtensions
{
    public static T GetValue<T>(this IObject obj, string propertyName)
    {
        return (T)obj.GetValue(propertyName);
    }
}

``` 

## Example

``` c#

public class Bar : Foo, IObject
{
    public Guid Guid { get; set; } = Guid.NewGuid();
    public int Integer { get; set; } = int.MaxValue;
    public string String { get; set; } = "some random string";
    public double Double { get; set; } = double.MaxValue;
    public decimal Decimal { get; set; } = decimal.MaxValue;
    public DateTime DateTime { get; set; } = DateTime.Now;
    public DateTimeOffset DateTimeOffset { get; set; } = new DateTimeOffset(DateTime.Now);

    public object GetValue(string propertyName)
    {
        return propertyName switch
        {
            nameof(Integer) => Integer,
            nameof(String) => String,
            nameof(Double) => Double,
            nameof(Decimal) => Decimal,
            nameof(DateTime) => DateTime,
            nameof(DateTimeOffset) => DateTimeOffset,
            nameof(Guid) => Guid,
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
            case nameof(Double):
                {
                    Double = (double)value;
                    return true;
                }
            case nameof(Decimal):
                {
                    Decimal = (decimal)value;
                    return true;
                }
            case nameof(DateTime):
                {
                    DateTime = Convert.ToDateTime(value);
                    return true;
                }
            case nameof(DateTimeOffset):
                {
                    DateTimeOffset = DateTimeOffset.Parse(value.ToString());
                    return true;
                }

            case nameof(Guid):
                {
                    Guid = Guid.Parse(value.ToString());
                    return true;
                }
            default:
                return false;
        }
    }
}

```

The benchmarks have proven that this simple interfacec is able to save me at least 80% of the performance cost.

## Benchmarks
{% include_relative Dotnet.Benchmarks.CostOfReflection-report.md %}
[Source Code](https://github.com/sj-net/DotNet.Benchmarks/tree/main/Dotnet.Benchmarks)


These results show that IOBject is at least 80% faster. 
