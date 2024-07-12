import { ref, Ref, watch } from 'vue';
import getSuitableImageSize from '../utils/getSuitableImageSize';

export default function useLoadImage(src: Ref<string>): {
  width: Ref<number>;
  height: Ref<number>;
  loaded: Ref<boolean>;
  naturalWidth: Ref<number>;
  naturalHeight: Ref<number>;
  setSuitableImageSize: (actualWidth: number, actualHeight: number, rotate: number) => void;
} {
  const naturalWidth = ref(0);
  const naturalHeight = ref(0);
  const width = ref(0);
  const height = ref(0);
  const loaded = ref(false);

  function setSuitableImageSize(actualWidth: number, actualHeight: number, rotate: number) {
    const imageSize = getSuitableImageSize(actualWidth, actualHeight, rotate);
    width.value = imageSize.width;
    height.value = imageSize.height;
  }

  const loadImage = (src: string) => {
    loaded.value = false;

    const img = new Image();

    img.onload = () => {
      naturalWidth.value = img.naturalWidth;
      naturalHeight.value = img.naturalHeight;
      setSuitableImageSize(naturalWidth.value, naturalHeight.value, 0);
      loaded.value = true;
    };

    img.src = src;
  };

  loadImage(src.value);

  watch(src, () => {
    loadImage(src.value);
  });

  return {
    width,
    height,
    loaded,
    naturalWidth,
    naturalHeight,
    setSuitableImageSize
  };
}
