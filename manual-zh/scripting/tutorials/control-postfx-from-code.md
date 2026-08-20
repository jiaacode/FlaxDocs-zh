# 操作指南：利用代码控制 PostFx

### 1. 创建 PostFx Volume

首先，创建或使用您的 PostFx Volume Actor。此特殊对象类型包含一组后期处理选项，可用于覆盖默认渲染并通过游戏逻辑对其进行自定义。将 **Is Bounded** 设置为 **false**，以便您的 Volume 影响整个场景。

### 2. 创建脚本

创建一个新脚本，并添加对其中一个 postFx 设置执行简单动画的代码。您基本上可以编辑其中任何一个设置。只需记住为自定义属性指定覆盖标志。

```cs
public class PostFxControl : Script
{
    public override void OnUpdate()
    {
        // 获取父级 PostFxVolume Actor（Actor 应链接到该组件）
        var postFx = Actor.As<PostFxVolume>();

        // 获取当前选项
        var camArtifacts = postFx.CameraArtifacts;

        // 覆盖 ChromaticDistortion 字段
        camArtifacts.OverrideFlags = CameraArtifactsSettings.Override.ChromaticDistortion;
        camArtifacts.ChromaticDistortion = (Mathf.Sin(Time.GameTime * 2.0f) * 0.5f + 0.5f) * 4.0f;

        // 设置新选项
        postFx.CameraArtifacts = camArtifacts;
    }
}
```

***

### 3. 进行测试！

最后，将脚本添加到场景中已创建的 PostFx Volume Actor 上。然后启动游戏并测试结果。

![从 C# 代码控制 PostFx](media/control-postfx-from-code.gif)

