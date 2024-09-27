---
title: MOQ
parent: Testing
layout: default
published: true
grand_parent: My Docs
---

### How to MOQ a HTTPContext in MVC/API for .Net Framework
---

- We need to set the Controller Context for the controller under test. From that the HTTPContext is pulled. 

```csharp
 public static ControllerContext GetControllerContext(Controller controller)
 {
     var mockHttpContext = new Mock<HttpContextBase>();
     var mockRequest = new Mock<HttpRequestBase>();

     var routeData = new RouteData();
     routeData.Values["controller"] = "Some controller name";
     routeData.Values["action"] = "some action name";
     // feel free to set anything else required for the context like route data or claims etc.

     var requestContext = new RequestContext(mockHttpContext.Object, routeData);
     mockHttpContext.Setup(ctx => ctx.Request).Returns(mockRequest.Object);
     mockHttpContext.Setup(ctx => ctx.Request.RequestContext).Returns(requestContext);
     return new ControllerContext(requestContext, controller) { HttpContext = mockHttpContext.Object };
 }

// usage inside a test

var _sut = new MyController(); //  inject dependencies if any
_sut.ControllerContext = GetControllerContext( _sut);
```
