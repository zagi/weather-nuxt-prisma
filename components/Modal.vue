<template>
    <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="toggleModal">✕</button>
        </form>
        <h3 class="font-bold text-lg">{{ city.name }} </h3>
        <div class="py-4">
            <div class="overflow-y-hidden overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Temperature</th>
                            <th>Temp. Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item, index in city.weathers" :key="index">
                            <td>
                                <Temperature :temperature="item.temperature"></Temperature>
                            </td>
                            <td>{{ $dayjs(item.createdAt).format('YYYY-MM-DD HH:mm') }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    city: {
        type: Object<City>,
        required: true,
    },
});
const emit = defineEmits(['close']);
const toggleModal = () => {
    emit('close');
};
</script>