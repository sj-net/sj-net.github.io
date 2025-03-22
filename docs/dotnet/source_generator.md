---
title: Source Generators
parent: .NET
layout: default
grand_parent: My Docs
published: true
---

## Source Generators in .Net Standard 2.0

### How to write one ? 

- Create a blank solution 
- Create a class libary in .Net Standard 2.0. Ex: `PrivateFieldGenerator.csproj`
- Update the `csproj` file with below things.     

```xml 
<LangVersion>latest</LangVersion>
<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
<CompilerGeneratedFilesOutputPath>Generated</CompilerGeneratedFilesOutputPath>
<IsRoslynComponent>true</IsRoslynComponent>
<EnforceExtendedAnalyzerRules>true</EnforceExtendedAnalyzerRules>
```    

- Install `Microsoft.CodeAnalysis.CSharp` & `Microsoft.CodeAnalysis.Analyzers`
- Add a class file and name is `PrivateFieldIncrementalGenerator`. We will be using the `IIncrementalGenerator`
- Decorate the class with the `[GeneratorAttribute]`
- Implement the class like below      

```c#
public class PrivateFieldGenerator : IIncrementalGenerator
{
    private readonly ConcurrentDictionary<SyntaxTree, SemanticModel> _semanticModelCache = new();

    /// <summary>
    /// The full name of the attribute this generator should process.
    /// Example: "MyNamespace.MyCustomAttribute"
    /// </summary>
    private string TargetAttributeFullName { get; }

    public void Initialize(IncrementalGeneratorInitializationContext context)
    {
        IncrementalValuesProvider<(SyntaxNode Node, SemanticModel SemanticModel)> syntaxProvider = context.SyntaxProvider
            .ForAttributeWithMetadataName(
                TargetAttributeFullName,
                IsSyntaxTarget,
                GetSemanticTarget)
            .Where(m => m.Node is not null)
            .Select((m, _) => m!);

        IncrementalValueProvider<(Compilation Left, ImmutableArray<(SyntaxNode Node, SemanticModel SemanticModel)> Right)> compilationAndNodes = context.CompilationProvider.Combine(syntaxProvider.Collect());

        context.RegisterSourceOutput(compilationAndNodes, (spc, source) =>
        {
            ImmutableArray<(SyntaxNode Node, SemanticModel SemanticModel)> classes = [.. source.Right.Distinct()];
            if (classes.IsDefaultOrEmpty) return;
            Execute(source.Left, classes, spc);
        });
    }

    /// <summary>
    /// Check if the node is a target for this generator. Ex: the generator should handle nodes that are classes only with a specific attribute.
    /// </summary>
    /// <param name="node"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    private bool IsSyntaxTarget(SyntaxNode node, CancellationToken cancellationToken)
    {
        return node is ClassDeclarationSyntax;
    }
    /// <summary>
    /// Get the semantic target for the node. Ex: get the class symbol for a class node.
    /// </summary>
    /// <param name="context"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    protected (SyntaxNode Node, SemanticModel SemanticModel) GetSemanticTarget(GeneratorAttributeSyntaxContext context, CancellationToken cancellationToken)
    {
        return (context.TargetNode as ClassDeclarationSyntax, context.SemanticModel);
    }

    /// <summary>
    /// Execute the generator for the given compilation and nodes.
    /// </summary>
    /// <param name="compilation"></param>
    /// <param name="nodes"></param>
    /// <param name="context"></param>
    protected virtual void Execute(Compilation compilation, ImmutableArray<(SyntaxNode Node, SemanticModel SemanticModel)> nodes, SourceProductionContext context)
    {
        var filteredNodes = nodes.Where(_ => _.Node is ClassDeclarationSyntax).ToList();

        if (filteredNodes.Count == 0)
        {
            // when attribute is set for member but not class then get the class.
            foreach ((SyntaxNode Node, SemanticModel SemanticModel) node in filteredNodes)
            {
                if (node.Node.Parent is ClassDeclarationSyntax cls)
                {
                    filteredNodes.Add((cls, GetSemanticModel(compilation, cls.SyntaxTree)));
                }
            }
        }

        foreach (var node in filteredNodes.Distinct())
        {
            if (node.SemanticModel.GetDeclaredSymbol(node.Node) is not INamedTypeSymbol classSymbol) continue;

            var code = GenerateClass(node.Node as ClassDeclarationSyntax, node.SemanticModel, classSymbol, nodes);
            AddGeneratedSource(context, GetFileName(classSymbol), code);
        }
    }

    protected void AddGeneratedSource(SourceProductionContext context, string fileName, string content)
    {
        if (System.Diagnostics.Debugger.IsAttached) // don't remove this. it's for debugging purposes.
            System.Diagnostics.Debugger.Break();

        context.AddSource(fileName, SourceText.From(content, Encoding.UTF8));
    }

    public string GenerateClass(ClassDeclarationSyntax classDeclarationSyntax, SemanticModel semanticModel, INamedTypeSymbol classSymbol, ImmutableArray<(SyntaxNode Node, SemanticModel SemanticModel)> matchedNodes)
    {
        string code = "build your code. You can use StringBuilder for better performance";
        return code;
    }

    protected virtual string GetFileName(INamedTypeSymbol classSymbol)
    {
        return $"{GetClassName(classSymbol)}.g.cs";
    }

    protected string GetClassName(INamedTypeSymbol classSymbol)
    {
        return classSymbol.Name;
    }

    protected SemanticModel GetSemanticModel(Compilation compilation, SyntaxTree syntaxTree)
    {
        if (!_semanticModelCache.TryGetValue(syntaxTree, out var model))
        {
            model = compilation.GetSemanticModel(syntaxTree);
            _semanticModelCache.TryAdd(syntaxTree, model);
        }
        return model;
    }
}
```
- Done you are ready with your generator. 

### How to use this generator in your real project. 

1. In this case, I am taking a class library to create a nuget but you can shoose a API or MVC or a WPF project too. 
2. What ever project you choose add below line to that `csproj` where you want this generator to work. 

```xml
    <ItemGroup>
        <ProjectReference Include="path to .csproj file" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
    </ItemGroup>
```


### How to Debug ? 

I learnt from [here](https://github.com/JoanComasFdz/dotnet-how-to-debug-source-generator-vs2022)

1. Go to your source generator project and create a Properties Folder and then `launchSettings.json` with the below contents. 
```json
{
  "profiles": {
        "Name of your generator": {
           "commandName": "DebugRoslynComponent",
           "targetProject": "path to .csproj file"
        }
  }
}
```
2. Set your generator as a startup project in the visual studio and run it just like a console app. 

Tips:

If debugger stops without even hitting your breakpoint, then 
1. Ensure your generator class has the `GeneratorAttribute`
2. Ensure you are in in Debug mode. 
3. Try applying breakpoint in `Initialize`, `IsSyntaxTarget` and `GetSemanticTarget` in this given order. 
4. Most cases `IsSyntaxTarget` might be giving the empty results. In this case, ensure you have set the attribute on your class and you correctly set it for `TargetAttributeFullName`

Every change to the generator project you must close and open the solution (not VS) becuase `IIncrementalGenerator` is written to cache the generator logic and speed up the build time. 

And if there is any c# error in the code the code won't be generated. So in that just debug the code, copy the generated source and keep in a new `.cs` file to find the error and fix it in source code generation logic. 


[My Sample Generators](https://github.com/DotNetExtended/Default)