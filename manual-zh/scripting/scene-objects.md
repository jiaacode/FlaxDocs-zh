# 访问场景对象

脚本最重要的功能之一，就是能够与场景中的其他对象进行交互和访问，当然也包括脚本所附加的 Actor。例如，如果游戏需要在玩家前方生成一个球，就需要获取玩家的位置和视线方向，这可以通过 [Flax](https://github.com/FlaxEngine/FlaxEngine) 提供的 API 来实现。

## 访问 Actor

每个脚本都自带 `Actor` 属性，指向脚本所附加的 Actor。例如，你可以用它来每帧修改 Actor 的位置：

# [C#](#tab/code-csharp)
```cs
public override void OnFixedUpdate()
{
	Actor.Position += new Vector3(0, 2, 0);
}
```
***

# [C++](#tab/code-cpp)

```cpp
void ScriptExample::OnFixedUpdate()
{
    GetActor()->SetPosition(GetActor()->GetPosition() + Vector3(0, 2, 0));
}
```
***

你也可以打印它的名称：

# [C#](#tab/code-csharp)
```cs
Debug.Log(Actor.Name);
```
***

# [C++](#tab/code-cpp)

```cpp
DebugLog::Log(GetActor()->GetName());
```
***

请参阅 [Actor](https://docs.flaxengine.com/api/FlaxEngine.Actor.html) 类参考以了解更多信息。

你还可以打印所有子 Actor 并旋转父 Actor：

# [C#](#tab/code-csharp)
[!code-csharp[Example1](code-examples/scene-objects.cs)]
# [C++](#tab/code-cpp)
[!code-cpp[Example2](code-examples/scene-objects.h)]
***

***

## 访问其他脚本

附加到 Actor 的脚本可以使用专用方法像 Actor 一样查询：

# [C#](#tab/code-csharp)
```cs
private void OnTriggerEnter(Collider collider)
{
    // Deal damage to the player when enters the trigger
    var player = collider.GetScript<Player>();
    if (player)
        player.DealDamage(10);
}
```
# [C++](#tab/code-cpp)
```cpp
void ScriptExample::OnTriggerEnter(Collider* collider)
{
    // Deal damage to the player when enters the trigger
    auto player = collider->GetScript<Player>();
    if (player)
        player->DealDamage(10);
}
```
***

你还可以查询任何 Actor 的所有脚本，并使用它们执行任何操作：

# [C#](#tab/code-csharp)
```cs
private void OnTriggerEnter(Collider collider)
{
    foreach (var provider in collider.GetScripts<IAdProvider>())
       provider.ShowAd();
}
```
# [C++](#tab/code-cpp)
```cpp
void ScriptExample::OnTriggerEnter(Collider* collider)
{
    for each (auto provider in collider->GetScripts<IAdProvider>())
        provider.ShowAd();
}
```
***

## 查找 Actor

Flax 实现了查找对象的 API。

# [C#](#tab/code-csharp)
```cs
private void OnTriggerLeave(Collider collider)
{
    var obj = Actor.Scene.FindActor("Spaceship");
    Destroy(obj);
}
```
***

# [C++](#tab/code-cpp)

```cpp
void ScriptExample::OnTriggerLeave(Collider* collider)
{
    auto obj = GetActor()->GetScene()->FindActor(TEXT("Spaceship"));
    obj->DeleteObject();
}
```
***

然而，在大多数情况下，最好的解决方案是公开一个带有对象引用的字段，并在编辑器中设置它以提高游戏性能。

# [C#](#tab/code-csharp)
```cs
public Actor Spaceship;

private void OnTriggerLeave(Collider collider)
{
    Destroy(ref Spaceship);
}
```
***

# [C++](#tab/code-cpp)

```cpp
//.h
API_FIELD()
ScriptingObjectReference<Actor> Spaceship;

//.cpp
void ScriptExample::OnTriggerLeave(Collider* collider)
{
    CHECK(Spaceship);
    Spaceship->DeleteObject();
}
```
***
