<script setup lang="ts">
import { ConfigProvider } from "reka-ui";
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
const { isDark } = useData();
</script>
<template>
  <ConfigProvider :scroll-body="false">
    <div class="fz-theme forza-site" :data-theme="isDark ? 'ink' : 'paper'">
      <DefaultTheme.Layout />
    </div>
  </ConfigProvider>
</template>
