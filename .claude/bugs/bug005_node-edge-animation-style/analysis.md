# Bug Analysis: Node 与 Edge 动效和色调调整

## Bug ID
`node-edge-animation-style`

## Analysis Date
2026-03-21

---

## Investigation Summary

### Codebase Analysis

#### Current Architecture
```
src/components/flowchart/
├── Flowchart.tsx         # 主容器，SVG viewBox 管理
├── FlowchartNode.tsx     # 节点组件，SVG path + 动画
├── FlowchartEdge.tsx     # 边组件，SVG path + 箭头
├── FlowchartContext.tsx  # 状态管理，动画时序控制
├── FlowchartErrorBoundary.tsx
└── flowchartData.ts      # 节点和边的数据定义
```

#### Current Dependencies
- React 19.2.4
- Next.js 16.2.0
- Tailwind CSS v4
- lucide-react 0.577.0
- **无 framer-motion** - 所有动画用 CSS/SMIL 实现

---

## Root Cause Analysis

### 1. Node 动效问题

**问题**: 当前 Node 只有简单的 pulse glow 动画

**根因**:
- `FlowchartNode.tsx:180-204` 使用 SVG `<animate>` 元素实现 pulse
- 只动画 `stroke-width` 和 `opacity`，无 scale 效果
- 无进入动画（opacity + translateY）
- 无状态区分（Idle/Active/Completed）

**代码位置**:
```tsx
// FlowchartNode.tsx:180-204
{isActive && (
  <path d={getShapePath()} fill="none" stroke={BRAND.colors.primary}>
    <animate attributeName="stroke-width" values="2;8;2" dur="0.5s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.6;0;0.6" dur="0.5s" repeatCount="indefinite" />
  </path>
)}
```

### 2. Edge 动效问题

**问题**: Edge 缺少路径绘制动画和渐变色

**根因**:
- `FlowchartEdge.tsx:148-163` 使用简单 CSS transition
- 无 `pathLength` 动画（从 0 到 1 绘制路径）
- 边颜色是单色 `#E5E7EB` 或 `#EAB308`，无渐变
- 无流动 dash 动画（`strokeDasharray` 动画）

**代码位置**:
```tsx
// FlowchartEdge.tsx:148-163
<path
  stroke={isHighlighted ? BRAND.colors.primary : '#E5E7EB'}
  strokeWidth={isHighlighted ? 2.5 : 1.5}
  className="transition-all"
  style={{ transitionDuration: `${ANIMATION_DURATIONS.EDGE_HIGHLIGHT}ms` }}
/>
```

### 3. Canvas 背景问题

**问题**: 缺少点阵网格背景

**根因**:
- `Flowchart.tsx:171-176` SVG 没有背景定义
- 透明背景，无视觉深度

### 4. 颜色系统问题

**问题**: 状态区分不够明显

**根因**:
- 只用了 yellow 和 amber 色系
- 缺少 Completed 状态（绿色）
- 缺少 Idle 状态的灰色调

---

## Solution Design

### Approach: CSS-First (无新增依赖)

选择原因：
1. 项目当前无 framer-motion
2. CSS 动画性能足够好
3. 减少包体积
4. Tailwind CSS v4 支持 CSS 变量和 @keyframes

### 1. Node 改进方案

#### 1.1 进入动画
**方法**: CSS @keyframes + animation-delay

```css
/* globals.css */
@keyframes flowchart-node-enter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.flowchart-node {
  animation: flowchart-node-enter 0.5s ease-out forwards;
  animation-delay: calc(var(--node-index) * 0.15s);
  opacity: 0;
}
```

**实现**:
- 给每个 `<g>` 添加 `style={{ '--node-index': index }}`
- 使用 CSS 变量控制 staggered delay

#### 1.2 Active Scale 脉冲
**方法**: SVG transform + CSS animation

```css
@keyframes flowchart-node-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.flowchart-node-active {
  animation: flowchart-node-pulse 0.6s ease-in-out infinite;
  transform-origin: center;
}
```

**实现**:
- 在 `<g>` 上添加 class `flowchart-node-active`
- 使用 `transform-origin: center` 保持缩放居中

#### 1.3 状态颜色
```typescript
// FlowchartNode.tsx
const NODE_COLORS = {
  idle: {
    fill: '#f1f5f9',      // gray-100
    stroke: '#e2e8f0',    // gray-200
    icon: '#94a3b8',      // gray-400
    text: '#64748b',      // gray-500
  },
  active: {
    fill: 'rgba(234, 179, 8, 0.1)',  // yellow with 10% opacity
    stroke: '#EAB308',    // brand yellow
    icon: '#EAB308',
    text: '#EAB308',
  },
  completed: {
    fill: 'rgba(34, 197, 94, 0.1)',  // green with 10% opacity
    stroke: '#22c55e',    // green-500
    icon: '#22c55e',
    text: '#22c55e',
  },
};
```

