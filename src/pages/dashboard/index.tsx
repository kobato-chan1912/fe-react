import { FC, useContext, useEffect } from 'react';
import { AuthContext } from '../../context';

const Dashboard: FC = () => {
  const data = useContext(AuthContext)
  useEffect(() => {
    console.log(data)
  })

  return (<div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh"
    }}
  >
    <h1>Dashboard</h1>
  </div>)
}

export default Dashboard;