# 创建和使用脚本

Flax 中的脚本使用 **C#** 语言编写（扩展名为 `.cs` 的源文件）。
如果你想创建 C++ 脚本，可以在此[此处](cpp/index.md)了解如何操作。
为了更好地组织项目工作区，脚本文件位于 `Source/` 目录中。
这样脚本与资源分离，减少了混乱，并使处理项目源文件更加方便。

Flax 编辑器为游戏脚本和编辑器插件生成解决方案文件（`.sln`）和 C# 项目文件（`.csproj`）。

![工作区](/manual/media/scripts-workspace.jpg)

> [!Note]
> 我们建议使用安装了 [Flax Engine Tools for Visual Studio](https://marketplace.visualstudio.com/items?itemName=Flax.FlaxVS) 的 Visual Studio 进行代码编辑。

# 创建脚本

1. 在 *内容* 窗口中，导航到 '&lt;project_name&gt;/Source/&lt;game_module_name&gt;'。
	<br>![步骤 1](/manual/media/new-script.gif)
	
2. 双击以打开脚本。等待 Flax 打开你的 IDE，然后它将打开新脚本。

打开后，脚本文件的内容如下所示。
[!code-csharp[示例1](code-examples/events.cs)]

# 使用脚本

脚本 **附加到 Actor 上**。每个 Actor 可以包含无限数量的独立脚本（包括同一脚本类型的多个实例）。这意味着脚本的生命周期与 Actor 和场景的生命周期相关。例如，如果你加载一个场景，附加到该场景中对象上的脚本也将被加载。

1. 选择一个 Actor 以向其添加脚本（注意 *属性* 窗口中 **脚本** 组中的标签 *将脚本拖放到此处*）
2. 将脚本拖放到 **将脚本拖放到此处** 区域
3. 脚本已准备就绪（包含 3 个公共字段的示例脚本）
   <br>![步骤 1](/manual/media/attach-script.gif)

Flax 编辑器使用一个专用组（在 `Scripts` 组内）显示公共脚本属性和字段。每个脚本组标题显示脚本类类型名称、**右侧的设置按钮** 和 **左侧的脚本切换复选框**。你可以使用此复选框启用或禁用脚本。

要 **移除**、**编辑** 或 **重新排序** 脚本，请使用 **设置按钮**，它会显示一个包含各种选项的弹出窗口。

![脚本设置](/manual/media/script-settings.png)

你还可以轻松地选择对脚本的引用或重新排序它。只需单击并拖动 **三杠图标按钮**，如下方 GIF 所示：

![重新排序脚本](/manual/media/script-reorder-with-drag.gif)
