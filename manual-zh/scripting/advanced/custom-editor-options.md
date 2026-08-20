# 自定义编辑器选项

![自定义编辑器选项](media/custom-editor-options.png)

**自定义编辑器选项**可用于扩展默认编辑器选项。同时，这也是插件向编辑器注入自定义选项的一种非常统一的方式。在本教程中，你将学习如何在游戏或编辑器插件中直接定义、创建和使用自定义编辑器设置。

若要了解关于插件的更多信息，请参阅[此处](../plugins/index.md)的相关页面。

## 示例代码

以下为带有选项的已实现编辑器插件的完整源代码：

```cs
public class TestPlugin : EditorPlugin
{
    // 用于标识自定义选项的键
    public const string SettingsName = "Test Plugin";

    // 定义数据布局的自定义选项对象
    [CustomEditor(typeof(CustomOptionsEditor))]
    public class CustomOptions
    {
        [EditorOrder(0), EditorDisplay("Group 1"), Tooltip("My tooltip!")]
        public string TimerName = "timer 1";

        [EditorOrder(10), EditorDisplay("Group 1")]
        public float TimerValue = 11.0f;
    }

    // 选项对象的可选自定义编辑器
    public class CustomOptionsEditor : GenericEditor
    {
        public override void Initialize(LayoutElementsContainer layout)
        {
            base.Initialize(layout);

            layout.Label("Label");
        }
    }

    public override void InitializeEditor()
    {
        base.InitializeEditor();

        // 注册自定义选项类型
        Editor.Options.AddCustomSettings(SettingsName, () => new CustomOptions());

        // 访问编辑器选项
        var options = Editor.Options.Options.GetCustomSettings<CustomOptions>(SettingsName);
        Debug.Log("Editor options: " + options.TimerName + ", " + options.TimerValue);
    }

    public override void DeinitializeEditor()
    {
        // 结束时清理
        Editor.Options.RemoveCustomSettings(SettingsName);

        base.DeinitializeEditor();
    }
}
```

***
