# 构建插件

Flax.Build 允许你通过使用自定义**插件**来扩展它。每个插件都可以提供自定义构建系统任务、平台集成、脚本语言支持或代码 IDE 支持。

要创建插件，只需在项目的 `Source` 文件夹中的某个位置添加构建脚本文件（`<name>.Build.cs`）。然后编写一个继承自 `Flax.Build.Plugin` 的类，如下所示：

```cs
using Flax.Build;

class MyPlugin : Plugin
{
    /// <inheritdoc />
    public override void Init()
    {
        base.Init();

        // 在此处可以实现自定义构建逻辑...
        Log.Info("Hello from plugin!");
    }
}
```

***

插件在任何构建/清理/项目操作之前初始化，因此你可以使用它们将自定义逻辑注册到构建工具中。请遵循 Flax.Build 代码文档以了解更多信息。例如，可视化脚本集成使用 **VisualScriptingPlugin** 来注入自定义虚方法包装器代码。
