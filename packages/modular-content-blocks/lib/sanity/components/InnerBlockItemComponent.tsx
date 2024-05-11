import type { ObjectItemProps } from 'sanity';
import { useModularBlocks } from './ModularBlocksProvider';

export function InnerBlockItemComponent(props: ObjectItemProps) {
  const { state } = useModularBlocks();

  if (
    !props.children
    || typeof props.children === 'string'
    || typeof props.children === 'number'
    || typeof props.children === 'boolean'
    || !('props' in props.children)
  ) {
    return props.renderDefault(props);
  }

  /**
   * If we're previewing this from the outer block preview section, then we must set `open` to always false.
   * This is because `open` controls whether to inject the Modal from our preview items into the DOM.
   * However, the overview preview is in addition to the regular DOM elements, which means the modal could be injected
   * twice, causing issues with onClickOutside, and making the modals always close.
   * Therefore, we set `open` to false if we're in the overviewPreview, ensuring the second, extra DOM elements
   * are not injected.
   * Then, when the item is clicked to open it, the `open` key in the props object is set to true, and the original
   * modal opens, but not this secondary one.
   */
  return state.overviewPreview
    ? props.renderDefault({ ...props, open: false })
    : props.renderDefault(props);
}
