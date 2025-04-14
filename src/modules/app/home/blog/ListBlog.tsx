import React from 'react';
import { IBaseQuery } from '../../../../types/query.types';
import { IBlog } from '../../../../types/blog.types';
import { blogService } from '../../../../services';
import Visibility from '../../../../components/base/visibility';
import { Empty, Pagination, Skeleton, Spin, Tag } from 'antd';
import ImageHover from '../../../../components/base/ImageHover';
import { Link, useNavigate } from 'react-router-dom';
import { DEFINE_USER_ROUTERS } from '../../../../constants/route-mapper';
import { ScheduleOutlined, EyeOutlined } from '@ant-design/icons';
import { formatDate } from '../../../../utils/format-date';
import displayDescription from '../../../../utils/displayDescription';
import buildImageUrl from '../../../../utils/build-image-url';

export default function ListBlog() {
  const [listBlogs, setNewList] = React.useState<IBlog[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState<IBaseQuery>({
    page: 1,
    limit: 9,
    search: '',
  });
  const navigate = useNavigate();

  const handleClickBlog = (item: IBlog) => {
    navigate(DEFINE_USER_ROUTERS.blogsDetail.replace(':slug', item.slug));
  };

  const handleGetListBlog = async (queryParam = query) => {
    try {
      setLoading(true);
      const rs = await blogService.findAll(queryParam);
      setNewList(rs.data.content);
      setQuery({
        ...queryParam,
        total: rs.data.metaData.totalItem,
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleGetListBlog();
  }, [query.page, query.search]);

  return (
    <div className="py-8 w-full container mx-auto px-4 lg:px-0">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tin Tức Mới Nhất
        </h1>
        <p className="text-gray-500 text-sm">
          Cập nhật những bài viết và thông tin mới nhất
        </p>
      </div>

      <Visibility
        visibility={Boolean(listBlogs.length)}
        suspenseComponent={loading ? <Spin /> : null}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listBlogs.map((item) => (
            <article
              key={item._id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <ImageHover
                  src={buildImageUrl(item.thumbnail)}
                  alt="img"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Tag
                  color="#000000"
                  className="absolute top-3 left-3 shadow-sm text-white"
                >
                  <EyeOutlined className="mr-1" />
                  1.2K views
                </Tag>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center text-sm text-gray-500">
                  <ScheduleOutlined className="mr-2" />
                  <time>{formatDate(item.createdAt)}</time>
                </div>

                <Link
                  to={DEFINE_USER_ROUTERS.blogsDetail.replace(
                    ':slug',
                    item.slug,
                  )}
                  className="block text-base font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.title}
                </Link>

                <p className="text-gray-600 line-clamp-3 leading-relaxed text-sm">
                  {displayDescription(item.description)}
                </p>

                <div className="pt-4 border-t border-dashed border-gray-200">
                  <button
                    className="text-blue-600 font-medium hover:underline flex items-center"
                    onClick={() => handleClickBlog(item)}
                  >
                    Đọc thêm
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Visibility>

      {!loading && !listBlogs.length && (
        <Empty
          description={
            <span className="text-gray-500 text-lg">
              Không tìm thấy bài viết phù hợp
            </span>
          }
          className="py-16"
        />
      )}

      <div className="mt-12 flex justify-center">
        <Pagination
          total={query.total}
          pageSize={query.limit}
          current={query.page}
          onChange={(page) => setQuery({ ...query, page })}
          showSizeChanger={false}
          itemRender={(current, type, originalElement) => (
            <button className="text-lg font-medium px-3 py-1 rounded-md hover:bg-blue-50">
              {type === 'page' ? (
                <span
                  className={
                    current === query.page ? 'text-blue-600' : 'text-gray-600'
                  }
                >
                  {current}
                </span>
              ) : (
                originalElement
              )}
            </button>
          )}
          className="ant-pagination-custom"
        />
      </div>
    </div>
  );
}
