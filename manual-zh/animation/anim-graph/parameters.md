# 动画图参数

动画图参数是图的**公共变量**，可以从外部修改以配置其逻辑。
例如，你可以创建一个名为 **Speed** 的参数，并用它在角色的 *Run* 和 *Walk* 动画之间进行混合，从而为你的游戏实现合适的动画播放。

使用图参数可以让你实现所需的游戏功能，并扩展默认的骨骼动画播放，以便使用从 C# 源代码传递的参数来应用反向动力学（IK）、变换单个骨骼，或者简单地在动画之间混合。这是一种非常常见的技术，用于创建玩家动画控制器脚本，并将动画控制变量（如 `Move Forward`、`Move Right`、`Is Jumping`）传递给图，并实现适当的动画逻辑。

## 创建和使用参数

![动画图编辑参数](../tutorials/media/add-param-button.jpg)

创建图参数是在[动画图编辑器窗口](interface.md)中完成的，该窗口包含一个专用的属性面板。
只需指定参数类型（使用组合框菜单），然后单击 **添加参数** 按钮。它将添加一个新参数。你可以通过使用专用的上下文菜单重命名或删除已创建的参数。只需右键单击参数名称标签。你还可以指定参数的默认值。

![动画图编辑参数](../tutorials/media/anim-param-edit.jpg)

要在图中访问此参数，请生成 **获取参数** 节点，然后从下拉菜单中选择你的参数。

![动画图获取参数](../tutorials/media/get-param-node-add.jpg)

之后，将你的参数输出与其他节点连接以实现所需的使用。在此示例中，**Head Scale** 参数用于使用 **变换骨骼（局部空间）** 节点缩放骨骼。请注意，动画图支持隐式类型转换，因此值类型 **float** 会被转换为用于骨骼变换缩放的 **Float3** 类型。

![动画图获取参数](../tutorials/media/get-param-node-use.png)

## 从代码中使用动画图参数

可以从 C# 脚本访问已创建的动画图参数。你可以缓存图参数、遍历它们，并从代码的任何部分访问它们。以下是一个更新单个图参数的示例代码。

# [C#](#tab/code-csharp)

```cs
using FlaxEngine;

public class EditAnimGraphParam : Script
{
	[Range(0.5f, 2.5f)]
	public float HeadScale  = 1.0f;

	private AnimGraphParameter _parameter;

	public override void OnStart()
	{
		// 缓存参数句柄
		_parameter = Actor.As<AnimatedModel>().GetParameter("Head Scale");
	}

	public override void OnUpdate()
	{
		// 更新值
		_parameter.Value = HeadScale;
	}
}
```

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Scripting/Script.h"
#include "Engine/Animations/Graph/AnimGraph.h"
#include "Engine/Level/Actors/AnimatedModel.h"

API_CLASS() class GAME_API EditAnimGraphParam : public Script
{
    API_AUTO_SERIALIZATION(EditAnimGraphParam);
    DECLARE_SCRIPTING_TYPE(EditAnimGraphParam);

private:
    AnimGraphParameter* _parameter;

public:
    API_FIELD(Attributes="Range(0.5f, 2.5f)")
    float HeadScale = 1.0f;

public:
    void OnStart() override
    {
        // 缓存参数句柄
        _parameter = Cast<AnimatedModel>(GetActor())->GetParameter(TEXT("Head Scale"));
    }
    void OnUpdate() override
    {
        // 更新值
        _parameter->Value = HeadScale;
    }
};
```

***

结果：

![动画图参数编辑](../tutorials/media/edit-anim-graph-param-code.gif)

## 特性

每个参数都可以具有一组可自定义的**特性**，这些特性可以自定义其在 UI 中的显示逻辑，或用作其他系统（例如序列化）的元数据。

要为参数添加特性，只需 **右键单击 -> 编辑特性**，然后使用 **+** 按钮添加新特性，将 **类型** 设置为下拉列表中的一项，调整特性的属性，然后单击 **确定** 确认。

例如，工具提示特性可用于向其他用户显示有关参数的文档说明。范围和滑块特性可以帮助自定义标量值的编辑，而编辑器组和编辑器顺序可以组织参数列表。要了解特性类型，请参阅[此页面](../../scripting/attributes.md)。

![参数特性](/manual/media/parameter-attribute.png)
