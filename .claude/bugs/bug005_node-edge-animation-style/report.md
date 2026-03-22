# Bug Report: Node 与 Edge 动效和色调调整

## Bug ID
`node-edge-animation-style`

## Status
- [x] Reported
- [x] Analyzed
- [x] Fixed
- [x] Verified

---

## Summary

当前 Flowchart 组件的 Node 和 Edge 动效和色调需要参考 `qoder-app1` 项目进行优化，以提供更流畅、更丰富的视觉体验。

---

## Current Behavior

### Node 当前状态
1. **动效**:
   - 只有简单的 pulse glow 动画（stroke-width 从 2 到 8）
   - 颜色过渡 200ms
   - 无进入动画
   - 无 scale 缩放效果

2. **色调**:
   - Active: `yellow-50` 背景, `yellow-500` 边框, `yellow-600` 图标/文字
   - Next: `amber-50` 背景, `amber-300` 边框
   - Default: `white` 背景, `gray-200` 边框

### Edge 当前状态
1. **动效**:
   - 简单的 stroke 颜色过渡 300ms
   - 高亮时显示流动动画（stroke-dashoffset 300ms）
   - 无路径绘制动画

2. **色调**:
   - Default: `#E5E7EB` (gray-200)
   - Highlighted: `#EAB308` (yellow-500)
   - 无渐变效果

---

## Expected Behavior (参考 qoder-app1)

### Node 期望状态
1. **动效**:
   - 进入动画: opacity 0 -> 1, y 20 -> 0, duration 500ms, staggered delay
   - Active 脉冲: scale [1, 1.05, 1], duration 600ms, easeInOut
   - 完成状态: checkmark badge with spring animation
   - 边框过渡: duration 500ms

2. **色调**:
   - Idle: Border `#e2e8f0`, Icon `#94a3b8`, Text `#64748b`
   - Active: 使用品牌色 + glow 动画
   - Completed: 品牌色边框 + 微妙阴影发光
   - 背景色: Idle `#f1f5f9`, Active `${accentColor}15`

### Edge 期望状态
1. **动效**:
   - 路径绘制动画: pathLength 0 -> 1, duration 800ms, easeInOut
   - 完成边: `strokeDasharray: "6 14"` + 流动动画 class
   - 可选: 粒子轨迹动画 (SMIL animateMotion)
   - 渐变路径填充

2. **色调**:
   - 边渐变: 从源节点色到目标节点色
   - 背景 track: `#e2e8f0`, strokeWidth 2
   - 动画路径: strokeWidth 2.5, gradient fill
   - Labels: `rounded-full`, white bg, border, shadow

### Canvas 期望状态
- 背景: 点阵网格 (`radial-gradient` circles)
- 网格间距: 24px x 24px
- 边框: `rounded-3xl`, `#e2e8f0`

---

## Key Design Patterns from qoder-app1

### 1. Framer Motion Animations
```typescript
// Node entrance
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: delay * 0.15 }}

// Active node pulse
scale: [1, 1.05, 1]
duration: 0.6, ease: "easeInOut"

// Checkmark spring
type: "spring", stiffness: 400, damping: 15
```

### 2. CSS Keyframes
```css
@keyframes glow-pulse-blue {
  0%, 100% { box-shadow: 0 0 5px 0 rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.4); }
}

@keyframes dash-flow {
  to { stroke-dashoffset: -20; }
}
```

### 3. Gradient Edge Colors
```css
/* Developer -> GitLab */
--gradient-blue-orange: linear-gradient(to right, #3b82f6, #f97316);

/* GitLab -> Code Review */
--gradient-orange-green: linear-gradient(to right, #f97316, #22c55e);
```

### 4. Node Status Colors (最终实现)
| Status | Fill | Border | Icon | Text |
|--------|------|--------|------|------|
| Idle | `#f1f5f9` | `#e2e8f0` | `#94a3b8` | `#64748b` |
| Active | `rgba(234, 179, 8, 0.1)` | `#EAB308` (yellow) | `#EAB308` | `#EAB308` |
| Next | `rgba(56, 189, 248, 0.1)` | `#38bdf8` (sky/冰蓝色) | `#38bdf8` | `#0284c7` |
| Completed | `rgba(34, 197, 94, 0.1)` | `#22c55e` (green) | `#22c55e` | `#22c55e` |

### 5. Edge Status Colors (最终实现)
| Status | Color |
|--------|-------|
| Idle | `#e2e8f0` (gray-200) |
| Active | `#38bdf8` (sky-400/冰蓝色) |
| Completed | `#38bdf8` (sky-400/冰蓝色) |

---

## Affected Files

| File | Changes Required |
|------|------------------|
| `src/components/flowchart/FlowchartNode.tsx` | 添加进入动画、scale 脉冲、完成状态 badge |
| `src/components/flowchart/FlowchartEdge.tsx` | 添加路径绘制动画、渐变填充、流动 dash |
| `src/components/flowchart/Flowchart.tsx` | 添加点阵背景、节点延迟渲染 |
| `src/app/globals.css` | 添加 CSS keyframes 动画 |

---

## Dependencies

可能需要添加:
- `framer-motion` - 用于更丰富的动画效果 (可选，也可用 CSS 实现)

---

## Acceptance Criteria

- [x] Node 有进入动画（opacity）- 注：SVG transform 冲突，移除 translateY
- [x] Node active 状态有 pulse 发光效果
- [x] Edge 有路径绘制动画
- [x] Edge 支持状态颜色切换（idle/active/completed）
- [x] 完成状态的边有流动 dash 动画
- [x] Canvas 背景有点阵网格
- [x] 所有动画支持 `prefers-reduced-motion`
- [x] Active Node 保持黄色品牌色
- [x] Next Node 使用冰蓝色调
- [x] Active/Completed Edge 使用冰蓝色调
- [x] 状态管理：点击 Node 时重置后续节点状态

---

## Priority
- [ ] Critical
- [ ] High
- [x] Medium
- [ ] Low

## Estimated Effort
Medium (2-4 hours)

---

## Notes

这是一个 UI 增强任务，主要参考 `C:\Users\axu01\Works\qoder-app1\src` 项目的设计模式。核心改进包括：

1. 更丰富的动画效果（CSS keyframes 实现）
2. 状态颜色区分明显
3. 点阵背景
4. 状态管理逻辑

### 最终实现要点

**颜色方案：**
- Active Node：黄色品牌色 `#EAB308`
- Next Node：冰蓝色 `#38bdf8`
- Active/Completed Edge：冰蓝色 `#38bdf8`
- Completed Node：绿色 `#22c55e`

**状态管理：**
- 点击某个 Node 时，清除该 Node 之后所有节点的 completed 状态
- 直接后继 Node 显示 isNext 状态（冰蓝色），不论之前是否已完成
- 后续 Node 和 Edge 恢复到初始 idle 状态

**技术限制：**
- SVG `<g>` 元素的 `transform` 属性与 CSS `transform` 冲突，因此移除了 translateY 进入动画
- 使用 CSS filter 的 drop-shadow 实现 pulse 发光效果