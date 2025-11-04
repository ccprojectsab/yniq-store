# Button Integration Guide

## How to Add Design System Buttons to Any Section

This guide shows you how to integrate the design system button style selector into any Shopify section.

---

## Updated Sections

The following sections have already been updated with button style selectors:

✅ `sections/image-banner.liquid` - 2 buttons with style selectors
✅ `sections/hero.liquid` - CTA button with style selector
✅ `sections/multicolumn.liquid` - Section button with style selector
✅ `sections/subhero.liquid` - CTA button with style selector

---

## Step-by-Step Integration

### Step 1: Add Button Style Setting to Schema

In your section's `{% schema %}` block, add the button style selector **after** your existing button label and link settings:

```json
{
  "type": "text",
  "id": "button_label",
  "label": "Button Label"
},
{
  "type": "url",
  "id": "button_link",
  "label": "Button Link"
},
{
  "type": "select",
  "id": "button_style",
  "label": "Button Style",
  "options": [
    {
      "value": "primary",
      "label": "Primary"
    },
    {
      "value": "secondary",
      "label": "Secondary (Outlined)"
    },
    {
      "value": "tertiary",
      "label": "Tertiary (Text)"
    }
  ],
  "default": "primary"
}
```

**For multiple buttons:**
Use unique IDs like `button_style_1`, `button_style_2`, etc.

---

### Step 2: Update Button Rendering

Replace your existing button HTML with the render-button snippet.

**Before (old approach):**
```liquid
{%- if section.settings.button_label != blank -%}
  <a
    href="{{ section.settings.button_link | default: '#' }}"
    class="button button--primary"
    {% if section.settings.button_link == blank %}
      role="link" aria-disabled="true"
    {% endif %}
  >
    {{ section.settings.button_label | escape }}
  </a>
{%- endif -%}
```

**After (design system approach):**
```liquid
{%- if section.settings.button_label != blank -%}
  {%- render 'render-button',
    button_label: section.settings.button_label,
    button_link: section.settings.button_link,
    button_style: section.settings.button_style
  -%}
{%- endif -%}
```

---

## Complete Examples

### Example 1: Section-Level Button

For sections where the button settings are at the root section level:

**Schema:**
```json
{
  "name": "My Section",
  "settings": [
    {
      "type": "text",
      "id": "button_label",
      "label": "Button Label"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button Link"
    },
    {
      "type": "select",
      "id": "button_style",
      "label": "Button Style",
      "options": [
        { "value": "primary", "label": "Primary" },
        { "value": "secondary", "label": "Secondary (Outlined)" },
        { "value": "tertiary", "label": "Tertiary (Text)" }
      ],
      "default": "primary"
    }
  ]
}
```

**Liquid:**
```liquid
{%- render 'render-button',
  button_label: section.settings.button_label,
  button_link: section.settings.button_link,
  button_style: section.settings.button_style
-%}
```

---

### Example 2: Block-Level Button

For sections where buttons are in repeatable blocks:

**Schema:**
```json
{
  "type": "my_block",
  "name": "My Block",
  "settings": [
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA Text"
    },
    {
      "type": "url",
      "id": "cta_link",
      "label": "CTA Link"
    },
    {
      "type": "select",
      "id": "cta_style",
      "label": "CTA Button Style",
      "options": [
        { "value": "primary", "label": "Primary" },
        { "value": "secondary", "label": "Secondary (Outlined)" },
        { "value": "tertiary", "label": "Tertiary (Text)" }
      ],
      "default": "primary"
    }
  ]
}
```

**Liquid:**
```liquid
{%- for block in section.blocks -%}
  {%- if block.settings.cta_text != blank -%}
    {%- render 'render-button',
      button_label: block.settings.cta_text,
      button_link: block.settings.cta_link,
      button_style: block.settings.cta_style
    -%}
  {%- endif -%}
{%- endfor -%}
```

---

### Example 3: Multiple Buttons

For sections with multiple buttons (e.g., primary and secondary CTAs):

