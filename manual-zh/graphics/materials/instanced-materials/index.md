# 实例化材质

![实例化材质](../media/sample-material-instance.jpg)

**材质实例化** 是一种重用同一材质资源但修改其参数值的技术。
通过这种方式，可以在无需大量重新编译材质的情况下修改基础材质的外观。此外，材质和着色器的编译仅在编辑器中可用（运行时不着色器编译），因此使用材质实例是在游戏中自定义对象外观的方法之一。

话虽如此，*实例化材质* 可以在运行时动态修改，甚至可以从代码生成以随机化每个对象的材质参数。

## 创建材质实例

有两种创建 `MaterialInstance` 资源的方式。

- 使用 *内容* 窗口

![新建材质实例](../media/new-material-instance.png)

# [C#](#tab/code-csharp)

```cs
public class MyScript : Script
{
	[Tooltip("要覆盖其属性的基础材质资源")]
	public Material BaseMaterial;

	public override void OnStart()
	{
		// 创建动态材质实例并修改参数
		var instance = BaseMaterial.CreateVirtualInstance();
		instance.SetParameterValue("Color", new Color(0xff00ff));

		// 将实例分配给材质槽
        Actor.As<StaticModel>().SetMaterial(0, instance);
	}
}
```

***

# [C++](#tab/code-cpp)

```cpp
#pragma once

#include "Engine/Core/Types/Variant.h"
#include "Engine/Scripting/Script.h"
#include "Engine/Content/AssetReference.h"
#include "Engine/Content/Assets/MaterialInstance.h"
#include "Engine/Level/Actors/StaticModel.h"

API_CLASS() class GAME_API MyScript : public Script
{
API_AUTO_SERIALIZATION();
DECLARE_SCRIPTING_TYPE(MyScript);

    // 要覆盖其属性的基础材质资源
    API_FIELD() AssetReference<MaterialBase> BaseMaterial;

    // [Script]
    void OnStart() override
    {
        // 创建动态材质实例并修改参数
        CHECK(BaseMaterial);
        auto instance = BaseMaterial->CreateVirtualInstance();
        instance->SetParameterValue(TEXT("Color"), Color::FromRGB(0xff00ff));

        // 将实例分配给材质槽
        ((StaticModel*)GetActor())->SetMaterial(0, instance);
    }
};

inline MyScript::MyScript(const SpawnParams& params)
    : Script(params)
{
}
```

***

要了解有关从代码中使用材质实例的更多信息，请访问 C# 脚本 API [此处](http://docs.flaxengine.com/api/FlaxEngine.MaterialInstance.html)。

## 编辑参数

在 *内容* 窗口中双击新创建的 *材质实例* 资源。
在材质实例编辑器窗口中，你可以为实例选择基础材质并自定义其属性。
你所有的更改都将在编辑器窗口和游戏中实时可见。
这使得调整参数更加容易。

要设置基础材质，只需从内容窗口或任何资源选择器中将其拖放到 *基础材质* 属性中。

![设置材质实例基础材质](../media/set-material-instance-base-material.jpg)

然后所有公共材质参数都可以被修改。

![编辑材质实例](../media/edit-material-instance.jpg)
