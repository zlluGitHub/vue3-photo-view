import { ref, Ref, onBeforeUnmount } from "vue";
import throttle from "lodash-es/throttle";

export default function useInnerWidth(): { innerWidth: Ref<number> } {
  const win: any = window;
  const dom: any = document.querySelector(win?.$photo_mount_el);
  
  const innerWidth = ref(dom?.offsetWidth || window.innerWidth);

  const handleResize = throttle(() => {
    innerWidth.value = dom?.offsetWidth || window.innerWidth;
  }, 8);

  window.addEventListener("resize", handleResize);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });

  return {
    innerWidth,
  };
}
