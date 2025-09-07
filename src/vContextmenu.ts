import type { DirectiveBinding } from 'vue';
import { emitContextMenuEvent } from './contextMenuBus';

export type ContextMenuDirectiveOptions = {
  menuId: string;
  data?: any;
  onShow?: (data: any, e: MouseEvent) => boolean;
};

export const vcontextmenu = {
  mounted(
    el: HTMLElement,
    binding: DirectiveBinding<ContextMenuDirectiveOptions>,
    vnode: any
  ): void {
    const componentInstance = vnode.component;
    if (!el && componentInstance) {
      el = componentInstance.vnode.el;
    }
    const handleContextMenu = (e: MouseEvent): void => {
      e.preventDefault();
      const { menuId, data, onShow = () => true } = binding.value;

      if (onShow(data, e)) {
        emitContextMenuEvent({
          type: 'show',
          menuId,
          data,
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    const handleDocumentClick = (): void => {
      const { menuId } = binding.value;
      if (menuId) {
        emitContextMenuEvent({ type: 'hide', menuId });
      }
    };

    el.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleDocumentClick);

    (el as any)._contextMenuCleanup = (): void => {
      el.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleDocumentClick);
    };
  },

  unmounted(el: HTMLElement): void {
    (el as any)._contextMenuCleanup?.();
  },
};
