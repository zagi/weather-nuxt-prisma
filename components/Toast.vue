<template>
    <div class="toast">
        <div class="alert" :class="{
            'alert-success': toast.type === 'success',
            'alert-warning': toast.type === 'warning',
            'alert-error': toast.type === 'error'
        }">
            <span>{{ toast.message }}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
const toast = useState<Toast>('toast');
const timeout = setTimeout(() => {
    toast.value = <Toast>{
        show: false,
        type: '',
        message: ''
    }
}, 3000);
onUnmounted(() => {
    clearInterval(timeout);
})
</script>