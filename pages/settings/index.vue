<template>
    <div class="text-xl font-semibold inline-block">
        Degrees
    </div>
    <div class="divider mt-2"></div>
    <MenuSideSettings class="mb-5"></MenuSideSettings>
    <div class="form-control w-full">
        <label class="label">
            Choose your degrees unit
        </label>
        <select class="select w-full" v-model="degree">
            <option disabled>Choose your degrees</option>
            <option v-for="choice in choices" :value="choice.value" :selected="choice.value === degree">
                {{ choice.text }}
            </option>
        </select>
    </div>
</template>
<script setup lang="ts">
const choices: Ref<Array<DegreeChoices>> = ref([
    { text: 'Celsius', value: 'metric' },
    { text: 'Fahrenheit', value: 'imperial' }
]);
const degree = useState<string>('degree');
</script>