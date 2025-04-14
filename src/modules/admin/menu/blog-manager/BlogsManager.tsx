import { Button, Form, Input, message, Modal, Table, TableProps, UploadFile } from "antd";
import * as React from "react";
import BaseSearch from "../../../../components/base/BaseSearch";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatDate } from "../../../../utils/format-date";
import slugify from "slugify";
import { IBlog } from "../../../../types/blog.types";
import { blogService, uploadService } from "../../../../services";
import buildImageUrl from "../../../../utils/build-image-url";
import ImgUpload from "../../../../components/base/ImgUpload";
import RichTextEditor from "../../../app/home/_components/RichTextEditor";
import displayDescription from "../../../../utils/displayDescription";

export default function BlogsManager() {
  const [form] = Form.useForm();
  const [query, setQuery] = React.useState<any>({
    page: 1,
    limit: 8,
    search: "",
  });
  const [deletedImage, setDeletedImage] = React.useState<string>();
  const [blogList, setBlogsList] = React.useState<IBlog[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedBlog, setSelectedBlog] = React.useState<IBlog | null>(null);
  const [file, setFile] = React.useState<UploadFile>();
  const [content, setContent] = React.useState<any>();

  const handleUploadFile = async (file?: UploadFile) => {
    if(!file) return;
    if (file.originFileObj) {
      const formData = new FormData();
      formData.append('image', file.originFileObj);
      const rs = await uploadService.uploadImage(formData);
      return rs.data;
    }
    return file.url;
  };

  const handleGetBLogList = async () => {
    try {
      setLoading(true);
      const rs = await blogService.findAll(query);
      setBlogsList(rs.data.content);
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

  const handleDeleteBlog = async (item: IBlog) => {
    Modal.confirm({
      title: "Bạn có muốn xóa bài viết này không?",
      content: `Danh mục: ${item.title}`,
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await blogService.remove(item._id);
          message.success("Xóa bài viết thành công");
          handleGetBLogList();
        } catch (error: any) {
          message.error(error.message);
        }
      },
    });
  };

  const handleShowModal = (category?: IBlog) => {
    if (category) {
      blogService.findOne(category.slug).then((res) => {
        form.setFieldsValue(res.data);
        setSelectedBlog(res.data);
      });
    } else {
      form.resetFields();
      setSelectedBlog(null);
    }
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      if (!file && !selectedBlog?.thumbnail) {
        message.error("Hãy tải lên ảnh đại diện của bài viết")
        return;
      };
      if(deletedImage) await uploadService.deleteImages([deletedImage]);
      const thumbnail = await handleUploadFile(file);
      const values = await form.validateFields();
      if (!values.slug) {
        values.slug = slugify(values.name, { 
          lower: true,
          strict: true,
          locale: 'vi',
          trim: true
        });
      }
      if (selectedBlog) {
        await blogService.update(selectedBlog._id, {...values, thumbnail, content});
        message.success("Cập nhật bài viết thành công");
      } else {
        await blogService.create({...values, thumbnail, content});
        message.success("Thêm mới bài viết thành công");
      }
      setIsModalVisible(false);
      handleGetBLogList();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    handleGetBLogList();
  }, [query.page, query.limit]);

  const columns: TableProps<IBlog>["columns"] = [
    {
      title: "STT",
      key: "index",
      align: "center",
      render: (_, __, index) => (
        <span className="font-medium text-gray-600">
          {(query.page! - 1) * query.limit! + index + 1}
        </span>
      ),
    },
    {
      title: "Tên bài viết",
      dataIndex: "title",
      render: (text) => (
        <span className="text-lg font-medium line-clamp-2 max-w-[300px] hover:text-blue-600 transition-colors">
          {displayDescription(text, 50)}
        </span>
      ),
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "thumbnail",
      align: "center",
      render: (img) => (
        <div className="border rounded-md shadow-sm">
          <img 
            className="h-20 w-32 object-cover rounded-md"
            src={buildImageUrl(img)}
            alt="Thumbnail"
            loading="lazy"
          />
        </div>
      ),
    },
    {
      title: "Đường dẫn",
      dataIndex: "slug",
      render: (text) => (
        <span className="text-blue-600 hover:underline cursor-pointer font-medium">
          /blogs/{text}
        </span>
      ),
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "description",
      render: (text) => (
        <span className="text-gray-600 line-clamp-2 max-w-[400px]">
          {text || 'Chưa có mô tả'}
        </span>
      ),
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      render: (text) => (
        <div className="space-y-1">
          <span className="font-medium text-gray-600">
            {formatDate(text)}
          </span>
          <div className="text-sm text-gray-400">
            {formatDate(text)}
          </div>
        </div>
      ),
    },
    {
      title: "Thao tác",
      align: "center",
      key: "actions",
      render: (_, record) => (
        <div className="flex justify-center space-x-3">
          <Button
            shape="circle"
            icon={<EditOutlined className="text-blue-600" />}
            className="hover:bg-blue-50 border-blue-100 px-3"
            onClick={(e) => {
              e.stopPropagation();
              handleShowModal(record);
            }}
          />
          <Button
            shape="circle"
            danger
            icon={<DeleteOutlined />}
            className="hover:bg-red-50 px-3"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteBlog(record);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-5">
      <h1 className="text-2xl font-bold">Quản lý bài viết</h1>
      
      <div className="flex justify-between">
        <BaseSearch
          value={query.search!}
          onHandleChange={(value) => setQuery({ ...query, search: value })}
          onSearch={handleGetBLogList}
        />
        <Button 
          type="primary" 
          onClick={() => handleShowModal()}
        >
          Thêm mới bài viết
        </Button>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={blogList}
        pagination={{
          current: query.page,
          pageSize: query.limit,
          total: query.total,
          onChange: (page, limit) => setQuery({ ...query, page, limit }),
        }}
        loading={loading}
      />

      <Modal
        title={selectedBlog ? "Cập nhật bài viết" : "Thêm mới bài viết"}
        width={680}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalVisible(false);
          setFile(undefined)
        }}
        destroyOnClose
      >
        <div className="max-h-[680px] overflow-y-auto overflow-x-hidden p-5">
          <Form form={form} layout="vertical">
            <Form.Item
              label="Tên bài viết"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập tên bài viết" }]}
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

            <Form.Item label="Ảnh sản phẩm" rules={[
              { required: true, message: "Vui lòng chọn ảnh bài viết" }
            ]}>
              <ImgUpload
                imgProps={selectedBlog?.thumbnail ? [selectedBlog?.thumbnail] : []}
                fileList={file ? [file] : []}
                handleUploadFile={(files) => {
                  setFile(files[0]);
                }}
                onExistingRemove={(url) => {
                  setDeletedImage(url);
                }}
                maxFiles={1}
              />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                { required: true, message: "Vui lòng nhập mô tả bài viết" }
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Nội dung"
              name="content"
              rules={[
                { required: true, message: "Vui lòng nhập nội dung bài viết" }
              ]}
            >
              <RichTextEditor value={content} onChange={(value) => {setContent(value)}} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}