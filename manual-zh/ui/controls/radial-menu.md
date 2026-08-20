# 径向菜单

![径向菜单](/manual/media/radial-menu.png)

径向菜单在需要快速选择菜单而普通菜单类型不适合时非常有用。径向菜单有两种模式：
* 布局控制器
* 材质控制器

> [!Warning]
> 径向菜单目前仅支持 `Image` 控件作为子控件。

### 布局控制器

添加到径向菜单的任何子控件将自动围绕其中心进行布局。

### 材质控制器

分配给径向菜单控件的材质可用于绘制背景，以显示选中和高亮显示的控件。你可以克隆径向菜单上使用的默认引擎材质来创建自定义 UI 样式。只需确保设置并使用由控件逻辑控制的以下参数：

![径向菜单材质参数](/manual/media/radial-menu-material-params.png)

### 示例脚本

```cs
public class RadialMenuUsageExample : Script
{
    public ControlReference<RadialMenu> ActorRadialMenu;
    private RadialMenu _radialMenu;

    public override void OnStart()
    {
        _radialMenu = ActorRadialMenu.Control;
        _radialMenu.Selected += OnOptionSelected;
    }

    public override void OnDestroy()
    {
        _radialMenu.Selected -= OnOptionSelected;
    }

    private void OnOptionSelected(int selectedOption)
    {
        if (!Enabled)
            return;
        if (_radialMenu.CenterAsButton)
        {
            if (selectedOption == 0)
            {
                Debug.Log("[Radial Menu] Center has been clicked");
            }
            else
            {
                if (selectedOption == -1)
                {
                    Debug.Log("[Radial Menu] Selection has been lost");
                }
                else
                {
                    Debug.Log($"[Radial Menu] Option {selectedOption} has been selected");
                }
            }
        }
        else
        {
            if (selectedOption == -1)
            {
                Debug.Log("[Radial Menu] Selection has been lost");
            }
            else
            {
                Debug.Log($"[Radial Menu] Option {selectedOption} has been selected");
            }
        }
    }
}
```

***

