# v-better-contextmenu

A lightweight right-click menu plugin for Vue3, supporting custom menu content and behavior, easily integrable into any Vue3 project.

## Installation

```bash
npm install v-better-contextmenu --save
# Or
yarn add v-better-contextmenu
```

## Basic Usage

### Global Registration

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import { ContextMenu, vcontextmenu } from 'v-better-contextmenu';

const app = createApp(App);
app.component('ContextMenu', ContextMenu);
app.directive('contextmenu', vcontextmenu);
app.mount('#app');
```

### Local Registration

```vue
<template>
  <!-- Template content -->
</template>

<script setup>
  import { ContextMenu, vcontextmenu } from 'v-better-contextmenu';
  const vContextmenu = vcontextmenu;
</script>
```

## Component Usage Example

```vue
<template>
  <!-- Element bound to the right-click menu -->
  <div
    v-contextmenu="{
      menuId: 'myMenu',
      data: { id: 1, name: 'Sample Data' },
      onShow: handleMenuShow,
    }"
  >
    Right-click me
  </div>

  <!-- Right-click menu component -->
  <ContextMenu
    menuId="myMenu"
    class="my-custom-menu"
    :style="{ backgroundColor: '#f5f5f5' }"
    @item-click="handleItemClick"
  >
    <template #default="{ currentData, itemClick }">
      <div class="menu-item" @click="itemClick('option1')">
        Option 1 - {{ currentData.name }}
      </div>
      <div class="menu-item" @click="itemClick('option2')">Option 2</div>
      <div
        class="menu-item"
        @click="itemClick({ action: 'delete', id: currentData.id })"
      >
        Delete
      </div>
    </template>
  </ContextMenu>
</template>

<script setup>
  const handleMenuShow = (data, e) => {
    // Determine whether to show the menu based on data or events
    console.log('Preparing to show menu, data:', data);
    return true; // Return true to show the menu, false to hide it
  };

  const handleItemClick = (data, extra) => {
    console.log('Current data:', data);
    console.log('Extra parameters:', extra);

    // Handle menu item click events
    if (extra === 'option1') {
      // Handle Option 1
    } else if (extra === 'option2') {
      // Handle Option 2
    } else if (extra?.action === 'delete') {
      // Handle delete operation
    }
  };
</script>

<style>
  .my-custom-menu {
    /* Custom menu styles */
  }

  .menu-item {
    padding: 8px 16px;
    cursor: pointer;
  }

  .menu-item:hover {
    background-color: #e5e5e5;
  }
</style>
```

## API Documentation

### Directive: v-contextmenu

#### Binding Value Options (ContextMenuDirectiveOptions)

| Property Name | Type                                  | Description                                                                                              |
| ------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| menuId        | string                                | **Required**. Matches the `menuId` of the corresponding `ContextMenu` component.                         |
| data          | any                                   | **Optional**. Data passed to the menu.                                                                   |
| onShow        | (data: any, e: MouseEvent) => boolean | **Optional**. Callback before the menu is displayed. Return `true` to show the menu, `false` to hide it. |

### Component: ContextMenu

#### Props

| Property Name | Type                   | Description                                                                                   |
| ------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| menuId        | string                 | **Required**. Unique identifier for the menu, corresponding to the `menuId` of the directive. |
| class         | string                 | **Optional**. Custom class name.                                                              |
| style         | Record<string, string> | **Optional**. Custom inline styles.                                                           |

#### Events

| Event Name | Type                                     | Description                                                                                                                           |
| ---------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| item-click | (data: unknown, extra?: unknown) => void | Triggered when a menu item is clicked. `data` is the bound data source, and `extra` is additional parameters passed during the click. |

#### Slots

| Slot Name | Description           | Scope Props                                                                                              |
| --------- | --------------------- | -------------------------------------------------------------------------------------------------------- |
| default   | Slot for menu content | `currentData`: Bound data; `itemClick`: Click handler function (supports passing additional parameters). |

## Style Customization

You can customize the menu style in the following ways:

1. Add a custom class using the `class` prop.
2. Add inline styles using the `style` prop.
3. Override default CSS variables (if supported by the plugin).
4. Modify default styles using deep selectors (use `::v-deep` in Vue).

```css
/* Example: Modify default menu styles */
::v-deep .context-menu {
  min-width: 150px;
  border-radius: 6px;
}
```

## Notes

1. Ensure `menuId` is unique on the page; otherwise, menu display may be abnormal.
2. The menu is automatically teleported to the `<body>` element by default to avoid being affected by the parent element’s styles.
3. Clicking other areas of the page will automatically hide the menu.
4. The menu display position is based on the right-click position of the mouse (`clientX`, `clientY`).
