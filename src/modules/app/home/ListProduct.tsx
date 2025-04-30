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



  const handleGetProductsList = async () => {
    try {
      setLoading(true);
      
      const response = await productService.findAll(query);
      setProductsList(response.data.content);
      setQuery((prev) => ({ ...prev, total: response.data.metaData.totalItem }));
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (checkedValues: any) => {
    setQuery((prev) => ({ ...prev, categoryIds: checkedValues, page: 1 }));
  };


  return (
    <div className="container mx-auto p-4 flex gap-6">     
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
