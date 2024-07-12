<template>
  <!-- @slot 默认插槽 -->
  <slot />
  <photo-slider :visible="visible" :index="index" :should-transition="shouldTransition" :toggle-overlay="!photoClosable"
    :default-backdrop-opacity="defaultBackdropOpacity" :items="items" :loop="loop" :download-method="downloadMethod"
    @clickPhoto="handleClickPhoto" @clickMask="handleClickMask" @onFullScreen="onFullScreen" @changeIndex="updateIndex"
    @closeModal="handleHide" />
</template>

<script lang='ts'>
import { defineComponent, PropType, provide } from 'vue';
import { updateItemKey, removeItemKey, handleShowKey } from '../symbols';
import useItems from './useItems';
import useVisible from './useVisible';
import useIndex from './useIndex';
import PhotoSlider from '../PhotoSlider/index.vue';
import { ItemType } from '../types';

export default defineComponent({
  name: 'PhotoProvider',
  components: {
    PhotoSlider
  },
  props: {
    // /**
    //  * 图片点击是否关闭
    //  */
    // mountEl: {
    //   type: String,
    //   default: "body",
    // },
    /**
     * 图片点击是否关闭
     */
    photoClosable: {
      type: Boolean,
      default: false,
    },
    /**
     * 背景点击是否关闭
     */
    maskClosable: {
      type: Boolean,
      default: true,
    },
    /**
     * 箭头切换是否需要过渡
     */
    shouldTransition: {
      type: Boolean,
      default: false,
    },
    /**
     * 默认背景透明度
     */
    defaultBackdropOpacity: {
      type: Number,
      default: 1,
    },
    /**
     * 是否循环显示预览图
     */
    loop: {
      type: Boolean,
      default: false,
    },
    /**
     * 下载图片方法，不传使用内置的下载方法
     */
    downloadMethod: {
      type: Function as PropType<(item: ItemType) => void | null>,
      default: null,
    }
  },
  emits: ['indexChange', 'visibleChange', 'onFullScreen'],
  setup(_props, { emit }) {

    // const current:any = getCurrentInstance()

    // current.proxy.$mountel =_props.mountEl

    const onFullScreen = (e: any) => {
      emit('onFullScreen', e);
    };
    const onIndexChange = () => {
      emit('indexChange', { index, items, visible });
    };
    const onVisibleChange = () => {
      emit('visibleChange', { index, items, visible });
    };
    const { index, updateIndex } = useIndex(onIndexChange);
    const { items, updateItem, removeItem } = useItems(index);
    const { visible, handleHide, handleShow } = useVisible(items, index, onVisibleChange);

    provide(updateItemKey, updateItem);
    provide(removeItemKey, removeItem);
    provide(handleShowKey, handleShow);
    // provide('mount-el', _props.mountEl);

    return {
      items,
      onFullScreen,
      updateItem,
      removeItem,
      visible,
      handleHide,
      handleShow,
      index,
      updateIndex,
    };
  },
  methods: {
    handleClickPhoto() {
      if (this.photoClosable) {
        this.handleHide();
      }
    },
    handleClickMask() {
      if (this.maskClosable) {
        this.handleHide();
      }
    }
  }
});
</script>

<style lang="scss"></style>
