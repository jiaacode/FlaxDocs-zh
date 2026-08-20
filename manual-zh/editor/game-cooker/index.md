# Game Cooker

![Flax Game Cooker](media/title.jpg)

**Game Cooker** 是一个用于构建游戏的工具。
它编译游戏脚本并处理所有使用的资源，为目标平台输出独立的游戏文件。
Game Cooker 高度可配置，可以在编辑器内部使用，也可以通过专用的 C# API（[GameCooker](https://docs.flaxengine.com/api/FlaxEditor.GameCooker.html) 服务）或使用[命令行参数](../advanced/command-line-access.md)来调用。

使用游戏烘焙器可以被描述为游戏创建过程的最后一步，在此步骤中，可以为许多不同的平台烘焙准备好部署的游戏。

> [!NOTE]
> Game Cooker 窗口可以通过选择主菜单选项 **窗口 -> Game Cooker** 或 **工具 -> Game Cooker** 来打开。

## 本节内容

* [游戏数据安全](security.md)

## 特性

Game Cooker 的特性：
* 易于使用
* 高度可配置
* 命令行访问（[更多信息](../advanced/command-line-access.md)）
* 自定义构建预设
* 增量构建
* 着色器/材质预编译
* 内容加密/压缩
* 资源引用自动搜索
* 多平台支持
* C# 编辑器 API 访问

## 构建

![Game Cooker](media/gameCooker1.png)

Game Cooker 窗口分为两种独立的模式。第二种模式是 **Build** 选项卡。
它提供了易于使用的 GUI，用于快速构建游戏。
强烈建议使用它来执行快速测试构建，或者如果你不需要任何高级配置。

要使用它，只需选择一个目标平台图标，然后按下 Build 按钮。
当然，有一些基本设置，如配置模式（release/debug）或输出目录，但总的来说，它旨在用于快速游戏烘焙。

> [!TIP]
> Game Cooker 为每个平台都有一个独立的本地缓存，因此一个引擎实例可以构建所有平台，而无需长时间的切换时间。

最后，当你在编辑器中开始烘焙游戏时，它是在一个单独的线程上完成的，因此所有编辑器逻辑（包括编辑器内运行模式）都完全支持。
仅不允许编辑资源，但用户仍然可以在构建游戏的同时编辑场景或测试脚本。

## 预设

![Game Cooker](media/gameCooker2.png)

Game Cooker 最大的优势在于 **预设**。
这些预设存储在 [构建设置](../game-settings/build-settings.md) 资源中。编辑器插件可以从 C# API 访问它。此外，该资源以纯 JSON 格式存储，因此任何版本控制系统都可以用于在团队中开发 Flax 游戏。

每个预设都有一个名称（例如 Development、Release），并包含一组构建目标。
每个目标也有一个名称，并具有自定义配置设置（例如构建前/构建后操作和脚本定义）。
通过选择按钮，你可以选择构建一个目标，甚至可以一次性构建所选预设中的所有目标。
它非常易于使用，并为更大的项目提供了足够的功能，在这些项目中，开发人员需要针对许多不同的平台，并支持各种构建模式：测试构建、性能分析构建和发布构建。
所有这些都可以通过 Flax 预设，使用 Game Cooker 窗口和构建设置编辑器来完成。

## 自定义定义

![Game Cooker 自定义定义](media/custom-defines.png)

在处理更复杂的游戏构建设置时，你可以使用 **自定义定义** 功能，该功能允许你向构建系统注入自定义符号，并访问它们以更改脚本构建规则。例如，你可以使用它在游戏客户端或游戏服务器构建之间切换。

Game Cooker 预设包含一个可配置的 `Custom Defines` 列表（Game Cooker 构建面板的自定义定义也同样有效）。它们在编译游戏脚本时被注入到 `Flax.Build` 命令中。可以使用 `Configuration.CustomDefines` 从 `.Build.cs` 脚本中访问它们。

#### 将自定义定义注入 C# 脚本

```cs
/// <inheritdoc />
public override void Setup(BuildOptions options)
{
    base.Setup(options);

    ...

    options.ScriptingAPI.Defines.AddRange(Configuration.CustomDefines);
}
```

***

#### 将自定义定义注入 C++ 脚本编译

```cs
/// <inheritdoc />
public override void Setup(BuildOptions options)
{
    base.Setup(options);

    ...

    options.PrivateDefinitions.AddRange(Configuration.CustomDefines);
}
```

***

#### 基于自定义定义的条件游戏模块编译

```cs
/// <inheritdoc />
public override void Setup(BuildOptions options)
{
    base.Setup(options);

    ...

    if (Configuration.CustomDefines.Contains("SERVER"))
        options.PrivateDependencies.Add("GameServerModule");
    else
        options.PrivateDependencies.Add("GameClientModule");
}
```

***
