<template>
  <div class="popup-container">
    <div class="top-wrap">
      <Button size="small">设置</Button>
      <Switch v-model:checked="checked" size="small">启用</Switch>
    </div>

    <Table
      class="popup-table"
      row-key="domain"
      :columns="columns"
      :data-source="dataSource"
      size="small"
      :bordered="true"
      :row-selection="{
        selectedRowKeys: state.selectedRowKeys,
        onChange: onSelectChange,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import jssonData from '@/api/data.json'
import { Button, Switch, Table } from 'ant-design-vue'
import { ColumnsType } from 'ant-design-vue/es/table'
import { reactive, ref } from 'vue'
import { DataType, Key } from './interface'

const dataSource = ref(jssonData)
const checked = ref(false)

const columns: ColumnsType<DataType> = [
  {
    title: '域名',
    dataIndex: 'domain',
  },
  {
    title: 'Target',
    dataIndex: 'target',
  },
  {
    title: '标签',
    dataIndex: 'tags',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
]

const state = reactive<{
  selectedRowKeys: Key[]
  loading: boolean
}>({
  selectedRowKeys: [],
  loading: false,
})

const onSelectChange = (selectedRowKeys: Key[], selectedRows: DataType[]) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows)
  state.selectedRowKeys = selectedRowKeys
}
</script>

<style scoped>
.popup-container {
  width: 720px;
  padding: 16px;
}

.top-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup-table {
  margin-top: 24px;
}
</style>
