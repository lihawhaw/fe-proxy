import { useState } from 'react'

import '../assets/global.css'

import { Switch } from 'antd'
import { useAtom } from 'jotai'

import { enableAtom } from '../store/table'

function SettingsPopup() {
  const [enable, setEnable] = useAtom(enableAtom)

  return (
    <div className='text-3xl'>
      <Switch
        checked={enable}
        onChange={checked => {
          setEnable(checked)
        }}
      />
    </div>
  )
}

export default SettingsPopup