**Schema:**
```json
{
  "settings": [
    {
      "type": "header",
      "content": "Primary Button"
    },
    {
      "type": "text",
      "id": "button_label_1",
      "label": "Button 1 Label"
    },
    {
      "type": "url",
      "id": "button_link_1",
      "label": "Button 1 Link"
    },
    {
      "type": "select",
      "id": "button_style_1",
      "label": "Button 1 Style",
      "options": [
        { "value": "primary", "label": "Primary" },
        { "value": "secondary", "label": "Secondary (Outlined)" },
        { "value": "tertiary", "label": "Tertiary (Text)" }
      ],
      "default": "primary"
    },
    {
      "type": "header",
      "content": "Secondary Button"
    },
    {
      "type": "text",
      "id": "button_label_2",
      "label": "Button 2 Label"
    },
    {
      "type": "url",
      "id": "button_link_2",
      "label": "Button 2 Link"
    },
    {
      "type": "select",
      "id": "button_style_2",
      "label": "Button 2 Style",
      "options": [
        { "value": "primary", "label": "Primary" },
        { "value": "secondary", "label": "Secondary (Outlined)" },
        { "value": "tertiary", "label": "Tertiary (Text)" }
      ],
      "default": "secondary"
    }
  ]
}
```

**Liquid:**
```liquid
<div class="button-group">
  {%- if section.settings.button_label_1 != blank -%}
    {%- render 'render-button',
      button_label: section.settings.button_label_1,
      button_link: section.settings.button_link_1,
      button_style: section.settings.button_style_1
    -%}
  {%- endif -%}

  {%- if section.settings.button_label_2 != blank -%}
    {%- render 'render-button',
      button_label: section.settings.button_label_2,
      button_link: section.settings.button_link_2,
      button_style: section.settings.button_style_2
    -%}
  {%- endif -%}
</div>
```

---

## Advanced Usage

### Adding Button Size

```liquid
{%- render 'render-button',
  button_label: 'Shop Now',
  button_link: '/collections/all',
  button_style: 'primary',
  button_size: 'lg'
-%}
```

**Schema addition:**
```json
{
  "type": "select",
  "id": "button_size",
  "label": "Button Size",
  "options": [
    { "value": "sm", "label": "Small" },
    { "value": "md", "label": "Medium" },
    { "value": "lg", "label": "Large" }
  ],
  "default": "md"
}
```

---

### Full-Width Mobile Buttons

```liquid
{%- render 'render-button',
  button_label: 'Add to Cart',
  button_link: '#',
  button_style: 'primary',
  full_width: true
-%}
```

**Schema addition:**
```json
{
  "type": "checkbox",
  "id": "button_full_width",
  "label": "Full-width button (mobile)",
  "default": false
}
```

**Updated render:**
```liquid
{%- render 'render-button',
  button_label: section.settings.button_label,
  button_link: section.settings.button_link,
  button_style: section.settings.button_style,
  full_width: section.settings.button_full_width
-%}
```

---

## Naming Conventions

For consistency across sections, use these naming conventions:

**Section-level buttons:**
- `button_label`, `button_link`, `button_style`

**Block-level CTAs:**
- `cta_text`, `cta_link`, `cta_style`

**Multiple buttons:**
- `button_label_1`, `button_link_1`, `button_style_1`
- `button_label_2`, `button_link_2`, `button_style_2`

---

## Sections Still Needing Updates

The following sections may have buttons that haven't been updated yet:

- `sections/featured-collection.liquid`
- `sections/image-with-text.liquid`
- `sections/rich-text.liquid`
- `sections/slideshow.liquid`

To update these, follow the steps above.

---

## Testing Checklist

After adding button style selectors to a section:

- [ ] Verify all three button styles render correctly (Primary, Secondary, Tertiary)
- [ ] Test hover states for each button type
- [ ] Check responsive behavior on mobile
- [ ] Verify accessibility (keyboard navigation, screen readers)
- [ ] Test with empty button link (should show aria-disabled)
- [ ] Confirm Theme Customizer shows the dropdown correctly

---

## Troubleshooting

**Button not rendering:**
- Check that `snippets/render-button.liquid` exists
- Verify the button_label is not blank
- Ensure you're passing all required parameters

**Button style not changing:**
- Verify the `button_style` parameter is being passed
- Check that design system CSS files are loaded (`ds-config.css`, `ds-buttons.css`)
- Clear browser cache

**Dropdown not showing in Theme Customizer:**
- Check JSON schema syntax (missing commas, brackets)
- Verify the section is saved correctly
- Refresh the Theme Customizer

---

## Migration from Old Button Classes

If you're updating existing sections that use the old `button` class:

**Find:**
```liquid
class="button button--primary"
class="button button--secondary"
```

**Replace with:**
```liquid
{%- render 'render-button', ... -%}
```

The render snippet handles all button classes automatically.

---

## Additional Resources

- Design System Documentation: `README-DESIGN-SYSTEM.md`
- Button Component Docs: `snippets/ds-button-docs.liquid`
- Render Button Source: `snippets/render-button.liquid`

---

**Questions?** Check the design system documentation or review the updated sections for reference implementations.
