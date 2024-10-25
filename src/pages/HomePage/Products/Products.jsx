import React, { useEffect, useState } from 'react';
import { Layout, List, Card, Button } from 'antd';
import { productServices } from '../../../services/product.service';
import Detail from './Detail';

function Products() {
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState({ open: false, product: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productServices
      .getAll()
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data);
        }
      })
      .catch((err) => {
        console.log('err: ', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const showDrawer = (product) => {
    product.name = product.name.toUpperCase();
    setDetail({ open: true, product });
  };

  const onClose = () => {
    setDetail({ open: false, product: {} });
  };

  return (
    <Layout.Content className="mt-20 pl-4 pr-4">
      <List
        grid={{ gutter: 16, column: 4 }}
        loading={loading}
        dataSource={products}
        renderItem={(product) => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt={product.id} src={product.image} />}
              actions={[
                <Button type="primary" onClick={() => showDrawer(product)}>
                  More
                </Button>,
              ]}
            >
              <Card.Meta
                title={product.name.toUpperCase()}
                description={`$${product.price}`}
              />
            </Card>
          </List.Item>
        )}
      />

      <Detail onClose={onClose} open={detail.open} product={detail.product} />
    </Layout.Content>
  );
}

export default Products;
