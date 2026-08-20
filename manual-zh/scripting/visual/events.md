# 可视化脚本中的事件

**可视化脚本** 支持对各种事件的绑定，以便更轻松地进行游戏脚本编写。请参阅本文档页面，了解如何在项目中使用它们。

## 如何处理触发事件？

在创建可视化脚本后，使用 **Bind XXX** 节点为事件注册自定义函数，该函数将在每次事件被调用时执行。Flax 支持将成员或静态函数注册到成员和静态事件。

首先，**重写 OnEnable** 方法。

![在可视化脚本中重写 OnEnable 方法](/manual/media/override-on-enable.png)

然后使用 **Script** 类中的 **Get Actor** 节点和 **Cast** 节点，将其转换为 **PhysicsColliderActor**。

![将 Actor 转换为 PhysicsCollider Actor](/manual/media/cast-actor-to-collder.png)

现在，添加 **Bind TriggerEnter** 方法并将其连接到 Cast 输出。我们将使用它来为触发碰撞体注册，以便每次有对象进入触发器时调用我们的函数。

![绑定触发进入事件](/manual/media/bind-trigger-enter.png)

如你所见，它显示处理函数下拉菜单为禁用状态，这意味着图上没有可用于事件调用的有效函数。让我们 **使用红色按钮** 快速创建一个新的事件处理函数，并在该绑定节点中使用它。

![添加触发事件处理函数](/manual/media/add-trigger-event-handler.gif)

之后，你可以使用此函数在每次此碰撞体被触发时执行任何自定义逻辑。在此示例中，我们只需打印一条自定义消息，其中包含激活触发器的对象名称。

![事件处理函数](/manual/media/event-trigger-handler.png)

最后，我们可以测试这个脚本。创建一个碰撞体（例如盒体碰撞体），调整其大小并勾选 **Is Trigger**，然后向我们创建的它添加脚本。

![触发事件设置](/manual/media/event-trigger-setup.png)

然后你可以 **运行游戏**，当有对象进入此触发器时，查看日志打印。

![触发事件展示](/manual/media/vs-trigger-event-showcase.gif)

> [!Tip]
> 你可以使用 **Unbind XXX** 节点手动从事件中取消注册函数。此外，当脚本被删除时，Flax 将自动取消注册事件。
