# 操作指南：创建预制体

在本教程中，你将学习如何创建新的预制体资源。请按照说明查看如何操作。在 Flax 中，有 3 种主要方式来创建预制体资源。使用最适合你工作流程的方式。

## 新建预制体

创建一个空预制体的最简单方法是使用 *内容窗口*。**右键单击** 并选择选项 **新建 -> 预制体**。然后双击并编辑你的新资源。

![新建预制体资源](media/new-prefab1.png)

## 拖放

创建新预制体资源的另一种方法是使用现有的 Actor 作为原型。为此，只需在场景中选择你想要转换为预制体的 Actor，并将其拖放到 *内容窗口* 中。指定其名称并按回车确认。然后双击并编辑你的新资源。

![新建预制体资源](media/new-prefab2.png)

## 从代码创建

最后一种创建新预制体的方法是使用编辑器脚本，通过 C# 或 C++ 创建新的预制体资源。

# [C#](#tab/code-csharp)
```cs
// 设置预制体对象
var myLight = new PointLight
{
    Color = Color.Red
};

new Decal
{
    Parent = myLight
};

// 创建预制体
PrefabManager.CreatePrefab(myLight, StringUtils.CombinePaths(Globals.ProjectContentFolder, "myPrefab.prefab"), false);
```
***

# [C++](#tab/code-cpp)

```cpp
// 设置预制体对象
PointLight* myLight = New<PointLight>();
myLight->SetName(TEXT("PointLight"));
myLight->Color = Color::Red;

Decal* myDecal = New<Decal>();
myDecal->SetName(TEXT("Decal"));
myDecal->SetParent(myLight);

// 创建预制体
PrefabManager::CreatePrefab(myLight, Globals::ProjectContentFolder / TEXT("myPrefab.prefab"), false);
```
***
