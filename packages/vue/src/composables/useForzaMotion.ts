import {
  onMounted,
  onBeforeUnmount,
  shallowRef,
  watch,
  toValue,
  type MaybeRefOrGetter,
} from "vue";
import autoAnimate, { type AnimationController } from "@formkit/auto-animate";
/** Add/remove/reorder motion. Options stay reactive; OS reduced motion always wins. */
export function useForzaMotion(
  options: {
    disabled?: MaybeRefOrGetter<boolean>;
    duration?: MaybeRefOrGetter<number | undefined>;
  } = {},
) {
  const parent = shallowRef<HTMLElement>();
  const reduced = shallowRef(false);
  let controller: AnimationController | undefined;
  let media: MediaQueryList | undefined;
  let stop: () => void = () => {};
  function preference() {
    reduced.value = !!media?.matches;
  }
  onMounted(() => {
    media = window.matchMedia("(prefers-reduced-motion: reduce)");
    preference();
    media.addEventListener("change", preference);
    stop = watch(
      [
        parent,
        () => toValue(options.disabled),
        () => toValue(options.duration),
        reduced,
      ],
      () => {
        controller?.destroy?.();
        controller = undefined;
        if (parent.value && !toValue(options.disabled) && !reduced.value) {
          const style = getComputedStyle(parent.value);
          const duration =
            toValue(options.duration) ??
            parseFloat(style.getPropertyValue("--fz-motion-layout")) ??
            260;
          controller = autoAnimate(parent.value, {
            duration: Number.isFinite(duration) ? duration : 260,
            easing:
              style.getPropertyValue("--fz-ease-out").trim() || "ease-out",
          });
        }
      },
      { immediate: true, flush: "post" },
    );
  });
  onBeforeUnmount(() => {
    stop();
    controller?.destroy?.();
    media?.removeEventListener("change", preference);
  });
  return { parent, reduced };
}
