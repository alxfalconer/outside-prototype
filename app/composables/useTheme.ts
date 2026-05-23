const _isLight = ref(false)

export function useTheme() {
  function toggle() {
    _isLight.value = !_isLight.value
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', _isLight.value ? 'light' : 'dark')
    }
  }

  return { isLight: readonly(_isLight), toggle }
}
