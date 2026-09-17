import {
  shallowRef,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
  type Ref,
} from "vue";
export function useActiveIndicator(value: Ref<string>) {
  const track = shallowRef<HTMLElement>();
  const indicator = shallowRef({ transform: "translateX(0px) scaleX(0)" });
  let observer: ResizeObserver | undefined;
  let alive = true;
  function measure() {
    const selected = track.value?.querySelector<HTMLElement>(
      '[aria-selected="true"], [aria-pressed="true"]',
    );
    if (selected)
      indicator.value = {
        transform: `translateX(${selected.offsetLeft}px) scaleX(${selected.offsetWidth})`,
      };
  }
  watch(value, () => nextTick(measure), { flush: "post" });
  onMounted(() => {
    measure();
    observer = new ResizeObserver(measure);
    if (track.value) observer.observe(track.value);
    document.fonts.ready.then(() => {
      if (alive) measure();
    });
  });
  onBeforeUnmount(() => {
    alive = false;
    observer?.disconnect();
  });
  return { track, indicator };
}
