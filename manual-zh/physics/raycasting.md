# 射线投射

通过使用 **射线投射**，游戏脚本可以检测各种几何体相交。例如，你可以执行各种重叠测试和射线投射来扫描玩家周围的空间。最常见的用例可能是使用射线投射将第三人称摄像机放置在玩家正后方，但不穿过场景对象。

Flax 为射线投射和几何体测试提供了各种 C# API：
* [Physics.RayCast](https://docs.flaxengine.com/api/FlaxEngine.Physics.html#FlaxEngine_Physics_RayCast_FlaxEngine_Vector3_FlaxEngine_Vector3_FlaxEngine_RayCastHit__System_Single_System_Int32_System_Boolean_)
* [Physics.RayCastAll](https://docs.flaxengine.com/api/FlaxEngine.Physics.html#collapsible-FlaxEngine_Physics_RayCastAll_FlaxEngine_Vector3_FlaxEngine_Vector3_System_Single_System_Int32_System_Boolean_)
* [Physics.BoxCast](https://docs.flaxengine.com/api/FlaxEngine.Physics.html#FlaxEngine_Physics_BoxCast_FlaxEngine_Vector3_FlaxEngine_Vector3_FlaxEngine_Vector3_FlaxEngine_Quaternion_System_Single_System_Int32_System_Boolean_)
* [Physics.BoxCastAll](https://docs.flaxengine.com/api/FlaxEngine.Physics.html#FlaxEngine_Physics_BoxCastAll_FlaxEngine_Vector3_FlaxEngine_Vector3_FlaxEngine_Vector3_FlaxEngine_Quaternion_System_Single_System_Int32_System_Boolean_)
* [Physics.SphereCast](https://docs.flaxengine.com/api/FlaxEngine.Physics.html#FlaxEngine_Physics_SphereCast_FlaxEngine_Vector3_System_Single_FlaxEngine_Vector3_FlaxEngine_RayCastHit__System_Single_System_Int32_System_Boolean_)
* [Physics.SphereCastAll](https://docs.flaxengine.com/api/FlaxEngine.Physics.html#FlaxEngine_Physics_SphereCastAll_FlaxEngine_Vector3_System_Single_FlaxEngine_Vector3_System_Single_System_Int32_System_Boolean_)
* [Physics.CheckBox](https://docs.flaxengine.com/api/FlaxEngine.Physics.html#FlaxEngine_Physics_CheckBox_FlaxEngine_Vector3_FlaxEngine_Vector3_FlaxEngine_Quaternion_System_Int32_System_Boolean_)
* [Physics.CheckSphere](https://docs.flaxengine.com/api/FlaxEngine.Physics.html#FlaxEngine_Physics_CheckSphere_FlaxEngine_Vector3_System_Single_System_Int32_System_Boolean_)
* [Physics.OverlapBox](https://docs.flaxengine.com/api/FlaxEngine.Physics.html#FlaxEngine_Physics_OverlapBox_FlaxEngine_Vector3_FlaxEngine_Vector3_FlaxEngine_Quaternion_System_Int32_System_Boolean_)
* [Physics.OverlapSphere](https://docs.flaxengine.com/api/FlaxEngine.Physics.html#FlaxEngine_Physics_OverlapSphere_FlaxEngine_Vector3_System_Single_System_Int32_System_Boolean_)

此外，你可以使用 [Collider.RayCast](https://docs.flaxengine.com/api/FlaxEngine.Collider.html#FlaxEngine_Collider_RayCast_FlaxEngine_Vector3_FlaxEngine_Vector3_FlaxEngine_RayCastHit__System_Single_) 和 [Collider.ClosestPoint](https://docs.flaxengine.com/api/FlaxEngine.Collider.html#FlaxEngine_Collider_ClosestPoint_FlaxEngine_Vector3_) 方法对单个碰撞体执行类似测试。

## 示例

此代码从对象位置发送一条射线，并在命中位置绘制一个红色球体。

# [C#](#tab/code-csharp)
```cs
public override void OnUpdate()
{
    RayCastHit hit;
    if (Physics.RayCast(Actor.Position, Actor.Direction, out hit))
    {
        DebugDraw.DrawSphere(new BoundingSphere(hit.Point, 50), Color.Red);
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Physics/Physics.h"
#include "Engine/Debug/DebugDraw.h"

void MyScript::OnUpdate() override
{
    RayCastHit hit;
    if (Physics::RayCast(GetActor()->GetPosition(), GetActor()->GetDirection(), hit))
    {
        DEBUG_DRAW_SPHERE(BoundingSphere(hit.Point, 50), Color::Red, 0.0f, true);
    }
}
```
***

## 使用层遮罩的示例

通常，你希望射线投射从玩家位置开始，然而，这样的射线投射会立即检测到玩家的碰撞体。解决此问题的正确方法是使用[层功能](../editor/game-settings/layers-and-tags-settings.md)。

为此，为玩家和碰撞体分配不同的层。你也可以为不同的碰撞体组分配不同的层。然后，在射线投射函数中，相应地设置 `layerMask`。层遮罩为每个层使用一个位。例如，要仅检查与第 3 层的碰撞体的碰撞，通常使用 `1 << 3` 作为层遮罩。使用 `LayersMask` 结构通过编辑器弹出窗口选择层。

# [C#](#tab/code-csharp)
```cs
public LayersMask Layers;

public override void OnUpdate()
{
    if (Physics.RayCast(Actor.Position, Actor.Direction, out RayCastHit hit, float.MaxValue, Layers))
    {
        DebugDraw.DrawSphere(new BoundingSphere(hit.Point, 50), Color.Red);
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Core/Types/LayersMask.h"
#include "Engine/Physics/Physics.h"
#include "Engine/Debug/DebugDraw.h"

API_FIELD() LayersMask Layers;

void MyScript::OnUpdate() override
{
    RayCastHit hit;
    if (Physics::RayCast(GetActor()->GetPosition(), GetActor()->GetDirection(), hit, MAX_float, Layers))
    {
        DEBUG_DRAW_SPHERE(BoundingSphere(hit.Point, 50), Color::Red, 0.0f, true);
    }
}
```
***

## 带网格数据访问的射线投射示例

如果射线投射命中网格碰撞体或地形，它包含 `FaceIndex`（被命中的面的索引）和 `UV`（命中三角形的重心坐标）。这些可用于访问用于烘焙命中碰撞体的几何体数据。一个示例是读取命中网格几何体的顶点颜色或法线向量。

为此，你可以使用 `CollisionData.GetModelTriangle` 方法，该方法将网格碰撞体的面索引转换为用于烘焙碰撞的几何体的索引。它仅支持构建为三角形网格且未设置 `ConvexMeshGenerationFlags.SuppressFaceRemapTable` 标志的碰撞数据。

在检索到源网格及其三角形索引后，你可以获取索引缓冲区和顶点缓冲区以读取命中三角形的数据。如果对相似网格频繁访问数据，请尝试使用缓存或使用默认包含改进数据访问和内部缓存的 C++ API。

# [C#](#tab/code-csharp)
```cs
public override void OnUpdate()
{
    // 尝试用鼠标点击来命中某个物体
    if (!Input.GetMouseButtonDown(MouseButton.Left))
        return;
    var pos = Input.MousePosition;
    var ray = Camera.MainCamera.ConvertMouseToRay(pos);
    if (!Physics.RayCast(ray.Position, ray.Direction, out var hit))
        return;

    Debug.Log("Hit UV: " + hit.UV);

    // 检查鼠标是否点击了网格碰撞体
    if (hit.Collider is MeshCollider meshCollider)
    {
        // 根据命中的面索引读取源几何体三角形
        if (meshCollider.CollisionData.GetModelTriangle(hit.FaceIndex, out var meshBase, out var triangle))
        {
            Debug.Log("Hit mesh: " + (meshBase != null ? meshBase.ModelBase.Path : "<null>"));
            Debug.Log("Hit triangle: " + triangle);

            if (meshBase is Mesh mesh)
            {
                // 访问静态网格数据
                var accessor = new MeshAccessor();
                if (accessor.LoadMesh(mesh))
                {
                    Debug.LogError("Failed to get mesh data");
                    return;
                }

                // 获取命中的三角形数据
                var indexStream = accessor.Index();
                var i0 = indexStream.GetInt((int)triangle * 3 + 0);
                var i1 = indexStream.GetInt((int)triangle * 3 + 1);
                var i2 = indexStream.GetInt((int)triangle * 3 + 2);

                // 使用命中的重心坐标插值三角形的法线
                var normalStream = accessor.Normal();
                var n0 = normalStream.GetFloat3(i0);
                var n1 = normalStream.GetFloat3(i1);
                var n2 = normalStream.GetFloat3(i2);
                MeshAccessor.UnpackNormal(ref n0);
                MeshAccessor.UnpackNormal(ref n1);
                MeshAccessor.UnpackNormal(ref n2);
                var n = n0 * (1.0f - hit.UV.X - hit.UV.Y) + n1 * hit.UV.X + n2 * hit.UV.Y;

                // 将网格数据转换到世界空间
                var positionStream = accessor.Position();
                n = Vector3.Normalize(n);
                var t = hit.Collider.Transform;
                n = t.TransformDirection(n);
                var p0 = t.LocalToWorld(positionStream.GetFloat3(i0));
                var p1 = t.LocalToWorld(positionStream.GetFloat3(i1));
                var p2 = t.LocalToWorld(positionStream.GetFloat3(i2));

                // 显示命中的几何体法线和三角形
                DebugDraw.DrawTriangle(p0, p1, p2, Color.Green.AlphaMultiplied(0.5f), 10000);
                DebugDraw.DrawLine(hit.Point, hit.Point + n * 30.0f, Color.Red, 10000);
            }
        }
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Core/Log.h"
#include "Engine/Input/Input.h"
#include "Engine/Physics/Physics.h"
#include "Engine/Level/Actors/Camera.h"
#include "Engine/Physics/Colliders/MeshCollider.h"
#include "Engine/Graphics/Models/MeshAccessor.h"
#include "Engine/Debug/DebugDraw.h"

void MyScript::OnUpdate() override
{
    // 尝试用鼠标点击来命中某个物体
    if (!Input::GetMouseButtonDown(MouseButton::Left))
        return;
    auto pos = Input::GetMousePosition();
    auto ray = Camera::GetMainCamera()->ConvertMouseToRay(pos);
    RayCastHit hit;
    if (!Physics::RayCast(ray.Position, ray.Direction, hit))
        return;

    LOG(Info, "Hit UV: {}", hit.UV);

    // 检查鼠标是否点击了网格碰撞体
    if (const auto* meshCollider = Cast<MeshCollider>(hit.Collider))
    {
        // 根据命中的面索引读取源几何体三角形
        MeshBase* meshBase;
        uint32 triangle;
        if (meshCollider->CollisionData->GetModelTriangle(hit.FaceIndex, meshBase, triangle))
        {
            LOG(Info, "Hit mesh: {}", meshBase ? meshBase->GetModelBase()->GetPath() : TEXT("<null>"));
            LOG(Info, "Hit triangle: {}", triangle);

            if (auto* mesh = Cast<Mesh>(meshBase))
            {
                // 访问静态网格数据
                MeshAccessor accessor;
                if (accessor.LoadMesh(mesh))
                {
                    LOG(Error, "Failed to get mesh data");
                    return;
                }

                // 获取命中的三角形数据
                auto indexStream = accessor.Index();
                auto i0 = indexStream.GetInt(triangle * 3 + 0);
                auto i1 = indexStream.GetInt(triangle * 3 + 1);
                auto i2 = indexStream.GetInt(triangle * 3 + 2);

                // 使用命中的重心坐标插值三角形的法线
                auto normalStream = accessor.Normal();
                auto n0 = normalStream.GetFloat3(i0);
                auto n1 = normalStream.GetFloat3(i1);
                auto n2 = normalStream.GetFloat3(i2);
                MeshAccessor::UnpackNormal(n0);
                MeshAccessor::UnpackNormal(n1);
                MeshAccessor::UnpackNormal(n2);
                auto n = n0 * (1.0f - hit.UV.X - hit.UV.Y) + n1 * hit.UV.X + n2 * hit.UV.Y;

                // 将网格数据转换到世界空间
                auto positionStream = accessor.Position();
                n = Vector3::Normalize(n);
                auto t = hit.Collider->GetTransform();
                n = Vector3::Transform(n, t.Orientation);
                auto p0 = t.LocalToWorld(positionStream.GetFloat3(i0));
                auto p1 = t.LocalToWorld(positionStream.GetFloat3(i1));
                auto p2 = t.LocalToWorld(positionStream.GetFloat3(i2));

                // 显示命中的几何体法线和三角形
                DEBUG_DRAW_TRIANGLE(p0, p1, p2, Color::Green.AlphaMultiplied(0.5f), 10000, true);
                DEBUG_DRAW_LINE(hit.Point, hit.Point + n * 30.0f, Color::Red, 10000, true);
            }
        }
    }
}
```
***
