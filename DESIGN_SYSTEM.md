# Dashboard Design System & Best Practices

## Color Palette

### Primary Colors
- **Blue**: `#3B82F6` (accent, interactive elements)
- **Slate**: `#0F172A` (text, backgrounds)

### Semantic Colors
- **Success**: `#10B981` (green - positive trends, completed status)
- **Warning**: `#F59E0B` (amber - pending status)
- **Error**: `#EF4444` (red - errors, failed status)
- **Info**: `#3B82F6` (blue - information)

### Background Colors
- **Light Mode**: `#FFFFFF` (cards), `#F8FAFC` (sections)
- **Dark Mode**: `#0F172A` (cards), `#1E293B` (sections)

### Text Colors
- **Primary**: `#0F172A` (light) / `#F1F5F9` (dark)
- **Secondary**: `#64748B` (light) / `#94A3B8` (dark)
- **Muted**: `#CBD5E1` (light) / `#64748B` (dark)

## Spacing Scale

| Name | Value | Usage |
|------|-------|-------|
| xs | 0.75rem | Tight spacing within components |
| sm | 1rem | Small gaps |
| md | 1.5rem | Medium gaps (default) |
| lg | 2rem | Large sections |
| xl | 2.5rem | Extra large spacing |

## Typography

### Heading Sizes
- **h1**: `2.25rem` (36px) - Page title
- **h2**: `1.875rem` (30px) - Section title
- **h3**: `1.5rem` (24px) - Card title
- **h4**: `1.25rem` (20px) - Subsection
- **body**: `0.875-1rem` - Regular text

### Font Weights
- **Regular**: 400 - Body text
- **Medium**: 500 - Labels, subtitles
- **Semibold**: 600 - Card titles
- **Bold**: 700 - Page titles

## Shadow System

### Elevation
- **No shadow**: Card elements on gray backgrounds
- **Shadow-sm**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)` - Subtle cards
- **Shadow-md**: Default card shadow (used by Card component)
- **Shadow-lg**: Interactive cards on hover

## Border Radius

- **None**: 0
- **Small**: `0.375rem` (6px) - Form inputs
- **Medium**: `0.5rem` (8px) - List items
- **Large**: `1rem` (16px) - Cards
- **Extra Large**: `4rem` (64rem) - Card component default

## Responsive Grid Architecture

### Mobile First (< 640px)
```
- Statistics: 1 column
- Content Cards: 1 column
- Lists: Full width
```

### Tablet (640px - 1023px)
```
- Statistics: 2 columns
- Content Cards: 2 columns
- Lists: 2 items visible
```

### Desktop (1024px - 1279px)
```
- Statistics: 3 columns
- Content Cards: 2-3 columns (varies)
- Lists: 3 items visible
```

### Extra Large (1280px+)
```
- Statistics: 4 columns
- Content Cards: 3-4 columns (varies)
- Lists: 4+ items visible
```

## Component Usage Guidelines

### When to Use Each Card Variant

#### Default
- Regular data display
- Mixed content types
- No special emphasis needed
```tsx
<RichCard variant="default" title="Standard Card" content={...} />
```

#### Highlight
- Important metrics (KPIs)
- Featured announcements
- Call-to-action content
```tsx
<RichCard variant="highlight" title="Revenue" content={...} />
```

#### Minimal
- Supporting information
- Supplementary content
- Simple data displays
```tsx
<RichCard variant="minimal" title="Details" content={...} />
```

#### Interactive
- Clickable cards
- Navigation elements
- Call-to-action cards
```tsx
<RichCard variant="interactive" title="Action" onClick={handler} />
```

### Density Guidelines

#### Compact (Gap: 12px)
- Information-dense dashboards
- Mobile devices with limited space
- Data monitoring dashboards
```tsx
<AdaptiveGrid density="compact">
```

#### Comfortable (Gap: 16px) 
- Standard dashboards
- Most business applications
- Default choice for most use cases
```tsx
<AdaptiveGrid density="comfortable">
```

#### Spacious (Gap: 24px)
- Content-focused dashboards
- Marketing dashboards
- Dashboards with large, important cards
```tsx
<AdaptiveGrid density="spacious">
```

## Layout Patterns

### Pattern 1: Dashboard with Stats + Content
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

### Pattern 2: Comparison View
```tsx
<CardGridLayout title="Comparison" variant="balanced">
  <ResponsiveGridItem span="half">
    <RichCard {...} />
  </ResponsiveGridItem>
  <ResponsiveGridItem span="half">
    <RichCard {...} />
  </ResponsiveGridItem>
