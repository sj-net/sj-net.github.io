---
title: Web API
parent: .NET
layout: default
published: true
grand_parent: My Docs
---

### Return all routes in the Web API. 

``` csharp
endpoints.MapGet("/api/debug/routes", (IEnumerable<EndpointDataSource> endpointSources) =>
{
    var t = endpointSources.SelectMany(_ => _.Endpoints)
                .Select(_ => (_ as Microsoft.AspNetCore.Routing.RouteEndpoint).RoutePattern.RawText.Replace("api/", string.Empty))
                .OrderBy(a => a).ToList();
    List<string> r = new List<string>();
    foreach (var item in t)
    {
        int index = item.LastIndexOf("/{");
        if (index >= 0)
            r.Add(item.Substring(0, index)); // or index + 1 to keep slash
        else
            r.Add(item);
    }
    return string.Join("\r\n", r);
});
```
