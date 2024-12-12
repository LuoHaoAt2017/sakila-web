import { useEffect, useState } from "react";
import { Skeleton, Spin, Card, List, Button, Empty } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

type IUser = {
  userId: string;
  userName: string;
}

function UserProvider({ children }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [activeUser, setActiveUser] = useState<IUser>();

  const onUserSelect = (userId) => {
    const index = userList.findIndex(item => item.userId === userId);
    if (index > -1) {
      setActiveUser(userList[index]);
    }
  }

  const fetchUserList = () => {
    setLoading(true);
    new Promise<IUser[]>((resolve) => {
      setTimeout(() => {
        resolve(Array.from({ length: 9 }).map(() => ({
          userId: Date.now().toLocaleString(),
          userName: Date.now().toLocaleString()
        })));
      }, 2000);
    }).then((list) => {
      setUserList(list);
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchUserList();
  }, []);

  return children({ loading, userList, activeUser, onUserSelect, fetchUserList });
}

function UserLayout({ children }) {
  return <div className="flex flex-row justify-between">
    {children}
  </div>
}

function UserList({ loading, userList, onUserSelect, fetchUserList }) {
  if (loading) {
    return <Skeleton paragraph={{ rows: 3 }} />
  }
  return <List
    header={<Button onClick={fetchUserList}><ReloadOutlined /></Button>}
    dataSource={userList}
    renderItem={(item: IUser) => <div onClick={() => onUserSelect(item.userId)}>{item.userName}</div>}>
  </List>
}

function UserInfo({ loading, activeUser }) {
  if (loading) {
    return <Spin />
  }
  if (!activeUser) {
    return <Empty />
  }
  return <Card
    title={activeUser.userId}>
    <div>{activeUser.userName}</div>
  </Card>
}

function RenderPropsDemo() {
  return <>
    <h3>Render Props案例</h3>
    <UserProvider>
      {
        ({ loading, userList, activeUser, onUserSelect, fetchUserList }) => (<UserLayout>
          <UserList
            loading={loading}
            userList={userList}
            onUserSelect={onUserSelect}
            fetchUserList={fetchUserList} />
          <UserInfo
            loading={loading}
            activeUser={activeUser}
          />
        </UserLayout>)
      }
    </UserProvider>
  </>
}

export default RenderPropsDemo;