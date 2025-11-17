import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'cnit_courses_v1'

export const useCoursesStore = defineStore('courses', () => {
  const studentName = ref('Jane Doe')
  const courses = ref([])

  // load initial from localStorage or default
  function load() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        courses.value = parsed.courses || []
        if (parsed.studentName) studentName.value = parsed.studentName
      } catch (e) {
        console.warn('Failed to parse courses from localStorage', e)
      }
    } else {
      courses.value = [
        { id: 1, name: 'CNIT 103 - Hardware', completed: false },
        { id: 2, name: 'CNIT 131 – Internet & Intro to HTML, CSS', completed: false },
        { id: 3, name: 'CNIT 106 – Introduction to Networks', completed: false },
        { id: 4, name: 'CNIT 120 – Network Security', completed: false }
      ]
    }
  }

  function persist() {
    const payload = {
      studentName: studentName.value,
      courses: courses.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }

  function addCourse(name) {
    // prevent duplicate names (case-insensitive)
    if (courses.value.some(c => c.name.toLowerCase() === name.toLowerCase())) return
    courses.value.push({ id: Date.now(), name, completed: false })
    persist()
  }

  function deleteCourse(id) {
    courses.value = courses.value.filter(c => c.id !== id)
    persist()
  }

  function toggleCompleted(id) {
    const it = courses.value.find(c => c.id === id)
    if (it) it.completed = !it.completed
    persist()
  }

  // initialize
  load()

  return { studentName, courses, addCourse, deleteCourse, toggleCompleted, persist, load }
})
