# Adaptive Card-Based Dashboard Layout Guide

## Overview

This adaptive card-based layout system provides a complete solution for building responsive dashboards that work seamlessly across mobile, tablet, and desktop devices. All components are built with Tailwind CSS and follow your existing design system.

## Components

### 1. **AdaptiveGrid** (`adaptive-grid.tsx`)

The foundation component that manages responsive column layouts and spacing.

#### Props:
- `children`: React components to render in the grid
- `density`: `'compact' | 'comfortable' | 'spacious'` - Controls gap between cards
- `variant`: `'auto' | 'balanced' | 'featured'` - Different grid layouts
- `className`: Custom classes

#### Variants:
- **`auto`**: Mobile 1-col → Tablet 2-col → Desktop 3-col → XL 4-col
- **`balanced`**: Flexible layout with varied sizes
- **`featured`**: Layout with a featured/large section

#### Usage:
```tsx
<AdaptiveGrid variant="auto" density="comfortable">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</AdaptiveGrid>
```

### 2. **RichCard** (`rich-card.tsx`)

Enhanced card component with multiple variants for different use cases.

#### Props:
- `title`: Card heading
- `description`: Subtitle or meta information
- `content`: Main card content (required)
- `footer`: Bottom section with additional info
- `icon`: Icon or element in header
- `badge`: Small label badge
- `trend`: Trend indicator with direction
- `variant`: `'default' | 'highlight' | 'minimal' | 'interactive'`
- `size`: `'sm' | 'md' | 'lg'` - Padding sizes
- `onClick`: Click handler for interactive cards

#### Variants:
- **`default`**: Standard white card with subtle shadow
- **`highlight`**: Blue gradient background for featured content
- **`minimal`**: Simple gray background, no shadow
- **`interactive`**: Enhanced hover effects for clickable cards

#### Usage:
```tsx
<RichCard
  title="Revenue"
  description="Last 30 days"
  content={<div className="text-4xl font-bold">$12,450</div>}
  trend={{ value: 12, direction: "up" }}
  variant="highlight"
  badge="📈 Trending"
/>
```

### 3. **CardGridLayout** (`card-grid-layout.tsx`)

Full section layout with title, description, and adaptive grid.

#### Props:
- `title`: Section heading
- `description`: Section description
- `children`: Grid items
- `actions`: Header action buttons
- `variant`: Grid variant (auto, balanced, featured)
- `contentClassName`: Custom classes for grid

#### Usage:
```tsx
<CardGridLayout 
  title="Overview" 
  description="Key metrics"
  actions={<Button>View All</Button>}
>
  <RichCard {...} />
  <RichCard {...} />
</CardGridLayout>
```

### 4. **ContentCard** (`content-card.tsx`)

Versatile card for displaying different content types with rich features.

#### Props:
- `title`: Card heading
- `description`: Subtitle
- `type`: `'text' | 'list' | 'media' | 'chart' | 'timeline' | 'form'`
- `children`: Content
- `actions`: Header actions
- `loading`: Show loading state
- `error`: Show error message

#### Sub-components:

**ContentListItem** - Reusable list items
```tsx
<ContentCard type="list">
  <ContentListItem 
    icon="📝"
    title="Item Title"
    subtitle="Item description"
    onClick={() => {}}
  />
</ContentCard>
```

**TimelineItem** - Timeline events
```tsx
<ContentCard type="timeline">
  <TimelineItem
    date="2024-01-15"
    title="Event"
    status="completed"
  />
</ContentCard>
```

### 5. **DashboardLayout** (`dashboard-layout.tsx`)

Main wrapper with responsive padding and max-width.

#### Props:
- `maxWidth`: `'sm' | 'md' | 'lg' | 'xl' | 'full'`
- `children`: Page content

#### Usage:
```tsx
<DashboardLayout maxWidth="xl">
  <CardGridLayout title="Overview">
    {/* Content */}
  </CardGridLayout>
</DashboardLayout>
```

