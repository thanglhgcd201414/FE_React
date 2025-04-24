import * as React from 'react';
import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Select,
  Card,
  UploadFile,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { formatter, parser } from '../../../../../utils/input-format-money';
import ImgUpload from '../../../../../components/base/ImgUpload';
import { IProduct } from '../../../../../types/product.types';
import onRemoveParams from '../../../../../utils/on-remove-params';
import { categoryService, uploadService } from '../../../../../services';
import { ICategory } from '../../../../../types/category';

interface IProps {
  item?: IProduct;
  handleSubmit: (data: Record<string, any>) => void;
}

type FieldType = {
  name: string;
  description?: string;
  categories?: any[];
  images: string[];
  price: number;
};

export default function CreateOrEditProduct({ item, handleSubmit }: IProps) {
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const [deletedImages, setDeletedImages] = React.useState<string[]>([]);
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const uploadedImages = await handleUploadFiles();
      const existingImages = item?.images?.filter(
        (url) => !deletedImages.includes(url)
      ) || [];

      const data = onRemoveParams({
        ...values,
        images: [...existingImages, ...uploadedImages],
      });

      handleSubmit(data);
    } catch (error) {
      message.error('Có lỗi xảy ra khi tải lên hình ảnh');
    }
  };
  const handleUploadFiles = async (files: UploadFile[]) => {
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        if (file.originFileObj) {
          const formData = new FormData();
          formData.append('image', file.originFileObj);
          const rs = await uploadService.uploadImage(formData);
          return rs.data;
        }
        return file.url;
      }),
    );
    return uploadedUrls.filter((url) => url);
  };

  // const handleUploadImages = async () => {
  //   if (!files.length) return [];

  //   const formData = new FormData();
  //   files.forEach((file) => {
  //     if (file.originFileObj) {
  //       formData.append('images', file.originFileObj);
  //     }
  //   });

  //   const rs = await uploadService.uploadImage(formData);
  //   const uploadedUrls = rs.data.map((item: { url: string }) => item.url);
  //   return uploadedUrls.filter((url) => url);
  // };

  const handleGetCategoriesList = async () => {
    const rs = await categoryService.findAll({
      page: 1,
      limit: 1000,
    });
    setCategories(rs.data.content);
  };

  React.useEffect(() => {
    handleGetCategoriesList();
  }, []);

  return (
    <div className="w-full pe-10">
      <Form
        className="w-full mt-5"
        form={form}
        labelCol={{ span: 6 }}
        labelAlign="left"
        name="form"
        onFinish={onFinish}
        initialValues={{
          ...item,
          categories: item?.categories.map((c) => c._id) ?? [],
        }}
        autoComplete="off"
      >
        {/* Các trường cơ bản */}
        <Form.Item<FieldType>
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: 'Hãy điền tên sản phẩm' }]}
        >
          <Input className="w-full" size="large" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mô tả"
          name="description"
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giá"
          name="price"
          rules={[{ required: true, message: 'Hãy nhập giá sản phẩm' }]}
        >
          <InputNumber
            className="w-full"
            formatter={formatter}
            parser={parser}
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="categories"
          rules={[{ required: true, message: 'Hãy chọn ít nhất một danh mục' }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn danh mục"
            options={categories.map((c) => ({
              label: c.name,
              value: c._id,
            }))}
          />
        </Form.Item>

        <Form.Item label="Ảnh sản phẩm">
          <ImgUpload
            imgProps={item?.images}
            fileList={files}
            handleUploadFile={setFiles}
            onExistingRemove={(url) => {
              setDeletedImages([...deletedImages, url]);
            }}
            maxFiles={5}
          />
        </Form.Item>

        <div className="w-full flex justify-end items-end my-5">
          <Button type="primary" htmlType="submit">
            {item?._id ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
