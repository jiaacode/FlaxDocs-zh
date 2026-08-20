# 导航人群

**导航人群** 是一组代理的导航转向行为系统。它通过自适应的 RVO 采样计算来处理代理之间的规避。它可以用于使用导航网格实现人群的自动规避和移动。

下面你可以看到[简单路径跟随代理](tutorials/path-following.md)与使用 `NavCrowd` 的代理之间的区别示例。

| 之前                                         | 之后                                        |
| -------------------------------------------- | ------------------------------------------- |
| ![无人群](/manual/media/nav-agents-crowd-before.gif) | ![有人群](/manual/media/nav-agents-crowd-before.gif) |

## 设置

创建用于管理人群的游戏系统（作为 `GamePlugin`）。

```cs
/// <summary>
/// 使用 <see cref="FlaxEngine.NavCrowd"/> 的导航代理人群系统。
/// </summary>
public class CrowdSystem : GamePlugin
{
    private NavCrowd _crowd;
    private CrowdTaskGraphSystem _system;

    /// <summary>
    /// 人群代理的最大数量（同时）。
    /// </summary>
    public int MaxAgents = 25;

    internal void AddAgent(Agent007 agent)
    {
        if (_crowd == null)
        {
            // 延迟初始化
            _crowd = new NavCrowd();
            if (_crowd.Init(agent.Properties, MaxAgents))
                throw new Exception("Failed to initialize crowd");
            if (_system == null)
                Engine.UpdateGraph.AddSystem(_system = new CrowdTaskGraphSystem { System = this });
        }

        // 将代理添加到人群中
        agent.AgentID = _crowd.AddAgent(agent.Actor.Position, agent.Properties);
        if (agent.AgentID == -1)
            throw new Exception("Failed to add agent to the crowd");
        agent.Crowd = _crowd;
    }

    internal void RemoveAgent(Agent007 agent)
    {
        // 从人群中移除代理
        _crowd.RemoveAgent(agent.AgentID);
        agent.Crowd = null;
        agent.AgentID = -1;
    }

    /// <inheritdoc />
    public override void Deinitialize()
    {
        // 清理
        Engine.UpdateGraph.RemoveSystem(_system);
        FlaxEngine.Object.Destroy(ref _system);
        FlaxEngine.Object.Destroy(ref _crowd);

        base.Deinitialize();
    }
    
    /// <summary>
    /// 在异步作业期间更新人群的自定义任务图系统。
    /// </summary>
    private sealed class CrowdTaskGraphSystem : TaskGraphSystem
    {
        internal CrowdSystem System;

        /// <inheritdoc />
        public override void Execute(TaskGraph graph)
        {
            // 调度异步作业以更新人群
            graph.DispatchJob(UpdateJob);
        }

        private void UpdateJob(int i)
        {
            // 更新人群模拟
            System._crowd.Update(Time.DeltaTime);
        }
    }
}
```

***

创建将附加到 Actor（例如 `CharacterController`）的路径跟随代理脚本。

```cs
public class Agent007 : Script
{
    internal NavCrowd Crowd = null;
    internal int AgentID = -1;
    private Vector3 _targetPos;

    /// <summary>
    /// 要跟随的目标对象。
    /// </summary>
    public Actor MoveToTarget;

    /// <summary>
    /// 移动 Actor 时应用于其位置的偏移量。
    /// </summary>
    public Vector3 Offset = new Vector3(0, 100, 0);

    /// <summary>
    /// 代理属性。
    /// </summary>
    public NavAgentProperties Properties = new NavAgentProperties
    {
        Radius = 34.0f,
        Height = 144.0f,
        StepHeight = 35.0f,
        MaxSlopeAngle = 60.0f,
        MaxSpeed = 500.0f,
        CrowdSeparationWeight = 2.0f,
    };

    /// <inheritdoc />
    public override void OnEnable()
    {
        // 注册
        PluginManager.GetPlugin<CrowdSystem>().AddAgent(this);
    }

    /// <inheritdoc />
    public override void OnDisable()
    {
        // 取消注册
        PluginManager.GetPlugin<CrowdSystem>().RemoveAgent(this);
    }

    /// <inheritdoc />
    public override void OnUpdate()
    {
        if (!MoveToTarget || !Crowd)
            return;
        var currentPos = Actor.Position;
        var targetPos = MoveToTarget.Position;

        // 检查是否需要更改目标位置
        if (targetPos != _targetPos)
        {
            _targetPos = targetPos;
            Crowd.SetAgentMoveTarget(ID, targetPos);
        }

        // 更新代理位置（由 NavCrowd 计算）
        targetPos = Crowd.GetAgentPosition(ID) + Offset;
        Actor.AddMovement(targetPos - currentPos);
    }
}
```

***

如你所见，代理逻辑比[路径跟随示例](tutorials/path-following.md)更直接。这是因为你不需要为每个代理手动查询导航路径。相反，你可以设置每个代理的目标位置（`SetAgentMoveTarget`）或目标速度（`SetAgentMoveVelocity`）来达到目标，而 `NavCrowd` 会自动计算代理的运动。整个人群会同时更新（使用模拟增量时间）。在上面的示例中，`TaskGraphSystem` 在作业系统上异步执行人群计算（了解更多[此处](../scripting/advanced/multithreading.md)）。
