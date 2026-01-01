# Components

This directory is for your reusable React components.

## Mobile-First Best Practices

When creating components for mobile-friendly apps:

1. **Touch Targets**: Ensure interactive elements are at least 44x44px for touch
2. **Responsive Design**: Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
3. **Typography**: Use relative units and consider mobile readability
4. **Spacing**: Use consistent spacing scale (Tailwind's spacing utilities)
5. **Accessibility**: Include proper ARIA labels and semantic HTML

## Example Component Structure

```tsx
// components/ExampleComponent.tsx
export default function ExampleComponent() {
  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-8">
      {/* Mobile-first responsive content */}
    </div>
  );
}
```

