# 操作指南：生成程序化纹理

![纹理](media/cubeResult.png)

在本教程中，你将学习如何从 C# 脚本代码创建简单的纹理。

此示例使用 C# API 方法 [Content.CreateVirtualAsset<T>](http://docs.flaxengine.com/api/FlaxEngine.Content.html#FlaxEngine_Content_CreateVirtualAsset__1) 生成程序化纹理资源，该资源可以在运行时从代码进行修改。

## 教程

### 1. 创建名为 `TextureFromCode` 的新 C# 脚本

### 2. 编写纹理数据生成代码

# [C#](#tab/code-csharp)
```cs
public class TextureFromCode : Script
{
    private Texture _tempTexture;
    private MaterialInstance _tempMaterialInstance;

    public Material Material;
    public Model Model;

    public override unsafe void OnStart()
    {
        // 确保模型资源已加载
        if (Model.WaitForLoaded())
            return;

        // 创建新的纹理资源
        var texture = Content.CreateVirtualAsset<Texture>();
        _tempTexture = texture;
        var initData = new TextureBase.InitData();
        initData.Width = 64;
        initData.Height = 64;
        initData.ArraySize = 1;
        initData.Format = PixelFormat.R8G8B8A8_UNorm;
        var data = new byte[initData.Width * initData.Height * PixelFormatExtensions.SizeInBytes(initData.Format)];
        fixed (byte* dataPtr = data)
        {
            // 生成像素数据（线性渐变）
            var colorsPtr = (Color32*)dataPtr;
            for (int y = 0; y < initData.Height; y++)
            {
                float t1 = (float)y / initData.Height;
                var c1 = Color32.Lerp(Color.Red, Color.Blue, t1);
                var c2 = Color32.Lerp(Color.Yellow, Color.Green, t1);
                for (int x = 0; x < initData.Width; x++)
                {
                    float t2 = (float)x / initData.Width;
                    colorsPtr[y * initData.Width + x] = Color32.Lerp(c1, c2, t2);
                }
            }
        }
        initData.Mips = new[]
        {
            // 初始化 Mip 映射数据容器描述
            new TextureBase.InitData.MipData
            {
                Data = data,
                RowPitch = data.Length / initData.Height,
                SlicePitch = data.Length
            },
        };
        if (texture.Init(ref initData))
            return;

        // 使用带有纹理采样的动态材质实例
        var material = Material.CreateVirtualInstance();
        _tempMaterialInstance = material;
        material.SetParameterValue("tex", texture);

        // 添加模型 Actor 并使用动态材质进行渲染
        var staticModel = Actor.GetOrAddChild<StaticModel>();
        staticModel.Model = Model;
        staticModel.SetMaterial(0, material);
    }

    public override void OnDestroy()
    {
        // 确保清理资源
        FlaxEngine.Object.Destroy(ref _tempTexture);
        FlaxEngine.Object.Destroy(ref _tempMaterialInstance);
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
// .h
#pragma once

#include "Engine/Scripting/Script.h"
#include "Engine/Content/AssetReference.h"
#include "Engine/Content/Assets/Model.h"
#include "Engine/Content/Assets/Material.h"

API_CLASS() class GAME_API TextureFromCodeCpp : public Script
{
    API_AUTO_SERIALIZATION();
    DECLARE_SCRIPTING_TYPE(TextureFromCodeCpp);
private:
    Texture* _tempTexture = nullptr;
    MaterialInstance* _tempMaterialInstance = nullptr;

public:
    // 要设置其纹理的自定义材质。
    API_FIELD() AssetReference<Material> Material;
    // 要设置其材质的自定义模型。
    API_FIELD() AssetReference<Model> Model;

    // [Script]
    void OnStart() override;
    void OnDestroy() override;
};

// .cpp
#include "TextureFromCodeCpp.h"
#include "Engine/Core/Types/Variant.h"
#include "Engine/Level/Actor.h"
#include "Engine/Content/Content.h"
#include "Engine/Content/Assets/MaterialInstance.h"
#include "Engine/Graphics/PixelFormatExtensions.h"
#include "Engine/Level/Actors/StaticModel.h"

TextureFromCodeCpp::TextureFromCodeCpp(const SpawnParams& params)
    : Script(params)
{
}

void TextureFromCodeCpp::OnStart()
{
    CHECK(Material);
    CHECK(Model);

    // 确保模型资源已加载
    if (Model->WaitForLoaded())
        return;

    // 创建新的纹理资源
    auto texture = Content::CreateVirtualAsset<Texture>();
    _tempTexture = texture;
    TextureBase::InitData initData;
    initData.Width = 64;
    initData.Height = 64;
    initData.ArraySize = 1;
    initData.Format = PixelFormat::R8G8B8A8_UNorm;
    auto& mipData = initData.Mips.AddOne();
    {
        // 初始化 Mip 映射数据容器描述
        mipData.Data.Allocate(initData.Width * initData.Height * PixelFormatExtensions::SizeInBytes(initData.Format));
        mipData.RowPitch = mipData.Data.Length() / initData.Height;
        mipData.SlicePitch = mipData.Data.Length();
    }
    byte* data = mipData.Data.Get();
    {
        // 生成像素数据（线性渐变）
        auto colorsPtr = (Color32*)data;
        for (int y = 0; y < initData.Height; y++)
        {
            float t1 = (float)y / initData.Height;
            Color c1 = Color::Lerp(Color::Red, Color::Blue, t1);
            Color c2 = Color::Lerp(Color::Yellow, Color::Green, t1);
            for (int x = 0; x < initData.Width; x++)
            {
                float t2 = (float)x / initData.Width;
                colorsPtr[y * initData.Width + x] = Color32(Color::Lerp(c1, c2, t2));
            }
        }
    }
    if (texture->Init(MoveTemp(initData)))
        return;

    // 使用带有纹理采样的动态材质实例
    auto material = Material->CreateVirtualInstance();
    _tempMaterialInstance = material;
    material->SetParameterValue(TEXT("tex"), Variant(texture));

    // 添加模型 Actor 并使用动态材质进行渲染
    auto staticModel = GetActor()->GetOrAddChild<StaticModel>();
    staticModel->Model = Model;
    staticModel->SetMaterial(0, material);
}

void TextureFromCodeCpp::OnDestroy()
{
    // 确保清理资源
    SAFE_DELETE(_tempMaterialInstance);
    SAFE_DELETE(_tempTexture);
}
```
***

### 3. 创建材质

创建一个简单的材质，其中包含一个名为 `tex` 的公共纹理参数。脚本使用它来分配要绘制的纹理。

![材质](media/material1.png)

### 4. 链接材质和模型

将创建的脚本 `TextureFromCode` 添加到场景中的 Actor（或为其创建一个新的 Actor）。然后选择该 Actor 并分配模型和创建的材质（如下图所示）。

![链接材质和模型](media/textureFromCode1.png)

### 5. 测试！

按下 **播放**（或 *F5*）并查看结果！

![结果](media/cubeResult.png)
