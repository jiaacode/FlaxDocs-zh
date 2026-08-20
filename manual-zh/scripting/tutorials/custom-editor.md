# 操作指南：创建自定义编辑器

在本教程中，您将学习如何为脚本创建简单的自定义编辑器。要了解有关自定义编辑器管道的更多信息，请参阅相关[文档页面](../custom-editors/index.md)。

### 1. 准备一个示例脚本（或使用您游戏中的脚本）

```cs
public class MyScript : Script
{
    public float Speed = 11;

    public Color LightColor = Color.Yellow;

    public override void OnStart()
    {
        // 执行某些操作
    }
}
```

***

### 2. 创建编辑器脚本

在 `Source/<module_name>` 目录中创建一个新的 C# 脚本，并使用目标类名加上 *Editor* 后缀。或者，您也可以使用额外的编辑器专用脚本模块，如[此处](add-scripts-module.md)的教程所示。

![教程](media/custom-editor-tutorial-2.jpg)

### 3. 打开文件

双击创建的文件以在代码编辑器中打开。

![教程](media/custom-editor-tutorial-3.jpg)

### 4. 实现自定义编辑器

编辑创建的类，使其继承自 [GenericEditor](https://docs.flaxengine.com/api/FlaxEditor.CustomEditors.Editors.GenericEditor.html)。添加 [CustomEditor](https://docs.flaxengine.com/api/FlaxEngine.CustomEditorAttribute.html) 属性，该属性将指示 Flax 使用此类型来编辑 `MyScript` 对象。实现 `Initialize` 函数，该函数用于创建编辑器布局。在下面的示例中，它插入了一个标签，创建了一个包含默认编辑器的分组，然后在一个小间距之后添加了一个按钮。

```cs
#if FLAX_EDITOR
using FlaxEditor.CustomEditors;
using FlaxEditor.CustomEditors.Editors;
using FlaxEngine;

namespace GraphicsFeaturesTour
{
    [CustomEditor(typeof(MyScript))]
    public class MyScriptEditor : GenericEditor
    {
        public override void Initialize(LayoutElementsContainer layout)
        {
            layout.Label("My Custom Editor", TextAlignment.Center);
            var group = layout.Group("Inner group");

            base.Initialize(group);

            layout.Space(20);
            var button = layout.Button("Click me", Color.Green);
            
            // 使用 Values[] 来访问正在编辑的脚本或值。
            // 它是一个数组，因为自定义编辑器可以同时编辑多个选中的脚本。
            button.Button.Clicked += () => Debug.Log("Button clicked! The speed is " + (IsSingleObject ? (Values[0] as MyScript).Speed : ""));
        }
    }
}
#endif
```

***

> [!TIP]
> 对于继承自 Script 的对象，通常应使用 GenericEditor；而对于自定义 Actor，则应使用 ActorEditor。

如果您的脚本位于编辑器专用模块中，则可以省略 `#if FLAX_EDITOR / #endif` 这一对。

### 5. 查看结果

在 Flax 重新加载脚本后，选择添加了 `MyScript` 的对象，即可看到如下所示的自定义编辑器。

![教程](media/custom-editor-tutorial-4.jpg)

单击按钮时，它会按预期在 *调试* 窗口中输出 *"Button clicked!"*。
