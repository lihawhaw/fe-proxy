import '../assets/global.css'

import { Button, Switch } from 'antd'
import { useAtom } from 'jotai'
import { useState } from 'react'

import { TableProxy } from '../components/table'
import { enableAtom } from '../store/table'
import { jump } from '../utils'

function IndexPopup() {
  const [enable, setEnable] = useAtom(enableAtom)

  return (
    <div className='w-[var(--width)]'>
      <div className='flex justify-between items-center h-[56px] px-1.5'>
        <Button type='link' onClick={() => jump('/options')}>
          添加
        </Button>

        <Switch
          checked={enable}
          onChange={checked => {
            setEnable(checked)
          }}
        />
      </div>
      <TableProxy />

      <Button type='link' onClick={() => jump('/options')}>
        添加
      </Button>
    </div>
  )
}

export default IndexPopup
