# 操作指南：生成程序化模型

![模型](/manual/media/sample-model-1.jpg)

在本教程中，你将学习如何创建一个简单的二十面体网格。

此示例使用 C# API 方法 [Content.CreateVirtualAsset<T>](http://docs.flaxengine.com/api/FlaxEngine.Content.html#FlaxEngine_Content_CreateVirtualAsset__1) 生成一个程序化模型资源，该资源可以在运行时从代码进行修改。

## 网格访问器

在编辑大型模型或在执行实时网格编辑时，使用 `MeshAccessor` 可为顶点元素提供健壮的逐组件访问。它支持各种数据格式（包括打包的 `R10G10B10A2` 等），并在向量或标量值之间进行自动转换。

## 教程

### 1. 创建新的 C# 脚本 `ModelGenerator`

### 2. 编写网格数据生成函数

```cs
private void UpdateMesh(Mesh mesh)
{
    const float X = 0.525731112119133606f;
    const float Z = 0.850650808352039932f;
    const float N = 0.0f;
    var vertices = new[]
    {
        new Float3(-X, N, Z),
        new Float3(X, N, Z),
        new Float3(-X, N, -Z),
        new Float3(X, N, -Z),
        new Float3(N, Z, X),
        new Float3(N, Z, -X),
        new Float3(N, -Z, X),
        new Float3(N, -Z, -X),
        new Float3(Z, X, N),
        new Float3(-Z, X, N),
        new Float3(Z, -X, N),
        new Float3(-Z, -X, N)
    };
    var triangles = new[]
    {
        1, 4, 0, 4, 9, 0, 4, 5, 9, 8, 5, 4,
        1, 8, 4, 1, 10, 8, 10, 3, 8, 8, 3, 5,
        3, 2, 5, 3, 7, 2, 3, 10, 7, 10, 6, 7,
        6, 11, 7, 6, 0, 11, 6, 1, 0, 10, 1, 6,
        11, 0, 9, 2, 11, 9, 5, 2, 9, 11, 2, 7
    };
    mesh.UpdateMesh(vertices, triangles, vertices);
}
```

***

### 3.在 `OnStart` 函数中创建模型资源和模型 Actor

```cs
private Model _model;

public MaterialBase Material;

public override void OnStart()
{
    // 创建具有单个 LOD 且包含一个网格的动态模型
    _model = Content.CreateVirtualAsset<Model>();
    _model.SetupLODs(new[] { 1 });
    UpdateMesh(_model.LODs[0].Meshes[0]);

    // 创建或重用子模型
    var childModel = Actor.GetOrAddChild<StaticModel>();
    childModel.Model = _model;
    childModel.LocalScale = new Float3(100);
    childModel.SetMaterial(0, Material);
}

public override void OnDestroy()
{
    FlaxEngine.Object.Destroy(ref _model);
}
```

***

请记住处置所有在运行时创建的资源，以防止内存泄漏。

### 4. 添加脚本并设置材质

![模型](/manual/media/sample-model-2.jpg)

### 5. 查看结果

![模型](/manual/media/sample-model-1.jpg)
