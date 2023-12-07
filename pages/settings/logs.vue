<template>
    <div class="text-xl font-semibold inline-block">
        Logs
    </div>
    <div class="divider mt-2"></div>
    <MenuSideSettings class="mb-5"></MenuSideSettings>
    <div v-if="logs.length > 0" class="overflow-x-auto">
        <table class="table">
            <thead>
                <tr>
                    <th>Status</th>
                    <!-- <th>Request</th> -->
                    <th>Description</th>
                    <th>Created at</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="log in logs">
                    <td>{{ log.status }}</td>
                    <!-- <td>{{ log.request }}</td> -->
                    <td>{{ log.desc }}</td>
                    <td>{{ $dayjs(log.createdAt).format('YYYY-MM-DD HH:mm') }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
const logs = useState('logs', () => {
    return [];
});
const { data } = await useFetch('/api/logs')
onMounted(() => {
    logs.value = data;
});
</script>