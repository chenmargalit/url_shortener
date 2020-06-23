import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button } from 'antd';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_URLS' });
  }, [dispatch]);

  const dataFromRedux = useSelector((state) => state);
  dataFromRedux && console.log('data from redux', dataFromRedux.urls);

  const layout = {
    wrapperCol: { span: 16 },
  };

  const showForm = () => {
    const onFinish = (values) => {
      console.log('Success:', values);
    };

    return (
      <Form {...layout} name='basic' initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          label='Url'
          name='url'
          rules={[{ required: true, message: 'Please provide a url' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <div style={{ margin: 20 }}>
      <div>
        <h1>Please insert the url</h1>
        {showForm()}
      </div>
    </div>
  );
};

export default Dashboard;
