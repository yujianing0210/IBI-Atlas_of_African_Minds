请帮我创建一个可运行的前端交互页面，用于可视化非洲 tribes 的地理分布。项目目标是：在一张非洲地图上，用 JSON 数据中的经纬度将每个 tribe 锚定为一个发光点；每个点有微弱闪烁效果；鼠标 hover 时该点的光圈变大；点击某个点时弹出信息卡，显示 tribe 名字、地区和简介。整体视觉参考是“深蓝背景上的白色发光星点”，有轻微梦幻、星图式、神秘但简洁的感觉。

## 一、项目目标

请实现一个网页页面，功能如下：

1. 页面主体是一张非洲地图。
2. 每个 tribe 在地图上显示为一个白色发光点。
3. 点的位置来自 JSON 数据中的纬度 latitude 和经度 longitude。
4. 每个点默认有轻微闪烁/呼吸感动画。
5. 鼠标悬停某个点时：

   * 发光半径增大
   * 外圈光晕更明显
   * 可选：显示一个很小的 tribe 名字 tooltip
6. 点击某个点时：

   * 打开一个弹窗 / 浮层卡片
   * 卡片中显示：

     * tribe
     * country_region
     * summary
   * 弹窗支持关闭
7. 整体视觉风格：

   * 深蓝背景
   * 地图本体较低调
   * 点像夜空中的星光
   * 不要做得太“科技 dashboard”，而是更偏 poetic / atmospheric / subtle
8. 页面需要在本地直接运行。
9. 代码应清晰、模块化、便于后续扩展。

## 二、技术要求

请使用以下技术栈：

* React
* TypeScript
* Vite
* Tailwind CSS
* 推荐使用 SVG 渲染地图和点位
* 不要依赖重量级 GIS 框架，除非必要
* 优先保持实现轻量、可读、易修改

如果需要地图数据，请优先使用：

* 一个简化版 Africa GeoJSON
  或
* 一个内嵌 SVG path 的 Africa 轮廓

要求：

* 不使用复杂后端
* 不需要数据库
* JSON 数据放在本地文件中读取
* 所有代码都能在 VSCode 里直接跑起来

## 三、数据格式

我的 tribe 数据将以本地 JSON 文件形式提供，格式类似：

```json
[
  {
    "tribe": "Yoruba",
    "country_region": "Southern Nigeria",
    "latitude": 7.38,
    "longitude": 3.93,
    "summary": "Urbanized West African group; rich mythology, Ifa divination system, and artistic traditions."
  },
  {
    "tribe": "Zulu",
    "country_region": "South Africa",
    "latitude": -28.0,
    "longitude": 31.0,
    "summary": "Famous for military history under Shaka Zulu; strong cultural identity and language."
  }
]
```

完整 JSON 文件路径为：

`C:\Users\nomy_\Desktop\Wisdom_of_the_African_World\tribes.json`

请为此数据定义 TypeScript 类型。

## 四、核心实现逻辑

### 1. 地图显示

实现一个 AfricaMap 组件，负责显示非洲地图底图。

要求：

* 地图居中显示
* 保持纵横比
* 在桌面端视觉上占页面主要区域
* 使用 SVG 最佳，因为便于叠加点位
* 地图底色可以是低对比度的深蓝灰 / 透明蓝灰
* 国界可以极简，或只显示大陆轮廓

### 2. 经纬度到屏幕坐标映射

实现一个函数，将经纬度映射到 SVG 坐标。

要求：

* 如果用 GeoJSON / d3-geo，请使用适合 Africa 区域的 projection
* 如果不用 d3-geo，则至少实现一个基于地图 bounding box 的简单映射
* 重点是让 tribe 点大致准确落在地图上的相应区域

如果使用 d3-geo，优先方案：

* `geoMercator()` 或 `geoNaturalEarth1()`
* fit 到 Africa GeoJSON 的 bounds

### 3. tribe 点位渲染

为每个 tribe 渲染一个点，建议做成独立组件 `TribeMarker`

每个 marker 应包括：

* 核心亮点（小白点）
* 外层 glow
* 微弱闪烁动画
* hover 放大动画
* click 触发详情卡

视觉细节建议：

* 中心点半径约 2–4 px
* 外层 glow 用 SVG blur / radial gradient / CSS drop-shadow
* 每个点闪烁频率略有不同，避免完全同步
* 点的透明度和 glow 强度可稍微随机，营造星空感，但要克制

### 4. hover 交互

当鼠标 hover 某个点时：

* 外圈变大
* glow 更亮
* pointer cursor
* 可选显示 tribe 名称的小 tooltip，位置靠近点

tooltip 风格：

* 小而简洁
* 深色半透明背景
* 白字
* 轻微模糊背景

### 5. click 交互

点击点后，打开一个详情弹窗 DetailModal

弹窗显示：

* tribe 名称（标题）
* country_region
* summary

要求：

* 弹窗可关闭
* 点击空白区域可关闭
* ESC 可关闭
* 弹窗不要太大，保持视觉轻盈
* 风格应与整体页面统一：深蓝、半透明、柔和 glow

## 五、视觉风格要求

请尽量贴近以下气质：

* 深蓝背景上的白色闪光
* 像夜空、星图、灵性地图、记忆宇宙
* 发光效果柔和，不要廉价
* 地图只是承载层，不要抢过点位视觉
* 整体氛围比“信息可视化 dashboard”更偏“poetic interactive atlas”

### 背景建议

* 页面整体背景：深蓝渐变
* 可加极弱的颗粒 / 星屑感
* 不要太花

