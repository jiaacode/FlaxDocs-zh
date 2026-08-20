# 物理模拟

![物理](media/boxes.gif)

Flax 引擎提供**实时物理模拟**，包括碰撞、重力和其他力。
使用内置的物理引擎有助于为游戏对象创建逼真的行为。本节将解释物理 Actor 如何工作，如何将它们添加到你的游戏中，以及如何在 C#、C++ 和可视化脚本中使用它们。

**Flax 使用 PhysX 5.1** 物理引擎来驱动其物理模拟计算并执行所有碰撞计算。PhysX 提供了执行精确碰撞检测以及模拟世界中对象之间物理交互的能力。

## 本节内容

* [碰撞体](colliders/index.md)
 * [盒体碰撞体](colliders/box-collider.md)
 * [球体碰撞体](colliders/sphere-collider.md)
 * [胶囊碰撞体](colliders/capsule-collider.md)
 * [网格碰撞体](colliders/mesh-collider.md)
   * [碰撞数据](colliders/collision-data.md)
* [刚体](rigid-bodies.md)
* [角色控制器](character-controller.md)
* [触发器](triggers.md)
* [关节](joints/index.md)
  * [固定关节](joints/fixed-joint.md)
  * [距离关节](joints/distance-joint.md)
  * [铰链关节](joints/hinge-joint.md)
  * [滑动关节](joints/slider-joint.md)
  * [球形关节](joints/spherical-joint.md)
  * [D6 关节](joints/d6-joint.md)
* [射线投射](raycasting.md)
* [碰撞](collisions.md)
* [物理材质](physical-material.md)
* [物理设置](physics-settings.md)
* [载具](vehicles.md)
* [布娃娃系统](ragdolls.md)
* [布料](cloth.md)

## 教程

* [如何创建弹跳球](tutorials/bouncing-ball.md)
* [如何使用触发器](tutorials/use-trigger.md)
* [如何在不同表面上播放脚步声](tutorials/footsteps.md)
