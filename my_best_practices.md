---
layout: default
title: My Best Practices
nav_order: 2
description: "My Best Practices"
permalink: /best-pactices
---

## MVC / Web API

- If you have to read anything from HttpContext then always ensure you use an interface like below. This removes the burden of mocking HttpContext in unit tests. 

```csharp 
public interface ICustomHttpContextAccessor
{
    int GetProjectId();
}

public class CustomHttpContextAccessor
{
    public int GetProjectId()
    {
        // your logic to read the project id from route data or from query params or from claims etc. 
    }
}
```

In Unit Tests, you can easily mock `ICustomHttpContextAccessor`. .NET Core provides `IHttpContextAccessor`, but this provides the access to the HttpContext only. So it's good to have our own interface that can be common accross the project. You can inject the `IHttpContextAccessor` into `ICustomHttpContextAccessor`.

## Design Patterns

- Avoid using Service Locator Pattern as it causes lot of trouble when writing unit tests. 
- It's totally OK to have more thna 5 parameters inside a constructor but when you pass `IServiceProvider` and resolve the required things inside constructor it's going to be painfull at some point in time. 

## Database 
- Check the cost of queries when working with stored procedures or views and optimize them before moving to production. 
- Ensure proper indexes on table's with large data. Once I encountered a sitaution where fetching one record based on 4 conditions used to take 6 minutes. Once I created the index on the columns for all these 4 conditions it took less than 2 seconds. That's the beauty of indexes.

## ORM (EF & EF Core)
- Ensure to dispose the `DBContext` properly in Unit of Work. 
- Always use Unit of Work pattern when you have to operate on multiple tables like a transaction. 
- UoW must be scoped lifetime in DI and each instance must open it's own connection to the DB and close it in dispose.