<template>
  <a-config-provider :locale="zhCN"> <Popup /> </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import Popup from './popup/index.vue'
</script>
