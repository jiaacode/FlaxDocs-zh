# 有符号距离场

![Flax 中的有符号距离场](media/global-sdf-preview2.png)

**有符号距离场**（缩写为 **SDF**）是 3D 纹理，其中每个纹素包含到对象最近表面的有符号距离。如果此距离为负，则该纹素位于对象内部。SDF 可以大致表示网格几何体，并允许高效地近似复杂网格。通过能够快速采样到最近表面的距离（以及通过 SDF 导数获得方向），SDF 可用于：
* 程序化内容创建（例如河流材质中河岸附近的泡沫、房间角落的污垢/苔藓），
* 光照、反射和阴影（例如通过 SDF 体积进行光线追踪以确定交点），
* 粒子碰撞和力（例如落在世界表面的雪/雨、避免对象的鸟类群 VFX）。

## 模型 SDF

![模型 SDF 编辑器](media/model-sdf-editor.png)

模型资源可以包含为网格烘焙的 SDF 纹理，这可以在模型窗口中创建。它显示烘焙纹理的分辨率和 GPU 内存使用情况。你可以调整烘焙选项，并 *重建* 或 *移除* 数据。

> [!Warning]
> 计算 SDF 纹理是一个计算量非常大的过程，Flax 使用 GPU 或作业系统来安排异步计算，这可能会 *冻结计算机*。

| 选项              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| **分辨率缩放**    | 用于构建纹理的 SDF 纹理分辨率缩放。较高的值会大幅增加内存使用和计算时间，但会提高网格表示的质量。 |
| **在 GPU 上烘焙** | 如果勾选，SDF 生成将使用 GPU 在计算着色器上计算，否则 CPU 将使用作业系统。GPU 生成速度很快，但会在各种网格（例如植被）中产生伪影。 |
| **背面阈值**      | 用于基于测试光线击中三角形背面的百分比来调整网格内部检测的自定义阈值（范围 `0-1`）。对于更密集的网格使用较低的值。 |
| **LOD 索引**      | 用于 SDF 数据构建的模型细节级别的索引。默认情况下，使用最低质量的 LOD 以加快构建速度。 |

### 导入时的模型 SDF

![模型导入 SDF 生成选项](media/model-sdf-import-settings.png)

在导入模型资源时，你可以勾选 **生成 SDF** 选项，以自动为每个导入的模型文件计算 SDF 纹理。在使用 DDGI 或全局 SDF 的项目中，你可以在[图形设置](../../editor/game-settings/graphics-settings.md)中启用 **导入模型时生成 SDF** 选项，这将更改默认的模型导入值，使其在导入模型时始终生成 SDF。

![游戏设置中的模型 SDF 选项](media/model-sdf-option-setting.png)

你也可以使用编辑器中的一个小工具，位于 **工具 -> 构建所有网格 SDF** 下，它将计算场景中所有网格的 SDF。由于需要处理大量数据，这可能需要一些时间并导致计算机暂时卡顿。

![模型 SDF 工具](media/build-all-meshes-sdf.png)

## 全局 SDF

![全局 SDF 预览](media/global-sdf-preview.png)

Flax 包含一个名为 **全局有符号距离场**（缩写为 **全局 SDF**）的功能，它将场景中的所有模型、植被和地形光栅化为一个单一的全局体积纹理，该纹理代表整个场景。此全局 SDF 为附近的摄像机提供高达 10cm 的质量，并可以覆盖摄像机周围 200m 的世界，以高效地表示场景。它使用 4 个级联为附近摄像机提供更高的精度，并提高大型世界的性能。

全局 SDF 被[实时全局光照](../lighting/gi/realtime.md)使用，但也可以在粒子、材质和着色器中访问。如果你计划在内容项目中使用它，请在图形设置中勾选 **启用全局 SDF**。如果勾选，全局 SDF 渲染将被启用（在场景渲染之前）。你可以像其他图形质量设置一样控制其质量。

你可以在每个编辑器视口（场景和模型编辑器）中通过 **视图 -> 调试视图 -> 全局 SDF** 预览全局 SDF。

每个对象（模型、地形、植被）都可以通过使用 `DrawPass.GlobalSDF` 来控制它是否在全局 SDF 中可见。

### 内容中的全局 SDF

#### GPU 图节点

![在材质中采样全局 SDF](media/global-sdf-material.png)

材质和粒子可以使用以下节点：
- `Sample Global SDF` - 采样全局 SDF 以获取到最近表面的距离（在世界空间中）。
- `Sample Global SDF Gradient` - 采样全局 SDF 以获取梯度和到最近表面的距离（在世界空间中）。对梯度进行归一化以获得 SDF 表面法线向量。

#### GPU 全场景碰撞

![使用全局 SDF 的全场景碰撞](media/global-sdf-particles.gif)

