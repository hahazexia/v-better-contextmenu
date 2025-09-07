<template>
  <div class="container">
    <div
      class="target"
      v-contextmenu="{
      menuId: 'userMenu',
      data: { userId: 1001, userName: 'Tom' },
      onShow: (data: any) => data.userId > 0
    }"
    >
      right click at me
    </div>

    <ContextMenu
      menuId="userMenu"
      class="user-menu"
      @item-click="handleMenuItemClick"
    >
      <template #default="{ currentData, itemClick }">
        <div class="menu-item" @click="() => itemClick('view')">
          view {{ currentData?.userName }} detail
        </div>
        <div class="menu-item" @click="() => itemClick('edit')">
          edit {{ currentData?.userName }} detail
        </div>
        <div class="menu-item" @click="() => itemClick('delete')">
          delete {{ currentData?.userName }}
        </div>
      </template>
    </ContextMenu>
  </div>
</template>

<script setup lang="ts">
  import { vcontextmenu } from '../src/vContextmenu';
  import ContextMenu from '../src/ContextMenu.vue';

  const vContextmenu = vcontextmenu;

  const handleMenuItemClick = (userData: any, action: string): void => {
    console.log('click event triggered：', {
      action,
      userData,
    });
    switch (action) {
      case 'view':
        console.log(`view ${userData.userId} detail`);
        break;
      case 'edit':
        console.log(`edit ${userData.userName}`);
        break;
      case 'delete':
        console.log(`delete ${userData.userId}`);
        break;
    }
  };
</script>

<style scoped>
  .container {
    padding: 20px;
  }

  .target {
    width: 200px;
    height: 150px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    cursor: context-menu;
  }

  .user-menu .menu-item {
    padding: 8px 16px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .user-menu .menu-item:hover {
    background: #f0f0f0;
    color: #1890ff;
  }
</style>
