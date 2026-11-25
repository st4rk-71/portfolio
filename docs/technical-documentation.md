# Technical Documentation

## Overview
A single-page portfolio built with plain HTML, CSS and JavaScript and deployed on GitHub Pages. There is no build step.

## Files
- `index.html`: all sections (hero, about, experience, senior project, projects, skills, contact)
- `css/styles.css`: design tokens (CSS custom properties) for dark and light themes, layout (Grid and Flexbox), animations and responsive breakpoints at 900px and 560px
- `js/script.js`: all interactivity

## JavaScript features
| Feature | How it works |
|---|---|
| Theme toggle | Adds or removes the `light` class on `<html>`; saved in `localStorage` and applied before first paint by a small inline script |
| Scroll progress bar | `scaleX` of a fixed bar based on `scrollY / (scrollHeight - innerHeight)` |
| Header on scroll | Adds a blurred background after 20px of scrolling |
| Timeline fill | Sets the `--tl` CSS variable from the timeline's position in the viewport |
| Reveal on scroll | `IntersectionObserver` adds `.in` to `.reveal` elements, with a small stagger between siblings |
| Count-up stats | `IntersectionObserver` and `requestAnimationFrame` with ease-out |
| Active nav link | `IntersectionObserver` on each section |
| Hero background | Canvas of drifting points joined by lines when close; resizes with the window and stops animating under reduced motion |
| Contact form | Client-side validation, then `fetch` POST to Formspree with success and error messages |

## Accessibility
- Semantic sections, labelled buttons and `aria-expanded` on the menu button
- `role="status"` for form feedback
- All motion is disabled when `prefers-reduced-motion` is set
