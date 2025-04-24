import { Button, Form, Input, message, Modal, Spin, Table, TableProps } from "antd";
import * as React from "react";
import BaseSearch from "../../../../components/base/BaseSearch";
import { IQueryUser } from "../../../../types/user.types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ICategory } from "../../../../types/category";
import { categoryService } from "../../../../services";
import { formatDate } from "../../../../utils/format-date";

export default function CategoryManager() {
  const [form] = Form.useForm();
  const [query, setQuery] = React.useState<Partial<IQueryUser>>({
    page: 1,
    limit: 8,
    search: "",
  });
  const [categoriesList, setCategoriesList] = React.useState<ICategory[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<ICategory | null>(null);

  const handleGetCategoriesList = async () => {
    try {
      setLoading(true);
      const rs = await categoryService.findAll(query);
      setCategoriesList(rs.data.content);
      setQuery({
        ...query,
        total: rs.data.metaData.totalItem,
      });
    } finally {
      setLoading(false);
    }
  };



  const handleDeleteCategory = async (item: ICategory) => {
    Modal.confirm({
      title: "Do you want to delete this category?",
      content: `Category: ${item.name}`,
      okText: "Confirm",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await categoryService.remove(item._id);
          message.success("Category deleted successfully");
          handleGetCategoriesList();
        } catch (error: any) {
          message.error(error.message);
        }
      },
    });
  };

  const handleShowModal = (category?: ICategory) => {
    if (category) {
      categoryService.findOne(category._id).then((res) => {
        form.setFieldsValue(res.data);
        setSelectedCategory(res.data);
      });
    } else {
      form.resetFields();
      setSelectedCategory(null);
    }
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (selectedCategory) {
        await categoryService.update(selectedCategory._id, values);
        message.success("Category updated successfully");
      } else {
        await categoryService.create(values);
        message.success("Category added successfully");
      }
      setIsModalVisible(false);
      handleGetCategoriesList();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    handleGetCategoriesList();
  }, [query.page, query.limit]);

  const columns: TableProps<ICategory>["columns"] = [
    {
      title: "No.",
      key: "index",
      render: (_, __, index) => (query.page! - 1) * query.limit! + index + 1,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      render: (text) => <span className="text-lg">{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => <span className="text-lg">{text || '--'}</span>,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      render: (text) => <span>{formatDate(text)}</span>,
    },
    {
      title: "Actions",
      align: "center",
      key: "actions",
      render: (_, record) => (
        <div className="flex justify-center space-x-2">
          <Button
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleShowModal(record);
            }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCategory(record);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-5">
      <h1 className="text-2xl font-bold">Category Management</h1>

      <div className="flex justify-between">
        <BaseSearch
          value={query.search!}
          onHandleChange={(value) => setQuery({ ...query, search: value })}
          onSearch={handleGetCategoriesList}
        />
        <Button
          type="primary"
          onClick={() => handleShowModal()}
        >
          Add New
        </Button>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={categoriesList}
        pagination={{
          current: query.page,
          pageSize: query.limit,
          total: query.total,
          onChange: (page, limit) => setQuery({ ...query, page, limit }),
        }}
        loading={loading}
      />

      <Modal
        title={selectedCategory ? "Update Category" : "Add New Category"}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}