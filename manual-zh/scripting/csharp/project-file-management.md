# 项目文件管理

Flax.Build 工具会为配置的代码编辑器生成所需的 C# 项目文件，这些文件通常使用 .csproj 文件格式，并附带 Visual Studio .sln 解决方案文件。代码编辑器随后可以使用这些文件来提供代码补全和其他语言服务器功能，以帮助用户在代码库中导航。编译过程不使用 MSBuild（它使用 .csproj 文件），而是直接使用模块和构建目标配置文件，通过 C# 编译器编译源文件。

由于这些文件在修改模块文件或添加新源文件后会不断重新生成，因此应避免对生成的 .csproj 文件进行永久性修改。进行这些修改的预期位置是在[模块配置文件](../../editor/flax-build/index.md)（例如 `Game.Build.cs`）中，这些文件用于配置项目文件生成过程。

# 添加引用

`/Source/Game/MyScript.cs(32,13,32,18): error CS1069: The type name 'Regex' could not be found in the namespace 'System.Text.RegularExpressions'. This type has been forwarded to assembly 'System.Text.RegularExpressions, Version=9.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a' Consider adding a reference to that assembly.`

当脚本需要引用其他常见的系统引用时，我们可以通过以下方式修改模块构建文件（例如 `Game.Build.cs`）来添加对所需程序集的引用：

```cs
public override void Setup(BuildOptions options)
{
    base.Setup(options);

    options.ScriptingAPI.SystemReferences.Add("System.Text.RegularExpressions");
}
```

***

引用第三方 C# 库文件可以通过文件引用来完成，但在这种情况下，我们需要提供程序集文件的路径：

```cs
public override void Setup(BuildOptions options)
{
    base.Setup(options);

    // 注意：路径相对于 .build 文件本身
    options.ScriptingAPI.FileReferences.Add(Path.Combine(FolderPath, "..", "..", "Content", "CustomAssembly.dll"));
}
```

***

要向项目添加 **NuGet 包**，请参阅专门的章节[此处](nuget-packages.md)。

有关使用第三方库的更详细示例，可以在[此处](../tutorials/use-third-party-library.md)找到。

# 分析器和源代码生成器

源代码生成器和分析器也受支持。系统提供的程序集可以添加到 `SystemAnalyzers` 中，外部文件引用可以添加到 `Analyzers` 列表中：

```cs
public override void Setup(BuildOptions options)
{
    base.Setup(options);

    options.ScriptingAPI.SystemAnalyzers.Add("Microsoft.Interop.ComInterfaceGenerator");

    // 注意：路径相对于 .build 文件本身
    options.ScriptingAPI.Analyzers.Add(Path.Combine(FolderPath, "..", "..", "Content", "CustomAnalyzer.dll"));
}
```

***
