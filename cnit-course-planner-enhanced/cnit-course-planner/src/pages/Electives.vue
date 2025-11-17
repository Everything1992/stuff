<template>
  <div class="card">
    <h2>Electives / Web Dev Suggestions</h2>
    <p>Suggested electives you can add to your plan:</p>
    <ul>
      <li v-for="s in suggestions" :key="s">
        {{ s }}
        <button @click="add(s)" style="margin-left:12px">Add</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCoursesStore } from '../store/courses'
const store = useCoursesStore()
const suggestions = [
  'CNIT 121 – Web Development',
  'CNIT 132 – Advanced HTML/CSS',
  'CNIT 140 – JavaScript Fundamentals',
  'CNIT 150 – Frontend Frameworks'
]
function add(name) {
  store.addCourse(name)
}
</script>

<style scoped>
.card { max-width:720px; padding:20px; background:var(--card); border-radius:10px; box-shadow:0 6px 20px rgba(0,0,0,0.05) }
button { background:var(--accent); color:white; border:none; padding:6px 10px; border-radius:6px; cursor:pointer }
</style>
