# 操作指南：创建自定义 Actor 类型

### 1. 创建脚本

Actor 是与 Script 类似的场景对象，可以接收场景图事件，例如 *OnBeginPlay*、*OnEndPlay* 等（请记得在重写 Actor 事件时始终调用基类方法）。在本示例中，我们仅使用一些带有日志记录的虚拟变量来表明 Actor 正常工作。

# [C#](#tab/code-csharp)
```cs
public class MyActor : Actor
{
    public string Label = "Something";

    /// <inheritdoc />
    public override void OnBeginPlay()
    {
        base.OnBeginPlay();

        Debug.Log("Label: " + Label);
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Core/Log.h"
#include "Engine/Level/Actor.h"

API_CLASS() class GAME_API MyActor : public Actor
{
DECLARE_SCENE_OBJECT(MyActor);

    API_FIELD() String Label = TEXT("Something");

    void OnBeginPlay() override
    {
        Actor::OnBeginPlay();

        LOG(Info, "Label: {0}", Label);
    }
};

inline MyActor::MyActor(const SpawnParams& params)
    : Actor(params)
{
}
```
***

# [Visual Script](#tab/code-vs)

新建 Visual Script，并选择 **Actor** 作为基类。然后重写方法（例如 OnBeginPlay），在重写的方法节点上右键单击，选择 **添加基类方法调用** 选项，以确保子 Actor 和脚本能够正确初始化。要以紧凑形式使用 Format 方法，可以右键单击该方法，然后选择 **转换为纯节点**。

![自定义 Actor Visual Script](/manual/media/custom-actor-vs.png)
***

### 2. 使用 Actor

下一步是将 Actor 从 *内容* 窗口拖放到场景或场景树中。您也可以使用 *工具箱* 窗口搜索 Actor 类型并从那里生成它。您还可以在其他脚本中通过代码创建您的 Actor。

### 3. 扩展 Actor

编辑器提供了多种方式来自定义或扩展自定义 Actor 类型。

### Actor 创建实用工具

如果您正在开发第三方 SDK 插件或常用的 Actor 类型，则可以使用 `ActorContextMenu` 属性将其链接到编辑器的场景/预制体编辑器中。

# [C#](#tab/code-csharp)
```cs
[ActorContextMenu("New/My Actor")]
public class MyActor : Actor
{
...
}
```
***

# [C++](#tab/code-cpp)

```cpp
API_CLASS(Attributes="ActorContextMenu(\"New/My Actor\")")
class GAME_API MyActor : public Actor
{
...
};
```
***

# [Visual Script](#tab/code-vs)
### 带图标的 Actor

如果您想为 Actor 附加一个简单的图标，使其在编辑器视口中更加醒目和易用，可以使用如下类似代码：

```cs
using FlaxEngine;
#if FLAX_EDITOR
using FlaxEditor;
using FlaxEditor.SceneGraph;
#endif

public class MyActorType : Actor
{
#if FLAX_EDITOR
    static MyActorType()
    {
        ViewportIconsRenderer.AddCustomIcon(typeof(MyActorType), Content.LoadAsync<Texture>(System.IO.Path.Combine(Globals.ProjectContentFolder, "Path/To/TextureAsset.flax")));
        SceneGraphFactory.CustomNodesTypes.Add(typeof(MyActorType), typeof(MyActorTypeNode));
    }
#endif

    /// <inheritdoc />
    public override void OnEnable()
    {
        base.OnEnable();

#if FLAX_EDITOR
        ViewportIconsRenderer.AddActor(this);
#endif
    }
    
    /// <inheritdoc />
    public override void OnDisable()
    {
#if FLAX_EDITOR
        ViewportIconsRenderer.RemoveActor(this);
#endif

        base.OnDisable();
    }
}

#if FLAX_EDITOR
/// <summary>用于编辑器的自定义 Actor 节点。</summary>
[HideInEditor]
public sealed class MyActorTypeNode : ActorNodeWithIcon
{
    /// <inheritdoc />
    public MyActorTypeNode(Actor actor)
        : base(actor)
    {
    }
}
#endif
```

***
