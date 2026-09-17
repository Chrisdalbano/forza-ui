<script setup lang="ts">
import { shallowRef } from "vue";
import {
  FzDialog,
  FzDrawer,
  FzDropdown,
  FzPopover,
  FzTooltip,
  FzButton,
  FzField,
  FzIcon,
} from "@forza";
defineProps<{ name: string }>();
const open = shallowRef(false),
  build = shallowRef(""),
  action = shallowRef("No action selected");
</script>
<template>
  <div class="demo-stack">
    <template v-if="name === 'Dialog'"
      ><FzButton @click="open = true">Save a build</FzButton
      ><FzDialog
        v-model="open"
        title="Save your build"
        description="Give this build a name so you can find it again."
        ><FzField v-model="build" label="Build name" /><template #footer
          ><FzButton :disabled="!build.trim()" @click="open = false"
            >Save build</FzButton
          ><FzButton variant="ghost" @click="open = false"
            >Cancel</FzButton
          ></template
        ></FzDialog
      ></template
    ><template v-else-if="name === 'Drawer'"
      ><FzButton @click="open = true">Open filters</FzButton
      ><FzDrawer
        v-model="open"
        title="Build filters"
        description="Keep deeper settings close to your workspace."
        ><FzField v-model="build" label="Search builds" /><template #footer
          ><FzButton @click="open = false">Apply filters</FzButton></template
        ></FzDrawer
      ></template
    ><template v-else-if="name === 'Dropdown'"
      ><FzDropdown
        label="Build actions"
        :items="[
          { value: 'duplicate', label: 'Duplicate build' },
          { value: 'archive', label: 'Archive build' },
          { value: 'delete', label: 'Delete build', destructive: true },
        ]"
        @select="action = $event"
      /><output>{{ action }}</output></template
    ><FzPopover v-else-if="name === 'Popover'" label="Build details"
      ><p>
        Your build has three items. Add another to compare its trade-offs.
      </p></FzPopover
    ><FzTooltip v-else text="Tune this build's settings"
      ><FzButton variant="secondary"
        ><FzIcon name="settings" />Build settings</FzButton
      ></FzTooltip
    >
  </div>
</template>
