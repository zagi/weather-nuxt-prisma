<template>
    <ul class="menu menu-horizontal bg-base-200 w-full rounded-box">
        <li class="gap-2" v-for="item in sideSettingsMenuConfig">
            <NuxtLink :to="item.to" activeClass="active">{{ item.name }}</NuxtLink>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { sideSettingsMenuConfig } from "../config/menu";
</script>