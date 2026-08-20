# 多线程

Flax 引擎默认在主线程上使用同步执行来运行游戏逻辑，因此在脚本更新事件期间访问其他对象和编辑场景是安全的。然而，许多游戏需要更高级的计算和数据处理。为了提供流畅的性能，游戏逻辑的许多部分可以移到异步执行。

除了通用计算之外，多线程还可用于处理 Flax 对象和引擎内容。有几点限制：
* 编辑游戏对象（Actor、脚本）只能在主线程上完成（例如通过 `Scripting.InvokeOnUpdate(..)`）
* 脚本和 Actor 可以在其他线程上创建和编辑，但添加/移除到游戏逻辑只能在主线程上进行（你可以创建新的 Actor、设置它，然后在主线程上将其添加到场景中）
* 内容可以从其他线程生成，但如果未被游戏逻辑使用（例如生成模型资源，然后在主线程上将其添加到场景中）

关于使用主线程还是自定义任务，没有固定的规则。在大多数情况下，请确保对你的代码进行分析，并在发现瓶颈时进行优化。请记住，引擎内部广泛使用多线程进行内容流式传输、资源加载、物理模拟等。

> [!TIP]
> 要分析异步代码，请使用内置的[性能分析器](../../editor/profiling/profiler.md)或 [Tracy](../../editor/profiling/tracy.md) 性能分析器。

## 同步

多线程编程的关键要素之一是同步。工作提交和结果获取是这方面的重要方面。始终尝试从设计要处理的数据开始来实现你的算法。例如，如果你生成体素地形，则可以在异步中生成几何体，但创建的模型只能在主线程上添加到场景中，然后你可以使用类似这样的方式：`Scripting.InvokeOnUpdate(() => model.Parent = mainScene)`。

你可以在 C# 中使用的同步原语：
* `Semaphore`
* `Mutex`
* `SpinLock`

你可以在 C# 中使用的线程安全并发集合：
* `ConcurrentBag`
* `ConcurrentQueue`
* `ConcurrentDictionary`
* `ConcurrentStack`

## 任务系统

Flax 包含自己的 **任务系统**，引擎使用它来并行化粒子、动画、内容等系统。它也可以被游戏用来并行执行代码。它使得使用多核优化大型数据集的处理更加容易。任务系统每个 CPU 使用一个线程。任务系统的示例用法，它将触发两个异步任务调度，并等待第二个任务完成后再继续。

```cs
using System;
using FlaxEngine;

class JobSystemTest : Script
{
    /// <inheritdoc />
    public override void OnEnable()
    {
        // 在所有 CPU 上异步运行示例任务
        Debug.Log("Start");
        var label = JobSystem.Dispatch(i => Debug.Log($"FactorialRecursion({i + 1}) = {FactorialRecursion(i + 1)}"), 30);
        JobSystem.Wait(label);
        Debug.Log("End");
    }

    public double FactorialRecursion(int number)
    {
        if (number == 1)
            return 1;
        return number * FactorialRecursion(number - 1);
    }
}
```

***

## 任务图

对于需要依赖项并旨在提高 CPU 性能（更好的调度，无间隙）的更高级游戏系统，**任务图**是首选。引擎使用它来并行化动画、粒子、流式传输和其他系统更新，并且可以被游戏代码使用。例如，你可以为游戏创建自己的任务图系统，用于计算 AI 路径或执行玩家可见性检查，或你的项目需要的任何内容。使用任务图的好处是，你的异步任务将与其他任务（包括引擎异步任务）重叠，这比传统的单线程游戏编程提供了显著的性能提升。

**TaskGraph** 是一个基于图的异步任务调度器，用于高性能计算和处理。它包含一个要执行的系统列表。你可以创建自己的图或使用内置图，以与引擎系统共享 CPU。

**TaskGraphSystem** 表示一个系统，可以为异步执行向 Task Graph 生成工作。每个系统都有一个依赖项列表，这些依赖项在运行给定系统之前执行（系统也可以按 *Order* 排序）。在执行之前，所有系统都会收到 `PreExecute` 调用和 `PostExecute` 调用，用于在实际异步执行之前进行自定义数据设置/清理。`Execute` 方法用于通过使用 `graph.DispatchJob`（通过 *任务系统*）来调度异步任务。

以下代码创建了一个自定义的 *Task Graph System*，并将其添加到引擎 *Update* 中以自动调度。