![粒子节点中的全局 SDF](media/global-sdf-particles-nodes.png)

GPU 粒子可以手动访问全局 SDF（例如通过采样），或使用内置模拟模块：
* `Position (Global SDF)` - 将粒子放置在全局 SDF 表面上（使用当前粒子位置将其捕捉到 SDF）。
* `Collision (Global SDF)` - 使粒子与场景全局 SDF 碰撞。
* `Conform to Global SDF` - 向粒子施加力向量，使其贴合全局 SDF。

在创建更高级的 VFX 时，你可以在[粒子发射器函数](../../particles/particle-functions.md)中使用全局 SDF，以提供逻辑组件在内容中的可重用性。

#### 着色器

全局 SDF 可以在自定义着色器中通过使用工具头文件以及绑定到 GPU 上下文的常量缓冲区数据和纹理进行采样。示例：

```hlsl
// 包含全局 SDF 工具
#include "./Flax/GlobalSignDistanceField.hlsl"

META_CB_BEGIN(0, Data)
//..常量..

// 将全局 SDF 数据放在常量缓冲区中
GlobalSDFData GlobalSDF;
META_CB_END

// 提供带有全局 SDF 纹理和低分辨率 Mip 的着色器资源
Texture3D<snorm float> GlobalSDFTex : register(t0);
Texture3D<snorm float> GlobalSDFMip : register(t1);

float TestSampleSDF(float3 worldPosition)
{
    // 在世界位置采样 SDF
    float sdf = SampleGlobalSDF(GlobalSDF, GlobalSDFTex, GlobalSDFMip, worldPosition);
    return sdf;
}

float3 TestSampleNormalSDF(float3 worldPosition)
{
    // 采样 SDF 梯度（导数）（同时获取距离）
    float sdf;
    float3 sdfGradient = SampleGlobalSDFGradient(GlobalSDF, GlobalSDFTex, GlobalSDFMip, worldPosition, sdf);
    float3 sdfNormal = normalize(sdfGradient); // 对梯度进行归一化以获得法线向量
    return sdfNormal;
}

bool TestRayTraceSDF(float3 worldPosition, float3 worldDirection)
{
    // 初始化全局 SDF 追踪输入选项
    GlobalSDFTrace trace;
    float minDistance = 0.0f;
    float maxDistance = 10000.0f;
    trace.Init(worldPosition, worldDirection, minDistance, maxDistance);

    // 光线追踪
    GlobalSDFHit hit = RayTraceGlobalSDF(GlobalSDF, GlobalSDFTex, GlobalSDFMip, trace);

    // 处理结果
    bool isHit = hit.IsHit();
    float3 hitPosition = hit.GetHitPosition(trace);
    return isHit;
}
```

***

绑定资源的 C++ 代码：

```cpp
// 包含全局 SDF 渲染通道
#include "Engine/Renderer/GlobalSignDistanceFieldPass.h"

PACK_STRUCT(struct Data0
    {
    //..常量..

    // 将全局 SDF 数据放在常量缓冲区中
    GlobalSignDistanceFieldPass::ConstantsData GlobalSDF;
    });

void Render()
{
    // 获取用于绑定的全局 SDF 数据
    GlobalSignDistanceFieldPass::BindingData bindingDataSDF;
    if (GlobalSignDistanceFieldPass::Instance()->Render(renderContext, context, bindingDataSDF))
        return;

    // 绑定常量缓冲区
    Data0 data;
    data.GlobalSDF = bindingDataSDF.Constants;
    auto cb0 = _shader->GetCB(0);
    context->UpdateCB(cb0, &data);
    context->BindCB(0, cb0);

    // 绑定着色器资源
    context->BindSR(0, bindingDataSDF.Texture ? bindingDataSDF.Texture->ViewVolume() : nullptr);
    context->BindSR(1, bindingDataSDF.TextureMip ? bindingDataSDF.TextureMip->ViewVolume() : nullptr);

    // 绘制或调度..
}
```

***

## SDF 提示与技巧

* **避免非均匀缩放**，如果模型具有例如 *(10, 1, 1)* 的缩放，距离场将不准确。
* 材质中的 **位置偏移不受支持**，可能会导致光照问题。
* 使用 *背面阈值* `1` 为网格生成双面 SDF（例如植被或小型道具）。
* 在图形设置中启用 *导入模型时生成 SDF* 选项以便轻松使用。
* 如果模型在具有非常大或非常小规模（例如 *1000* 或 *0.0001*）的关卡中使用，则将此缩放应用于导入变换，或调整资源上的 SDF 分辨率缩放以获得相似的 SDF 质量。
* 使用全局 SDF 调试视图来分析 SDF 场景（它应大致匹配实际的场景几何体——这就是 GI 算法所看到的）。
* 为静态对象使用 `StaticFlags`，以便全局 SDF 可以优化静态场景的光栅化。
