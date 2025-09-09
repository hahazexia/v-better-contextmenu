# Vue Context Menu 插件使用文档

一个轻量级的 Vue 右键菜单插件，支持自定义菜单内容和行为，易于集成到任何 Vue 项目中。

## 安装

```bash
npm install vue-context-menu-plugin --save
# 或
yarn add vue-context-menu-plugin
```

## 基本用法

### 全局注册

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import { ContextMenu, vcontextmenu } from 'vue-context-menu-plugin';

const app = createApp(App);
app.component('ContextMenu', ContextMenu);
app.directive('contextmenu', vcontextmenu);
app.mount('#app');
```

### 局部注册

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup>
  import { ContextMenu, vcontextmenu } from 'vue-context-menu-plugin';
</script>
```

## 组件使用示例

```vue
<template>
  <!-- 需要绑定右键菜单的元素 -->
  <div
    v-contextmenu="{
      menuId: 'myMenu',
      data: { id: 1, name: '示例数据' },
      onShow: handleMenuShow,
    }"
  >
    右键点击我
  </div>

  <!-- 右键菜单组件 -->
  <ContextMenu
    menuId="myMenu"
    class="my-custom-menu"
    :style="{ backgroundColor: '#f5f5f5' }"
    @item-click="handleItemClick"
  >
    <template #default="{ currentData, itemClick }">
      <div class="menu-item" @click="itemClick('option1')">
        选项 1 - {{ currentData.name }}
      </div>
      <div class="menu-item" @click="itemClick('option2')">选项 2</div>
      <div
        class="menu-item"
        @click="itemClick({ action: 'delete', id: currentData.id })"
      >
        删除
      </div>
    </template>
  </ContextMenu>
</template>

<script setup>
  const handleMenuShow = (data, e) => {
    // 可以根据数据或事件决定是否显示菜单
    console.log('准备显示菜单，数据：', data);
    return true; // 返回 true 显示菜单，false 不显示
  };

  const handleItemClick = (data, extra) => {
    console.log('当前数据：', data);
    console.log('额外参数：', extra);

    // 处理菜单项点击事件
    if (extra === 'option1') {
      // 处理选项1
    } else if (extra === 'option2') {
      // 处理选项2
    } else if (extra?.action === 'delete') {
      // 处理删除操作
    }
  };
</script>

<style>
  .my-custom-menu {
    /* 自定义菜单样式 */
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

## API 文档

### 指令：v-contextmenu

#### 绑定值选项（ContextMenuDirectiveOptions）

| 属性名 | 类型                                  | 描述                                                     |
| ------ | ------------------------------------- | -------------------------------------------------------- |
| menuId | string                                | 必选，与对应的 ContextMenu 组件的 menuId 匹配            |
| data   | any                                   | 可选，传递给菜单的数据                                   |
| onShow | (data: any, e: MouseEvent) => boolean | 可选，菜单显示前的回调，返回 true 显示菜单，false 不显示 |

### 组件：ContextMenu

#### 属性（Props）

| 属性名 | 类型                   | 描述                                     |
| ------ | ---------------------- | ---------------------------------------- |
| menuId | string                 | 必选，菜单唯一标识，与指令的 menuId 对应 |
| class  | string                 | 可选，自定义类名                         |
| style  | Record<string, string> | 可选，自定义内联样式                     |

#### 事件（Events）

| 事件名     | 类型                                     | 描述                                                              |
| ---------- | ---------------------------------------- | ----------------------------------------------------------------- |
| item-click | (data: unknown, extra?: unknown) => void | 菜单项点击事件，data 为绑定的数据源，extra 为点击时传递的额外参数 |

#### 插槽（Slots）

| 插槽名  | 说明         | 作用域参数                                                       |
| ------- | ------------ | ---------------------------------------------------------------- |
| default | 菜单内容插槽 | currentData: 绑定的数据；itemClick: 点击处理函数，可传递额外参数 |

## 样式定制

可以通过以下方式定制菜单样式：

1. 使用 `class` 属性添加自定义类
2. 使用 `style` 属性添加内联样式
3. 覆盖默认 CSS 变量（如果插件支持）
4. 使用深度选择器修改默认样式（Vue 中使用 ::v-deep）

```css
/* 示例：修改默认菜单样式 */
::v-deep .context-menu {
  min-width: 150px;
  border-radius: 6px;
}
```

## 注意事项

1. 确保 `menuId` 在页面中是唯一的，否则可能导致菜单显示异常
2. 菜单默认会被 Teleport 到 body 元素下，以避免被父元素的样式影响
3. 点击页面其他区域会自动隐藏菜单
4. 菜单显示位置基于鼠标右键点击的位置（clientX, clientY）
