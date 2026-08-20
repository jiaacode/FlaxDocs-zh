# 工具栏

![工具栏](/manual/media/toolbar.png)

**工具栏** 是编辑器主窗口的一部分，包含一组有用的按钮。
你可以使用它快速保存项目或暂停编辑器内模拟。

| 按钮                                     | 描述                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| ![保存](/manual/media/toolbar-button-1.png)      | 保存所有修改的场景和资源（Ctrl+S）。                         |
| ![撤销](/manual/media/toolbar-button-2.png)      | 撤销上一次场景修改操作（Ctrl+Z）。                           |
| ![重做](/manual/media/toolbar-button-3.png)      | 重做上一次场景修改操作（Ctrl+Y）。                           |
| ![平移模式](/manual/media/toolbar-button-4.png)  | 将 Gizmo 工具模式更改为 *平移*（1）。                        |
| ![旋转模式](/manual/media/toolbar-button-5.png)  | 将 Gizmo 工具模式更改为 *旋转*（2）。                        |
| ![缩放模式](/manual/media/toolbar-button-6.png)  | 将 Gizmo 工具模式更改为 *缩放*（3）。                        |
| ![构建](/manual/media/toolbar-button-10.png)     | 构建场景数据 - CSG、导航网格、静态光照、环境探针（Ctrl+F10）。 |
| ![播放/停止](/manual/media/toolbar-button-7.png) | 启动/停止模拟（F5）。                                        |
| ![暂停](/manual/media/toolbar-button-8.png)      | 暂停模拟。游戏逻辑和物理模拟将冻结。                         |
| ![步进帧](/manual/media/toolbar-button-9.png)    | 在模拟中步进一帧（仅在暂停模式下）。                         |

## 构建按钮配置

![构建按钮配置](/manual/media/custom-build-button.png)

默认情况下，**构建场景数据** 按钮将运行：
* CSG 构建
* 环境探针更新（GI 之前）
* 静态光照构建
* 环境探针更新（GI 之后）
* 导航网格构建。

但可以在 **编辑器选项** 中调整它以匹配所需的工作流程。例如，你可以将脚本编译绑定到该按钮，或绑定一系列自定义操作来执行。
