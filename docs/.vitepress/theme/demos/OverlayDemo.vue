<script setup lang="ts">
import { ref } from "vue";
import {
  FzDropdown,
  FzPopover,
  FzTooltip,
  FzDrawer,
  FzButton,
  FzIcon,
  FzSelect,
  FzSlider,
  FzBadge,
} from "@forza";
const drawer = ref(false),
  status = ref("All builds"),
  filter = ref("all"),
  draft = ref("all"),
  budget = ref(5000),
  draftBudget = ref(5000);
const options = [
  { value: "all", label: "All builds" },
  { value: "team", label: "Team builds" },
  { value: "personal", label: "Personal builds" },
];
function openFilters() {
  draft.value = filter.value;
  draftBudget.value = budget.value;
  drawer.value = true;
}
function apply() {
  filter.value = draft.value;
  budget.value = draftBudget.value;
  status.value =
    options.find((o) => o.value === filter.value)?.label ?? "All builds";
  drawer.value = false;
}
</script>
<template>
  <div class="demo-stack">
    <div class="demo-actions">
      <FzDropdown
        label="Build actions"
        heading="Workspace"
        :items="[
          { value: 'duplicate', label: 'Duplicate build' },
          { value: 'archive', label: 'Archive build' },
          { value: 'delete', label: 'Delete build', destructive: true },
        ]"
        @select="
          status =
            $event === 'duplicate'
              ? 'Build duplicated'
              : $event === 'archive'
                ? 'Build archived'
                : 'Build deleted'
        "
      /><FzTooltip text="Adjust visibility and your gold limit"
        ><FzButton
          variant="secondary"
          aria-label="Open build filters"
          @click="openFilters"
          ><FzIcon name="settings" />Filters</FzButton
        ></FzTooltip
      ><FzPopover label="How filters work"
        ><p style="margin: 0">
          Filters belong to your workspace. Changes only take effect when you
          choose <strong>Apply filters</strong>.
        </p></FzPopover
      >
    </div>
    <div class="overlay-preview">
      <FzIcon name="shield" :size="32" />
      <h4>Your workspace, your rules.</h4>
      <p>Quick actions stay close. Deeper settings get room to breathe.</p>
      <FzBadge>{{ status }}</FzBadge>
      <p>Up to {{ budget.toLocaleString() }} gold</p>
    </div>
    <span role="status" class="demo-feedback">{{ status }}</span
    ><FzDrawer
      v-model="drawer"
      title="Build filters"
      description="Refine the builds shown in your workspace."
      ><div class="demo-stack drawer-fields">
        <FzSelect
          v-model="draft"
          label="Visibility"
          :options="options"
        /><FzSlider
          v-model="draftBudget"
          label="Maximum gold"
          :min="1000"
          :max="6000"
          :step="100"
          unit="g"
        />
      </div>
      <template #footer
        ><FzButton @click="apply">Apply filters</FzButton
        ><FzButton variant="ghost" @click="drawer = false"
          >Cancel</FzButton
        ></template
      ></FzDrawer
    >
  </div>
</template>
