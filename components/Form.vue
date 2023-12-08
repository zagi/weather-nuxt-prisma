<template>
    <div class="form-control w-full">
        <label class="label">
            <span class="label-text">Add a city/cities</span>
            <span class="label-text-alt">Hit enter to add a city</span>
        </label>
        <input type="text" placeholder="Type here" v-model="input" @keyup.enter="addItem"
            class="input input-bordered w-full" />
        <label class="label">
            <span class="label-text-alt">eg. Warszawa</span>
        </label>
    </div>
    <div v-if="items.length > 0" class="mb-3">
        <div v-for="(item, index) in items" :key="index" class="badge badge-neutral gap-2 mr-1">
            {{ item }}
            <svg @click="removeItem(index)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    </div>
    <button class="btn" :disabled="!hasItems" @click="send">Send</button>
</template>
  
<script setup lang="ts">
const input = ref<string>('');
const items = ref<Array<string>>([]);
const cityNames = ref<Set<string>>(new Set());
const toast = useState<Toast>('toast');
const cities = useState<City[]>('cities');
const loading = useState<boolean>('loading');

const hasItems = computed(() => items.value.length > 0);

watch(cities, (newCities) => {
    cityNames.value = new Set(newCities.map((city: City) => city.name));
});

function addItem() {
    const trimmedInput = input.value.trim();
    if (!trimmedInput) return;

    if (cityNames.value.has(trimmedInput)) {
        showToast('error', 'City already in the system');
        input.value = '';
        return;
    }

    items.value.push(trimmedInput);
    input.value = '';
}

function removeItem(index: number) {
    items.value.splice(index, 1);
}

async function send() {
    if (!hasItems.value) return;
    loading.value = true;

    try {
        const { data } = await useFetch<City[]>('/api/weather', {
            method: 'post',
            body: { cities: items.value }
        });

        data.value.forEach((item: City) => cities.value.push(item));
        showToast('success', 'City added successfully');
    } catch (err) {
        showToast('error', 'Something went wrong');
    } finally {
        loading.value = false;
        items.value = [];
    }
}

function showToast(type: 'success' | 'error', message: string) {
    toast.value = { show: true, type, message };
}
</script>