import React from 'react';
import { motion } from 'framer-motion';
import {
  Checkbox,
  Pagination,
  Spin,
  Empty,
  Typography,
} from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { categoryService, productService } from '../../../services';
import { IProduct } from '../../../types/product.types';
import { ICategory } from '../../../types/category';
import DisplayProduct from './_components/DisplayProduct';
import Visibility from '../../../components/base/visibility';


export default function ListProduct() {
  const [query, setQuery] = React.useState({
    page: 1,
    limit: 8,
    categoryIds: [],
    total: 0,
  });
  const [productsList, setProductsList] = React.useState<IProduct[]>([]);

  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleGetProductsList = async () => {
    try {
      setLoading(true);
      
      const rs = await productService.findAll(query);
      setProductsList(rs.data.content);
      setQuery((prev) => ({ ...prev, total: rs.data.metaData.totalItem }));
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (checkedValues: any) => {
    setQuery((prev) => ({ ...prev, categoryIds: checkedValues, page: 1 }));
  };

  React.useEffect(() => {
    handleGetProductsList();
  }, [
    query.page,
    query.limit,
    query.categoryIds,
  ]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const response = await categoryService.findAll({ page: 1, limit: 1000 });
      setCategories(response.data.content);
    };
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4 flex gap-6">
      <div className="w-1/4 space-y-6 pr-4">

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Typography.Title
            level={5}
            className="!mb-4 !text-gray-700 flex items-center gap-2"
          >
            <AppstoreOutlined className="text-blue-500" />
            Product Categories
          </Typography.Title>

          <Checkbox.Group
            options={categories.map((c) => ({
              label: (
                <span className="text-gray-600 hover:text-blue-600 transition-colors">
                  {c.name}
                </span>
              ),
              value: c._id,
            }))}
            onChange={handleCategoryChange}
            className="flex flex-col gap-3"
          >
            {categories.map((category) => (
              <Checkbox
                key={category._id}
                value={category._id}
                className="hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors
                    [&>.ant-checkbox-inner]:hover:border-blue-400
                    [&>.ant-checkbox-checked>.ant-checkbox-inner]:bg-blue-500"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">{category.name}</span>
                </div>
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      </div>

      <div className="w-3/4">

        {loading ? (
          <div className="text-center py-8">
            <Spin size="large" />
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-16"
          >
            {productsList.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <DisplayProduct product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
        <Visibility
          visibility={productsList.length}
          suspenseComponent={<Empty description="No matching products" />}
        >
          <div className="mt-8 flex justify-center">
            <Pagination
              current={query.page}
              pageSize={query.limit}
              total={query.total}
              onChange={(page, pageSize) =>
                setQuery((prev) => ({ ...prev, page, limit: pageSize }))
              }
              className="ant-pagination-custom"
            />
          </div>
        </Visibility>
      </div>
    </div>
  );
}
