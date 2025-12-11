<template>
  <section class="calculator">
    <header class="calculator__header">
      <h1 class="calculator__title">Калькулятор подсетей</h1>
      <p class="calculator__subtitle">
        Введите IP адрес и выберите маску подсети, чтобы получить адрес сети и количество доступных
        адресов.
      </p>
    </header>

    <form class="calculator__form" @submit.prevent="handleSubmit">
      <UiField label="IP адрес" class="calculator__field">
        <UiInput v-model="ipValue" placeholder="192.168.1.150" />
      </UiField>

      <UiField label="Маска подсети" class="calculator__field">
        <UiSelect v-model="selectedMask" :options="maskOptions" />
      </UiField>

      <UiButton class="calculator__submit" type="submit" :is-disabled="!isValidIp">
        Рассчитать
      </UiButton>
    </form>

    <p v-if="shouldShowError" class="calculator__error">Введите корректный IP адрес.</p>

    <div v-if="hasResult" class="calculator__results">
      <h2 class="calculator__result-title">Результат</h2>
      <div class="calculator__result-grid">
        <div class="calculator__result-card">
          <p class="calculator__result-label">Введенные данные</p>
          <p class="calculator__result-value">{{ calculatedIp }}</p>
          <p class="calculator__result-meta">Маска: {{ calculatedMaskLabel }}</p>
        </div>
        <div class="calculator__result-card">
          <p class="calculator__result-label">Адрес сети</p>
          <p class="calculator__result-value">{{ networkAddress }}</p>
        </div>
        <div class="calculator__result-card">
          <p class="calculator__result-label">Доступные адреса</p>
          <p class="calculator__result-value">{{ formattedAddressesCount }}</p>
          <p class="calculator__result-meta">по формуле 2^n - 2</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { UiButton, UiField, UiInput, UiSelect } from 'is-components-new';
import { SUBNET_MASK_OPTIONS } from '../constants/subnetMasks';
import { getAddressesCount } from '../utils/getAddressesCount';
import { getNetworkAdress } from '../utils/getNetworkAdress';
import { isIpValid } from '../utils/isIpValid';

const fallbackMask = SUBNET_MASK_OPTIONS[0] ?? { label: '', value: '' };
const defaultMask =
  SUBNET_MASK_OPTIONS.find((option) => option.value === '255.255.255.0') ?? fallbackMask;

const ipValue = ref('');
const selectedMask = ref(defaultMask.value);
const calculatedIp = ref('');
const calculatedMask = ref(defaultMask.value);

const maskOptions = computed(() => SUBNET_MASK_OPTIONS.map((option) => option.value));
const isValidIp = computed(() => isIpValid(ipValue.value.trim()));
const shouldShowError = computed(
  () => ipValue.value.trim().length > 0 && !isValidIp.value
);
const hasResult = computed(() => Boolean(calculatedIp.value));

const calculatedMaskLabel = computed(
  () =>
    SUBNET_MASK_OPTIONS.find((option) => option.value === calculatedMask.value)?.label ||
    calculatedMask.value
);

const networkAddress = computed(() =>
  hasResult.value ? getNetworkAdress(calculatedIp.value, calculatedMask.value) : ''
);

const formattedAddressesCount = computed(() => {
  if (!hasResult.value) return '';
  const count = getAddressesCount(calculatedMask.value);
  return count.toLocaleString('ru-RU');
});

function handleSubmit() {
  if (!isValidIp.value) return;

  calculatedIp.value = ipValue.value.trim();
  calculatedMask.value = selectedMask.value;
}
</script>

<style scoped lang="scss">
.calculator {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 28px;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
}

.calculator__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.calculator__title {
  margin: 0;
  font-size: 1.75rem;
}

.calculator__subtitle {
  margin: 0;
  color: #404040;
  max-width: 640px;
}

.calculator__form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  background: linear-gradient(145deg, #f8fbff 0%, #ffffff 70%);
  border: 1px solid var(--color-gray-100);
  border-radius: 12px;
}

.calculator__field {
  flex: 1;
}

.calculator__submit {
  align-self: flex-start;
  min-width: 180px;
}

.calculator__error {
  margin: 0;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: rgba(212, 0, 25, 0.08);
  color: var(--color-error);
  border: 1px solid rgba(212, 0, 25, 0.4);
}

.calculator__results {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border: 1px solid var(--color-gray);
  border-radius: 12px;
  background-color: #f8fbff;
}

.calculator__result-title {
  margin: 0;
}

.calculator__result-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.calculator__result-card {
  padding: 14px 16px;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.05);
}

.calculator__result-label {
  margin: 0;
  font-size: 0.95rem;
  color: #404040;
}

.calculator__result-value {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-black);
  word-break: break-all;
}

.calculator__result-meta {
  margin: 0;
  color: #4a4a4a;
  font-size: 0.9rem;
}

@media (min-width: 760px) {
  .calculator__form {
    flex-direction: row;
    align-items: flex-end;
  }

  .calculator__submit {
    align-self: stretch;
    min-width: 180px;
  }
}
</style>
