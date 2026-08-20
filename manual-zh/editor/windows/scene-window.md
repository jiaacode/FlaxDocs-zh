# 场景窗口

![场景窗口](/manual/media/scene.jpg)

**场景窗口** 显示一个树形控件，包含已加载场景的完整层级结构，并会自动更新且支持多场景编辑。
在运行时生成或移除的 Actor 以及所有关卡更改都会实时更新。

每个 Actor 都由一个树节点表示（以 Actor 的名称命名）。
场景 Actor 是树的根节点。
你可以使用节点名称左侧的箭头图标展开或折叠场景层级。
要选择一个或多个节点，请使用 **鼠标左键**、**Ctrl + 鼠标左键** 或 **Shift + 鼠标左键** 以选择一系列节点。

你可以选择并拖拽一个 Actor 或一组 Actor 以重新排序和重新设置它们的父级。

## 上下文菜单

![上下文菜单](/manual/media/scene-context-menu.jpg)

使用 **右键单击** 将为选中的 Actor 节点显示上下文菜单。
这允许你复制、粘贴、剪切、复制、删除和添加新的 Actor。

## 搜索

通过在 **场景窗口** 的搜索栏中输入内容，可以按名称过滤 Actor。

### 附加搜索过滤器

过滤器不区分大小写，并且可以以 `,` 分隔同时使用。

| 过滤器 | 操作                           |
| ------ | ------------------------------ |
| **a:** | 按类型搜索 Actor               |
| **s:** | 按附加的脚本类型搜索 Actor     |
| **c:** | 按设置的控件类型搜索 UIControl |

### 示例

- 输入 `a:CharacterController` 将查找场景中所有属于 **CharacterController** 类型的 Actor。
- 输入 `s:NetworkTransform` 将查找场景中所有附加了 **NetworkTransform** 脚本的 Actor。
- 输入 `a:CharacterController, s:NetworkTransform` 将查找场景中所有属于 **CharacterController** 类型且附加了 **NetworkTransform** 脚本的 Actor。
- 输入 `Tom, a:CharacterController, s:NetworkTransform` 将查找场景中所有属于 **CharacterController** 类型、附加了 **NetworkTransform** 脚本且名称为 `Tom` 的 Actor。
- 输入 `c:Image` 将查找场景中所有控件类型为 **Image** 的 UIControl。

## 快捷键

| 控制                 | 操作                                        |
| -------------------- | ------------------------------------------- |
| **向上/向下方向键**  | 导航                                        |
| **向左/向右方向键**  | 折叠/展开节点                               |
| **Ctrl + 鼠标左键**  | 从选择中添加/移除                           |
| **Shift + 鼠标左键** | 选择一系列节点                              |
| **Ctrl + A**         | 选择视图中的所有项目                        |
| **双击 Actor**       | 移动编辑器[视口](viewport.md)以查看此 Actor |
| **Delete**           | 删除选中的 Actor                            |
| **Ctrl + D**         | 复制选中的 Actor                            |
| **Ctrl + F**         | 开始搜索                                    |
| **Ctrl + S**         | 保存所有项目更改（修改的场景和资源）        |
| **Ctrl + Z**         | 执行撤销操作                                |
| **Ctrl + Y**         | 执行重做操作                                |
| **Ctrl + X**         | 剪切选中的 Actor                            |
| **Ctrl + C**         | 复制选中的 Actor                            |
| **Ctrl + V**         | 粘贴复制的 Actor                            |
| **F5**               | 启动编辑器内运行模式                        |
| **F11**              | 在编辑器内运行模式暂停时步进一帧            |
