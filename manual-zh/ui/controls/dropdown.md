# 下拉菜单

![下拉菜单](media/dropdown.png)

**下拉菜单** 控件允许用户从选项列表中选择一个选项。控件会显示当前选中的选项。

### 自定义弹窗样式

默认情况下，下拉菜单弹窗使用 Dropdown 控件的属性（如背景色、边框颜色等）来显示可供选择的项目列表。但在许多情况下，游戏可能希望自定义此弹窗。为此，你可以在自定义 Dropdown 实现中重写以下一个或多个函数：
* `CreatePopup`
* `CreatePopupRoot`
* `CreatePopupBackground`
* `CreatePopupItem`

以下是一个示例下拉菜单实现，它为下拉菜单弹窗背景添加了模糊面板：

```cs
public class DropdownWithBlur : Dropdown
{
    [EditorOrder(0), Limit(0, 100, 0.1f)]
    public float BlurStrength = 10.0f;

    public DropdownWithBlur()
    {
        // 移除背景
        BackgroundColor = Color.Transparent;
    }

    protected override void CreatePopupBackground(DropdownRoot popup)
    {
        // 插入模糊面板，使背景平滑
        var blur = new BlurPanel
        {
            BlurStrength = BlurStrength,
            AnchorPreset = AnchorPresets.StretchAll,
            Offsets = Margin.Zero,
            Parent = popup.MainPanel,
        };

        base.CreatePopupBackground(popup);
    }
}
```

***