### 2. Edge 改进方案

#### 2.1 路径绘制动画
**方法**: stroke-dasharray + stroke-dashoffset

```css
@keyframes flowchart-edge-draw {
  from {
    stroke-dashoffset: var(--path-length);
  }
  to {
    stroke-dashoffset: 0;
  }
}

.flowchart-edge-animated {
  stroke-dasharray: var(--path-length);
  animation: flowchart-edge-draw 0.8s ease-out forwards;
}
```

**实现**:
- 使用 `path.getTotalLength()` 获取路径长度
- 设置 `stroke-dasharray` 和 `stroke-dashoffset`

#### 2.2 渐变色边
**方法**: SVG `<linearGradient>`

```tsx
// FlowchartEdge.tsx
<defs>
  <linearGradient id={`edge-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stopColor="#EAB308" />
    <stop offset="100%" stopColor="#22c55e" />
  </linearGradient>
</defs>

<path stroke={`url(#edge-gradient-${id})`} />
```

#### 2.3 流动 Dash 动画
**方法**: stroke-dasharray animation

```css
@keyframes flowchart-edge-flow {
  to {
    stroke-dashoffset: -20;
  }
}

.flowchart-edge-flowing {
  stroke-dasharray: 6 14;
  animation: flowchart-edge-flow 0.8s linear infinite;
}
```

### 3. Canvas 背景改进方案

**方法**: CSS radial-gradient 点阵

```css
.flowchart-canvas {
  background-color: #f8fafc;
  background-image: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
  background-size: 24px 24px;
  border-radius: 1.5rem;
  border: 1px solid #e2e8f0;
}
```

---

## Implementation Plan

### Phase 1: CSS Keyframes (globals.css)
1. 添加 `flowchart-node-enter` 动画
2. 添加 `flowchart-node-pulse` 动画
3. 添加 `flowchart-edge-draw` 动画
4. 添加 `flowchart-edge-flow` 动画

### Phase 2: FlowchartNode.tsx
1. 添加 `nodeIndex` prop 用于 staggered delay
2. 添加 `isCompleted` 状态支持
3. 更新颜色系统 (idle/active/completed)
4. 更新 SVG 动画实现

### Phase 3: FlowchartEdge.tsx
1. 添加渐变色支持 (`<linearGradient>`)
2. 添加路径绘制动画
3. 添加流动 dash 动画
4. 更新 label 样式 (rounded-full, shadow)

### Phase 4: Flowchart.tsx
1. 添加点阵背景容器
2. 传递 `nodeIndex` 给每个节点
3. 支持 `completedNodes` 状态追踪

### Phase 5: FlowchartContext.tsx
1. 添加 `completedNodes` 状态
2. 更新动画时序配置

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| CSS 动画性能 | Low | Low | GPU 加速属性 (transform, opacity) |
| 浏览器兼容性 | Low | Low | Tailwind 自动处理前缀 |
| Reduced Motion | Medium | Medium | 已有 `@media (prefers-reduced-motion)` 支持 |
| SVG 渐变性能 | Low | Low | 限制渐变数量，复用定义 |

---

## Testing Strategy

### Visual Testing
- [ ] Node 进入动画流畅
- [ ] Node pulse 动画居中
- [ ] Edge 渐变色正确
- [ ] Edge 流动动画平滑
- [ ] Canvas 点阵背景对齐

### Accessibility Testing
- [ ] `prefers-reduced-motion` 禁用动画
- [ ] 键盘导航正常
- [ ] Screen reader 正常

### Performance Testing
- [ ] 无明显帧率下降
- [ ] 动画无卡顿

---

## Estimated Changes

| File | Lines Changed | Type |
|------|---------------|------|
| `globals.css` | +40 | CSS additions |
| `FlowchartNode.tsx` | +50/-30 | Refactor + features |
| `FlowchartEdge.tsx` | +60/-20 | Refactor + features |
| `Flowchart.tsx` | +20/-5 | Container styling |
| `FlowchartContext.tsx` | +10 | State additions |
| **Total** | ~180 lines | |

---

## Approval Required

请确认以上分析是否正确。如果确认，我们将进入 `/bug-fix` 阶段实现这些改进。