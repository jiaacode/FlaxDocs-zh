# 后期处理材质

![后期处理材质](/manual/media/post-fx-materials.jpg)

**后期处理材质** 管线是一项功能，允许游戏开发者创建自己的后期和中间图像效果。
例如，你可以为玩家受伤创建视觉屏幕效果，或改变游戏的整体外观。
使用后期处理材质是通过在 *屏幕空间* 中进行自定义图像处理来扩展图形管线的最简单方法。

要了解有关创建和使用材质的更多信息，请查看相关文档[此处](../materials/index.md)。

## 创建后期处理材质

后期处理材质的创建类似于其他材质类型。
使用以下教程创建具有简单扭曲和着色效果的材质。

1. 创建新材质并打开它。

2. 将 **领域** 更改为 **后期处理**（请参阅[材质属性](../materials/material-properties/index.md)以了解更多信息）。
    <br>![后期处理材质教程](/manual/media/post-fx-material-tutorial-0.jpg)

3. 添加 **Color**（*Color* 类型）和 **Chromatic**（*Float3* 类型）参数。
    <br>![后期处理材质教程](/manual/media/post-fx-material-tutorial-1.jpg)

4. 创建三个 **场景颜色** 节点，从每个节点使用单个通道（使用 **Pack Float3** 节点打包为 *RGB*），并将其乘以 **Color**（使用常量或参数）。将输出连接到 **自发光** 输入。
    <br>![后期处理材质教程](/manual/media/post-fx-material-tutorial-2.jpg)

5. 重新创建以下图，该图根据 **Chromatic** 参数值除以屏幕大小来偏移颜色样本（在屏幕空间中）。
    <br>![后期处理材质教程](/manual/media/post-fx-material-tutorial-3.jpg)

6. 材质已准备就绪！
    <br>![后期处理材质教程](/manual/media/post-fx-material-tutorial-4.jpg)

## 应用后期处理材质

有几种方法可以应用后期处理材质。最简单的方法是使用 [后期处理效果体积](post-fx-volumes.md)。只需创建一个新的 Actor，选择它，然后在 **后期处理材质** 组下将 **大小** 设置为 `1`。然后将你的后期处理材质拖放到空槽中。

![后期处理材质教程](/manual/media/post-fx-material-tutorial-5.jpg)

将摄像机移动到体积内以查看最终效果。

![后期处理材质教程](/manual/media/post-fx-material-tutorial-6.jpg)

>[!Note]
>单个 *后期处理效果体积* 最多可以使用 `8` 个后期处理材质，但你可以堆叠它们并使用无限数量的后期处理材质。然而，请记住保持稳定的游戏性能，因为渲染全屏效果可能会降低游戏速度。

当使用 C# 脚本扩展渲染管线并使用[渲染任务](http://docs.flaxengine.com/api/FlaxEngine.RenderTask.html)时，你可以使用 [Renderer.DrawPostFxMaterial](https://docs.flaxengine.com/api/FlaxEngine.Renderer.html#collapsible-FlaxEngine_Renderer_DrawPostFxMaterial_FlaxEngine_GPUContext_FlaxEngine_RenderContext__FlaxEngine_MaterialBase_FlaxEngine_GPUTexture_FlaxEngine_GPUTextureView_) 方法。这允许使用 [GPUTextures](http://docs.flaxengine.com/api/FlaxEngine.GPUTexture.html) 扩展渲染并使用自定义绘制。

## 后期处理输入

![后期处理材质输入纹理](/manual/media/postfx-material-nodes.png)

作为主要输入，后期处理材质接收 **场景颜色**，其中包含当前传递给后期处理的输入缓冲区内的像素。默认情况下，它是最终渲染帧，但如果你更改材质位置，它可以在应用任何 AA 或透明度之前包含渲染场景，并且采用 HDR 格式。

有用的节点：
* **场景颜色** - 由渲染器传递给后期处理材质的输入纹理（请参阅材质位置选项）。
* **场景纹理** - 通用访问常见场景渲染缓冲区，例如：漫反射颜色、粗糙度、世界法线、基础颜色、金属度等。它可用于实现自定义效果，例如基于法线向量的边缘检测滤镜。
* **场景深度** - 深度缓冲区。可用于实现基于深度的效果，例如轮廓渲染。此节点的 *Depth* 输出返回线性深度值（在 `0-1` 范围内）。要手动访问硬件深度样本纹理（例如使用带点钳位滤波器的 Sample Texture 节点）。
* **线性化深度** - 将硬件深度缓冲区值（来自当前摄像机视图）转换为线性深度值（在 `0-1` 范围内）。你可以将输出乘以 *View* 节点的 *Far Plane* 以获得以世界单位表示的深度。

> [!Note]
> 如果你熟悉 Unreal，那么 **PostProcessInput0** 在 Flax 中相当于后期处理材质输入的 **场景颜色** 节点。

## 后期处理材质位置

![后期处理材质位置](../materials/media/properties-misc.png)

*Flax Engine* 渲染管线非常复杂。有许多效果对最终帧有贡献。
后期处理材质也是如此。每个材质都包含一个名为 **后期处理位置** 的属性（位于 **杂项** 部分）。通过编辑它，你可以指定材质的渲染时机。可能的选项：

| 选项                   | 描述                                                         |
| ---------------------- | ------------------------------------------------------------ |
| **后期处理通道之后**   | 使用 *LDR* 输入帧在后期处理通道之后渲染材质。                |
| **后期处理通道之前**   | 使用 *HDR* 输入帧在后期处理通道之前渲染材质。                |
| **正向通道之前**       | 在正向通道之前但在 *GBuffer* 之后使用 *HDR* 输入帧渲染材质。 |
| **自定义后期效果之后** | 在自定义后期效果（脚本化）之后渲染材质。                     |
| **反射通道之前**       | 在反射通道之前但在光照通道之后使用 *HDR* 输入帧渲染材质。它可用于实现自定义光源类型，将光照累积到光照缓冲区。 |
| **抗锯齿通道之后**     | 在抗锯齿之后将材质渲染到输出后缓冲区。                       |
| **正向通道之后**       | 在正向通道之后但在任何后期处理之前渲染材质。                 |
