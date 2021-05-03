import { Avatar, Dropdown, Menu } from 'antd';
import { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { get } from '../../api';
import { AuthContext } from '../../context';
import { SwitchLanguage } from '../widget/swithLanguage';

const Navbar: FC = () => {
  const [user, setUser] = useState("")
  const { push } = useHistory()
  const { dispatchAuthAction } = useContext(AuthContext)

  const logout = () => {
    localStorage.clear()
    dispatchAuthAction({ type: "SWITCH_AUTH_STATE", payload: { state: false } })
    push('/login')
  }

  useEffect(() => {
    if (!user) {
      const getMe = async () => {
        const { data, code } = await get({ url: '/user/me' })
        if (code === 200) {
          setUser(data.name)
        } else {
          push('/login')
        }
      }
      getMe()
    }
  })

  const getAvaName = (fullName: string) => {
    const name = fullName.trim().split(' ').slice(-1)[0]
    if (name.length > 2) {
      return `${name[0]}${name[1]}`
    }
    return name
  }

  const menu = (<Menu mode="vertical">
    <Menu.Item>
      <UserOutlined />
      profile
    </Menu.Item>
    <Menu.Item onClick={logout}>
      <LogoutOutlined />
      logout
    </Menu.Item>
  </Menu>)

  return (<Menu mode="horizontal">
    <div style={{ float: 'right', margin: '0px 12px', cursor: 'pointer' }}>
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Avatar style={{ verticalAlign: 'middle' }} size="large">
          {getAvaName(user)}
        </Avatar>
      </Dropdown>
    </div>
    <SwitchLanguage style={{ float: 'right' }} />
  </Menu>)
}

export default Navbar