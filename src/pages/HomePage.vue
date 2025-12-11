<template>
  <div class="page">
    <div class="page__content">
      <SubnetCalculator />
    </div>
  </div>
</template>

<script setup lang="ts">
import SubnetCalculator from '../components/SubnetCalculator.vue';
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, #f2f7ff 0%, #ffffff 60%);
  padding: 48px 12px;
}

.page__content {
  width: 100%;
  max-width: 1080px;
  display: flex;
  justify-content: center;
}
</style>
