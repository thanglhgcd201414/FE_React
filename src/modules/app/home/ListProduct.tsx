import React from 'react';
import { motion } from 'framer-motion';
import {
  Input,
  Checkbox,
  Pagination,
  Spin,
  Select,
  Empty,
  Typography,
} from 'antd';
import { AppstoreOutlined, SearchOutlined } from '@ant-design/icons';
import { categoryService, productService } from '../../../services';
import { IProduct } from '../../../types/product.types';
import { ICategory } from '../../../types/category';
import DisplayProduct from './_components/DisplayProduct';
import Visibility from '../../../components/base/visibility';
import { useDebounce } from '@uidotdev/usehooks';

export default function ListProduct() {
  const [query, setQuery] = React.useState({
    page: 1,
    limit: 8,
    search: '',
    categoryIds: [],
    sortPrice: 'DESC',
    total: 0,
  });
  const debouncedSearchTerm = useDebounce(query.search, 300);
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

  const handleSearch = (value: string) => {
    setQuery((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const handleCategoryChange = (checkedValues: any) => {
    setQuery((prev) => ({ ...prev, categoryIds: checkedValues, page: 1 }));
  };

  const handleSortChange = (value: any) => {
    setQuery((prev) => ({ ...prev, sortPrice: value, page: 1 }));
  };

  React.useEffect(() => {
    handleGetProductsList();
  }, [
    query.page,
    query.limit,
    debouncedSearchTerm,
    query.categoryIds,
    query.sortPrice,
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
        <div className="relative group">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            suffix={
              <SearchOutlined className="text-gray-400 group-hover:text-blue-500 transition-colors" />
            }
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
            className="rounded-xl shadow-sm hover:shadow-md transition-all 
                border-gray-300 hover:border-blue-400 focus:border-blue-500 
                py-2 px-4 text-base"
          />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Typography.Title
            level={5}
            className="!mb-4 !text-gray-700 flex items-center gap-2"
          >
            <AppstoreOutlined className="text-blue-500" />
            Danh mục sản phẩm
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
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Sắp xếp theo:</span>
          <Select
            options={[
              {
                label: 'Giá: Cao đến Thấp',
                value: 'DESC',
              },
              {
                label: 'Giá: Thấp đến Cao',
                value: 'ASC',
              },
            ]}
            defaultValue="DESC"
            onChange={handleSortChange}
          />
        </div>

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
          suspenseComponent={<Empty description="Không có sản phẩm phù hợp" />}
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
