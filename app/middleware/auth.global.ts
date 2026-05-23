export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return
  try {
    const auth = localStorage.getItem('outside-auth-v1')
    if (!auth && to.path !== '/') {
      return navigateTo('/')
    }
  } catch {}
})
