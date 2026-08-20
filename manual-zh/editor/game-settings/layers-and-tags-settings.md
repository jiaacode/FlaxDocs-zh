# 层与标签设置

每个 Actor 都可以拥有一个游戏标签，并分配给一个层。
使用标签和层有助于识别和过滤对象。
例如，玩家 Actor 可以有一个 `Player` 标签，当连接到汽车的盒体触发器在范围内检测到它时，可以允许玩家进入汽车。

Flax 允许定义无限数量的[标签](../../scripting/advanced/tags.md)和最多 32 个不同的层。

层也被物理引擎用于过滤对象碰撞，并被渲染系统用于使用层遮罩过滤器绘制对象。

## 设置 Actor 标签/层

![设置 Actor 层](/manual/media/actor-layer-tag.jpg)

你可以为每个 Actor 分配一个游戏标签和层。
这可以在编辑器内（使用 *属性* 窗口）完成，也可以在运行时使用 [Actor.Layer](https://docs.flaxengine.com/api/FlaxEngine.Actor.html#FlaxEngine_Actor_Layer) 和 [Actor.Tags](https://docs.flaxengine.com/api/FlaxEngine.Actor.html#FlaxEngine_Actor_Tags) 属性完成。

## 属性

![Flax 层与标签设置](/manual/media/layers-and-tags-settings.png)

| 属性     | 描述            |
| -------- | --------------- |
| **标签** | 游戏标签集合。  |
| **层**   | 32 个层的数组。 |

> [!NOTE]
> 如果你编辑了标签/层名称，需要重启编辑器才能看到更改。
