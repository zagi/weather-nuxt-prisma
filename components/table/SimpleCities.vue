<template>
    <div v-if="data.length > 0">
        <div class="mt-6"></div>
        <div class="text-xl font-semibold inline-block">
            Cities
        </div>
        <div class="divider mt-2"></div>
        <div class="overflow-y-hidden overflow-x-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Country Code</th>
                        <th>Temperature</th>
                        <th>Temp. Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row, rowIndex in data" :key="rowIndex">
                        <td>
                            <NuxtLink :to="`https://maps.google.com/?q=${row.lat},${row.lon}`" target="_blank">
                                {{ row.name }}
                            </NuxtLink>
                        </td>
                        <td>{{ row.country }}</td>
                        <td>
                            <Temperature :temperature="row.weathers[0].temperature"></Temperature>
                        </td>
                        <td>{{ $dayjs(row.weathers[0].createdAt).format('YYYY-MM-DD HH:mm') }}</td>
                        <td>
                            <button class="btn btn-xs mr-1" @click="openDetails(row)">
                                <ListBulletIcon class="h-4 w-4" />
                            </button>
                            <button class="btn btn-xs mr-1" @click="fetchNewData(row)">
                                <ArrowPathIcon class="h-4 w-4" />
                            </button>
                            <button class="btn btn-xs" @click="deleteCity(row)">
                                <TrashIcon class="h-4 w-4" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <dialog id="detail-modal" class="modal" :class="{ 'modal-open': modal }">
        <Modal @close="toggleModal" :city="modalItem" v-if="modal"></Modal>
    </dialog>
</template>
<script setup lang="ts">
import { ListBulletIcon, ArrowPathIcon, TrashIcon } from '@heroicons/vue/24/solid'
defineProps({
    data: {
        type: Array<City>,
        required: true,
    },
});
const emit = defineEmits(['updateData', 'deleteData']);
const toast = useState<Toast>('toast');
const modal: Ref<boolean> = ref(false);
const modalItem: Ref<City | null> = ref(null);
function toggleModal(): void {
    modal.value = !modal.value;
}

function openDetails(row: any): void {
    modalItem.value = row;
    modal.value = true;
}
async function fetchNewData(city: City) {
    try {
        const { data } = await useFetch('/api/update', {
            method: 'post',
            body: {
                cities: [city]
            }
        });
        emit('updateData', city.id, data.value.updated[0]);
        toast.value = { show: true, type: 'success', message: 'Weather data updated successfully' };
    } catch (err) {
        toast.value = { show: true, type: 'error', message: 'Something went wrong' };
    }
}

async function deleteCity(city: City) {
    try {
        const { data } = await useFetch('/api/city', {
            method: 'delete',
            body: {
                id: city.id
            }
        });
        emit('deleteData', city.id);
        toast.value = { show: true, type: 'success', message: 'City deleted successfully' };
    } catch (err) {
        toast.value = { show: true, type: 'error', message: 'Something went wrong' };
    }
}
</script>