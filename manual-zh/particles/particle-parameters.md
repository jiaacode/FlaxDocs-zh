# 粒子参数

![粒子参数](/manual/media/particle-parameters.gif)

每个粒子发射器都可以定义一组自定义参数，公开给外部进行额外定制。这些参数可以通过粒子系统轨道的名称（用作命名空间）按每个粒子特效进行访问。例如，如果粒子发射器有一个名为 *Color* 的参数，且粒子系统有 2 个使用此发射器的轨道，分别名为 *Smoke 1* 和 *Smoke 2*，那么你可以独立调整每个参数：*Smoke 1.Color* 和 *Smoke 2.Color*。

以下是一个修改参数的示例代码。请记住缓存特效参数，而不是每帧都查询它们，这样你的游戏性能会更好。

```cs
var effect = Actor.As<ParticleEffect>();
effect.SetParameterValue("Smoke 1", "Color", Color.Red);
effect.SetParameterValue("Smoke 2", "Color", Color.Blue);
```

***

此外，你可以按如下方式枚举所有粒子特效参数：

```cs
var effect = Actor.As<ParticleEffect>();
foreach (var param in effect.Parameters)
{
    Debug.Log("Param " + param.Name + " = " + param.Value);
}
```

***

## 特性

每个参数都可以具有一组可自定义的**特性**，这些特性可以自定义其在 UI 中的显示逻辑，或用作其他系统（例如序列化）的元数据。

要为参数添加特性，只需 **右键单击 -> 编辑特性**，然后使用 **+** 按钮添加新特性，将 **类型** 设置为下拉列表中的一项，调整特性的属性，然后单击 **确定** 确认。

例如，工具提示特性可用于向其他用户显示有关参数的文档说明。范围和滑块特性可以帮助自定义标量值的编辑，而编辑器组和编辑器顺序可以组织参数列表。要了解特性类型，请参阅[此页面](../scripting/attributes.md)。

![参数特性](../animation/anim-graph/media/parameter-attribute.png)
