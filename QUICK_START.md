# Adaptive Dashboard Layout - Quick Start Guide

## 📦 What You Got

A complete, responsive card-based dashboard layout system with:

- ✅ Mobile-first responsive design
- ✅ 6 core reusable components
- ✅ 4 card variants for different use cases
- ✅ Dark mode support
- ✅ Accessible and semantic HTML
- ✅ Example implementations

## 🚀 Getting Started in 5 Minutes

### Step 1: Basic Dashboard Layout

```tsx
import { DashboardLayout, DashboardSection } from '@/components/dashboard/dashboard-layout';
import { CardGridLayout } from '@/components/dashboard/card-grid-layout';
import { RichCard } from '@/components/dashboard/rich-card';

export default function Dashboard() {
  return (
    <DashboardLayout maxWidth="xl">
      <DashboardSection>
        <h1>Welcome to My Dashboard</h1>
      </DashboardSection>
      
      <DashboardSection separator>
        <CardGridLayout title="Overview" description="Key metrics">
          <RichCard
            title="Revenue"
            content={<div className="text-4xl font-bold">$12,450</div>}
            description="Last 30 days"
            variant="highlight"
          />
        </CardGridLayout>
      </DashboardSection>
    </DashboardLayout>
  );
}
```

### Step 2: Add Statistics Grid

```tsx
import { StatsGridLayout } from '@/components/dashboard/card-grid-layout';

const stats = [
  { 
    title: "Revenue", 
    value: "$12,450", 
    description: "This month",
    trend: { value: 12, direction: "up" } 
  },
  { 
    title: "Users", 
    value: "1,234", 
    description: "Active users",
    trend: { value: 5, direction: "up" } 
  },
  // ... more stats
];

<StatsGridLayout stats={stats} />
```

### Step 3: Add Content Cards

```tsx
import { ContentCard, ContentListItem } from '@/components/dashboard/content-card';

<ContentCard title="Recent Activity" type="list">
  <ContentListItem
    icon="📝"
    title="New review posted"
    subtitle="By John Doe"
  />
  <ContentListItem
    icon="⭐"
    title="Rating updated"
    subtitle="4.8 stars"
  />
</ContentCard>
```

### Step 4: Test Responsiveness

Open your dashboard and:
1. Open browser DevTools (F12)
2. Click device toggle (mobile icon)
3. Resize to different breakpoints
4. Verify cards adjust layout

## 📁 File Structure

```
components/dashboard/
├── adaptive-grid.tsx          # Grid system
├── rich-card.tsx              # Card component
├── card-grid-layout.tsx       # Section layout + stats
├── content-card.tsx           # Rich content container
├── dashboard-layout.tsx       # Main wrapper
├── dashboard-showcase.tsx     # Full example
└── (other existing components)

docs/
├── ADAPTIVE_LAYOUT_GUIDE.md   # Full documentation
├── DESIGN_SYSTEM.md           # Design tokens & patterns
└── QUICK_START.md             # This file
```

## 🎨 Component Quick Reference

### AdaptiveGrid
```tsx
<AdaptiveGrid variant="auto" density="comfortable">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</AdaptiveGrid>
```
**Variants**: `auto` (1-3-4 cols), `balanced`, `featured`

### RichCard
```tsx
<RichCard
  title="Title"
  description="Subtitle"
  content={<div>Content here</div>}
  variant="highlight"
  trend={{ value: 12, direction: "up" }}
/>
```
**Variants**: `default`, `highlight`, `minimal`, `interactive`

### CardGridLayout
```tsx
<CardGridLayout 
  title="Section Title"
  description="Description"
  variant="auto"
>
  <RichCard {...} />
</CardGridLayout>
```

### ContentCard
```tsx
<ContentCard 
  title="Title"
  type="list" // or "timeline", "chart", etc
>
  <ContentListItem title="Item" subtitle="Details" />
</ContentCard>
```

### DashboardLayout
```tsx
<DashboardLayout maxWidth="xl">
  {/* Your content */}
</DashboardLayout>
```
**Max widths**: `sm`, `md`, `lg`, `xl`, `full`

## 🎯 Common Patterns

