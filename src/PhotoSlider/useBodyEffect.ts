import { Ref, watch } from "vue";

export default function useBodyEffect(visible: Ref<boolean>): void {
  // const elId: any = inject("mount-el");

  const win: any = window;
  const dom: any = document.querySelector(win?.$photo_mount_el);
  const { style } = dom || document.body;

  // const { style } = document.querySelector(elId);
  const originalOverflow = style.overflow;

  watch(visible, () => {
    if (visible.value) {
      style.overflow = "hidden";
    } else {
      style.overflow = originalOverflow;
    }
  });
}
