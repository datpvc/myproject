import React, { useEffect, useState } from 'react';
import { Avatar, Form, Button, List, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { productServices } from '../../services/product.service';
import { useSelector } from 'react-redux';
import { Notification } from '../../utils/notification';

const Editor = ({ onChange, onSubmit, value }) => (
  <div>
    <Form.Item className="mb-2">
      <Input.TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

function Comments({ product }) {
  const [value, setValue] = useState('');
  const [comments, setComments] = useState([]);
  const { userInfo } = useSelector((state) => state.userSlice);

  useEffect(() => {
    setComments(product.comments ?? []);
  }, [product.id]);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    const _comments = [...comments];
    _comments.push({
      id: comments.length + 1,
      userName: userInfo.userName,
      value: value,
    });

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
      });
  };

  const handleDelete = (comment) => {
    let _comments = comments.filter((_comment) => _comment.id !== comment.id);
    productServices
      .update({ ...product, comments: _comments })
      .then((res) => {
        setComments(res.data.comments);
        Notification('success', 'Comment deleted successfully');
      })
      .catch(() => {
        Notification('error', 'Comment deletion failed');
      });
  };

  return (
    <>
      <List
        dataSource={comments}
        renderItem={(comment, index) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                  handleDelete(comment);
                }}
              />,
            ]}
          >
            <List.Item.Meta
              key={comment.id}
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<a href="https://ant.design">{comment.userName}</a>}
              description={comment.value}
            />
          </List.Item>
        )}
      />

      <Editor onChange={handleChange} onSubmit={handleSubmit} value={value} />
    </>
  );
}
export default Comments;
