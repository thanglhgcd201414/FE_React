import { Button, message, Modal, Spin, Table, TableProps } from "antd";
import * as React from "react";

import { IQueryUser } from "../../../../types/user.types";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { DEFINE_ROUTERS_ADMIN } from "../../../../constants/route-mapper";
import { IProduct } from "../../../../types/product.types";
import { formatDate } from "../../../../utils/format-date";
import { productService } from "../../../../services";
import { ICategory } from "../../../../types/category";
import buildImageUrl from "../../../../utils/build-image-url";

export default function ProductManager() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState<Partial<IQueryUser>>({
    page: 1,
    limit: 5,
    sort: "DESC",
  });
  const [productsList, setProductsList] = React.useState<IProduct[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleGetProductsList = async () => {
    try {
      setLoading(true);
      const rs = await productService.findAll(query);
      setProductsList(rs.data.content);
      setQuery({
        ...query,
        total: rs.data.metaData.totalItem,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (_item: IProduct) => {
    Modal.confirm({
      title: "Do you want to delete this product?",
      content: `Product: ${_item.name}`,
      okText: "Confirm",
      okType: "danger",
      cancelText: "Cancel",
      style: {
        top: "50%",
        transform: "translateY(-50%)",
      },
      onOk: async () => {
        try {
          setLoading(true);
          const rs = await productService.remove(_item._id);
          message.success(rs.message);
          handleGetProductsList();
        } catch (error: any) {
          message.error(error.message);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  React.useEffect(() => {
    handleGetProductsList();
  }, [query.page, query.limit]);

  const columns: TableProps<IProduct>["columns"] = [
    {
      title: "No.",
      key: "index",
      render: (_: any, __: any, index: number) =>
        (query.page! - 1) * query.limit! + index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      align: "justify",
      key: "name",
      render: (text) => <span className="text-lg font-medium">{text}</span>,
    },
    {
      title: "Categories",
      dataIndex: "categories",
      align: "left",
      key: "categories",
      render: (categories) => (
        <div className="text-lg font-medium">
          {categories.map((c: ICategory, index: number) => (
            <div key={index}>{c.name}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Product Image",
      dataIndex: "images",
      key: "images",
      render: (listImage) => {
        const imageSrc = listImage && listImage.length > 0 ? buildImageUrl(listImage[0]) : 'path/to/default-image.jpg';

        return (
          <img
            className="h-[80px] w-auto object-cover"
            src={imageSrc}
            alt="thumbnail"
          />
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="text-lg font-medium text-red-600">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(price)}
        </span>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <span className="text-lg font-medium">{formatDate(text)}</span>
      ),
    },
    {
      title: "Delete",
      key: "deleteProduct",
      align: "center",
      dataIndex: "deleteProduct",
      render: (_, _item: IProduct) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteProduct(_item);
          }}
          className="ms-3"
          variant="solid"
          color="danger"
          shape="default"
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  const handleClickRow = (record: IProduct) => {
    navigate(DEFINE_ROUTERS_ADMIN.editProduct.replace(":id", record._id));
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-5 w-full">
        <h1 className="font-bold text-2xl">Product Management</h1>
        <div className="flex flex-row justify-end items-center w-full">
          <Button
            type="primary"
            variant="filled"
            onClick={() => {
              navigate(DEFINE_ROUTERS_ADMIN.newProduct);
            }}
          >
            Add New Product
          </Button>
        </div>
        {loading ? (
          <Spin />
        ) : (
          <div className="w-full">
            <Table<IProduct>
              rowKey="id"
              className="hover:cursor-pointer"
              columns={columns}
              onRow={(record) => ({
                onClick: () => handleClickRow(record),
              })}
              dataSource={productsList}
              pagination={{
                current: query.page,
                pageSize: query.limit,
                total: query.total,
                onChange: (page, limit) => {
                  setQuery({ ...query, page, limit });
                },
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}