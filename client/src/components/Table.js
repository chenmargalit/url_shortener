import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Short link',
    dataIndex: 'shortUrl',
    render: (text) => (
      <a href={text} target='_blank' rel='noopener noreferrer'>
        {text}
      </a>
    ),
  },
  {
    title: 'Original url',
    dataIndex: 'originalUrl',
    align: 'center',
  },
  {
    title: 'Was url shortened',
    dataIndex: 'shortened',
    align: 'center',
  },
];

const showTable = (props) => {
  return (
    <Table
      columns={columns}
      dataSource={props.urlsDataFromRedux.urls}
      bordered
      rowKey={(record) => record._id}
      pagination={false}
      title={() => 'Urls details'}
      footer={() => 'End'}
    />
  );
};

export default showTable;
