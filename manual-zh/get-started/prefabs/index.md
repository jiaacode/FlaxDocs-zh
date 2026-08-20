# 预制体

![预制体](/manual/media/nested_prefabs.gif)

**预制体** 是一种资源，包含序列化的 **Actor 层级结构（包括脚本）** 和数据。预制体就像一个模板或原型，你可以在场景中生成它。对预制体资源所做的任何编辑都会立即反映到从它生成的所有实例中，但你也可以单独为每个实例覆盖组件和设置。

Flax 支持创建 **嵌套预制体**，这意味着你可以在其他预制体中使用预制体中的对象。这有助于创建高级游戏内容。

创建预制体并将更改应用于预制体仅在编辑器中受支持。然而，生成预制体专用于在运行时的游戏中使用。请使用本文档部分来了解有关创建和使用预制体的更多信息。

## 主题

<div class="frontpage">

<div class="frontpage-section">
<a href="creating-prefabs.md"><img src="/manual/media/creating-prefabs-icon.jpg"></a>
<h3><a href="creating-prefabs.md">创建预制体</a></h3>
<p>了解如何创建新的预制体资源。</p>
</div>

<div class="frontpage-section">
<a href="prefab-editor.md"><img src="/manual/media/prefab-editor-icon.jpg"></a>
<h3><a href="prefab-editor.md">预制体编辑器</a></h3>
<p>了解如何打开和编辑预制体资源。</p>
</div>

<div class="frontpage-section">
<a href="spawning-prefabs.md"><img src="/manual/media/spawning-prefabs-icon.jpg"></a>
<h3><a href="spawning-prefabs.md">生成预制体</a></h3>
<p>了解如何将预制体对象添加到你的游戏中。</p>
</div>

</div>

## 编辑器中的预制体

生成的预制体称为 **预制体实例**，并包含对预制体资源和预制体中引用对象的链接。编辑器会在 *场景窗口* 中高亮显示预制体实例，如下图所示。

![编辑器中的预制体实例](/manual/media/prefab-instance.png)

选择预制体实例后，*属性窗口* 会在面板顶部显示两个额外的按钮：**选择预制体** 和 **查看更改**。

![预制体实例差异弹出窗口](/manual/media/prefab-instance-buttons.png)

**选择预制体** 按钮会在 *内容窗口* 中显示链接的预制体资源位置并选择它。

**编辑预制体** 按钮会在新的 *预制体编辑器* 中打开选中的预制体。

**查看更改** 按钮会显示一个弹出窗口，其中包含与预制体相比任何已修改的 Actor 和脚本属性。它用于查看应用于预制体实例的所有更改，并允许将它们还原或应用到预制体。下图显示了一个示例预制体更改弹出窗口的内容。你可以右键单击修改过的树节点以还原逐属性更改，同时保持其他修改不变。

![预制体实例差异弹出窗口](/manual/media/prefab-instance-diff-popup.png)

你还可以看到应用于预制体实例的逐属性修改。编辑器通过高亮显示已更改属性的标签来显示它们，如下图所示。你可以右键单击它并还原应用于此属性的更改（支持撤销）。

![预制体实例差异弹出窗口](/manual/media/prefab-instance-property-diff.png)
