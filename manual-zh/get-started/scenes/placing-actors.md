# 放置 Actor

创建场景后，您需要向其中添加 Actor 并构建游戏关卡。有多种方法可以创建新对象。

## 使用工具箱放置 Actor

![Toolbox Window](media/toolbox-win.jpg)

添加新 Actor 最简单的方法是使用处于 *添加模式* 的 *Toolbox* 窗口。
只需选择 Actor 类型类别，然后将其拖放到场景中即可。

![Toolbox Spawn Actor](media/toolbox-spawn.jpg)

## 使用上下文菜单放置 Actor

您也可以使用 *场景* 窗口中的上下文菜单添加新 Actor。在场景或其他 Actor 上右键单击，选择 **新建** 子菜单，然后生成其中一种 Actor 类型。

![Scene Window Spawn Actor](media/context-menu-spawning.jpg)

## 使用拖放放置 Actor

将新模型添加到关卡中的最快方法是使用 *拖放* 功能。通过这种方式，您可以添加模型、预制体、网格碰撞体，甚至场景。

![Drag and Drop Spawn Model](media/drag-drop-spawn-model.jpg)

## 通过代码放置 Actor

您也可以从 C# 代码生成新 Actor。要了解更多信息，请参阅 [脚本](../../scripting/index.md) 文档。

```cs
var light = new PointLight();
light.Color = Color.Blue;
light.Parent = Actor;
```

***

## 下一步

<div class="frontpage">

<div class="frontpage-section">
<a href="selecting-actors.md"><img src="media/selecting-actors-icon.jpg"></a>
<h3><a href="selecting-actors.md">选择 Actor</a></h3>
<p>了解如何在编辑器中选择 Actor。</p>
</div>
</div>
