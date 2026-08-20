# 赛璐珞风格渲染

![赛璐珞风格材质](/manual/media/cel-shading-material.png)

在本教程中，你将学习如何创建**赛璐珞风格渲染**效果，也称为**卡通渲染**。

## 1. 创建新材质

![自定义光照材质着色模型](/manual/media/shading-model-custom-lit.png)

创建一个新[材质](../materials/basics/index.md)，并将**着色模型**设置为**Custom Lit**。此模式会在着色器中暴露光照信息，包括：
* 方向光
* 天光
* 局部光（点光源、聚光灯）
* 环境探针
* 指数雾

它支持不透明和透明表面、粒子、蒙皮网格和可变形对象。

## 2. 编写赛璐珞风格渲染的着色器

添加一个新的**自定义全局代码**节点，该节点基于光照输入实现赛璐珞风格渲染。

```hlsl
// 材质属性
struct CelShadingMaterial
{
    float3 HighlightColor;
    float HighlightThreshold;
    float3 KeyColor;
    float ShadowThreshold;
    float3 ShadowColor;
    float OutlineThickness;
    float3 OutlineColor;
};

// 赛璐珞风格渲染计算
struct CelShading
{
    float3 Color;
    float Visibility;
};

// 混合两个赛璐珞渲染结果
CelShading MixCelShading(CelShading shading, CelShading other)
{
	// 使用强度最高的光照
	if (other.Visibility > shading.Visibility)
	{
		shading.Color = other.Color;
		shading.Visibility = other.Visibility;
	}
	return shading;
}

// 使用赛璐珞风格渲染光照材质
float3 LitCelShading(CelShading shading, CelShadingMaterial mat)
{
	if (shading.Visibility > mat.HighlightThreshold)
	{
		// 高光
		return mat.HighlightThreshold * saturate(shading.Color);
	}
	if (shading.Visibility > mat.ShadowThreshold)
	{
		// 主光
		return mat.KeyColor * lerp(saturate(shading.Color), (float3)1, 0.5);
	}
	return mat.ShadowColor;
}

// 计算给定光照的赛璐珞渲染
CelShading GetCelShading(MaterialInput input, LightData light, bool isRadial)
{
    float3 L = light.Direction;
    float3 N = input.TBN[2];
    float NoL = dot(N, L);
    float attenuation = 1;

    if (isRadial)
    {
        // 局部光照衰减
        bool isSpotLight = light.SpotAngles.x > -2.0f;
        float3 toLight = light.Position - input.WorldPosition;
        GetRadialLightAttenuation(light, isSpotLight, toLight, N, NoL, attenuation);
    }

    CelShading result;
    result.Visibility = saturate(NoL) * attenuation;
    result.Color = light.Color;
    return result;
}
```

***

## 3. 编写光照和轮廓的着色器

![赛璐珞风格材质设置链接](/manual/media/cel-shading-linkage.png)

现在，添加一个**自定义代码**节点，该节点输入 3 种颜色：高光色、主光色和阴影色，用于此材质的赛璐珞渲染。这些可以设置为参数，以便在每个[材质实例](../materials/instanced-materials/index.md)中进行自定义。自定义代码节点的输出应直接连接到材质的自发光作为最终光照输出。

```hlsl
// 设置表面材质
CelShadingMaterial mat;
mat.HighlightColor = Input0;
mat.KeyColor = Input1;
mat.ShadowColor = Input2;
mat.HighlightThreshold = 0.9;
mat.ShadowThreshold = 0.4;
mat.OutlineThickness = 0.2f;
mat.OutlineColor = float3(0, 0, 0);

// 计算赛璐珞渲染属性
CelShading cel = GetCelShading(input, GetDirectionalLight(), false);
LOOP
for (uint i = 0; i < GetLocalLightsCount(); i++)
{
    const LightData localLight = GetLocalLight(i);
    cel = MixCelShading(cel, GetCelShading(input, localLight, true));
}

// 执行赛璐珞渲染
float3 lighting = LitCelShading(cel, mat);

// 添加轮廓
float3 cameraVector = normalize(ViewPos.xyz - input.WorldPosition);
float outline = saturate(dot(cameraVector, input.TBN[2]));
if (outline < mat.OutlineThickness)
    lighting = mat.OutlineColor;

Output0 = float4(lighting, 1);
```

***

### 4. 测试！

最后，在项目中的对象上使用此材质。这些对象将根据太阳和周围的局部光照，以正确的赛璐珞渲染和轮廓进行响应。此示例着色器可以进一步改进，以支持对假反射表面的反射采样，或以不同的方式进行光照混合。此外，轮廓可以在[后期处理材质](../post-effects/post-fx-materials.md)中计算，而不是在着色器内部，以提供基于法线或基于深度的平滑处理。

![赛璐珞风格渲染效果](/manual/media/cel-shading.gif)
