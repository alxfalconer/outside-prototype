<template>
  <NuxtRouteAnnouncer />

  <!-- SVG grain filter — referenced by EventFlyer via filter: url(#grain) -->
  <svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
    <defs>
      <filter id="grain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
        <feColorMatrix type="saturate" values="0" in="noise" result="gray"/>
        <feBlend in="SourceGraphic" in2="gray" mode="multiply"/>
      </filter>
    </defs>
  </svg>

  <AppHeader />

  <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity var(--transition-fade);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
