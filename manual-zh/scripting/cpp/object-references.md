# Flax 中 C++ 的对象引用

## 资源

在 C++ 代码中引用资源时，请使用 `AssetReference<T>`，其中 `T` 是资源的类型。它将处理资源事件、序列化，并提供一种安全的方式来引用资源对象。

```cpp
// .h
#pragma once

#include "Engine/Scripting/Script.h"
#include "Engine/Content/Assets/Texture.h"
#include "Engine/Content/AssetReference.h"

API_CLASS() class GAME_API MyCppScript : public Script
{
API_AUTO_SERIALIZATION();
DECLARE_SCRIPTING_TYPE(MyCppScript);

	API_FIELD() AssetReference<Texture> AssetRef;

	// [Script]
	void OnEnable() override;
};

// .cpp
#include "MyCppScript.h"

MyCppScript::MyCppScript(const SpawnParams& params)
	: Script(params)
{
}

void MyCppScript::OnEnable()
{
	LOG(Info, "Selected asset: {0}", AssetRef ? AssetRef->ToString() : String::Empty);
	if (AssetRef && !AssetRef->WaitForLoaded())
	{
		LOG(Info, "Texture size: {0}", AssetRef->Size());
	}
}
```

***

如果你想在不增加引用计数的情况下引用资源，请使用 `WeakAssetReference<Type>`。

## 对象

在引用其他游戏对象（例如其他脚本或 Actor）时，请使用 `ScriptingObjectReference<Type>`，其中 `T` 是对象的类型。

```cpp
// .h
#pragma once

#include "Engine/Scripting/Script.h"
#include "Engine/Scripting/ScriptingObjectReference.h"
#include "Engine/Level/Actors/PointLight.h"

API_CLASS() class GAME_API MyCppScript : public Script
{
API_AUTO_SERIALIZATION();
DECLARE_SCRIPTING_TYPE(MyCppScript);

	API_FIELD() ScriptingObjectReference<PointLight> LightRef;

	// [Script]
	void OnEnable() override;
};

// .cpp
#include "MyCppScript.h"

MyCppScript::MyCppScript(const SpawnParams& params)
	: Script(params)
{
}

void MyCppScript::OnEnable()
{
	LOG(Info, "Selected light: {0}", LightRef ? LightRef->GetNamePath() : String::Empty);
}
```

***

如果你想创建对象的软引用，请使用 `SoftObjectReference<T>`。它将支持引用尚未加载的对象（例如软资源引用或稍后将被流式传输进来的其他场景中的对象）。
