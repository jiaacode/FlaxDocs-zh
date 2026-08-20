# NuGet 包

Flax.Build 允许使用 NuGet 包。

要添加 NuGet 包，请打开你的 build.cs 模块，并在 `Setup` 方法中添加类似于下面的代码。Flax 将在需要时自动下载 NuGet 包。

```cs
public override void Setup(BuildOptions options)
{
    base.Setup(options);

    options.NugetPackages.Add("<nuget package name>", "<nuget package version>", "<framework version to use>")
}
```

***

重新生成脚本文件后，该 NuGet 包即可在该模块中使用。