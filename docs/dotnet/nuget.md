---
title: Nuget
parent: .NET
layout: default
grand_parent: My Docs
published: true
---

### Debugging a release mode nuget package
 ---
1. Ensure the .nupkg file contians the pdb file along with the dll.   
    a. From .NET 7 add this line to the CSPROJ in PropertyGroup element. 
    ```xml 
    <AllowedOutputExtensionsInPackageBuildOutputFolder>$(AllowedOutputExtensionsInPackageBuildOutputFolder);.pdb</AllowedOutputExtensionsInPackageBuildOutputFolder>
    ```  
    b. This line ensures the pdb file to be packed along with the dll in nupkg file.   
    c. Please google `How to add pdb file in nupkg file in .NET x.x` for other .NET versions.  
    d. [nuget#symbol-packages](https://learn.microsoft.com/en-us/dotnet/standard/library-guidance/nuget#symbol-packages)
2. In the project where you refer the package add below lines in the PropertyGroup.  
    a. [msbuild-props](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/msbuild-props)
    ``` xml
    <CopyDebugSymbolFilesFromPackages>true</CopyDebugSymbolFilesFromPackages>
    <CopyDocumentationFilesFromPackages>true</CopyDocumentationFilesFromPackages>
     ```  

### Directory.Build.props
---
```xml 
 <PropertyGroup>
        <ImplicitUsings>enable</ImplicitUsings>
        <Nullable>disable</Nullable>
        <LangVersion>preview</LangVersion>
        <AllowedOutputExtensionsInPackageBuildOutputFolder>$(AllowedOutputExtensionsInPackageBuildOutputFolder);.pdb</AllowedOutputExtensionsInPackageBuildOutputFolder>
        <GenerateDocumentationFile>true</GenerateDocumentationFile>
        <CopyDebugSymbolFilesFromPackages>true</CopyDebugSymbolFilesFromPackages>
        <CopyDocumentationFilesFromPackages>true</CopyDocumentationFilesFromPackages>
    </PropertyGroup>
```

### Pushing a package to private nuget feed.
---

`dotnet nuget push --source "<nuget url?" --api-key az <package path> --interactive`