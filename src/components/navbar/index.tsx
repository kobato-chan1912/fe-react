import { Avatar, Menu } from 'antd';
import { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { get } from '../../api';
import { AuthContext } from '../../context';

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

  return (<Menu mode="horizontal">
    <Menu.SubMenu style={{ float: 'right' }} title={
      <Avatar style={{ verticalAlign: 'middle' }} size="large">
        {getAvaName(user)}
      </Avatar>
    }>
      <Menu.Item onClick={logout}>
        logout
    </Menu.Item>
    </Menu.SubMenu>
  </Menu>)
}

export default Navbar