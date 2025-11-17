<template>
  <div :class="['app', { dark: darkMode }]">
    <header class="header">
      <div>
        <h1>CNIT Course Planner (Options API)</h1>
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

  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useCoursesStore } from './store/courses'

export default {
  name: 'AppOptions',
  setup() {
    const store = useCoursesStore()
    const newCourse = ref('')
    const filter = ref('all')
    const darkMode = ref(false)

    const studentName = computed(() => store.studentName)

    const filtered = computed(() => {
      if (filter.value === 'completed') return store.courses.filter(c => c.completed)
      if (filter.value === 'not') return store.courses.filter(c => !c.completed)
      return store.courses
    })

    function addCourse() {
      const name = newCourse.value.trim()
      if (!name) return
      store.addCourse(name)
      newCourse.value = ''
    }
    function deleteCourse(id) { store.deleteCourse(id) }
    function toggleCompleted(id) { store.toggleCompleted(id) }

    const savedDark = localStorage.getItem('darkMode')
    if (savedDark !== null) darkMode.value = JSON.parse(savedDark)
    darkMode.value = darkMode.value

    return { newCourse, filter, darkMode, studentName, filtered, addCourse, deleteCourse, toggleCompleted }
  }
}
</script>

<style scoped>
/* reuse same styles as composition file for parity */
@import './AppComposition.vue?style'
</style>