```cs
using System;
using FlaxEngine;

class TaskGraphTest : Script
{
    private class MyGameplaySystem : TaskGraphSystem
    {
        /// <inheritdoc />
        public override void PreExecute(TaskGraph graph)
        {
            Debug.Log("PreExecute");
        }

        /// <inheritdoc />
        public override void Execute(TaskGraph graph)
        {
            // 在所有 CPU 上异步运行示例任务
            graph.DispatchJob(i => Debug.Log($"FactorialRecursion({i + 1}) = {FactorialRecursion(i + 1)}"), 30);
        }

        /// <inheritdoc />
        public override void PostExecute(TaskGraph graph)
        {
            Debug.Log("PostExecute");
        }
    }

    private MyGameplaySystem _system;

    /// <inheritdoc />
    public override void OnEnable()
    {
        _system = new MyGameplaySystem();
        Engine.UpdateGraph.AddSystem(_system);

        // 你可以在引擎系统上添加依赖项，以便在其之后/之前运行异步任务
        //_system.AddDependency(Animations.System);
        //Particles.System.AddDependency(_system);
    }

    /// <inheritdoc />
    public override void OnDisable()
    {
        Engine.UpdateGraph.RemoveSystem(_system);
        Destroy(ref _system);
    }

    static double FactorialRecursion(int number)
    {
        if (number == 1)
            return 1;
        return number * FactorialRecursion(number - 1);
    }
}
```

***

## 异步

引擎提供了多种在单独线程上运行逻辑的方式。最简单的是使用 `async` 和 `await`：

```cs
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using FlaxEngine;

class AsyncTest : Script
{
    private Task _task;

    /// <inheritdoc />
    public override void OnEnable()
    {
        // 启动异步工作
        _task = Task.Run(HandleFileAsync);
    }

    /// <inheritdoc />
    public override void OnDisable()
    {
        // 结束异步工作
        _task.Wait();
    }

    async Task HandleFileAsync()
    {
        Debug.Log("Starting async job from thread: " + Thread.CurrentThread.ManagedThreadId);
        string file = Path.Combine(Globals.ProjectContentFolder, "myFile.txt");
        int count = 0;

        // 读取指定文件（使用异步 StreamReader 方法）
        using (StreamReader reader = new StreamReader(file))
        {
            string v = await reader.ReadToEndAsync();

            // 以某种方式处理文件数据
            count += v.Length;

            // 一个慢速运行的计算
            for (int i = 0; i < 10000; i++)
            {
                int x = v.GetHashCode();
                if (x == 0)
                {
                    count--;
                }
            }
        }

        Debug.Log("Job result " + count);
    }
}
```

***

此外，当使用 `async` 任务时，你可以使用 `Scripting.MainThreadScheduler` 在游戏 *Update* 期间在主线程上调用任务。这在将异步任务与主线程任务链接时非常有用。

## 线程

如果你希望对多线程代码执行有更多控制，那么最好的方法是手动创建线程并控制其执行：

```cs
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using FlaxEngine;

class ThreadTest : Script
{
    private Thread _thread;

    /// <inheritdoc />
    public override void OnEnable()
    {
        // 启动异步工作
        _thread = new Thread(HandleFileAsync);
        _thread.Start();
    }

    /// <inheritdoc />
    public override void OnDisable()
    {
        // 结束异步工作
        _thread.Join();
    }

    void HandleFileAsync()
    {
        Debug.Log("Starting async job from thread " + Thread.CurrentThread.ManagedThreadId);
        string file = Path.Combine(Globals.ProjectContentFolder, "myFile.txt");
        int count = 0;

        // 读取指定文件
        using (StreamReader reader = new StreamReader(file))
        {
            string v = reader.ReadToEnd();

            // 以某种方式处理文件数据
            count += v.Length;

            // 一个慢速运行的计算
            for (int i = 0; i < 10000; i++)
            {
                int x = v.GetHashCode();
                if (x == 0)
                {
                    count--;
                }
            }
        }

        Debug.Log("Job result " + count);
    }
}
```

***

## 线程池

如果你的游戏需要执行多个任务，那么可以尝试使用内置的 C# `ThreadPool` 来排队任务：

> [!Tip]
> 在 `Game.Build.cs` 中的 `Setup` 函数内添加 `options.ScriptingAPI.SystemReferences.Add("System.Threading.ThreadPool");` 以正确引用线程库。

```cs
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using FlaxEngine;

class ThreadPoolTest : Script
{
    private ManualResetEvent _doneEvent;

    /// <inheritdoc />
    public override void OnEnable()
    {
        // 启动异步工作
        _doneEvent = new ManualResetEvent(false);
        ThreadPool.QueueUserWorkItem(HandleFileAsync);
    }

    /// <inheritdoc />
    public override void OnDisable()
    {
        // 结束异步工作
        _doneEvent.WaitOne();
    }

    void HandleFileAsync(object stateInfo)
    {
        Debug.Log("Starting async job from thread " + Thread.CurrentThread.ManagedThreadId);
        string file = Path.Combine(Globals.ProjectContentFolder, "myFile.txt");
        int count = 0;

        // 读取指定文件
        using (StreamReader reader = new StreamReader(file))
        {
            string v = reader.ReadToEnd();

            // 以某种方式处理文件数据
            count += v.Length;

            // 一个慢速运行的计算
            for (int i = 0; i < 10000; i++)
            {
                int x = v.GetHashCode();
                if (x == 0)
                {
                    count--;
                }
            }
        }

        Debug.Log("Job result " + count);
        _doneEvent.Set();
    }
}
```

***
