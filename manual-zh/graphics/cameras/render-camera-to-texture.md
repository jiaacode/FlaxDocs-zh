## 操作指南：将摄像机渲染到纹理

Flax 引擎提供了非常广泛的自定义选项，可用于扩展渲染管线。其中之一是使用自定义摄像机将场景直接渲染到渲染目标。然后将其呈现在对象表面上。

在本教程中，你将学习如何实现画中画效果：

![渲染到纹理](/manual/media/picture-in-picture.png)

## 创建材质

第一步是为电视对象创建专用材质。它将用于在表面上显示渲染的场景画面，以便玩家可以看到它。为此，请按照以下简单步骤操作：

1. 创建一个新的空材质并命名为 `TV Material`（请参阅[材质基础](../materials/basics/index.md)页面学习如何操作）

2. 在材质编辑器中打开它（双击资源）
   ![材质编辑器](/manual/media/picture-in-picture-2.jpg)

3. 在 *属性面板* 中向下滚动，从底部下拉菜单中选择 **GPU 纹理** 选项，然后按下 **添加参数** 按钮
   <br>![材质参数](/manual/media/picture-in-picture-3.jpg)

4. 右键单击新创建的 *New parameter*，选择 **重命名** 选项，并将其名称设置为 **Image**

5. 右键单击曲面背景，创建一个 **获取参数** 节点（要了解有关创建节点的更多信息，请参阅[材质编辑器](../materials/material-editor/index.md)页面）
   ![材质获取参数](/manual/media/picture-in-picture-4.jpg)

6. 从该节点的下拉菜单中选择 **Image** 参数，并将其 **颜色** 框连接到材质的 **自发光** 输入。
   <br>![材质参数使用](/manual/media/picture-in-picture-5.jpg)

7. **保存** 材质资源

## 创建脚本

现在是时候编写一个简单的脚本，它将使用摄像机并将其渲染到纹理（也称为 *渲染目标*）。

1. 导航到项目的 *Source/Game* 目录，并创建一个名为 **CameraTV** 的新 C# 脚本
   ![创建新脚本](/manual/media/picture-in-picture-6.jpg)

2. 打开脚本

3. 编写以下代码并保存

```cs
using System;
using FlaxEngine;

public class CameraTV : Script
{
    public Camera Cam;
    public MaterialBase Material;

    [Limit(1, 2000)]
    public Float2 Resolution
    {
        get => _resolution;
        set
        {
            value = Float2.Clamp(value, new Float2(1), new Float2(2000));
            if (_resolution != value)
            {
                _resolution = value;
                if (_output)
                {
                    // 重新调整后缓冲区大小
                    UpdateOutput();
                }
            }
        }
    }

    public float ViewDistance = 2000;

    private Float2 _resolution = new Float2(640, 374);
    private GPUTexture _output;
    private SceneRenderTask _task;
    private MaterialInstance _material;

    private void UpdateOutput()
    {
        var desc = GPUTextureDescription.New2D(
            (int)_resolution.X,
            (int)_resolution.Y,
            PixelFormat.R8G8B8A8_UNorm);
        _output.Init(ref desc);
    }

    public override void OnEnable()
    {
        // 创建后缓冲区
        if (_output == null)
            _output = new GPUTexture();
        UpdateOutput();

        // 创建渲染任务
        if (_task == null)
            _task = new SceneRenderTask();
        _task.Order = -100;
        _task.Camera = Cam;
        _task.Output = _output;
        _task.ViewFlags = 
            ViewFlags.Reflections | 
            ViewFlags.Decals | 
            ViewFlags.AO | 
            ViewFlags.GI | 
            ViewFlags.DirectionalLights | 
            ViewFlags.PointLights | 
            ViewFlags.SpotLights | 
            ViewFlags.SkyLights | 
            ViewFlags.Sky | 
            ViewFlags.Shadows | 
            ViewFlags.SpecularLight | 
            ViewFlags.CustomPostProcess | 
            ViewFlags.ToneMapping;
        _task.Enabled = false;

        if (Material && _material == null)
        {
            // 使用动态材质实例
            if (Material.WaitForLoaded())
                throw new Exception("Failed to load material.");
            _material = Material.CreateVirtualInstance();

            // 设置渲染任务输出以绘制在模型上
            _material.SetParameterValue("Image", _output);

            // 将材质绑定到父模型
            if (Actor is StaticModel staticModel && staticModel.Model)
            {
                staticModel.Model.WaitForLoaded();
                staticModel.SetMaterial(0, _material);
            }
        }

        _task.Enabled = true;
    }

    public override void OnUpdate()
    {
        // 如果主游戏视图太远，通过禁用渲染来优化性能
        var mainView = MainRenderTask.Instance.View;
        _task.Enabled = Vector3.Distance(Actor.Position, mainView.Origin + mainView.Position) <= ViewDistance;
    }

    public override void OnDisable()
    {
        // 解除临时材质的绑定
        if (Actor is StaticModel staticModel && staticModel.Model && staticModel.Model.IsLoaded)
            staticModel.SetMaterial(0, Material);

        // 确保清理资源
        Destroy(ref _task);
        Destroy(ref _output);
        Destroy(ref _material);
    }
}
```

***

## 准备对象

最后一步是设置场景并将所有内容链接在一起。

1. 创建一个新的 **摄像机** 对象并将其放置在场景中
2. 添加一个将呈现摄像机图像的对象。你可以使用 *工具箱* 窗口中的 **立方体** 模型
   ![教程](/manual/media/picture-in-picture-7.jpg)

3. 选择生成的对象，并通过简单地拖放将 **CameraTV** 脚本添加到它上面
   ![教程](/manual/media/picture-in-picture-8.jpg)

4. 为脚本属性 **Cam** 和 **Material** 设置对摄像机和材质的引用。你还可以调整分辨率（以像素为单位）。
   <br>![教程](/manual/media/picture-in-picture-9.jpg)

5. 点击 **播放** 并查看结果！
   ![教程](/manual/media/picture-in-picture-10.jpg)
