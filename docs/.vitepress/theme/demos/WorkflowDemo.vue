<script setup lang="ts">
import { ref } from "vue";
import {
  FzStepper,
  FzSelect,
  FzSlider,
  FzCheckbox,
  FzButton,
  FzAlert,
} from "@forza";
const step = ref(1),
  role = ref(""),
  budget = ref(3400),
  shared = ref<boolean | "indeterminate">(false);
const roles = [
  { value: "duelist", label: "Duelist", description: "Damage and mobility" },
  { value: "guardian", label: "Guardian", description: "Defense and sustain" },
  { value: "caster", label: "Caster", description: "Power and utility" },
];
</script>
<template>
  <div class="demo-stack">
    <FzStepper
      v-model="step"
      label="Build setup"
      :steps="[
        { title: 'Role', description: 'Choose a direction' },
        { title: 'Budget', description: 'Set your limits', disabled: !role },
        { title: 'Ready', description: 'Review the build', disabled: !role },
      ]"
    />
    <div class="workflow-stage">
      <Transition name="fz-state" mode="out-in"
        ><div v-if="step === 1" key="role" class="demo-stack">
          <h4>Every build starts with a role.</h4>
          <FzSelect
            v-model="role"
            label="Build role"
            :options="roles"
            placeholder="Choose your role"
          />
        </div>
        <div v-else-if="step === 2" key="budget" class="demo-stack">
          <h4>Make room for the essentials.</h4>
          <FzSlider
            v-model="budget"
            label="Gold budget"
            :min="1000"
            :max="6000"
            :step="100"
            unit="g"
          /><FzCheckbox
            v-model="shared"
            label="Share with the team"
            description="Make this build available in your workspace."
          />
        </div>
        <FzAlert
          v-else
          key="ready"
          tone="success"
          title="Your starting point is ready."
          >{{ roles.find((r) => r.value === role)?.label }} ·
          {{ budget.toLocaleString() }} gold ·
          {{ shared ? "Team build" : "Personal build" }}. Demo state stays in
          this page.</FzAlert
        ></Transition
      >
    </div>
    <div class="demo-actions">
      <FzButton variant="ghost" :disabled="step === 1" @click="step--"
        >Back</FzButton
      ><FzButton v-if="step < 3" :disabled="!role" @click="step++"
        >Continue</FzButton
      ><FzButton v-else variant="secondary" @click="step = 1"
        >Start again</FzButton
      >
    </div>
  </div>
</template>
