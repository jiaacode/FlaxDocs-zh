# 操作指南：使用触发器

![触发器](../media/triggers.gif)

在本教程中，你将学习如何创建并使用盒体触发器，在玩家进入触发器区域时切换灯光颜色。

请参阅[触发器](../triggers.md)页面以了解有关触发器的更多信息。

## 1. 创建灯光

首先，我们需要生成一个点光源（也可以是其他类型的光源），并将其放置在关卡中触发器附近的某个位置。这样玩家就可以看到灯光颜色的变化。

![生成灯光](/manual/media/spawnlight-trigger-2.jpg)

## 2. 创建碰撞体

从 *工具箱* 窗口（*物理* 部分）拖放 **盒体碰撞体**，并调整其形状以匹配所需的区域。

![创建碰撞体](/manual/media/create-trigger-step-1.jpg)

## 3. 勾选 `Is Trigger`

创建的盒体碰撞体会阻挡对象并产生碰撞。我们只想获取其他对象进入此体积时的事件，因此将 **Is Trigger** 标志设置为 `true`。

![是触发器](../media/set-trigger.jpg)

## 4. 创建脚本

下一步是编写一个 C# 脚本（将其命名为 `TriggerSample`）。它将处理触发器事件并实现所需的逻辑。要了解有关创建脚本的更多信息，请参阅[此页面](../../scripting/new-script.md)。

```cs
public class TriggerSample : Script
{
    [Serialize]
    private bool _lightOn;

    public Light LightToControl;

    [NoSerialize]
    public bool LightOn
    {
        get { return _lightOn; }
        set
        {
            _lightOn = value;
            if (LightToControl)
                LightToControl.Color = value ? Color.Green : Color.Red;
        }
    }

    public override void OnStart()
    {
        // 恢复状态
        LightOn = _lightOn;
    }
    
    public override void OnEnable()
    {
        // 注册事件
        Actor.As<Collider>().TriggerEnter += OnTriggerEnter;
        Actor.As<Collider>().TriggerExit += OnTriggerExit;
    }
    
    public override void OnDisable()
    {
        // 取消注册事件
        Actor.As<Collider>().TriggerEnter -= OnTriggerEnter;
        Actor.As<Collider>().TriggerExit -= OnTriggerExit;
    }

    void OnTriggerEnter(PhysicsColliderActor collider)
    {
        // 检查是否为玩家
        if (collider is CharacterController)
        {
            LightOn = true;
        }
    }

    void OnTriggerExit(PhysicsColliderActor collider)
    {
        // 检查是否为玩家
        if (collider is CharacterController)
        {
            LightOn = false;
        }
    }
}
```

***

## 5. 设置脚本

将脚本添加到创建的盒体碰撞体上，并附加对灯光的引用（编辑 **LightToControl** 属性）。
你也可以使用 **LightOn** 复选框来测试它是否有效。

![设置脚本](/manual/media/setup-scripttrigger-3.jpg)

## 6. 测试！

点击 **播放** 按钮，让你的玩家角色进入触发器区域，即可看到灯光颜色发生变化。

![触发器](../media/triggers.gif)
