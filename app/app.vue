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

  <div class="noise" aria-hidden="true" />

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

/* ─── Noise overlay ─────────────────────────────────── */
.noise {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: noise-drift 0.6s steps(1) infinite;
}

@keyframes noise-drift {
  0%   { background-position:   0px   0px; }
  10%  { background-position: -50px -25px; }
  20%  { background-position:  30px  40px; }
  30%  { background-position: -20px  10px; }
  40%  { background-position:  60px -35px; }
  50%  { background-position: -40px  55px; }
  60%  { background-position:  15px -60px; }
  70%  { background-position: -70px  20px; }
  80%  { background-position:  45px  30px; }
  90%  { background-position: -10px -45px; }
  100% { background-position:   0px   0px; }
}
</style>
