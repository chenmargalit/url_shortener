import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import ShowTable from './Table';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_URLS' });
  }, [dispatch]);

  const dataFromRedux = useSelector((state) => state);

  const layout = {
    wrapperCol: { span: 22 },
  };

  const deleteAll = () => {
    console.log('delete all');
    dispatch({ type: 'DELETE_ALL_URLS' });
  };

  const showForm = () => {
    const onFinish = (values) => {
      console.log('dispatching');
      dispatch({ type: 'CREATE_URL', values });
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
          <Button size='large' type='primary' htmlType='submit'>
            Submit
          </Button>
          <Button danger type='primary' size='small' onClick={deleteAll} style={{ float: 'right' }}>
            Delete All
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
        {dataFromRedux && <ShowTable urlsDataFromRedux={dataFromRedux} />}
      </div>
    </div>
  );
};

export default Dashboard;
