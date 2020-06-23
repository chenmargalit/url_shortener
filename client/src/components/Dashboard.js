import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import ShowTable from './Table';
import { validateUrl } from '../utils/urlValidation';
import { Spin } from 'antd';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_URLS' });
  }, [dispatch]);

  const dataFromRedux = useSelector((state) => state);

  // form styles
  const layout = {
    wrapperCol: { span: 22 },
  };

  // delete all urls function
  const deleteAll = () => {
    dispatch({ type: 'DELETE_ALL_URLS' });
  };

  const showForm = () => {
    // Send form. Takes the url and checks for validity
    const onFinish = (values) => {
      const isValid = validateUrl(values.url);
      if (isValid) {
        setError('');
        dispatch({ type: 'CREATE_URL', values });
      } else {
        setError('Url is not valid');
      }
    };

    return (
      <Form {...layout} name='basic' initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          label='Url'
          name='url'
          rules={[{ required: true, message: 'Please provide a url' }]}
        >
          <Input placeholder='Please specify a url in the form of https://example.com' />
        </Form.Item>
        <Form.Item>
          {error ? <h3 style={{ color: 'red', marginLeft: 40 }}>{error}</h3> : null}
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
      {/* If data has yet to be fetched from the db, show the Spinner */}
      {!dataFromRedux.urls ? (
        <div style={{ textAlign: 'center', paddingTop: '40%' }}>
          <Spin size='large' />
        </div>
      ) : (
        <div>
          <h1>Please insert a url to be shortened</h1>
          {showForm()}
          <ShowTable urlsDataFromRedux={dataFromRedux} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
