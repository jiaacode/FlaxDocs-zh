# 使用资源

资源几乎被引擎的所有部分使用。
模型 Actor 需要材质和 3D 模型资源来绘制几何体，环境探针需要立方体贴图纹理来用于反射渲染，等等。
每个资源都由其自己的 **唯一 ID** 标识。
这意味着你可以在 Content 工作区中重命名和移动资源，而不受限制。
此外，如果你在脚本中引用资源，只有资源 ID 会被序列化以保持链接。

## 使用资源

在编辑器中，大多数情况下，只需将资源拖放到资源选择器控件中即可使用。

![应用材质](../../graphics/materials/media/apply-material-2.jpg)

某些资源类型（模型、材质等）支持直接拖放到编辑器视口中。
例如，如果你将模型拖放到场景中，它将生成一个静态模型实例。
你还可以将材质或材质实例拖放到模型上以设置其材质。

![应用材质](../../graphics/materials/media/apply-material-1.jpg)

## 资源选择器

资源引用可以在编辑器中使用 **资源选择器** 进行修改。此控件允许预览资源缩略图、在 *内容* 窗口中选择资源或清除引用。如果你双击资源图标，它将打开该资源类型的默认编辑器。你也可以使用资源选择器将资源引用拖放到其他选择器中。
![应用材质](../../graphics/materials/media/apply-material-3.jpg)

某些资源选择器较小，以降低 UI 复杂性：

![小型选择器](/manual/media/small-settings.jpg)

## 脚本中的资源

所有资源类型也可以在 C# 脚本中于运行时使用。例如，在脚本中声明一个公共字段并使用该值。

```cs
public class SetMaterial : Script
{
    [Tooltip("要分配给模型的材质")]
    public Material Material;

    public override void OnStart()
    {
        Actor.As<StaticModel>().SetMaterial(0, Material);
    }
}
```

***
