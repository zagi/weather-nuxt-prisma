<template>
    <div class="text-xl font-semibold inline-block">
        Weather
    </div>
    <div class="divider mt-2"></div>
    <Form></Form>
    <TableSimpleCities v-if="!loading" :data="cities"></TableSimpleCities>
    <div class="mx-auto pt-2" v-else>
        <span class="loading loading-ring loading-lg"></span>
    </div>
    <button class="btn btn-sm mt-2" v-if="!loading && cities.length > 0" @click="fetchNewData()">
        Fetch new weather data for each city
    </button>
</template>
<script setup lang="ts">
const loading = useState<boolean>('loading');
const toast = useState<Toast>('toast');
const cities = useState('cities', () => {
    return [];
});
const { data } = await useFetch('/api/weather')
onMounted(() => {
    cities.value = data;
    loading.value = false;
});
async function fetchNewData() {
    try {
        loading.value = true;
        await useFetch('/api/update')
        const { data } = await useFetch('/api/weather')
        cities.value = data;
        loading.value = false;
        toast.value = <Toast>{
            show: true,
            type: 'success',
            message: 'Weather data updated successfully'
        }
    } catch (err) {
        toast.value = <Toast>{
            show: true,
            type: 'error',
            message: 'Something went wrong'
        }
    }
}
</script>