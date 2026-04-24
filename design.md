# Design System Document

## 1. Creative North Star: "The Luminous Scholar"
This design system is built upon the concept of **The Luminous Scholar**. It is an editorial-first approach that balances the weight of spiritual tradition with the precision of modern technology. We move away from the "cluttered dashboard" aesthetic and toward a "Digital Sanctuary."

The interface should feel like a premium, dark-mode manuscript—where high-contrast typography and deep emerald tones create a sense of focused reverence. We reject the generic grid; instead, we utilize intentional asymmetry, overlapping elements, and vast amounts of whitespace to guide the user’s eye. This isn't just a utility; it is a curated experience for the soul.

---

## 2. Colors: Tonal Depth & Soul
The palette is rooted in a deep, atmospheric emerald (`surface: #0f1413`) punctuated by "Luminous" accents in mint emerald and refined gold.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. We define boundaries through **Background Shifts** and **Tonal Transitions**. 
*   To separate a section, transition from `surface` to `surface-container-low`.
*   To highlight a module, use a shift to `surface-container-high`. 
*   Visual hierarchy is achieved by the "weight" of the color, not the stroke of a pen.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of frosted glass.
*   **Base:** `surface` (#0f1413)
*   **Sectioning:** `surface-container-low` (#181d1b)
*   **Active Modules/Cards:** `surface-container-highest` (#313634)
*   **Nesting Principle:** An inner container must always be visually "closer" to the light source than its parent, using a higher tier of the surface-container scale.

### The "Glass & Gradient" Rule
Standard flat colors feel "out-of-the-box." To achieve a premium finish:
*   **CTAs:** Use subtle linear gradients from `primary` (#5bdcb0) to `primary-container` (#004b38) at a 135-degree angle.
*   **Floating Elements:** Apply Glassmorphism to overlays. Use `surface-bright` at 60% opacity with a `24px` backdrop-blur. This allows the deep emerald background to bleed through, softening the interface.

---

## 3. Typography: Editorial Authority
We use a dual-font strategy to balance character with readability.

*   **Display & Headlines (Manrope):** This is our "voice." Manrope’s geometric yet warm curves provide a tech-forward spiritual vibe. 
    *   *Tighten tracking* by -2% for `display-lg` to create a compact, high-end editorial feel.
*   **Body & Titles (Inter):** Inter is used for technical clarity. It is the "workhorse" that ensures the Quranic text and translations are legible at any size.
*   **Hierarchy as Identity:** Use extreme scale contrast. A `display-lg` headline should sit near a `label-md` metadata point to create "High-End Editorial" tension and visual interest.

---

## 4. Elevation & Depth: Tonal Layering
We move beyond the 2010s "Drop Shadow." Depth is now a result of light and material.

*   **The Layering Principle:** Depth is achieved by "stacking" surface tiers. Place a `surface-container-highest` card on a `surface-container-low` section. This creates a soft, natural lift.
*   **Ambient Shadows:** If an element must float (e.g., a modal), use an extra-diffused shadow. 
    *   *Color:* Use a tinted version of `on-surface` (at 6% opacity) rather than black.
    *   *Blur:* Minimum `spacing-8` (2.75rem) to ensure the shadow feels like ambient light, not a "fuzzy edge."
*   **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use a "Ghost Border." Apply `outline-variant` at **15% opacity**. High-contrast, 100% opaque borders are strictly forbidden.

---

## 5. Components

### Buttons
*   **Primary:** Gradient of `primary` to `primary-container`. Text: `on-primary`. Shape: `full` (9999px) for a sleek, modern feel.
*   **Secondary:** Ghost style. Transparent background with a `secondary` text color and a `Ghost Border`.
*   **States:** On hover, increase the surface brightness by 5%—never use a "darken" effect.

### Input Fields
*   **Style:** Minimalist. No background fill. Only a bottom "Ghost Border" using `outline-variant`.
*   **Focus State:** The bottom border transitions to 100% opacity `primary`, and a subtle `surface-tint` glow appears behind the label.

### Chips (Matching Tags)
*   **Selection Chips:** Use `surface-container-high` with `label-md` typography. When selected, shift to `secondary_container` with `on_secondary_container` text to give it that "Gold" accent feel.

### Lists & Cards (The Recitation Feed)
*   **Constraint:** Zero divider lines. 
*   **Separation:** Use `spacing-6` (2rem) between list items. Separate content blocks by alternating between `surface` and `surface-container-lowest` backgrounds.

### Specialized App Components
*   **The Waveform Monitor:** A custom component for recitation audio. Use `primary` for the active wave and `outline-variant` for the background wave.
*   **Spiritual Progress Medallion:** A circular progress indicator using `secondary` (Gold) accents to denote achievements, styled with a soft `surface-tint` outer glow.

---

## 6. Do’s and Don'ts

### Do
*   **Do** use asymmetrical layouts. Let a headline hang off-center to create a bespoke feel.
*   **Do** lean into `spacing-12` and `spacing-16` for section breathing room. 
*   **Do** use `secondary` (Gold) sparingly for "Divine" moments—success states, streaks, and premium features.

### Don’t
*   **Don’t** use pure black (#000000). Always use the deep emerald `surface` (#0f1413).
*   **Don’t** use standard 1px borders. If you feel the need for a line, try a background color shift instead.
*   **Don’t** crowd the text. If it feels "functional," add more whitespace until it feels "intentional."
*   **Don’t** use sharp corners. Stick to the `xl` (0.75rem) and `full` roundedness scale to keep the tech-forward spiritual vibe soft and approachable.