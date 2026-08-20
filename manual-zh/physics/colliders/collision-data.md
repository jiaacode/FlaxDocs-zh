# 碰撞数据

![碰撞数据](/manual/media/collision-data.jpg)

**碰撞数据** 资源包含生成的网格碰撞数据，在运行时由[网格碰撞体](mesh-collider.md)使用。
它支持**凸包网格**和**三角形网格**数据。

## 创建碰撞数据

要创建新的碰撞数据资源，请使用 *内容* 窗口。在 Content 目录中右键单击，然后选择选项 **新建 -> 物理 -> 碰撞数据**。然后指定名称并按 *Enter* 确认。

![新建碰撞数据](/manual/media/new-collision-data.jpg)

现在打开资源（双击它），并分配要用于碰撞体形状的模型（设置 **模型** 属性）。然后按下 **生成** 按钮。

![碰撞数据](/manual/media/collision-data2.jpg)

## 属性

| 属性              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| **类型**          | 碰撞数据类型。                                               |
| **模型**          | 用于生成碰撞网格的源模型。将使用所选 LOD 中的所有网格。      |
| **模型 LOD 索引** | 源模型 LOD 索引。                                            |
| **凸包标志**      | 凸包网格生成标志。请参阅 [ConvexMeshGenerationFlags](https://docs.flaxengine.com/api/FlaxEngine.ConvexMeshGenerationFlags.html) 以了解更多信息。 |
| **顶点限制**      | 凸包网格顶点限制。使用范围在 [8;255] 内的值。                |

### 碰撞数据类型

Flax 允许你为碰撞数据生成凸包网格或三角形网格。

#### 凸包

凸包网格是 3D 对象的简化表示，其中所有内角都小于 `180` 度。这种简化产生的网格具有统一的形状，特别适合某些碰撞场景。

![凸包碰撞体](/manual/media/convex.png)

#### 三角形网格

三角形网格是 3D 对象更详细的表示，由相互连接的三角形组成。这种网格类型能够精确表示复杂和凹形形状，使其对精确碰撞很有价值（以性能为代价）。

![三角形网格碰撞体](/manual/media/triangle-mesh.png)

三角形网格提供了更多的精细度，能更好地表示网格，但这是有代价的：
- 在内存和计算方面都更昂贵。
- **三角形网格不能与刚体一起使用**。这意味着它们只能用于与其他对象碰撞。

## 从代码创建碰撞数据

Flax 支持使用 C# 脚本（通过编辑器插件）在编辑器中创建大多数资源类型。碰撞数据资源也是如此。以下是一个生成资源的示例代码：

```cs
// 为现有模型资源生成碰撞数据
var path = "Content/MyModel";
var model = Content.LoadAsync<Model>(path);
FlaxEditor.Editor.CookMeshCollision(path + "_Collision", CollisionDataType.ConvexMesh, model);
```

***

> [!TIP]
> 调用碰撞数据生成时，请确保在单独的线程上或通过异步作业调用，以免阻塞游戏线程。

如果你的游戏在运行时生成几何体，并且你需要为虚拟模型使用碰撞，则可以在物理设置中启用选项 **支持运行时生成**（请参阅[物理设置](../physics-settings.md)），并使用以下代码创建虚拟碰撞数据资源：

```cs
var collisionData = Content.CreateVirtualAsset<CollisionData>();
collisionData.CookCollision(CollisionDataType.TriangleMesh, myModel);
```

***