</CardGridLayout>
```

### Pattern 3: Featured + Grid
```tsx
<AdaptiveGrid variant="featured">
  <ResponsiveGridItem span="full">
    <RichCard title="Featured" variant="highlight" {...} />
  </ResponsiveGridItem>
  <RichCard {...} />
  <RichCard {...} />
  <RichCard {...} />
</AdaptiveGrid>
```

## Mobile Optimization Checklist

- [ ] Test at 320px width (small phones)
- [ ] Ensure text is readable (min 16px on mobile)
- [ ] Verify touch targets are 44px+ (accessibility)
- [ ] Check that cards stack properly on mobile
- [ ] Test long text wrapping
- [ ] Verify forms are easy to fill on mobile
- [ ] Ensure navigation is accessible on mobile
- [ ] Test performance on slow connections
- [ ] Verify images are optimized
- [ ] Check dark mode compatibility

## Performance Tips

1. **Lazy Load Content**: Use React.lazy() for card content
2. **Memoize Cards**: Wrap frequently updated sections
3. **Optimize Images**: Use Next.js Image component
4. **CSS Optimization**: Leverage Tailwind's tree-shaking
5. **Avoid Unnecessary Re-renders**: Use proper key props
6. **Monitor Bundle Size**: Keep card logic lightweight

## Accessibility Standards

### WCAG 2.1 AA Compliance

- **Color Contrast**: 
  - Normal text: 4.5:1 minimum
  - Large text: 3:1 minimum
  - UI components: 3:1 minimum

- **Focus Management**:
  - All interactive elements must be keyboard accessible
  - Clear focus indicators
  - Logical tab order

- **Semantic HTML**:
  - Use proper heading hierarchy (h1 → h2 → h3)
  - Proper landmark regions
  - Meaningful link text

- **ARIA Labels**:
  - Cards should have proper roles if interactive
  - Status indicators should have aria-label
  - Loading states should be announced

### Example Accessible Card
```tsx
<div role="article" aria-label="Revenue metric: $12,450">
  <h3 className="font-semibold">Revenue</h3>
  <div aria-live="polite">$12,450</div>
  <span aria-label="12 percent increase">↑ 12%</span>
</div>
```

## Dark Mode Support

All components automatically support dark mode. Key behaviors:

- Light backgrounds → Dark backgrounds
- Dark text → Light text
- Light borders → Dark borders
- Shadows adjusted for visibility

Enable dark mode with:
```html
<html class="dark">
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (current versions)

## Common Customizations

### Custom Gap/Density
Modify `card-grid-layout.tsx` density map:
```tsx
const densityMap = {
  custom: "gap-8 sm:gap-10 lg:gap-12",
  // Add to variantMap above
};
```

### Custom Colors
Update `rich-card.tsx` variant styles:
```tsx
const variantStyles = {
  custom: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
};
```

### Custom Breakpoints
Extend Tailwind config in `tailwind.config.ts`:
```ts
extend: {
  screens: {
    xs: '420px',
    '2xl': '1400px',
  }
}
```

## Testing

### Visual Testing
```bash
npm run dev
# Use browser dev tools to test at different breakpoints
```

### Component Testing
```tsx
import { render } from '@testing-library/react';
import { RichCard } from '@/components/dashboard/rich-card';

test('renders card with content', () => {
  const { getByText } = render(
    <RichCard title="Test" content={<p>Content</p>} />
  );
  expect(getByText('Test')).toBeInTheDocument();
});
```

### E2E Testing
Test responsive behavior with Playwright:
```ts
test('card stacks on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(card).toHaveCSS('grid-template-columns', '1fr');
});
```
