# 操作指南：通过鼠标点击生成贴花

### 1. 创建贴花材质

首先，创建或使用您的贴花材质。确保将 **Domain** 设置为 **Decal**。

![贴花材质](media/decal-material.png)

### 2. 创建脚本

创建一个新脚本，并添加用于执行物理碰撞射线检测的代码，检测场景中的碰撞点，并在命中的位置生成贴花 Actor。

```cs
public class MouseShoot : Script
{
    public MaterialBase DecalMaterial;

    public override void OnUpdate()
    {
        if (Input.GetMouseButtonDown(MouseButton.Left))
        {
            var pos = Input.MousePosition;
            var ray = Camera.MainCamera.ConvertMouseToRay(pos);
            // 执行射线检测，查找命中点
            if (Physics.RayCast(ray.Position, ray.Direction, out var hit))
            {
                // 在命中点生成贴花
                var decal = Scene.AddChild<Decal>();
                decal.Position = hit.Point;
                decal.Material = DecalMaterial;
                decal.Direction = hit.Normal;
            }
        }
    }
}
```

***

### 3. 进行测试！

最后，将脚本添加到场景中的任意 Actor 上，并将创建的材质挂接到脚本的 **Decal Material** 属性中。然后启动游戏并测试结果。

![通过鼠标点击生成贴花](media/decal-spawn-with-mouse.gif)