### 6. **DashboardSection** (`dashboard-layout.tsx`)

Vertical section with consistent spacing and optional separator.

#### Usage:
```tsx
<DashboardLayout>
  <DashboardSection>
    <h2>Section 1</h2>
  </DashboardSection>
  <DashboardSection separator>
    <h2>Section 2</h2>
  </DashboardSection>
</DashboardLayout>
```

## Responsive Breakpoints

All components follow Tailwind's standard breakpoints:

| Device | Breakpoint | Columns |
|--------|-----------|---------|
| Mobile | Default (< 640px) | 1 |
| Tablet | `sm:` (640px) | 2 |
| Desktop | `lg:` (1024px) | 3 |
| Extra Large | `xl:` (1280px) | 4 |

## Layout Patterns

### Pattern 1: Statistics Overview
```tsx
<DashboardSection>
  <StatsGridLayout stats={[
    { title: "Revenue", value: "$12,450", trend: { value: 12, direction: "up" } },
    // ... more stats
  ]} />
</DashboardSection>
```

### Pattern 2: Feature Cards with Trends
```tsx
<CardGridLayout title="Performance" variant="auto">
  <RichCard
    title="Metric"
    content={<div className="text-4xl font-bold">Value</div>}
    trend={{ value: 5, direction: "up" }}
  />
</CardGridLayout>
```

### Pattern 3: Content List
```tsx
<ContentCard title="Recent Activity" type="list">
  {items.map(item => (
    <ContentListItem key={item.id} {...item} />
  ))}
</ContentCard>
```

### Pattern 4: Full-Width Featured Section
```tsx
<AdaptiveGrid variant="featured">
  <ResponsiveGridItem span="full">
    <RichCard
      title="Important Announcement"
      content={<p>This spans full width</p>}
    />
  </ResponsiveGridItem>
</AdaptiveGrid>
```

## Customization

### Adjusting Gaps
Modify density in `AdaptiveGrid`:
```tsx
<AdaptiveGrid density="spacious"> {/* Larger gaps */}
<AdaptiveGrid density="comfortable"> {/* Default */}
<AdaptiveGrid density="compact"> {/* Smaller gaps */}
```

### Custom Colors and Styling
All components accept `className` prop for additional styling:
```tsx
<RichCard
  {...props}
  className="border-2 border-purple-500"
/>
```

### Dark Mode
All components support dark mode with automatic styling:
- Light backgrounds have `dark:bg-slate-950` equivalents
- Text colors adjust with `dark:text-slate-50/400`
- Borders use `dark:border-slate-800`

## Best Practices

1. **Use DashboardLayout as wrapper** - Provides consistent padding and max-width
2. **Group related content** - Use DashboardSection to separate sections
3. **Choose appropriate variants** - Use highlight for important metrics, minimal for subtasks
4. **Keep card content concise** - Too much content in a card reduces impact
5. **Test on multiple devices** - Use browser dev tools to check mobile layouts
6. **Use consistent spacing** - Stick to one density per dashboard
7. **Leverage semantic HTML** - Cards convey information hierarchy

## Mobile-First Approach

Components are designed mobile-first:
- Base styles apply to mobile
- `sm:`, `lg:`, `xl:` prefixes add breakpoint-specific changes
- Ensures excellent mobile experience by default

## Examples

See `dashboard-showcase.tsx` for a complete working example with:
- Statistics grid
- Rich cards with variants
- Content cards with lists and timelines
- Responsive features demonstration
- Call-to-action section

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Color not the only indicator (trend direction + symbol)
- Sufficient contrast ratios
- Touch-friendly sizes on mobile
- Keyboard navigable interactive elements

## Performance

- Cards are lightweight components
- No unnecessary re-renders
- CSS-based responsive design (no JavaScript)
- Minimal DOM overhead
- Optimized for production with Tailwind's tree-shaking
