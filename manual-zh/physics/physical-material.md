# 物理材质

**物理材质** 资源用于定义物理对象在与世界动态交互时的响应方式。

## 创建物理材质

要创建新的物理材质资源，只需在 *内容* 窗口中导航到 Content 目录，然后右键单击并选择选项 **新建 -> 物理 -> 物理材质**。指定其名称并按 *Enter*。

![创建新的物理材质](/manual/media/new-physical-material.jpg)

## 使用物理材质

物理材质由碰撞体用于定义其表面属性。你可以通过将资源直接拖放到 **材质** 属性中来设置碰撞体材质。或者，你也可以在运行时使用 C# API 修改材质（请参阅 [Collider.Material](https://docs.flaxengine.com/api/FlaxEngine.Collider.html#FlaxEngine_Collider_Material) 属性）。

## 基于材质类型的 SFX 或 VFX

每个物理材质都包含一个 `Tag` 属性，用于在游戏逻辑中标识它。例如，它可以用于区分材质类型，以便在玩家在给定类型的表面（例如木头或草地）上行走时播放匹配的声音或视觉效果。

示例代码：

# [C#](#tab/code-csharp)
```cs
// 由动画事件调用的方法
private void OnFootstep(Vector3 footLocation)
{
    // 在脚部位置进行射线投射，以检测角色行走的表面
    var offset = 10.0f;
    var maxDistance = 100.0f;
    if (Physics.RayCast(footLocation + Vector3.Up * offset, Vector3.Down, out RayCastHit hitInfo, maxDistance))
    {
        // 获取脚下的表面
        if (hitInfo.Collider is Collider collider && collider.Material)
        {
            var material = (PhysicalMaterial)collider.Material.Instance;
            if (material.Tag == "Surface.Wood")
            {
                // 播放音效/特效...
            }
        }
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Physics/Physics.h"
#include "Engine/Physics/PhysicalMaterial.h"
#include "Engine/Physics/Colliders/Collider.h"

// 由动画事件调用的方法
void PointLight::OnFootstep(Vector3 footLocation)
{
    // 在脚部位置进行射线投射，以检测角色行走的表面
    const float offset = 10.0f;
    const float maxDistance = 100.0f;
    RayCastHit hitInfo;
    if (Physics::RayCast(footLocation + Vector3::Up * offset, Vector3::Down, hitInfo, maxDistance))
    {
        // 获取脚下的表面
        auto collider = Cast<Collider>(hitInfo.Collider);
        if (collider && collider->Material)
        {
            auto material = collider->Material->GetInstance<PhysicalMaterial>();
            if (material->Tag == TEXT("Surface.Wood"))
            {
                // 播放音效/特效...
            }
        }
    }
}
```
***

## 属性

![编辑物理材质](/manual/media/physical-material.jpg)

| 属性                 | 描述                                                         |
| -------------------- | ------------------------------------------------------------ |
| **摩擦力**           | 表面的摩擦力值，控制物体在该表面上滑动的难易程度。默认值为 `0.7`。 |
| **摩擦力组合模式**   | 摩擦力组合模式，控制多个材质之间的摩擦力计算方式。可能的选项：<table><tbody><tr><th>选项</th><th>描述</th></tr><tr><td>**平均值**</td><td>使用接触材质的平均值：(a+b)/2。</td></tr><tr><td>**最小值**</td><td>使用接触材质的较小值：min(a,b)。</td></tr><tr><td>**相乘**</td><td>将接触材质的值相乘：a\*b。</td></tr><tr><td>**最大值**</td><td>使用接触材质的较大值：max(a, b)。</td></tr></tbody></table> |
| **恢复系数**         | 表面的恢复系数或“弹性”，介于 0（无弹跳）和 1（出射速度与入射速度相同）之间。默认值为 `0.3`。 |
| **恢复系数组合模式** | 恢复系数组合模式，控制多个材质之间的恢复系数计算方式。可能的选项：<table><tbody><tr><th>选项</th><th>描述</th></tr><tr><td>**平均值**</td><td>使用接触材质的平均值：(a+b)/2。</td></tr><tr><td>**最小值**</td><td>使用接触材质的较小值：min(a,b)。</td></tr><tr><td>**相乘**</td><td>将接触材质的值相乘：a\*b。</td></tr><tr><td>**最大值**</td><td>使用接触材质的较大值：max(a, b)。</td></tr></tbody></table> |
| **密度**             | 物理材质密度，单位为千克每立方米（kg/m³）。密度越高，使用此材质的对象越重。木材约为 700，水为 1000，钢材约为 8000。 |
| **标签**             | 用于标识物理材质的标签（例如 `Surface.Wood`）。可用于在行走于具有该材质的对象上时播放适当的脚步声。 |
