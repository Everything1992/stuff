<template>
  <div :class="['root', { dark: isDark }]">
    <aside class="sidebar">
      <div class="brand">
        <h1>CNIT Planner</h1>
        <p class="student">{{ store.studentName }}</p>
      </div>

      <nav>
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/electives" class="nav-item">Electives</router-link>
        <router-link to="/profile" class="nav-item">Profile</router-link>
        <router-link to="/options" class="nav-item">Options API</router-link>
      </nav>

      <div class="spacer"/>

      <div class="theme">
        <label>
          <input type="checkbox" v-model="isDark" />
          Dark Mode
        </label>
      </div>
    </aside>

    <main class="main">
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCoursesStore } from './store/courses'
const store = useCoursesStore()

const isDark = ref(false)
const saved = localStorage.getItem('darkMode')
if (saved !== null) isDark.value = JSON.parse(saved)
isDark.value = isDark.value

watch && null
</script>

<style scoped>
.root { display:flex; min-height:100vh; background:var(--bg); color:var(--text); }
.sidebar { width:220px; padding:20px; background:var(--card); box-shadow:2px 0 6px rgba(0,0,0,0.04); display:flex; flex-direction:column; }
.brand h1 { margin:0; font-size:20px; }
.student { margin:6px 0 12px; color:var(--muted); font-size:14px; }
.nav-item { display:block; padding:8px 10px; border-radius:6px; color:inherit; text-decoration:none; margin-bottom:6px; }
.router-link-active { background:var(--accent); color:white; }
.spacer { flex:1; }
.main { flex:1; padding:28px; }
.theme { font-size:14px; color:var(--muted); }

/* page transition */
.page-enter-active, .page-leave-active { transition: opacity 300ms ease, transform 300ms ease; }
.page-enter-from { opacity:0; transform: translateY(6px); }
.page-leave-to { opacity:0; transform: translateY(-6px); }

/* dark adjustments */
.root.dark { --bg:#07070b; --card:#0f1720; --text:#dbeafe; --muted:#9fb3cf; --accent:#3b82f6; }
</style>
