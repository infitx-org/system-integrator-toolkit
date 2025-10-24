<template>
  <div class="mojaloop-navbar-logo">
    <a 
      href="https://mojaloop.io" 
      target="_blank" 
      rel="noopener noreferrer"
      class="mojaloop-link"
    >
      <img 
        src="/images/MojaloopFoundation.svg" 
        alt="Mojaloop Foundation" 
        class="mojaloop-logo"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'MojaloopNavbarLogo'
}
</script>

<style scoped>
.mojaloop-navbar-logo {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.mojaloop-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.mojaloop-link:hover {
  opacity: 0.8;
}

.mojaloop-logo {
  height: 24px;
  width: auto;
}

@media (max-width: 768px) {
  .mojaloop-navbar-logo {
    margin-left: 10px;
  }
  
  .mojaloop-logo {
    height: 20px;
  }
}
</style>