import { FC, useState } from "react"
import { Dropdown, Menu } from 'antd';
import VietnamFlag from '../../asset/flags/220-vietnam.svg'
import UKFlag from '../../asset/flags/012-uk.svg'

const menuList = [{
  key: 'vi',
  label: 'Việt Nam',
  icon: VietnamFlag
}, {
  key: 'en',
  label: 'English',
  icon: UKFlag
}]


export const SwitchLanguage: FC<any> = (props) => {
  const [lang, setLang] = useState(menuList[0])

  function handleMenuClick(e: any) {
    const select = menuList.find(item => e.key === item.key) || lang
    setLang(select)
  }

  const menu = (<Menu onClick={handleMenuClick}>
    {menuList.map(e => (<Menu.Item key={e.key}>
      <span style={{ marginRight: "8px" }}>{e.label}</span>
      <img width={16} height={16} style={{ float: "right" }} alt="flag" src={e.icon} />
    </Menu.Item>))}
  </Menu>)

  return (<>
    <div style={{ ...props.style, cursor: 'pointer ' }}>
      <Dropdown overlay={menu} placement="bottomRight">
        <img width={24} height={24} src={lang.icon} alt="big-flag" />
      </Dropdown>
    </div>
  </>)
}