### Pattern: KPI Dashboard
```tsx
<DashboardLayout>
  <DashboardSection>
    <StatsGridLayout stats={stats} />
  </DashboardSection>
  <DashboardSection separator>
    <CardGridLayout title="Details">
      <RichCard {...} />
    </CardGridLayout>
  </DashboardSection>
</DashboardLayout>
```

### Pattern: Side-by-Side Comparison
```tsx
<CardGridLayout variant="balanced">
  <ResponsiveGridItem span="half">
    <RichCard title="Option A" {...} />
  </ResponsiveGridItem>
  <ResponsiveGridItem span="half">
    <RichCard title="Option B" {...} />
  </ResponsiveGridItem>
</CardGridLayout>
```

### Pattern: Featured + Grid
```tsx
<AdaptiveGrid variant="featured">
  <ResponsiveGridItem span="full">
    <RichCard 
      title="Featured Content" 
      variant="highlight"
      {...} 
    />
  </ResponsiveGridItem>
  <RichCard {...} />
  <RichCard {...} />
</AdaptiveGrid>
```

## 🎁 Real Examples

See these files for complete working examples:

1. **Admin Dashboard**: `app/admin/page-adaptive.tsx`
   - Platform metrics
   - System status
   - Activity logs
   - Quick actions

2. **Business Dashboard**: `app/business/page-adaptive.tsx`
   - Performance metrics
   - Review analytics
   - Sentiment analysis
   - Recommendations

3. **Showcase**: `components/dashboard/dashboard-showcase.tsx`
   - All component variants
   - Responsive features
   - Interactive elements

## 🔧 Customization Tips

### Change Grid Columns
Mobile 1 → Tablet 2 → Desktop 3 (default)
```tsx
// In adaptive-grid.tsx, modify variantMap
auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
// To:
auto: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-4"
```

### Adjust Spacing
```tsx
<AdaptiveGrid density="spacious"> {/* More gap */}
<AdaptiveGrid density="comfortable"> {/* Default */}
<AdaptiveGrid density="compact"> {/* Less gap */}
```

### Custom Colors
```tsx
<RichCard
  {...props}
  className="bg-purple-50 dark:bg-purple-950 border-purple-200"
/>
```

### Add Loading State
```tsx
<ContentCard
  title="Data"
  loading={isLoading}
  error={error}
>
  <YourContent />
</ContentCard>
```

## ✅ Checklist: Before Going Live

- [ ] Test on mobile (375px), tablet (768px), desktop (1440px)
- [ ] Verify dark mode works (toggle in DevTools)
- [ ] Check all interactive elements are keyboard accessible
- [ ] Verify images are optimized
- [ ] Test with screen reader (NVDA, JAWS)
- [ ] Check color contrast ratios
- [ ] Load test with slow network (throttle in DevTools)
- [ ] Test across browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify touch targets are 44px+
- [ ] Update analytics/tracking if needed

## 🆘 Troubleshooting

### Cards not stacking on mobile?
- Check if you're using `lg:` breakpoint correctly
- Verify `AdaptiveGrid` is being used
- Reset browser cache

### Dark mode not working?
- Add `dark` class to html element
- Check if dark mode styles are in CSS
- Verify Tailwind config includes dark mode

### Cards too wide on desktop?
- Change `DashboardLayout maxWidth` prop
- Adjust `xl:grid-cols-4` in variant map
- Add custom `max-w-*` class

### Spacing looks off?
- Change `density` prop
- Verify gap classes are applied
- Check for conflicting CSS

## 📚 Full Documentation

For complete details, see:
- **ADAPTIVE_LAYOUT_GUIDE.md** - Component API and features
- **DESIGN_SYSTEM.md** - Design tokens and patterns
- **Source code comments** - Implementation details

## 💡 Pro Tips

1. **Use "Highlight" variant for important metrics** - Makes them stand out
2. **Responsive Grid Items** - Use `span="full"` for full-width cards
3. **Trends** - Add trend indicators to cards for context
4. **Content Cards** - Great for lists, timelines, and rich content
5. **Sticky Headers** - Use `StickyHeader` for persistent navigation
6. **Density Control** - Match spacing to content complexity

## 🚀 Next Steps

1. Copy the example files to your pages
2. Customize with your data
3. Add your branding colors (dark mode aware)
4. Test on real devices
5. Deploy with confidence!

---

Happy building! 🎉

For questions or issues, check the component JSDoc comments or the full documentation files.
