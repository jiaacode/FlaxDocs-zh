# 操作指南：创建自定义编辑器设置

在本教程中，您将学习如何扩展默认的编辑器设置。

### 1. 准备工作

在大多数情况下，额外的编辑器设置由编辑器插件使用。要了解如何创建自己的插件，请参阅[本教程](custom-plugin.md)。不过，您可以从在编辑器中运行的任何 C# 代码（包括脚本）访问编辑器选项。使用 `FLAX_EDITOR` 定义可以帮助您将编辑器相关代码包含到游戏脚本中。

### 2. 创建设置对象

第一步是为您的选项设计数据容器。为此，只需创建一个包含所有必需属性的 C# 类。该对象用于选项的序列化以及在选项窗口中的编辑，因此您可以使用自定义编辑器属性，例如 `Tooltip`。

示例选项：

```cs
public class MySettings
{
    [EditorOrder(0), EditorDisplay("Category Name"), Limit(0), Tooltip("Helper tooltip")]
    public float QualityLevel = 100;

    [EditorOrder(10), EditorDisplay("Category Name"), Tooltip("Texture property")]
    public Texture PluginIcon;
}
```

***

### 3. 设置选项

下一步是通知 Flax 编辑器您的设置类型。这可以通过专用的编辑器 C# API 来完成，该 API 负责处理自定义设置。

```cs
public class MyCustomPlugin : EditorPlugin
{
    public static readonly string SettingsType = "My Settings";

    /// <inheritdoc />
    public override void InitializeEditor()
    {
        base.InitializeEditor();

        // 注册自定义选项工厂
        Editor.Options.AddCustomSettings(SettingsType, () => new MySettings());

        // 您可以注册事件以跟踪用户编辑设置
        Editor.Options.OptionsChanged += OnOptionsChanged;
    }

    private void OnOptionsChanged(EditorOptions options)
    {
        // 使用辅助方法访问数据
        var customOptions = options.GetCustomSettings<MySettings>(SettingsType);
        Debug.Log("Options: " + customOptions.QualityLevel);
    }

    /// <inheritdoc />
    public override void DeinitializeEditor()
    {
        // 确保在插件关闭时进行清理
        Editor.Options.OptionsChanged -= OnOptionsChanged;
        Editor.Options.RemoveCustomSettings(SettingsType);

        base.DeinitializeEditor();
    }
}
```

***

### 4. 进行测试！

现在，在编辑器中使用主菜单选项 **工具 -> 选项**，然后选择您的设置类别。

![自定义编辑器选项](media/custom-editor-settings.png)

