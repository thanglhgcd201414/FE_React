import { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { message } from 'antd';
import { uploadService } from '../../../../services';

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: IProps) => {
  const quillRef = useRef<any>(null);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await uploadService.uploadImage(formData);
      return response.data;
    } catch (error) {
      message.error('Upload ảnh thất bại');
      return null;
    }
  };

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      // handlers: {
      //   image: () => {
      //     const input = document.createElement('input');
      //     input.setAttribute('type', 'file');
      //     input.setAttribute('accept', 'image/*');
      //     input.click();

      //     input.onchange = async () => {
      //       const file = input.files?.[0];
      //       if (file) {
      //         const url = await handleImageUpload(file);
      //         if (url) {
      //           const quill = quillRef.current?.getEditor();
      //           const range = quill?.getSelection();
      //           quill?.insertEmbed(range?.index || 0, 'image', url);
      //         }
      //       }
      //     };
      //   },
      // },
    },
  };

  return (
    <div className="rounded-lg border border-gray-200">
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        modules={modules}
        theme="snow"
        className="rounded-b-lg"
      />
    </div>
  );
};

export default RichTextEditor;
