<script setup lang="ts">
import { shallowRef } from "vue";
import { FzField, FzSelect, FzSlider, FzCheckbox, FzSwitch } from "@forza";
defineProps<{ name: string }>();
const text = shallowRef(""),
  role = shallowRef("guardian"),
  gold = shallowRef(3200),
  checked = shallowRef<boolean | "indeterminate">(false),
  enabled = shallowRef(true);
</script>
<template>
  <div class="demo-stack">
    <FzField
      v-if="name === 'Field'"
      v-model="text"
      label="Build name"
      placeholder="Give your build a name"
      hint="A name your team will recognize."
    /><FzSelect
      v-else-if="name === 'Select'"
      v-model="role"
      label="Choose a role"
      :options="[
        { value: 'guardian', label: 'Guardian' },
        { value: 'duelist', label: 'Duelist' },
        { value: 'caster', label: 'Caster' },
      ]"
    /><FzSlider
      v-else-if="name === 'Slider'"
      v-model="gold"
      label="Gold budget"
      :min="1000"
      :max="6000"
      :step="100"
      unit="g"
    /><FzCheckbox
      v-else-if="name === 'Checkbox'"
      v-model="checked"
      label="Share with the team"
      description="Make this build available in your workspace."
    /><FzSwitch v-else v-model="enabled" label="Show precise values" /><output
      class="demo-feedback"
      >Current value:
      {{
        name === "Field"
          ? text || "(empty)"
          : name === "Select"
            ? role
            : name === "Slider"
              ? gold
              : name === "Checkbox"
                ? checked
                : enabled
      }}</output
    >
  </div>
</template>
