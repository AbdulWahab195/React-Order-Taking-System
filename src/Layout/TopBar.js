import React from 'react';
import { Layout, Menu, Dropdown, Avatar, Card } from 'antd'

const AntHeader = Layout.Header;
const { Item } = Menu;
const { Meta } = Card;

const handleLogout = (logout, history) => {
  logout()
    .then(() => {
      history.push('/login');
    })
};

const TopBar = props => {
  const { logout, history } = props;
  const email = localStorage.getItem('userEmail');

  return (
    <AntHeader className='bg-white'>
      <div className='d-flex-row justify-end'>
        <Dropdown overlay={
          <Menu>
            <Item onClick={() => handleLogout(logout, history)}>LOGOUT</Item>
          </Menu>
        }>
          <Meta
            className='user h-pointer'
            avatar={
              <Avatar className='initials' size='large' />
            }
            title={email}
          />
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export { TopBar };
