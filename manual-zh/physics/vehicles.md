# 载具

![汽车载具](media/wheeled-vehicle.gif)

Flax 支持基于[刚体](rigid-bodies.md)和[碰撞体](colliders/index.md)创建基于物理的载具，例如汽车和船只。本文档部分解释了此主题中的某些方面。

## 轮式载具

**轮式载具** 是一种使用车轮的载具。它构建在刚体之上，碰撞体代表其底盘形状和车轮。

### 属性

![载具属性](media/wheeled-vehicle-properties.png)

要配置载具驾驶体验，请使用 **引擎**、**差速器** 和 **变速箱** 类别下的属性分组。请参阅属性标签的工具提示，了解有关每个设置及其单位的更多信息。

此外，你可以指定 **驱动类型**、**使用倒车作为刹车** 以及其他刚体属性，包括载具 **质量** 和 **质心偏移**。

### 车轮

![载具车轮](media/wheel-properties.png)

要描述载具车轮配置，**车轮** 数组包含每个车轮的属性列表。确保链接正确的 **碰撞体** 并定义车轮 **类型**。每个车轮都描述为圆柱体形状（半径、宽度），应近似于车轮碰撞体的尺寸。每个车轮可以通过调整 **最大转向角** 来使用转向。车轮也可以使用刹车和手刹（使用适当的属性来定义扭矩）。

### 脚本

载具包含丰富的 API，可以从代码访问它们。如果你修改了载具属性，如引擎或变速箱配置，请确保之后调用 `Setup()` 方法。它将重建载具并重置其状态。

载具输入控制：
* `SetThrottle(float value)`
* `SetSteering(float value)`
* `SetBrake(float value)`
* `SetHandbrake(float value)`
* `ClearInput()`

载具状态访问：
* `float GetForwardSpeed()`
* `float GetSidewaysSpeed()`
* `float GetEngineRotationSpeed()`
* `int GetCurrentGear()` / `void SetCurrentGear(int value)`
* `int GetTargetGear()` / `void SetTargetGear(int value)`
* `void GetWheelState(int index, out WheelState result)`

车轮状态属性：
* `bool IsInAir`
* `PhysicsColliderActor TireContactCollider`
* `Vector3 TireContactPoint`
* `Vector3 TireContactNormal`
* `float TireFriction`

在创建复杂载具（例如基于动画模型）时，你可以查询车轮碰撞体状态以及车轮或引擎状态，以控制蒙皮载具主体（例如在动画图中旋转车轮骨骼）。

### 技术细节

载具使用 *PhysX Vehicles SDK* 进行驾驶、悬架和载具组件模拟（变速箱、引擎、离合器、悬架、差速器）。许多公开的属性可以被精确配置，以增强每个载具的驾驶模型。

* 每辆载具使用的最大车轮数量为 `20`。
* `Z` 轴为前进方向。

要了解有关载具物理模拟的更多信息，请参阅相关文档[此处](https://nvidia-omniverse.github.io/PhysX/physx/5.1.3/docs/Vehicles.html)。

对于选定的车轮载具，车轮以红色绘制，质心位置以蓝色线框球体绘制。

![载具调试形状](media/car-debug-shapes.png)

### 如何设置载具？

1) 创建新的 **轮式载具** Actor（默认选项配置为通用四轮载具）
![添加轮式载具](media/add-wheeled-vehicle.png)

2) 添加网格以可视化载具车身（模型或蒙皮模型）

3) 为载具车身物理碰撞添加碰撞体（凸包网格或一组基本形状——不支持三角形网格）——作为载具的子级
![添加载具车身](media/car-body.png)

4) 添加车轮碰撞体（例如球体碰撞体）——作为载具的子级，并在 **车轮** 列表中设置它们
![添加载具车轮](media/car-wheels.png)

5) 将车轮设置在不同于车身的[层](../editor/game-settings/layers-and-tags-settings.md)上，并在[物理设置](physics-settings.md)中禁用它们之间的碰撞
![载具层碰撞矩阵设置](media/car-body-layers-matrix.png)

6) 添加脚本来控制载具——你可以使用下面的脚本并设置摄像机、载具和摄像机目标（摄像机目标是摄像机旋转的根）。

```cs
using System;
using System.Runtime.ConstrainedExecution;
using FlaxEngine;

public class CarScript : Script
{
    public WheeledVehicle Car;
    public Actor CameraTarget;
    public Camera Camera;

    public float CameraSmoothing = 20.0f;

    public bool UseMouse = true;
    public float CameraDistance = 700.0f;

    private float _pitch = 10.0f;
    private float _yaw = 90.0f;
    private float _horizontal;
    private float _vertical;

    /// <summary>
    /// 将移动和旋转添加到摄像机（作为输入）。
    /// </summary>
    /// <param name="horizontal">水平输入。</param>
    /// <param name="vertical">垂直输入。</param>
    /// <param name="pitch">俯仰旋转输入。</param>
    /// <param name="yaw">偏航旋转输入。</param>
    public void AddMovementRotation(float horizontal, float vertical, float pitch, float yaw)
    {
        _pitch += pitch;
        _yaw += yaw;
        _horizontal += horizontal;
        _vertical += vertical;
    }

    public override void OnUpdate()
    {
        if (UseMouse)
        {
            // 光标
            Screen.CursorVisible = false;
            Screen.CursorLock = CursorLockMode.Locked;

            // 鼠标
            var mouseDelta = new Float2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y"));
            _pitch = Mathf.Clamp(_pitch + mouseDelta.Y, -88, 88);
            _yaw += mouseDelta.X;
        }
    }

    public override void OnFixedUpdate()
    {
        // 更新摄像机
        var camTrans = Camera.Transform;
        var camFactor = Mathf.Saturate(CameraSmoothing * Time.DeltaTime);
        CameraTarget.LocalOrientation = Quaternion.Lerp(CameraTarget.LocalOrientation, Quaternion.Euler(_pitch, _yaw, 0), camFactor);
        //CameraTarget.LocalOrientation = Quaternion.Euler(pitch, yaw, 0);
        camTrans.Translation = Vector3.Lerp(camTrans.Translation, CameraTarget.Position + CameraTarget.Direction * -CameraDistance, camFactor);
        camTrans.Orientation = CameraTarget.Orientation;
        Camera.Transform = camTrans;

        var inputH = Input.GetAxis("Horizontal") + _horizontal;
        var inputV = Input.GetAxis("Vertical") + _vertical;
        _horizontal = 0;
        _vertical = 0;

        var velocity = new Float3(inputH, 0.0f, inputV);
        velocity.Normalize();
        //velocity = CameraTarget.Transform.TransformDirection(velocity);

        Car.SetThrottle(velocity.Z);
        Car.SetSteering(velocity.X);
        Car.SetHandbrake(Input.GetAction("Handbrake") ? 1.0f : 0.0f);
    }
}
```

***

7) 播放并测试

## 载具模板

如果你想快速开始使用载具，请获取此[默认载具预制体](https://github.com/FlaxEngine/FlaxDocs/blob/master/manual/physics/media/DefaultCar.prefab)，将其添加到你的项目，在关卡中生成，并将 `CarScript` 设置到其中。
