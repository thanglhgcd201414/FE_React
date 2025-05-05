import { motion } from 'framer-motion';
import { IProduct } from '../../../../types/product.types';
import { Card } from 'antd';
import ImageHover from '../../../../components/base/ImageHover';
import buildImageUrl from '../../../../utils/build-image-url';
import { DEFINE_USER_ROUTERS } from '../../../../constants/route-mapper';
import { useNavigate } from 'react-router-dom';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../../hooks/app.hook';
import { IRootState } from '../../../../lib/store';

const { Meta } = Card;

interface IProps {
  product: IProduct;
}

export default function DisplayProduct({ product }: IProps) {
  const navigate = useNavigate();
  const { userData } = useAppSelector((state: IRootState) => state.user);
  const isFavorite = false;

  return (
    <Card
      hoverable
      cover={
        <div className="relative">
          <ImageHover
            src={buildImageUrl(product.images[0])}
            className="object-cover !h-[280px]"
          /> 
        </div>
      }
      className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 group"
    >
      <Meta
        title={
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-2 min-h-[56px]">
            {product.name}
          </h3>
        }
        description={
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-500">
                {product.categories?.[0]?.name}
              </p>
              <div className="flex items-center gap-2">
                {/* Đã loại bỏ đánh giá */}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(product.price)}
                </span>
                <button
                  className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors group-hover:bg-primary"
                  onClick={() => navigate( DEFINE_USER_ROUTERS.productDetail.replace( ':id',  product._id, ),
                    )
                  }
                >
                  Xem ngay
                </button>
              </div>
            </div>
          </div>
        }
      />
    </Card>
  );
}