### 点位建议

* 默认是白色
* 外层可以带一点冷蓝 glow
* hover 后更亮更大

### 弹窗建议

* 半透明深色面板
* 毛玻璃感可选
* 圆角
* 边缘有微弱高光或阴影
* 动画柔和

## 六、页面结构建议

请按照如下结构组织项目：

```txt
src/
  components/
    AfricaMap.tsx
    TribeMarker.tsx
    DetailModal.tsx
    Tooltip.tsx
  data/
    tribes.json
    africa.geojson   // 如果使用 GeoJSON
  types/
    tribe.ts
  utils/
    projection.ts
  App.tsx
  main.tsx
  index.css
```

## 七、功能细节要求

### App.tsx

负责：

* 加载数据
* 管理当前 hover 的 tribe
* 管理当前选中的 tribe
* 渲染背景和主页面布局

### AfricaMap.tsx

负责：

* 渲染地图 SVG
* 调用 projection 将经纬度转换为坐标
* 渲染所有 TribeMarker
* 将 hover/click 事件上传给父组件

### TribeMarker.tsx

props 建议：

* tribe
* x
* y
* isHovered
* onHover
* onLeave
* onClick

### DetailModal.tsx

props 建议：

* tribe | null
* isOpen
* onClose

### projection.ts

负责：

* 初始化地理投影
* 输出 `project([longitude, latitude]) => [x, y]`

## 八、动画要求

请实现以下动画：

### 1. 点位闪烁

* 默认轻微 pulsate
* 每个点动画时长可稍有不同，比如 2.5s–4.5s
* 不要完全一致，避免机械感

### 2. hover 放大

* 200ms–300ms ease-out
* glow 半径明显增加
* 中心点更亮

### 3. modal 弹出

* 轻微 fade + scale in
* 不要太“产品化”，要柔和一点

## 九、响应式要求

* 桌面端优先
* 在笔记本和常规显示器上都要正常显示
* 地图自适应页面尺寸
* 小屏幕时弹窗不要超出视口
* marker 不需要移动端复杂适配，但至少可点击

## 十、实现偏好

请注意下面这些偏好：

1. 我希望代码是可读、优雅、适合继续迭代的，不要为了省事把所有逻辑塞进一个文件。
2. 请尽量减少魔法数字，把关键参数提出来。
3. 地图点位不要拥挤到不可点击；如果多个点很近，可保留轻微重叠，但不要过度复杂化。
4. 请写必要注释，尤其是 projection 和动画部分。
5. 如果需要安装依赖，请给出完整命令。
6. 最终请输出完整代码文件内容，而不是只给片段。
7. 如果某些 tribe 因为坐标接近而遮挡，可以暂时接受，但代码结构要允许后续做 collision handling。
8. 如果某些数据名称较旧，不要在 UI 上强行改名，先按 JSON 原文显示。

## 十一、建议依赖

如有需要，可使用这些依赖：

* `d3-geo`
* `d3-geo-projection`
* `framer-motion`
* `topojson-client`（若需要）
* `clsx`

但不要过度依赖库。优先轻量。

## 十二、开发步骤要求

请按以下顺序完成：

### Step 1

初始化 Vite + React + TypeScript + Tailwind 项目，并给出安装命令。

### Step 2

创建基础文件结构。

### Step 3

实现 Africa 地图底图。

### Step 4

实现经纬度投影和 tribe 点位渲染。

### Step 5

实现点位闪烁与 hover 交互。

### Step 6

实现点击弹窗。

### Step 7

美化为接近参考图的视觉效果。

### Step 8

给出运行方式与后续可扩展建议。

## 十三、验收标准

完成后应满足：

* 页面能成功运行
* 能正确读取 `src/data/tribes.json`
* 非洲地图正常显示
* 每个 tribe 显示为一个发光点
* 点位有轻微闪烁
* hover 时点位明显放大发光
* click 时出现 tribe 详情弹窗
* 弹窗显示 tribe 名字、地区和简介
* 整体视觉风格接近深蓝星图感，而不是普通地图
* 代码结构清晰，方便后续继续扩展

## 十四、额外加分项（如果你认为实现成本不高，可以加上）

1. 背景上增加少量缓慢漂浮的微小星尘
2. 地图轮廓有一层极淡的 glow
3. hover tooltip 显示 tribe 名字
4. modal 中加入经纬度小字
5. 支持按 ESC 关闭 modal
6. 支持点击地图空白处关闭 tooltip
7. marker 的闪烁动画带少量随机 offset

## 十五、我希望你最终输出的内容

请最终输出：

1. 完整项目说明
2. 需要安装的依赖命令
3. 所有关键文件的完整代码
4. 运行命令
5. 如有必要，给出一个最小示例 `tribes.json`
6. 如果你使用了 Africa GeoJSON，也请说明应该把文件放在哪里，或者直接生成一个最小可用版本

---

如果地图底图获取困难，请不要卡住。优先做一个最小可运行版本：

* 用一个 Africa SVG silhouette
* 将 tribe 点位先准确投影到一个固定 viewBox 中
* 保证交互和视觉先成立
* 后续再替换为更精确的 GeoJSON 底图

同时请优先保证：

1. 交互成立
2. 视觉氛围正确
3. 代码可扩展

而不是追求 GIS 层面的完美精度。

这个页面不是普通的 data dashboard，而更像一个带有神秘感的 cultural star map。每一个 tribe 像地图上的一颗星，轻微闪烁，点击后像打开一个文化节点。请避免做成商业 BI 风格，尽量保持安静、深邃、诗意、克制。
