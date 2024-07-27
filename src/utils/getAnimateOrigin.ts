import { OriginRectType } from "../types";
// import { inject } from "vue";
import store from "../utils/store";

export default function getAnimateOrigin(
  originRect: OriginRectType
): string | null {
  if (originRect) {
    const dom: any = store.photoSliderRef;
    // const win: any = window;
    // const dom: any = document.querySelector(win?.$photo_mount_el);

    let { innerWidth, innerHeight } = window;

    if (dom) {
      innerWidth = dom.offsetWidth;
      innerHeight = dom.offsetHeight;
    }
    // console.log(4,dom,dom.offsetWidth,dom.offsetHeight);
    // 动画的元素宽高为 0，计算触发的点的中心到中点的距离即是 AnimateOrigin（粗略计算）
    const xOrigin = originRect.left + originRect.width / 2 - innerWidth / 2;
    const yOrigin = originRect.top + originRect.height / 2 - innerHeight / 2;
    return `${xOrigin}px ${yOrigin}px`;
  }
  return null;
}
