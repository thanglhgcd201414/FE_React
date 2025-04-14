import { Button, Form, Input, message, Modal, Spin, Table, TableProps } from "antd";
import * as React from "react";
import BaseSearch from "../../../../components/base/BaseSearch";
import { IQueryUser } from "../../../../types/user.types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ICategory } from "../../../../types/category";
import { categoryService } from "../../../../services";
import { formatDate } from "../../../../utils/format-date";
import slugify from "slugify";

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

  const handleAutoGenerateSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const generatedSlug = slugify(name, {
      lower: true,
      strict: true,
      locale: 'vi',
      trim: true
    });
    form.setFieldsValue({ slug: generatedSlug });
  };

  const handleDeleteCategory = async (item: ICategory) => {
    Modal.confirm({
      title: "Bạn có muốn xóa danh mục này không?",
      content: `Danh mục: ${item.name}`,
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await categoryService.remove(item._id);
          message.success("Xóa danh mục thành công");
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
      if (!values.slug) {
        values.slug = slugify(values.name, { 
          lower: true,
          strict: true,
          locale: 'vi',
          trim: true
        });
      }
      if (selectedCategory) {
        await categoryService.update(selectedCategory._id, values);
        message.success("Cập nhật danh mục thành công");
      } else {
        await categoryService.create(values);
        message.success("Thêm mới danh mục thành công");
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
      title: "STT",
      key: "index",
      render: (_, __, index) => (query.page! - 1) * query.limit! + index + 1,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      render: (text) => <span className="text-lg">{text}</span>,
    },
    {
      title: "Đường dẫn liên kết",
      dataIndex: "slug",
      key: "slug",
      render: (text) => <span className="text-lg text-blue-600">{text}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (text) => <span className="text-lg">{text || '--'}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (text) => <span>{formatDate(text)}</span>,
    },
    {
      title: "Thao tác",
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
      <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
      
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
          Thêm mới
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
        title={selectedCategory ? "Cập nhật danh mục" : "Thêm mới danh mục"}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input 
            onChange={handleAutoGenerateSlug} />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[
              { required: true, message: "Slug không được để trống" },
              { 
                pattern: /^[a-z0-9-]+$/,
                message: "Slug chỉ chứa chữ thường, số và dấu gạch ngang" 
              }
            ]}
          >
            <Input placeholder="Tự động tạo khi nhập tên" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}