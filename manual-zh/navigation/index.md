# 导航

![导航](/manual/media/navmesh-agent.gif)

Flax 提供了可用于各种类型游戏的导航和寻路工具。你可以使用导航系统来控制 AI 角色和其他对象如何在不撞墙和避开障碍物的情况下在游戏环境中导航。

## 导航网格

![导航网格](/manual/media/navmesh-dynamic-rebuild.gif)

导航网格（缩写为 navmesh）是多边形表面，用于定义场景的“可行走”区域。它们用于查询路径，以便对象在游戏关卡中导航。
Flax 支持运行时生成的导航网格和在编辑器中预构建的导航网格。导航网格构建过程是异步的，不会阻塞游戏逻辑线程。也支持进度报告。

在底层，导航网格被分割为每个场景存储的图块。当游戏加载给定场景时，引擎会将导航网格图块流式传输到一个大的 Nav Mesh 对象中，该对象用于执行包括寻路在内的导航查询。这允许将巨大的世界拆分为更小的场景，并在运行时流式传输它们，同时导航代理仍将以正确的方式工作。

## 查询和寻路

导航系统通过 C# API 公开了用于执行导航查询的统一 API。以下是一个示例脚本，用于查找父对象位置附近的最近导航网格墙壁。

```cs
public class TestFindDistanceToWall : Script
{
    public override void OnUpdate()
    {
        if (Navigation.FindDistanceToWall(Actor.Position, out var hit))
        {
            DebugDraw.DrawCircle(Actor.Position, Vector3.Up, hit.Distance, Color.Red);
            DebugDraw.DrawLine(hit.Position, hit.Position + hit.Normal * 150.0f, Color.BlueViolet);
        }
    }
}
```

***

## 本节内容

* [导航网格边界体积](nav-mesh-bounds-volume.md)
* [导航链接](nav-link.md)
* [导航人群](nav-crowd.md)
* [导航修改器体积](nav-modifier-volume.md)
* [导航设置](navigation-settings.md)

## 教程

* [如何创建导航网格](tutorials/create-navmesh.md)
* [如何创建路径跟随 Agent](tutorials/path-following.md)
