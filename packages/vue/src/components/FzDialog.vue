<script setup lang="ts">
import { watch, onBeforeUnmount, useId } from "vue";
import {
  DialogRoot,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "reka-ui";
import FzPortal from "../internal/FzPortal.vue";
import FzButton from "./FzButton.vue";
import FzIcon from "./FzIcon.vue";
withDefaults(
  defineProps<{
    title: string;
    description?: string;
    closeOnOutside?: boolean;
    placement?: "center" | "right" | "bottom";
  }>(),
  { closeOnOutside: true, placement: "center" },
);
const model = defineModel<boolean>({ required: true });
const descriptionId = useId();
let opener: HTMLElement | null = null;
watch(model, (open) => {
  if (open && typeof document !== "undefined")
    opener = document.activeElement as HTMLElement;
});
function restoreFocus(event: Event) {
  event.preventDefault();
  if (opener?.isConnected) opener.focus();
}
onBeforeUnmount(() => {
  if (model.value && opener?.isConnected) opener.focus();
});
</script>
<template>
  <DialogRoot v-model:open="model"
    ><FzPortal
      ><DialogOverlay class="fz-overlay" /><DialogContent
        class="fz-dialog"
        :data-placement="placement"
        :aria-describedby="description ? descriptionId : undefined"
        @close-auto-focus="restoreFocus"
        @interact-outside="!closeOnOutside && $event.preventDefault()"
        ><header class="dialog-header">
          <DialogTitle class="dialog-title">{{ title }}</DialogTitle
          ><FzButton
            variant="ghost"
            size="sm"
            aria-label="Close dialog"
            @click="model = false"
            ><FzIcon name="close"
          /></FzButton>
        </header>
        <DialogDescription
          v-if="description"
          :id="descriptionId"
          class="dialog-description"
          >{{ description }}</DialogDescription
        ><slot :close="() => (model = false)" />
        <footer v-if="$slots.footer" class="dialog-footer">
          <slot
            name="footer"
            :close="() => (model = false)"
          /></footer></DialogContent></FzPortal
  ></DialogRoot>
</template>
<style scoped>
.fz-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgb(4 9 12 / 0.72);
}
.fz-dialog {
  position: fixed;
  z-index: 101;
  top: 50%;
  left: 50%;
  width: min(520px, calc(100% - 32px));
  max-height: 85dvh;
  overflow: auto;
  padding: 28px;
  border: 1px solid var(--fz-border);
  border-radius: 8px;
  background: var(--fz-surface);
  color: var(--fz-text);
  box-shadow: 0 24px 80px rgb(0 0 0 / 0.28);
  transform: translate(-50%, -50%);
}
.fz-overlay[data-state="open"] {
  animation: fz-overlay-in var(--fz-motion-enter) var(--fz-ease-out);
}
.fz-overlay[data-state="closed"] {
  animation: fz-overlay-out var(--fz-motion-exit) var(--fz-ease-in);
}
.fz-dialog[data-state="open"] {
  animation: fz-dialog-in var(--fz-motion-enter) var(--fz-ease-out);
}
.fz-dialog[data-state="closed"] {
  animation: fz-dialog-out var(--fz-motion-exit) var(--fz-ease-in);
}
.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.dialog-title {
  font: 600 34px var(--fz-font-display);
  margin: 0;
}
.dialog-description {
  font-size: 13px;
  color: var(--fz-muted);
  line-height: 1.7;
}
.dialog-footer {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}
@keyframes fz-overlay-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fz-overlay-out {
  to {
    opacity: 0;
  }
}
@keyframes fz-dialog-in {
  from {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 12px)) scale(0.975);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes fz-dialog-out {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 6px)) scale(0.985);
  }
}

.fz-dialog[data-placement="right"] {
  top: 0;
  bottom: 0;
  left: auto;
  right: 0;
  transform: none;
  width: min(460px, 100%);
  max-height: 100dvh;
  border-radius: 0;
  padding: 32px;
}
.fz-dialog[data-placement="bottom"] {
  top: auto;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  transform: none;
  max-height: 85dvh;
  border-radius: 14px 14px 0 0;
}
.fz-dialog[data-placement="right"][data-state="open"] {
  animation: drawer-right-in var(--fz-motion-enter) var(--fz-ease-out);
}
.fz-dialog[data-placement="right"][data-state="closed"] {
  animation: drawer-right-out var(--fz-motion-exit) var(--fz-ease-in);
}
.fz-dialog[data-placement="bottom"][data-state="open"] {
  animation: drawer-bottom-in var(--fz-motion-enter) var(--fz-ease-out);
}
.fz-dialog[data-placement="bottom"][data-state="closed"] {
  animation: drawer-bottom-out var(--fz-motion-exit) var(--fz-ease-in);
}
@keyframes drawer-right-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes drawer-right-out {
  to {
    transform: translateX(100%);
  }
}
@keyframes drawer-bottom-in {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes drawer-bottom-out {
  to {
    transform: translateY(100%);
  }
}
</style>
