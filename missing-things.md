---
layout: default
title: Unofficial
nav_order: 2
description: "Things that are  not provided by default by the owner."
permalink: /unofficial
---

# This page contains the concepts or code that most major libraries doesn't provide by default.


## .NET 6+

### Alias for DI.

- .NET 6 doesn't have the proper alaising concept in the DI. So we can implement a Factory Pattern and solve this. 

```csharp 

public interface IDBContext 
{
    string Source {get;}

    Database Database {get;}
}


public interface IDBContextFactory
{
    IDBContext GetDBContext(string source); // you can use a enum too here.
}

public class DBContextFactory : IDBContextFactory
{
    private readonly IEnumerable<IDBContext> _dbContexts;
    public DBContextFactory(IEnumerable<IDBContext> dbContexts)
    {
        _dbContexts = dbContexts;
    }

    public IDBContext GetDBContext(string source)
    {
        return _dbContexts.Where(_=>_.Source == source).FirstOrDefault();
    }
}

// registations in DI. 

services.AddScoped<IDBContextFactory, DBContextFactory>();
services.AddScoped<IDBContext, CartDBContext>(); // pass source as Cart and hard code that in the implementation
services.AddScoped<IDBContext, OrderDBContext>();  // pass source as Order and hard code that in the implementation
services.AddScoped<IDBContext, LogDBContext>();  // pass source as Log and hard code that in the implementation
services.AddScoped<IDBContext, ProductsDBContext>();  // pass source as Products and hard code that in the implementation

// You can use Enum as well and avoid strings. 
```