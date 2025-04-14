import * as React from 'react';
import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Select,
  Row,
  Col,
  Card,
  Tooltip,
  UploadFile,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { formatter, parser } from '../../../../../utils/input-format-money';
import ImgUpload from '../../../../../components/base/ImgUpload';
import { IProduct, IVariants } from '../../../../../types/product.types';
import onRemoveParams from '../../../../../utils/on-remove-params';
import {
  MinusCircleOutlined,
  PlusOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { categoryService, uploadService } from '../../../../../services';
import { ICategory } from '../../../../../types/category';

interface IProps {
  item?: IProduct;
  handleSubmit: (data: Record<string, any>) => void;
}

type FieldType = {
  name: string;
  description?: string;
  brand: string;
  productModel: string;
  operatingSystem?: string;
  categories?: any[];
  variants: IVariants[];
  images: string[];
};

const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];

const generateSKU = (brand: string, productModel: string, storage: string) => {
  const cleanBrand = brand
    .replace(/[^a-zA-Z0-9]/g, '-')
    .toUpperCase()
    .substring(0, 5);

  const cleanModel = productModel
    .replace(/[^a-zA-Z0-9]/g, '-')
    .toUpperCase()
    .substring(0, 5);

  return `${cleanBrand}-${cleanModel}-${storage}-${Date.now().toString().slice(-4)}`;
};

export default function CreateOrEditProduct({ item, handleSubmit }: IProps) {
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const [deletedImages, setDeletedImages] = React.useState<string[]>([]);
  const [form] = Form.useForm();
  const [categories, setCategories] = React.useState<ICategory[]>([]);

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

  const handleGenerateSKU = (variantIndex: number) => {
    const brand = form.getFieldValue('brand');
    const productModel = form.getFieldValue('productModel');
    const storage = form.getFieldValue([
      'variants',
      variantIndex,
      'storageCapacity',
    ]) ?? '64GB';
    
    const generatedSKU = generateSKU(brand, productModel, storage);
    form.setFieldValue(['variants', variantIndex, 'sku'], generatedSKU);
  };

  const initialVariants = item?.variants?.length
    ? item.variants
    : [
        {
          sku: '',
          stock: 0,
          price: 0,
          originalPrice: 0,
          color: '#000000',
          storageCapacity: '64GB',
          specifications: [],
        },
      ];

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

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const uploadedImages = await handleUploadFiles(files);
      const currentImages = form.getFieldValue('images') || [];

      const body = onRemoveParams({
        ...values,
        images: [...currentImages, ...uploadedImages],
      });

      handleSubmit(body);

      if (deletedImages.length > 0) {
        await uploadService.deleteImages(deletedImages);
      }
    } catch (error: any) {
      message.error(error?.message);
    }
  };

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
          variants: initialVariants,
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
          label="Thương hiệu"
          name="brand"
          rules={[{ required: true, message: 'Hãy điền thương hiệu' }]}
        >
          <Input className="w-full" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Model"
          name="productModel"
          rules={[{ required: true, message: 'Hãy điền productModel' }]}
        >
          <Input className="w-full" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Hệ điều hành"
          name="operatingSystem"
        >
          <Input className="w-full" />
        </Form.Item>

        {/* Phần Variants */}
        <Card title="Biến thể" className="mb-4">
          <Form.List name="variants">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => {
                  const variantIndex = name;
                  return (
                    <Card
                      key={key}
                      className="mb-4"
                      extra={
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      }
                    >
                      <Row gutter={16}>
                        <Col span={6}>
                          <Form.Item
                            {...restField}
                            label="SKU"
                            name={[name, 'sku']}
                            rules={[{ required: true, message: 'Nhập SKU' }]}
                          >
                            <Input
                              addonAfter={
                                <Tooltip title="Tạo tự động">
                                  <SyncOutlined
                                    onClick={() =>
                                      handleGenerateSKU(variantIndex)
                                    }
                                    className="cursor-pointer"
                                  />
                                </Tooltip>
                              }
                            />
                          </Form.Item>
                        </Col>
                        
                        <Col span={6}>
                          <Form.Item
                            {...restField}
                            label="Dung lượng"
                            name={[name, 'storageCapacity']}
                            rules={[{ required: true }]}
                          >
                            <Select options={storageOptions.map(o => ({
                              value: o,
                              label: o
                            }))} />
                          </Form.Item>
                        </Col>

                        <Col span={6}>
                          <Form.Item
                            {...restField}
                            label="Màu sắc"
                            name={[name, 'color']}
                            rules={[{ required: true }]}
                          >
                            <Input type="color" />
                          </Form.Item>
                        </Col>

                        <Col span={6}>
                          <Form.Item
                            {...restField}
                            label="Tồn kho"
                            name={[name, 'stock']}
                            rules={[{ required: true }]}
                          >
                            <InputNumber min={0} className="w-full" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16} className="mt-4">
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            label="Giá gốc"
                            name={[name, 'originalPrice']}
                            rules={[{ required: true }]}
                          >
                            <InputNumber
                              className="w-full"
                              formatter={formatter}
                              parser={parser}
                              min={0}
                            />
                          </Form.Item>
                        </Col>
                        
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            label="Giá bán"
                            name={[name, 'price']}
                            rules={[{ required: true }]}
                          >
                            <InputNumber
                              className="w-full"
                              formatter={formatter}
                              parser={parser}
                              min={0}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      {/* Specifications */}
                      <Form.Item
                        label="Thông số kỹ thuật"
                        {...restField}
                        name={[name, 'specifications']}
                      >
                        <Form.List name={[name, 'specifications']}>
                          {(specFields, { add: addSpec, remove: removeSpec }) => (
                            <>
                              {specFields.map(({ key: specKey, name: specName }) => (
                                <Row gutter={16} key={specKey} className="mb-2">
                                  <Col span={10}>
                                    <Form.Item
                                      name={[specName, 'key']}
                                      rules={[{ required: true }]}
                                    >
                                      <Input placeholder="Tên thông số" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={10}>
                                    <Form.Item
                                      name={[specName, 'value']}
                                      rules={[{ required: true }]}
                                    >
                                      <Input placeholder="Giá trị" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={4}>
                                    <MinusCircleOutlined
                                      onClick={() => removeSpec(specName)}
                                    />
                                  </Col>
                                </Row>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() => addSpec()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Thêm thông số
                              </Button>
                            </>
                          )}
                        </Form.List>
                      </Form.Item>
                    </Card>
                  );
                })}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm biến thể
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        {/* Các trường khác */}
        <Form.Item<FieldType> label="Danh mục" name="categories">
          <Select
            mode="multiple"
            options={categories.map((c) => ({
              value: c._id,
              label: c.name,
            }))}
            placeholder="Chọn danh mục"
          />
        </Form.Item>

        <Form.Item<FieldType> label="Mô tả sản phẩm" name="description">
          <TextArea rows={4} />
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