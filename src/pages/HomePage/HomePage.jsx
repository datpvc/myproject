import React from 'react';
import { Layout } from 'antd';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Products from './Products/Products';

function HomePage() {
  return (
    <Layout className="layout">
      <Header />
      <Products />
      <Footer />
    </Layout>
  );
}

export default HomePage;
