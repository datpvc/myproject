import React, { useEffect, useState } from 'react';
import { Avatar, Form, Button, List, Input, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { productServices } from '../../services/product.service';
import { useSelector } from 'react-redux';
import { Notification } from '../../utils/notification';

const Editor = ({ onChange, onSubmit, onKeyDown, value, loading }) => (
  <div>
    <Form.Item className="mb-2">
      <Input.TextArea
        rows={2}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        onClick={onSubmit}
        type="primary"
        loading={loading}
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

function Comments({ product }) {
  const [value, setValue] = useState('');
  const [comments, setComments] = useState([]);
  const { userInfo } = useSelector((state) => state.userSlice);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

  useEffect(() => {
    setComments(product.comments ?? []);
  }, [product.id]);

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!userInfo.account) {
      Notification('error', 'You need to log in');
      return;
    }
    if (!value) return;
    const _comments = [...comments];
    _comments.push({
      id: comments.length + 1,
      userName: userInfo.userName,
      value: value,
    });
    setLoadingAdd(true);
    productServices
      .update({
        ...product,
        comments: _comments,
      })
      .then((res) => {
        setComments(res.data.comments);
        setValue('');
        Notification('success', 'Comment successful');
      })
      .catch((err) => {
        Notification('error', 'Comment failed');
      })
      .finally(() => {
        setLoadingAdd(false);
      });
  };

  const handleDelete = (comment) => {
    if (!userInfo.account) {
      Notification('error', 'You need to log in');
      return;
    }
    let _comments = comments.filter((_comment) => _comment.id !== comment.id);
    setLoadingDelete(true);
    productServices
      .update({ ...product, comments: _comments })
      .then((res) => {
        setComments(res.data.comments);
        Notification('success', 'Comment deleted successfully');
      })
      .catch(() => {
        Notification('error', 'Comment deletion failed');
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  return (
    <>
      <List
        dataSource={comments}
        renderItem={(comment, index) => (
          <List.Item
            actions={[
              <Popconfirm
                title="Delete the comment"
                description="Are you sure to delete this comment?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  handleDelete(comment);
                }}
              >
                <Button
                  loading={loadingDelete}
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              key={comment.id}
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<a href="#">{comment.userName}</a>}
              description={comment.value}
            />
          </List.Item>
        )}
      />

      <Editor
        onChange={handleChange}
        onSubmit={handleSubmit}
        onKeyDown={onKeyDown}
        loading={loadingAdd}
        value={value}
      />
    </>
  );
}
export default Comments;
