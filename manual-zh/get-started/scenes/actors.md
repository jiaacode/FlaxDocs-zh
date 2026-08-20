# Actors

![Actors](/manual/media/actors.png)

**Actors** 是场景中的核心对象。您可以将它们放入关卡中，以构建游戏环境、设置光照并创建玩法。每个 [Actor](https://docs.flaxengine.com/api/FlaxEngine.Actor.html) 都链接到父 Actor（除了作为层级根节点的 Scene Actor 之外），并且可以拥有子 Actor（树形层级结构）。Actor 拥有自身的 3D 变换（平移、旋转和缩放），并继承父 Actor 的变换。您可以将 C# 脚本附加到 Actor 上，并在运行时生成/销毁它们。

本页文档包含所有与 Actor 相关的教程链接，以及所有 Actor 类型的参考。

## 使用 Actor

<div class="frontpage">

<div class="frontpage-section">
<a href="placing-actors.md"><img src="/manual/media/placing-actors-icon.jpg"></a>
<h3><a href="placing-actors.md">放置 Actor</a></h3>
<p>了解如何在编辑器中创建和移除 Actor。</p>
</div>

<div class="frontpage-section">
<a href="selecting-actors.md"><img src="/manual/media/selecting-actors-icon.jpg"></a>
<h3><a href="selecting-actors.md">选择 Actor</a></h3>
<p>了解如何在编辑器中选择 Actor。</p>
</div>

<div class="frontpage-section">
<a href="transforming-actors.md"><img src="/manual/media/transforming-actors-icon.jpg"></a>
<h3><a href="transforming-actors.md">变换 Actor</a></h3>
<p>了解如何在编辑器中移动、旋转和缩放对象。</p>
</div>

</div>

## Actor 类型

<div class="frontpage">

<div class="frontpage-section">
<a href="../../graphics/cameras/index.md"><img src="../../graphics/cameras/media/icon.jpg"></a>
<h3><a href="../../graphics/cameras/index.md">摄像机</a></h3>
</div>

<div class="frontpage-section">
<a href="../../graphics/lighting/reflections/env-probe.md"><img src="../../graphics/lighting/reflections/media/env-probe-icon.jpg"></a>
<h3><a href="../../graphics/lighting/reflections/env-probe.md">环境探针</a></h3>
</div>

<div class="frontpage-section">
<a href="../../graphics/models/static-model.md"><img src="../../graphics/models/media/icon.jpg"></a>
<h3><a href="../../graphics/models/static-model.md">静态 Actor</a></h3>
</div>

<div class="frontpage-section">
<a href="../../graphics/lighting/light-types/directional-light.md"><img src="../../graphics/lighting/light-types/media/directional-light-icon.jpg"></a>
<h3><a href="../../graphics/lighting/light-types/directional-light.md">方向光</a></h3>
</div>

<div class="frontpage-section">
<a href="../../graphics/lighting/light-types/point-light.md"><img src="../../graphics/lighting/light-types/media/point-light-icon.jpg"></a>
<h3><a href="../../graphics/lighting/light-types/point-light.md">点光源</a></h3>
</div>

<div class="frontpage-section">
<a href="../../graphics/lighting/light-types/spot-light.md"><img src="../../graphics/lighting/light-types/media/spot-light-icon.jpg"></a>
<h3><a href="../../graphics/lighting/light-types/spot-light.md">聚光灯</a></h3>
</div>

<div class="frontpage-section">
<a href="../../graphics/lighting/light-types/sky-light.md"><img src="../../graphics/lighting/light-types/media/sky-light-icon.jpg"></a>
<h3><a href="../../graphics/lighting/light-types/sky-light.md">天光</a></h3>
</div>

<div class="frontpage-section">
<a href="../../graphics/lighting/sky-skybox/sky.md"><img src="../../graphics/lighting/sky-skybox/media/sky-icon.jpg"></a>
<h3><a href="../../graphics/lighting/sky-skybox/sky.md">天空</a></h3>
</div>

<div class="frontpage-section">
<a href="../../graphics/lighting/sky-skybox/skybox.md"><img src="../../graphics/lighting/sky-skybox/media/skybox-icon.jpg"></a>
<h3><a href="../../graphics/lighting/sky-skybox/skybox.md">天空盒</a></h3>
</div>

<div class="frontpage-section">
<a href="../../graphics/post-effects/post-fx-volumes.md"><img src="../../graphics/post-effects/media/post-fx-volumes-icon.jpg"></a>
<h3><a href="../../graphics/post-effects/post-fx-volumes.md">后期特效体积</a></h3>
</div>

<div class="frontpage-section">
<a href="index.md"><img src="/manual/media/icon.jpg"></a>
<h3><a href="index.md">场景</a></h3>
</div>

<div class="frontpage-section">
<a href="../../physics/rigid-bodies.md"><img src="../../physics/media/icon.jpg"></a>
<h3><a href="../../physics/rigid-bodies.md">刚体</a></h3>
</div>

<div class="frontpage-section">
<a href="../../physics/character-controller.md"><img src="../../physics/media/character-controller-icon.jpg"></a>
<h3><a href="../../physics/character-controller.md">角色控制器</a></h3>
</div>

<div class="frontpage-section">
<a href="../../physics/colliders/index.md"><img src="../../physics/colliders/media/icon.jpg"></a>
<h3><a href="../../physics/colliders/index.md">碰撞体</a></h3>
</div>

<div class="frontpage-section">
<a href="../../physics/joints/index.md"><img src="../../physics/joints/media/icon.jpg"></a>
<h3><a href="../../physics/joints/index.md">关节</a></h3>
</div>

<div class="frontpage-section">
<a href="../../audio/audio-source.md"><img src="../../audio/media/autio-source-icon.jpg"></a>
<h3><a href="../../audio/audio-source.md">音频源</a></h3>
</div>

<div class="frontpage-section">
<a href="../../audio/audio-listener.md"><img src="../../audio/media/audio-listener-icon.jpg"></a>
<h3><a href="../../audio/audio-listener.md">音频监听器</a></h3>
</div>

<div class="frontpage-section">
<a href="../../animation/animated-model.md"><img src="../../animation/media/animated-model-icon.jpg"></a>
<h3><a href="../../animation/animated-model.md">动画模型</a></h3>
</div>

<div class="frontpage-section">
<a href="../../animation/bone-socket.md"><img src="../../animation/media/bone-socket-icon.jpg"></a>
<h3><a href="../../animation/bone-socket.md">骨骼插槽</a></h3>
</div>

<div class="frontpage-section">
<a href="../../graphics/decals/decal.md"><img src="../../graphics/decals/media/icon.jpg"></a>
<h3><a href="../../graphics/decals/decal.md">贴花</a></h3>
</div>

<div class="frontpage-section">
<a href="../../scripting/empty-actor.md"><img src="../../../media/dummy-icon.jpg"></a>
<h3><a href="../../scripting/empty-actor.md">空 Actor</a></h3>
</div>

<div class="frontpage-section">
<a href="../../ui/text-render/index.md"><img src="../../ui/text-render/media/icon.jpg"></a>
<h3><a href="../../ui/text-render/index.md">文本渲染器</a></h3>
</div>

<div class="frontpage-section">
<a href="../../ui/canvas/index.md"><img src="../../ui/canvas/media/icon.jpg"></a>
<h3><a href="../../ui/canvas/index.md">UI 画布</a></h3>
</div>

<div class="frontpage-section">
<a href="../../ui/control/index.md"><img src="../../ui/control/media/icon.jpg"></a>
<h3><a href="../../ui/control/index.md">UI 控件</a></h3>
</div>

<div class="frontpage-section">
<a href="../../terrain/index.md"><img src="../../terrain/media/icon.jpg"></a>
<h3><a href="../../terrain/index.md">地形</a></h3>
</div>

<div class="frontpage-section">
<a href="../../navigation/nav-mesh-bounds-volume.md"><img src="../../navigation/media/nav-mesh-bounds-volume-icon.jpg"></a>
<h3><a href="../../navigation/nav-mesh-bounds-volume.md">导航网格边界体积</a></h3>
</div>

<div class="frontpage-section">
<a href="../../navigation/nav-link.md"><img src="../../navigation/media/nav-link-icon.jpg"></a>
<h3><a href="../../navigation/nav-link.md">导航链接</a></h3>
</div>

<div class="frontpage-section">
<a href="../../particles/particle-effect.md"><img src="../../particles/media/particle-effect-icon.jpg"></a>
<h3><a href="../../particles/particle-effect.md">粒子特效</a></h3>
</div>

<div class="frontpage-section">
<a href="../../animation/scene-animations/scene-animation-player.md"><img src="../../animation/scene-animations/media/scene-animation-player-icon.jpg"></a>
<h3><a href="../../animation/scene-animations/scene-animation-player.md">场景动画播放器</a></h3>
</div>

<div class="frontpage-section">
<a href="../../graphics/fog-effects/exponential-height-fog.md"><img src="../../graphics/fog-effects/media/exponential-height-fog-icon.jpg"></a>
<h3><a href="../../graphics/fog-effects/exponential-height-fog.md">指数高度雾</a></h3>
</div>

<div class="frontpage-section">
<a href="../../ui/sprite-render/index.md"><img src="../../ui/sprite-render/media/icon.jpg"></a>
<h3><a href="../../ui/sprite-render/index.md">Sprite 渲染器</a></h3>
</div>
</div>
