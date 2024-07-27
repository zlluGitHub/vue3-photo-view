// import { getCurrentInstance } from "vue";
// const elId: any = inject("mount-el");
import store from "../utils/store";
export default function getSuitableImageSize(
  naturalWidth: number,
  naturalHeight: number,
  rotate: number
): {
  width: number;
  height: number;
} {
  // const win: any = window;
  // const dom: any = document.querySelector(win?.$photo_mount_el);

  const dom: any =  store.photoSliderRef;

  let { innerWidth, innerHeight } = window;
  // console.log("elId", dom);

  if (dom) {
    innerWidth = dom.offsetWidth;
    innerHeight = dom.offsetHeight;
  }

  // console.log(1, dom, dom.offsetWidth, dom.offsetHeight);
  // 如果图片不是水平，则调换宽高
  const isVertical = rotate % 180 !== 0;
  if (isVertical) {
    [innerWidth, innerHeight] = [innerHeight, innerWidth];
  }

  let width;
  let height;

  // 缩放到和窗口一样所需要的比例
  const scaleWidth = innerWidth / naturalWidth;
  const scaleHeight = innerHeight / naturalHeight;

  if (naturalWidth < innerWidth && naturalHeight < innerHeight) {
    // 如果图片原始宽度未超过容器尺寸，则使用原始尺寸
    width = naturalWidth;
    height = naturalHeight;
  } else {
    // 否则缩放图片使之恰好放入
    if (scaleWidth < scaleHeight) {
      width = innerWidth;
      height = innerWidth * (naturalHeight / naturalWidth);
    } else {
      width = innerHeight * (naturalWidth / naturalHeight);
      height = innerHeight;
    }
  }

  return {
    width,
    height,
  };
}
