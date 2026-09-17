<script setup lang="ts">
import { onMounted, shallowRef, useTemplateRef } from "vue";
const anchor = useTemplateRef<HTMLElement>("anchor");
const target = shallowRef<HTMLElement>();
onMounted(() => {
  target.value =
    anchor.value?.closest<HTMLElement>(".fz-theme") ?? document.body;
});
</script>
<template>
  <span ref="anchor" hidden /><Teleport v-if="target" :to="target"
    ><slot
  /></Teleport>
</template>
