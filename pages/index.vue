<template>
    <div class="text-xl font-semibold inline-block">
        Weather
    </div>
    <div class="divider mt-2"></div>
    <Form></Form>
    <TableSimpleCities v-if="!loading" :data="cities" @updateData="handleUpdateData" @deleteData="handleDeleteData">
    </TableSimpleCities>
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
const cities = useState<City[]>('cities', () => {
    return [];
});

const fetchWeather = async () => {
    try {
        const { data } = await useFetch<City[]>('/api/weather');
        cities.value = data.value || [];
    } catch (err) {
        toast.value = { show: true, type: 'error', message: 'Failed to fetch weather data' };
    } finally {
        loading.value = false;
    }
};
await fetchWeather();

async function fetchNewData() {
    try {
        loading.value = true;
        await useFetch('/api/update', {
            method: 'post',
            body: {
                cities: []
            }
        });
        await fetchWeather();
        toast.value = { show: true, type: 'success', message: 'Weather data updated successfully' };
    } catch (err) {
        toast.value = { show: true, type: 'error', message: 'Something went wrong' };
    }
}

function handleUpdateData(cityId: number, newData: City) {
    const index = cities.value.findIndex(city => city.id === cityId);
    if (index !== -1) {
        cities.value[index] = newData;
    }
}
function handleDeleteData(cityId: number) {
    cities.value = cities.value.filter((el) => { return el.id != cityId })
}
</script>