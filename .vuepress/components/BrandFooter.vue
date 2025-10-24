<template>
  <div class="brand-footer">
    <div class="brand-logos">
      <img 
        src="/images/INFITX-Africa.png" 
        alt="Infitx Africa" 
        class="brand-logo"
      />
      <span class="partnership-symbol">×</span>
      <img 
        src="/images/MojaloopFoundation.svg" 
        alt="Mojaloop Foundation" 
        class="brand-logo"
      />
    </div>
    <p class="brand-text">
      Powered by <strong>Infitx Africa</strong> in partnership with <strong>Mojaloop Foundation</strong>
    </p>
  </div>
</template>

<script>
export default {
  name: 'BrandFooter'
}
</script>

<style scoped>
.brand-footer {
  text-align: center;
  padding: 2rem 0;
  border-top: 1px solid var(--c-border);
  margin-top: 2rem;
}

.brand-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 1rem;
}

.brand-logo {
  height: 40px;
  width: auto;
  vertical-align: middle;
}

.partnership-symbol {
  font-size: 18px;
  color: #666;
  font-weight: bold;
}

.brand-text {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .brand-logos {
    flex-direction: column;
    gap: 10px;
  }
  
  .partnership-symbol {
    display: none;
  }
  
  .brand-logo {
    height: 30px;
  }
}
</style>