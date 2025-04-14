import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { IBlog } from '../../../../types/blog.types';
import { blogService } from '../../../../services';
import { Breadcrumb, Empty, Tag } from 'antd';
import { DEFINE_USER_ROUTERS } from '../../../../constants/route-mapper';
import Visibility from '../../../../components/base/visibility';
import {
  ScheduleOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { formatDate } from '../../../../utils/format-date';
import buildImageUrl from '../../../../utils/build-image-url';
import SocialShare from '../../../../components/base/SocialShare';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [blogDetail, setBlog] = React.useState<IBlog>();

  const handleGetBlog = async () => {
    if (!slug) return;
    const rs = await blogService.findOne(slug);
    setBlog(rs.data);
  };

  React.useEffect(() => {
    if (slug) handleGetBlog();
  }, [slug]);

  return (
    <>
      <div className="flex flex-col justify-start items-start max-w-7xl">
        <Breadcrumb className="py-6">
          <Breadcrumb.Item>
            <Link
              to={DEFINE_USER_ROUTERS.blogs}
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Tin tức
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-gray-600">
            {blogDetail?.title || 'Bài viết'}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Visibility
          visibility={Boolean(blogDetail?._id)}
          suspenseComponent={
            <Empty description="Không tìm thấy nội dung bài viết" />
          }
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8">
            <img
              src={buildImageUrl(blogDetail?.thumbnail)}
              alt={blogDetail?.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
          </div>

          <div className="max-w-3xl mx-auto text-center mb-12">
            <Tag color="blue" className="text-sm px-4 py-1 mb-4">
              Công nghệ
            </Tag>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {blogDetail?.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <UserOutlined className="text-lg" />
                <span className="font-medium">Admin</span>
              </div>
              <div className="flex items-center space-x-2">
                <ScheduleOutlined className="text-lg" />
                <time className="font-medium">
                  {formatDate(blogDetail?.createdAt ?? '')}
                </time>
              </div>
            </div>
          </div>
        </Visibility>
      </div>

      <Visibility visibility={Boolean(blogDetail?._id)}>
        <div className="container max-w-3xl mx-auto px-4 py-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-8 border-l-4 border-blue-500 pl-4">
            {blogDetail?.description}
          </p>

          <article className="prose lg:prose-xl max-w-none">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: blogDetail?.content ?? '' }}
            />
          </article>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <SocialShare
              url={window.location.href}
              title={blogDetail?.title || ''}
            />

            <Link
              to={DEFINE_USER_ROUTERS.blogs}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-6"
            >
              <ArrowLeftOutlined className="mr-2" />
              Quay lại danh sách bài viết
            </Link>
          </div>
        </div>
      </Visibility>
    </>
  );
}
