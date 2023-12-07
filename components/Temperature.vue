<template>
    <span class="badge" :class="{
        'badge-info': temperature > -100,
        'badge-success': temperature > 15,
        'badge-warning': temperature > 25,
        'badge-error': temperature > 30
    }">
        {{ tempUnitValue(temperature) }}<Unit :unit="degree"></Unit>
    </span>
</template>
<script setup lang="ts">
defineProps({
    temperature: { type: Number, required: true },
})
const degree = useState<string>('degree');
function tempUnitValue(value: number): number {
    if (degree.value === 'metric') return value;
    else return (value * 9 / 5) + 32;
}
</script>