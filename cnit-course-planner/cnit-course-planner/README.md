# CNIT Course Planner

This project is a Vite + Vue 3 application demonstrating:
- Course planner for CNIT core courses
- Pinia store (state management) with localStorage persistence
- Two component implementations included:
  - Composition API (`AppComposition.vue`) — mounted by default
  - Options API (`AppOptions.vue`) — drop-in alternative
- Dark mode toggle
- Animated transitions using `<transition-group>`
- Git-ready structure and build scripts for Vite

How to run:
1. `npm install`
2. `npm run dev`
3. Open the URL printed by Vite (usually http://localhost:5173)

Switching between implementations:
- Edit `src/main.js` and change the import from `AppComposition.vue` to `AppOptions.vue`.

Files to look at:
- `src/store/courses.js` — Pinia store + persistence
- `src/AppComposition.vue` — Composition API version (uses Pinia)
- `src/AppOptions.vue` — Options API version (uses Pinia)
