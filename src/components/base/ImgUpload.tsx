import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { message, Button, Tooltip, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';
import buildImageUrl from '../../utils/build-image-url';

interface IProps {
  imgProps?: string[];
  fileList?: UploadFile[];
  handleUploadFile: (files: UploadFile[]) => void;
  onExistingRemove?: (url: string) => void;
  maxFiles?: number;
}

const styleContainer = {
  border: '2px dashed #d9d9d9',
  borderRadius: '12px',
  padding: '16px',
  minHeight: '240px',
  backgroundColor: '#f8f8f8',
  color: '#999',
  cursor: 'pointer',
};

export default function ImgUpload({
  imgProps = [],
  fileList = [],
  handleUploadFile,
  onExistingRemove,
  maxFiles = 5,
}: IProps) {
  const existingImages = useMemo(() => imgProps || [], [imgProps]);
  const [files, setFiles] = React.useState<UploadFile[]>(fileList || []);

  const onDrop = (acceptedFiles: File[]) => {
    const newUploadFiles = acceptedFiles.map(
      (file) =>
        ({
          uid: `new-${Date.now()}-${Math.random()}`,
          name: file.name,
          status: 'done',
          originFileObj: file,
        }) as UploadFile,
    );

    const updatedFiles = [
      ...files,
      ...newUploadFiles.slice(0, maxFiles - files.length),
    ];

    if (updatedFiles.length > maxFiles) {
      message.error(`Chỉ được tải lên tối đa ${maxFiles} file`);
      return;
    }

    setFiles(updatedFiles);
    handleUploadFile(updatedFiles);
  };

  const handleRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    handleUploadFile(newFiles);
  };

  const handleRemoveExisting = (url: string) => {
    onExistingRemove?.(url);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
    maxFiles,
    multiple: true,
  });

  const thumbs = useMemo(() => {
    const existingPreviews = existingImages.map((url, index) => (
      <Col span={8} key={`existing-${index}`}>
        <div className="relative h-40 p-2 border rounded">
          <Tooltip title="Xóa ảnh">
            <Button
              className="absolute top-1 right-1 z-10"
              danger
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleRemoveExisting(url)}
            />
          </Tooltip>
          <img
            src={`${buildImageUrl(url)}?not-from-cache-please`}
            className="object-contain w-full h-full"
          />
        </div>
      </Col>
    ));

    const filePreviews = files.map((file, index) => (
      <Col span={8} key={`new-${file.uid}`}>
        <div className="relative h-40 p-2 border rounded">
          <Tooltip title="Xóa ảnh">
            <Button
              className="absolute top-1 right-1 z-10"
              danger
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleRemove(index)}
            />
          </Tooltip>
          <img
            src={
              file.originFileObj
                ? URL.createObjectURL(file.originFileObj)
                : file.url
            }
            className="object-contain w-full h-full"
            onLoad={() => {
              if (file.originFileObj) {
                URL.revokeObjectURL(URL.createObjectURL(file.originFileObj));
              }
            }}
          />
        </div>
      </Col>
    ));

    return [...existingPreviews, ...filePreviews];
  }, [files, existingImages]);

  return (
    <div>
      <Row gutter={[16, 16]} className="mb-4">
        {thumbs}
      </Row>

      <div {...getRootProps()} style={styleContainer}>
        <input {...getInputProps()} />
        <div className="text-center">
          <p>Kéo thả ảnh vào đây hoặc click để chọn</p>
          <p className="text-sm text-gray-500">
            Tối đa {maxFiles} ảnh (Đã chọn{' '}
            {files.length + existingImages.length})
          </p>
        </div>
      </div>
    </div>
  );
}
