# 关节

![关节](/manual/media/joints.gif)

**关节** Actor 用于连接两个刚体（也支持角色控制器）。
例如，通过使用距离关节，你可以在两个对象之间创建弹簧连接。通过使用铰链关节，你可以创建一扇门。

要使关节生效，你需要将其作为子级添加到第一个刚体，并将第二个刚体链接到 **目标** 属性。关节在施加一定力后会断开。已断开的关节不再使用，应将其从游戏中移除。

## 本节内容

* [固定关节](fixed-joint.md)
* [距离关节](distance-joint.md)
* [铰链关节](hinge-joint.md)
* [滑动关节](slider-joint.md)
* [球形关节](spherical-joint.md)
* [D6 关节](d6-joint.md)
