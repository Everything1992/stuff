<template>
  <div :class="['app', { dark: darkMode }]">
    <header class="header">
      <div>
        <h1>CNIT Course Planner</h1>
        <h2>{{ studentName }}</h2>
        <p class="count">{{ filtered.length }} courses listed</p>
      </div>

      <div class="controls">
        <label class="dark-toggle">
          <input type="checkbox" v-model="darkMode" />
          Dark
        </label>
      </div>
    </header>

    <div class="filters">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
      <button :class="{ active: filter === 'completed' }" @click="filter = 'completed'">Completed</button>
      <button :class="{ active: filter === 'not' }" @click="filter = 'not'">Not completed</button>
    </div>

    <div class="add-course">
      <input v-model="newCourse" @keyup.enter="addCourse" placeholder="Add a new course..." />
      <button @click="addCourse">Add Course</button>
    </div>

    <transition-group name="list" tag="ul" class="course-list">
      <li v-for="course in filtered" :key="course.id" class="course-item">
        <label class="course-row">
          <input type="checkbox" v-model="course.completed" @change="toggleCompleted(course.id)" />
          <span :class="{ completed: course.completed }">{{ course.name }}</span>
        </label>

        <div class="actions">
          <button class="delete" @click="deleteCourse(course.id)">Delete</button>
        </div>
      </li>
    </transition-group>

    <footer class="footer">
      <small>Double-click a course to duplicate it (convenience demo).</small>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCoursesStore } from './store/courses'

const store = useCoursesStore()

// local UI state
const newCourse = ref('')
const filter = ref('all')
const darkMode = ref(false)

// expose student name from store (Pinia)
const studentName = computed(() => store.studentName)

// computed filtered list
const filtered = computed(() => {
  if (filter.value === 'completed') return store.courses.filter(c => c.completed)
  if (filter.value === 'not') return store.courses.filter(c => !c.completed)
  return store.courses
})

// add/delete/toggle operations delegate to store
function addCourse() {
  const name = newCourse.value.trim()
  if (!name) return
  store.addCourse(name)
  newCourse.value = ''
}

function deleteCourse(id) {
  store.deleteCourse(id)
}

function toggleCompleted(id) {
  store.toggleCompleted(id)
}

// convenience: duplicate item on double-click (not required, but demo)
function duplicateCourse(course) {
  store.addCourse(course.name + ' (copy)')
}

// sync dark preference to localStorage
watch(darkMode, (v) => {
  localStorage.setItem('darkMode', JSON.stringify(v))
}, { immediate: true })

// load initial dark mode
const savedDark = localStorage.getItem('darkMode')
if (savedDark !== null) darkMode.value = JSON.parse(savedDark)
</script>

<style scoped>
/* Scoped styles for composition app */
.app {
  max-width: 720px;
  margin: 36px auto;
  padding: 26px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  font-family: Inter, system-ui, Arial, sans-serif;
  color: #111;
}

.app.dark {
  background: #121217;
  color: #e6eef8;
  box-shadow: none;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 { margin: 0; font-size: 28px; }
.header h2 { margin: 4px 0 0; font-weight: 500; color: #4d4d4d; }
.app.dark .header h2 { color: #b8c6d6; }

.count { margin: 8px 0 0; font-size: 16px; }

.controls { display: flex; gap: 8px; align-items: center; }

.dark-toggle { cursor: pointer; user-select: none; }

.filters {
  display:flex; gap:10px; margin-top:16px; margin-bottom:18px;
}
.filters button {
  border: none; padding:8px 12px; border-radius:8px; background:#eef3ff; cursor:pointer;
}
.filters button.active { background:#2b7cff; color:white; }
.app.dark .filters button { background:#222; color:#ddd; }
.app.dark .filters button.active { background:#3b82f6; }

.add-course { display:flex; gap:10px; margin-bottom:16px; }
.add-course input { flex:1; padding:10px 12px; border-radius:8px; border:1px solid #e2e8f0; }
.app.dark .add-course input { background:#0f1724; border-color:#263042; color:#d6e3f2; }

.add-course button { background:#2b7cff; color:white; border:none; padding:10px 14px; border-radius:8px; cursor:pointer; }

.course-list { list-style:none; padding:0; margin:0; }
.course-item {
  display:flex; align-items:center; justify-content:space-between;
  padding:12px 10px; border-bottom:1px solid #f0f0f5;
}
.app.dark .course-item { border-color:#22242a; }

.course-row { display:flex; align-items:center; gap:12px; cursor:default; }
.course-row input[type='checkbox'] { width:18px; height:18px; }
.completed { text-decoration: line-through; color: gray; }

.actions .delete { background:#ff5c5c; color:white; border:none; padding:7px 10px; border-radius:8px; cursor:pointer; }

/* transition-group animations */
.list-enter-from, .list-leave-to { opacity:0; transform: translateY(-8px) }
.list-enter-active, .list-leave-active { transition: all 280ms cubic-bezier(.2,.9,.2,1) }
</style>
