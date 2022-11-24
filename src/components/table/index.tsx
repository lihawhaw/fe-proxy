import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useAtom } from 'jotai'

import { listAtom } from '../../store/table'

export interface DataItem {
  title: string
}

export function TableProxy() {
  const [dataList, setDataList] = useAtom<DataItem[]>(listAtom)

  const columns: ColumnsType<DataItem> = [
    {
      title: 'title',
      dataIndex: 'title',
    },
  ]

  return <Table columns={columns} dataSource={dataList} />
}
