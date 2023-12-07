<template>
    <div class="drawer h-screen">
        <input id="side-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
            <!-- Navbar -->
            <div class="w-full lg:w-1/2 mx-auto navbar bg-base-000">
                <div class="flex-none lg:hidden">
                    <label for="side-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block w-6 h-6 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                </div>
                <div class="lg:flex-1 px-2 mx-2">Weather app</div>
                <div class="lg:flex-none hidden lg:block">
                    <ul class="menu lg:menu-horizontal">
                        <li class="gap-2" v-for="item in topMenuConfig">
                            <NuxtLink :to="item.to" activeClass="active">{{ item.name }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
            <main class="h-full w-screen lg:w-full pt-8 px-4 bg-base-200">
                <div class="card w-full lg:w-1/2 mx-auto p-6 bg-base-100 shadow-xl mt-2 mb-10">
                    <slot />
                </div>
            </main>
        </div>
        <div class="drawer-side">
            <label for="side-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu p-4 w-60 lg:w-80 min-h-full bg-base-200">
                <li class="gap-2" v-for="item in topMenuConfig">
                    <NuxtLink :to="item.to" activeClass="active">{{ item.name }}</NuxtLink>
                </li>
            </ul>
        </div>
        <Toast v-if="toast.show"></Toast>
    </div>
</template>
<script setup lang="ts">
import { topMenuConfig } from "../config/menu";
const toast = useState<Toast>('toast');
</script>