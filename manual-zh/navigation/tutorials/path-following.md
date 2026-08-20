# 操作指南：创建路径跟随代理

在本教程中，你将学习如何实现一个简单的脚本，该脚本使用寻路功能将对象移动穿过场景到达目标位置。

## 1. 设置场景

首先，你需要准备关卡，设置导航网格和要移动的对象（我们的代理）。

![示例场景](media/sample-scene.jpg)

## 2. 创建代理逻辑脚本

创建并实现以下脚本：

```cs
public class Agent007 : Script
{
    /// <summary>
    /// 要跟随的目标对象。
    /// </summary>
    public Actor MoveToTarget;

    /// <summary>
    /// 移动 Actor 时应用于其位置的偏移量。
    /// </summary>
    public Vector3 Offset = new Vector3(0, 100, 0);

    /// <summary>
    /// 代理移动速度（单位/秒）。
    /// </summary>
    public float Speed = 500.0f;

    private Vector3 _targetPos;
    private Vector3[] _path;
    private float _pathLength;
    private float _pathPosition;

    /// <inheritdoc />
    public override void OnUpdate()
    {
        if (!MoveToTarget)
        {
            Debug.LogError("No target to move.");
            return;
        }

        var currentPos = Actor.Position;
        var targetPos = MoveToTarget.Position;

        // 检查是否到达目标位置
        if (Vector3.Distance(ref currentPos, ref targetPos) < 2)
            return;

        // 检查是否需要构建新路径
        if (targetPos != _targetPos)
        {
            _targetPos = targetPos;
            _pathPosition = 0;
            _pathLength = 0;
            if (!Navigation.FindPath(currentPos, targetPos, out _path))
            {
                Debug.LogWarning("Failed to find path to the target.");
                return;
            }

            // 将起点/终点移动到导航网格地面
            if (_path.Length != 0)
                Navigation.FindClosestPoint(_path[0], out _path[0]);
            if (_path.Length > 1)
                Navigation.FindClosestPoint(_path[_path.Length - 1], out _path[_path.Length - 1]);

            // 计算路径长度
            for (int i = 1; i < _path.Length; i++)
                _pathLength += Vector3.Distance(ref _path[i - 1], ref _path[i]);
        }

        // 如果没有路径则跳过
        if (_path == null)
            return;

        // 移动
        var pathProgress = Mathf.Min(_pathLength * _pathPosition + Time.DeltaTime * Speed, _pathLength);
        _pathPosition = pathProgress / _pathLength;

        // 计算路径上的位置
        float segmentsSum = 0;
        for (int i = 0; i < _path.Length - 1; i++)
        {
            var segmentLength = Vector3.Distance(ref _path[i], ref _path[i + 1]);
            if (segmentsSum <= pathProgress && segmentsSum + segmentLength >= pathProgress)
            {
                float t = (pathProgress - segmentsSum) / segmentLength;
                targetPos = Vector3.Lerp(_path[i], _path[i + 1], t) + Offset;
                Actor.AddMovement(targetPos - currentPos);
                break;
            }

            segmentsSum += segmentLength;
        }
    }
}
```

***

## 3. 将脚本添加到对象并链接 `Move To Target`

![设置代理](media/setup-agent.jpg)

## 4. 查看结果

最后，只需按下 **播放**（或按 *F5*）即可看到你的机器人穿过场景移动。

![移动中的机器人](../media/navmesh-agent.gif)
