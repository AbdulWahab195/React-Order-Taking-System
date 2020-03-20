import React from 'react'
import { Layout as AntLayout } from 'antd';
import { TopBar } from './TopBar';
import { Content } from './Content';

const Layout = (props) => {
  return (
    <AntLayout>
      <TopBar {...props} />
      <Content {...props} />
    </AntLayout>
  );
}

export { Layout };
