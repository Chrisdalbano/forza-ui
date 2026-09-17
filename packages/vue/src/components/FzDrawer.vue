<script setup lang="ts">
import FzDialog from "./FzDialog.vue";
withDefaults(
  defineProps<{
    title: string;
    description?: string;
    side?: "right" | "bottom";
    closeOnOutside?: boolean;
  }>(),
  { side: "right", closeOnOutside: true },
);
const open = defineModel<boolean>({ required: true });
</script>
<template>
  <FzDialog
    v-model="open"
    :title="title"
    :description="description"
    :placement="side"
    :close-on-outside="closeOnOutside"
    ><template #default="scope"><slot v-bind="scope" /></template
    ><template v-if="$slots.footer" #footer="scope"
      ><slot name="footer" v-bind="scope" /></template
  ></FzDialog>
</template>
