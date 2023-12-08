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
                            <button class="btn btn-xs" @click="openDetails(row)">Details</button>
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
defineProps({
    data: {
        type: Array<any>,
        required: true,
    },
})

const modal: Ref<boolean> = ref(false);
const modalItem: Ref<City | null> = ref(null);
function toggleModal(): void {
    modal.value = !modal.value;
}

function openDetails(row: any): void {
    modalItem.value = row;
    modal.value = true;
}
</script>