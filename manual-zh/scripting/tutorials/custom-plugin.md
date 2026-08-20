# 操作指南：创建自定义编辑器插件

编辑器插件可以扩展 Flax 编辑器，或者为随插件一起发布的相关游戏插件实现适当的工具集。

> [!Note]
> 注意：如果您的插件同时使用了 **游戏插件** 和 **编辑器插件** 类型，请记得实现 `EditorPlugin.GamePluginType` 来指向游戏插件的类型。

### 1. 创建编辑器脚本

在 `Source/<module_name>` 目录中创建一个名为 **MyEditorPlugin** 的新 C# 脚本，并使用目标类名加上 *Editor* 后缀。或者，您也可以使用额外的编辑器专用脚本模块，如[此处](add-scripts-module.md)的教程所示。

![教程](media/custom-editor-tutorial-2.jpg)

### 2. 实现插件逻辑

下一步是实现插件的实际逻辑。编辑器插件可以访问整个 C# API，包括编辑器 API。利用它来扩展默认的编辑器功能或创建新的功能。

以下示例代码向编辑器工具栏添加了一个新按钮，并在用户单击时显示消息。
**请记得在编辑器插件反初始化时清理已创建的 GUI 元素！**

```cs
#if FLAX_EDITOR
using FlaxEditor;
using FlaxEditor.GUI;
using FlaxEngine;

namespace ExamplePlugin
{
    public class MyEditorPlugin : EditorPlugin
    {
        private ToolStripButton _button;

        /// <inheritdoc />
        public override void InitializeEditor()
        {
            base.InitializeEditor();

            // 向编辑器工具栏添加按钮
            _button = Editor.UI.ToolStrip.AddButton("My Plugin");
            _button.Clicked += () => MessageBox.Show("Button clicked!");
        }

        /// <inheritdoc />
        public override void DeinitializeEditor()
        {
            if (_button != null)
            {
                _button.Dispose();
                _button = null;
            }

            base.DeinitializeEditor();
        }
    }
}
#endif
```

***

Flax 插件在其生命周期中使用两个主要方法：`InitializeEditor` 和 `DeinitializeEditor`。

### 3. 进行测试

返回编辑器，等待脚本重新编译，然后查看自定义按钮是否已添加。单击它以查看我们已实现的弹出窗口。现在您已准备好为编辑器实现更多酷炫的功能。

![使用自定义编辑器插件](media/editor-plugin-step-2.png)
