const STORAGE_KEY = 'outside-auth-v1'

const _isAuthenticated = ref(false)
let _initialized = false

function init() {
  if (_initialized) return
  _initialized = true
  if (import.meta.client) {
    try {
      _isAuthenticated.value = !!localStorage.getItem(STORAGE_KEY)
    } catch {}
  }
}

export function useAuth() {
  onMounted(init)

  function login(email: string, password: string): boolean {
    if (!email.trim() || !password.trim()) return false
    try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
    _isAuthenticated.value = true
    return true
  }

  function logout() {
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
    _isAuthenticated.value = false
  }

  return {
    isAuthenticated: readonly(_isAuthenticated),
    login,
    logout,
  }
}
