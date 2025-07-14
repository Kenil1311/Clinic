# Feature Page Template Guide

This document provides a template structure for creating consistent feature pages across the Clinicia website.

## Page Structure

Each feature page should follow this structure:

### 1. HTML Template Structure
- Same navigation and header as main pages
- Feature-specific hero section
- Capabilities section (6 cards in 2x3 grid)
- Security & compliance section
- Benefits section (4 cards)
- Optional testimonial section
- CTA section
- Footer

### 2. Required Files
- `{feature-name}.html` - Main HTML file
- Route in `main.py` for `/feature-name`
- Uses existing CSS: `style.css`, `features.css`, `feature-page.css`

### 3. CSS Classes Structure
```css
.feature-hero-section
.feature-badge
.feature-hero-title
.feature-hero-subtitle
.feature-capabilities-section
.capability-card
.capability-icon
.feature-security-section
.security-content
.security-features
.security-item
.feature-benefits-section
.benefit-card
.benefit-icon
.feature-cta-section
```

### 4. Content Sections Template

#### Hero Section
- Feature badge with icon
- Feature title
- Subtitle
- Description (2-3 sentences)
- CTA buttons (Start Free Trial, Book Demo)
- Feature mockup with relevant icon

#### Capabilities Section
- Section title: "What Clinicia [Feature] Offers"
- Section subtitle: Brief description
- 6 capability cards with:
  - Icon
  - Title
  - Description
  - Optional bullet points

#### Security Section
- Title: "Secure & Compliant" or similar
- 4 security items with:
  - Icon
  - Description
- Visual element (lock icon)

#### Benefits Section
- Section title: "Benefits of [Feature]"
- 4 benefit cards with:
  - Icon
  - Title
  - Description

#### CTA Section
- Compelling headline
- Brief description
- Two CTA buttons

## Page Metadata Template

```html
<title>[Feature Name] Software for [Target Audience] | Clinicia</title>
<meta name="description" content="[Brief description of feature benefits and capabilities]">
```

## Navigation Updates

When adding new feature pages:
1. Add route in `main.py`
2. Update dropdown links in navigation (both home and feature pages)
3. Update footer links

## Icon Selection

Each feature should have a consistent FontAwesome icon used throughout:
- Hero badge
- Navigation dropdown
- Hero mockup
- Any other feature references

## Example Feature Pages Created

1. **EMR** (`/emr`)
   - Icon: `fas fa-file-medical`
   - Focus: Electronic Medical Records management
   - Key capabilities: Clinical notes, treatment plans, vitals tracking

2. **Prescription** (`/prescription`)
   - Icon: `fas fa-prescription`
   - Focus: Digital prescription management
   - Key capabilities: Digital creation, drug interactions, templates

## Future Feature Pages to Create

Based on the navigation dropdown, these pages should be created:
- `/appointment` - Appointment Scheduling
- `/financial` - Financial Management
- `/consent` - Digital Consent
- `/expense` - Expense Management
- `/inventory` - Inventory Management
- `/images` - Image Management
- `/communication` - Patient Communication
- `/users` - Multi-user Access
- `/membership` - Membership Plans
- `/social` - Social Media Integration
- `/analytics` - Analytics & Reports
- `/dental-lab` - Dental Lab Module

## Mobile Responsiveness

All feature pages use responsive design with:
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly buttons
- Optimized typography scaling
- Appropriate spacing on all devices