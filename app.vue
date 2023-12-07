<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
const degree = useState('degree', () => {
  return "metric"
})
const toast = useState<Toast>('toast', () => {
  return <Toast>{
    show: false,
    type: '',
    message: ''
  }
});
const loading = useState<boolean>('loading', () => {
    return true
});
</script>