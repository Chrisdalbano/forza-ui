<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
const { isDark } = useData();
</script>
<template>
  <div class="fz-theme forza-site" :data-theme="isDark ? 'ink' : 'paper'">
    <DefaultTheme.Layout />
  </div>
</template>
