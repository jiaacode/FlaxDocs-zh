# 图形

![图形](media/title.jpg)

Flax 提供了广泛的图形管线特性，以及一个包括延迟着色、全局光照、反射环境和后期处理的稳定渲染器。

本节将解释你所需了解的关于材质管线、纹理导入、环境光照等更多内容。

## 支持的图形后端

* DirectX 11（含 DirectX 10/10.1 回退）
* DirectX 12
* Vulkan
* WebGPU
* Null
* 平台原生（例如 PS4）

> [!TIP]
> 要检查游戏正在使用哪个渲染后端，请使用 [GPUDevice.Instance.RendererType](https://docs.flaxengine.com/api/FlaxEngine.GPUDevice.html#FlaxEngine_GPUDevice_RendererType)。你也可以使用 [GPUDevice.Instance.ShaderProfile](https://docs.flaxengine.com/api/FlaxEngine.GPUDevice.html#FlaxEngine_GPUDevice_ShaderProfile) 来检查渲染后端正在使用的着色器格式。

## 本节内容

* [渲染概述](overview/index.md)
* [摄像机](cameras/index.md)
* [材质](materials/index.md)
* [纹理](textures/index.md)
* [模型](models/index.md)
* [贴花](decals/index.md)
* [样条线](splines/index.md)
* [光照](lighting/index.md)
* [雾效](fog-effects/index.md)
* [后期特效](post-effects/index.md)
* [着色器](shaders/index.md)
* [视频](video/index.md)
* [调试工具](debugging-tools/index.md)
* [教程](tutorials/index.md)
