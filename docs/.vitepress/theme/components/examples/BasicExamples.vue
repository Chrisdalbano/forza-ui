<script setup lang="ts">
import { shallowRef } from "vue";
import {
  FzButton,
  FzIcon,
  FzBadge,
  FzAlert,
  FzMeter,
  FzStat,
  FzPanel,
} from "@forza";
defineProps<{ name: string }>();
const count = shallowRef(0);
</script>
<template>
  <div class="demo-stack">
    <template v-if="name === 'Button'"
      ><div class="demo-actions">
        <FzButton @click="count++">Create build<FzIcon name="plus" /></FzButton
        ><FzButton variant="secondary" @click="count = 0">Reset</FzButton
        ><FzButton variant="ghost" disabled>Unavailable</FzButton>
      </div>
      <output
        >Created {{ count }} {{ count === 1 ? "build" : "builds" }}</output
      ></template
    >
    <div v-else-if="name === 'Badge'" class="demo-actions">
      <FzBadge>Draft</FzBadge><FzBadge tone="positive">Ready</FzBadge
      ><FzBadge tone="warning">Review</FzBadge
      ><FzBadge tone="accent">Featured</FzBadge>
    </div>
    <FzAlert v-else-if="name === 'Alert'" title="Build saved" tone="success"
      >Your changes are ready for the team.</FzAlert
    ><FzMeter
      v-else-if="name === 'Meter'"
      label="Budget used"
      :value="72"
      :max="100"
    /><FzStat
      v-else-if="name === 'Stat'"
      value="3,200"
      label="Gold budget"
      detail="Ready to allocate"
    /><FzPanel v-else-if="name === 'Panel'" title="Your workspace"
      ><p>Compose any Forza components inside this surface.</p>
      <template #footer
        ><FzButton variant="secondary">Manage builds</FzButton></template
      ></FzPanel
    >
    <div v-else class="demo-actions">
      <FzIcon
        v-for="icon in [
          'plus',
          'check',
          'settings',
          'search',
          'arrowRight',
          'shield',
        ] as const"
        :key="icon"
        :name="icon"
        :size="24"
        :label="icon"
      />
    </div>
  </div>
</template>
