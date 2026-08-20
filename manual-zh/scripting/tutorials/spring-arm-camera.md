# 操作指南：创建弹簧臂相机

### 1. 创建脚本

首先，创建一个新脚本，并添加用于读取鼠标输入以旋转相机的代码，同时执行物理碰撞射线检测来调整相机位置（防止与场景中的物体发生穿插）。

```cs
/// <summary>
/// 弧形球第三人称风格相机控制器脚本，处理与场景物体的碰撞。
/// </summary>
public class SpringArmCamera : Script
{
    private Float2 _mouse = new Float2(45, 45);

    /// <summary>
    /// 要跟随的目标 Actor。
    /// </summary>
    public Actor TargetActor;

    /// <summary>
    /// 目标相机 Actor。
    /// </summary>
    public Camera CamerActor;

    /// <summary>
    /// 弹簧臂的初始半径（环绕距离）。
    /// </summary>
    public float Distance = 1000;

    /// <summary>
    /// 弹簧臂修正的最小距离。
    /// </summary>
    public float MinDistance = 10.0f;

    /// <summary>
    /// 弹簧臂修正的最大距离。
    /// </summary>
    public float MaxDistance = 2000.0f;

    /// <summary>
    /// 鼠标移动速度缩放。
    /// </summary>
    public float MouseSpeed = 0.5f;

    /// <summary>
    /// 鼠标滚轮移动速度缩放。
    /// </summary>
    public float MouseWheelSpeed = 1.0f;

    /// <summary>
    /// 弹簧臂将与之发生碰撞的物理层。
    /// </summary>
    public LayersMask CollisionLayers = LayersMask.Default;

    /// <summary>
    /// 与几何体碰撞时额外施加的距离，以防止相机与其穿插。
    /// </summary>
    public float CollisionDistanceBias = 10.0f;
    
    /// <inheritdoc />
    public override void OnStart()
    {
        // 自动链接 Actor
        if (!TargetActor)
            TargetActor = Actor;
        if (!CamerActor)
        {
            CamerActor = Scene.FindActor<Camera>();
            if (CamerActor == null)
                Debug.LogError("Missing camera");
        }
    }

    /// <inheritdoc />
    public override void OnUpdate()
    {
        if (!CamerActor || !TargetActor)
            return;

        // 更新输入
        _mouse += Input.MousePositionDelta * MouseSpeed;
        _mouse.Y = Mathf.Clamp(_mouse.Y, -89, 89);
        Distance += Input.MouseScrollDelta * -20.0f * MouseWheelSpeed;
        Distance = Mathf.Clamp(Distance, MinDistance, MaxDistance);

        // 更新弧形球相机
        Quaternion rotation = Quaternion.Euler(-_mouse.Y, _mouse.X, 0);
        Vector3 targetPosition = TargetActor.Position;
        Vector3 direction = Vector3.Transform(Vector3.Forward, rotation) * Distance;
        Vector3 newPosition = targetPosition + direction;
        direction = (newPosition - targetPosition).Normalized;
        CamerActor.Position = targetPosition + direction * Distance;
        CamerActor.LookAt(targetPosition, Vector3.Up);
        
        // 如果相机与环境相交，则将其吸附到合适位置
        if (Physics.RayCast(targetPosition, direction, out RayCastHit hit, Distance, CollisionLayers))
        {
            var bias = CollisionDistanceBias + CamerActor.NearPlane;
            var distance = Mathf.Max(hit.Distance - bias, MinDistance);
            CamerActor.Position = targetPosition + direction * distance;
        }
    }
}
```

***

### 2. 设置

将脚本添加到玩家 Actor 上，并可选择将相机 Actor 链接到脚本上进行控制。否则，脚本将自动选取它在场景中找到的第一个相机。

### 3. 进行测试！

最后，启动游戏并测试结果。

![Spring Arm Camera Script Flax Engine](media/spring-arm-camera.gif)
