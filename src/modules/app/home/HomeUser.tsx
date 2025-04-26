import React from 'react';
import { motion } from 'framer-motion';
import { Empty, Spin } from 'antd';
import { productService } from '../../../services';
import { IProduct } from '../../../types/product.types';
import DisplayProduct from './_components/DisplayProduct';
import Banner from './landing/Banner';
import Visibility from '../../../components/base/visibility';

export default function ListProduct() {
  const [query, setQuery] = React.useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const [productsList, setProductsList] = React.useState<IProduct[]>([]);
  const [productsListHeightRating, setProductsListHeightRating] =
    React.useState<IProduct[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleGetProductsList = async () => {
    try {
      setLoading(true);
      const rs = await productService.findAll(query);
      const rsHeightRating = await productService.findAll({
        ...query,
        allRatingsAbove4: true,
      });
      setProductsList(rs.data.content);
      setProductsListHeightRating(rsHeightRating.data.content);
      setQuery((prev) => ({
        ...prev,
        total: rs.data.metaData.totalItem,
      }));
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleGetProductsList();
  }, [query.page, query.limit]);

  const LoadingComponent = (
    <div className="text-center py-16">
      <Spin size="large" indicator={<div className="animate-pulse">👜</div>} />
    </div>
  );

  return (
    <div className="min-h-screen w-full px-6 md:px-12 lg:px-24">
      <Banner />

    </div>
  );
}
