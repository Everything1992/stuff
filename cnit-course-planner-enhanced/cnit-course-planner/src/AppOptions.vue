<template>
  <div class="app">
    <h1>Options API Version</h1>
    <p>This is an alternative implementation. Use the Home page for the main app.</p>
  </div>
</template>

<script>
import { useCoursesStore } from './store/courses'
export default {
  name: 'AppOptions',
  setup() {
    const store = useCoursesStore()
    return { store }
  }
}
</script>

<style scoped>
.app { max-width:760px; margin:0 auto; padding:20px; background:var(--card); border-radius:10px; box-shadow:0 6px 20px rgba(0,0,0,0.06); }
</style>
