<template>
  <Teleport to="body" defer>
    <div
      class="context-menu"
      :class="props.class"
      :style="menuStyle"
      @click.stop
      @contextmenu.prevent.stop
    >
      <slot :currentData="currentData" :itemClick="handleItemClick" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import {
    ref,
    onMounted,
    onUnmounted,
    computed,
    defineEmits,
    defineProps,
    Teleport,
  } from 'vue';
  import {
    onContextMenuEvent,
    offContextMenuEvent,
    emitContextMenuEvent,
  } from './contextMenuBus';

  const props = defineProps<{
    menuId: string;
    class?: string;
    style?: Record<string, string>;
  }>();

  const emit = defineEmits<{
    (e: 'item-click', data: unknown, extra?: unknown): void;
  }>();

  const currentData = ref<unknown>(null);

  type Position = { x: number; y: number };
  const menuPosition = ref<Position>({ x: 0, y: 0 });
  const isVisible = ref(false);

  type MenuEvent =
    | { type: 'show'; data: unknown; x: number; y: number }
    | { type: 'hide'; menuId?: string };

  const menuStyle = computed(() => ({
    position: 'fixed',
    zIndex: 9999,
    display: isVisible.value ? 'block' : 'none',
    left: `${menuPosition.value.x}px`,
    top: `${menuPosition.value.y}px`,
    ...props.style,
  }));

  const handleMenuEvent = (event: MenuEvent): void => {
    switch (event.type) {
      case 'show':
        currentData.value = event.data;
        menuPosition.value = { x: event.x, y: event.y };
        isVisible.value = true;
        break;
      case 'hide':
        isVisible.value = false;
        currentData.value = null;
        break;
    }
  };

  onMounted(() => {
    onContextMenuEvent(props.menuId, handleMenuEvent);
  });

  onUnmounted(() => {
    offContextMenuEvent(props.menuId, handleMenuEvent);
  });

  const handleItemClick = (extraData?: unknown): void => {
    isVisible.value = false;
    emit('item-click', currentData.value, extraData);

    emitContextMenuEvent({
      type: 'hide',
      menuId: props.menuId,
    });
  };
</script>

<style scoped>
  .context-menu {
    min-width: 120px;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 4px 0;
  }
</style>
