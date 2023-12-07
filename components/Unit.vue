<template>
    <span>{{ unit }}</span>
</template>
<script setup type="ts">
const props = defineProps({
    unit: {
        type: String,
        required: true,
    }
})
const unit = computed(() => {
    return props.unit === 'metric' ? 'C' : 'F'
})
</script>