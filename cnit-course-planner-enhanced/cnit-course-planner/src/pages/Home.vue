<template>
  <div class="app">
    <header class="header">
      <div>
        <h1>CNIT Course Planner</h1>
        <h2>{{ studentName }}</h2>
        <p class="count">{{ filtered.length }} courses listed</p>
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

    <p v-if="message" :class="['message', messageType]">{{ message }}</p>

    <transition-group name="list" tag="ul" class="course-list">
      <li v-for="course in filtered" :key="course.id" class="course-item">
        <label class="course-row" @dblclick="duplicateCourse(course)">
          <input type="checkbox" :checked="course.completed" @change="toggleCompleted(course.id)" />
          <span :class="{ completed: course.completed }">{{ course.name }}</span>
        </label>

        <div class="actions">
          <button class="delete" @click="deleteCourse(course.id)">Delete</button>
        </div>
      </li>
    </transition-group>

    <footer class="footer">
      <small>Tip: Double-click a course to duplicate it.</small>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCoursesStore } from '../store/courses'

const store = useCoursesStore()

const newCourse = ref('')
const filter = ref('all')
const darkMode = ref(JSON.parse(localStorage.getItem('darkMode') || 'false'))

const studentName = store.studentName
const filtered = computed(() => {
  if (filter.value === 'completed') return store.courses.filter(c => c.completed)
  if (filter.value === 'not') return store.courses.filter(c => !c.completed)
  return store.courses
})

const message = ref('')
const messageType = ref('')
let msgTimer = null

function showMessage(text, type='success') {
  clearTimeout(msgTimer)
  message.value = text
  messageType.value = type
  msgTimer = setTimeout(() => { message.value = ''; messageType.value = '' }, 3000)
}

function addCourse() {
  const name = newCourse.value.trim()
  if (!name) {
    showMessage('Course name cannot be empty.', 'error')
    return
  }
  if (store.courses.some(c => c.name.toLowerCase() === name.toLowerCase())) {
    showMessage('This course is already listed.', 'error')
    return
  }
  store.addCourse(name)
  newCourse.value = ''
  showMessage('Course added.', 'success')
}

function deleteCourse(id) {
  store.deleteCourse(id)
  showMessage('Course deleted.', 'success')
}

function toggleCompleted(id) {
  store.toggleCompleted(id)
}

function duplicateCourse(course) {
  store.addCourse(course.name + ' (copy)')
  showMessage('Course duplicated.', 'success')
}

watch(darkMode, (v) => localStorage.setItem('darkMode', JSON.stringify(v)), { immediate: true })
</script>

<style scoped>
.app { max-width:760px; margin:0 auto; padding:20px; background:var(--card); border-radius:10px; box-shadow:0 6px 20px rgba(0,0,0,0.06); }
.header h1 { margin:0; font-size:26px }
.header h2 { margin:4px 0 0; color:var(--muted) }
.count { margin-top:8px; color:var(--muted) }
.filters { display:flex; gap:8px; margin-top:12px; margin-bottom:14px }
.filters button { padding:8px 12px; border-radius:8px; border:none; background:#eef3ff; cursor:pointer }
.filters button.active { background:var(--accent); color:white }
.add-course { display:flex; gap:10px; margin-bottom:12px }
.add-course input { flex:1; padding:10px; border-radius:8px; border:1px solid #e2e8f0 }
.add-course button { padding:10px 14px; background:var(--accent); color:white; border:none; border-radius:8px; cursor:pointer }
.message { padding:10px; border-radius:8px; margin-bottom:10px }
.message.error { background:#ffece8; color:#a71800 }
.message.success { background:#e9fff1; color:#0b6a3b }
.course-list { list-style:none; padding:0; margin:0 }
.course-item { display:flex; align-items:center; justify-content:space-between; padding:12px; border-bottom:1px solid #f0f0f5 }
.course-row { display:flex; align-items:center; gap:12px }
.completed { text-decoration:line-through; color:gray }
.actions .delete { background:#ff5c5c; color:white; border:none; padding:7px 10px; border-radius:8px; cursor:pointer }
.list-enter-from, .list-leave-to { opacity:0; transform:translateY(-8px) }
.list-enter-active, .list-leave-active { transition: all 280ms cubic-bezier(.2,.9,.2,1) }
.footer { margin-top:14px; color:var(--muted) }
</style>
