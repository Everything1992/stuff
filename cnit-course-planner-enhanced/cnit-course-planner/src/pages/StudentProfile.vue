<template>
  <div class="card">
    <h2>Student Profile</h2>
    <p><strong>Name:</strong> {{ name }}</p>
    <p><strong>Courses listed:</strong> {{ store.courses.length }}</p>

    <h3>Core Courses</h3>
    <ul>
      <li v-for="c in core" :key="c.id">{{ c.name }} <span v-if="c.completed">(completed)</span></li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCoursesStore } from '../store/courses'
const store = useCoursesStore()
const name = store.studentName
const core = computed(() => store.courses.filter(c => ['CNIT 103 - Hardware','CNIT 131 – Internet & Intro to HTML, CSS','CNIT 106 – Introduction to Networks','CNIT 120 – Network Security'].includes(c.name)))
</script>

<style scoped>
.card { max-width:720px; padding:20px; background:var(--card); border-radius:10px; box-shadow:0 6px 20px rgba(0,0,0,0.05) }
</style>
