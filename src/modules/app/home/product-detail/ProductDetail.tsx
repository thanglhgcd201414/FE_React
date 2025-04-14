import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  Rate,
  Tabs,
  TabsProps,
  Skeleton,
  Tag,
  message,
  Dropdown,
  MenuProps,
} from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  HeartFilled,
  LinkOutlined,
  MailOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Thumbs } from 'swiper/modules';
import { IProduct, IVariants } from '../../../../types/product.types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { cartService, productService, profileService } from '../../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../lib/store';
import { addCartInfo } from '../../../../lib/reducer/cartSlice';
import buildImageUrl from '../../../../utils/build-image-url';
import ProductRating from './ProductRating';
import ProductAttributes from './ProductAttributes';
import { setUser } from '../../../../lib/reducer/userSlice';
import { DEFINE_USER_ROUTERS } from '../../../../constants/route-mapper';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<IVariants | null>(
    null,
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const dispatch = useDispatch();
  const { cartInfo } = useSelector((state: IRootState) => state.cart);
  const [isFavorite, setIsFavorite] = useState(false);
  const { userData } = useSelector((state: IRootState) => state.user); 
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (userData && product) {
        try {
          const response = await productService.checkFavorite(product._id);
          setIsFavorite(response.data.isFavorite);
        } catch (error) {
          console.error('Error checking favorite status:', error);
        }
      }
    };
    
    checkFavoriteStatus();
  }, [product, userData]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const response = await productService.findOne(id);
          const {productDetail: productData, relatedProducts} = response.data;
          setProduct(productData);
          const initialVariant = productData.variants[0] || null;
          if (!initialVariant) return;
          setSelectedVariant(initialVariant);
          setSelectedColor(initialVariant.color);
          setSelectedStorage(initialVariant.storageCapacity);
          setRelatedProducts(relatedProducts);
        }
      } catch (error) {
        message.error('Không thể tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && selectedColor && selectedStorage) {
      const matchedVariant = product.variants.find(
        (v) =>
          v.color === selectedColor && v.storageCapacity === selectedStorage,
      );
      setSelectedVariant(matchedVariant || null);
    }
  }, [selectedColor, selectedStorage, product]);

  const handleAddToCart = async () => {
    if(!cartInfo?._id) {
      message.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }
    if (!selectedVariant) {
      message.error('Vui lòng chọn đầy đủ thông tin sản phẩm');
      return;
    }

    try {
      const rs = await cartService.addItemToCart(cartInfo._id, {
        productId: product!._id,
        sku: selectedVariant.sku,
        quantity: 1
      });

      dispatch(addCartInfo(rs.data))

      message.success('Đã thêm vào giỏ hàng');
    } catch (error) {
      message.error('Thêm vào giỏ hàng thất bại');
    }
  };

    const fetchUserData = async () => {
      try {
        const response = await profileService.getProfile();
        dispatch(setUser(response.data));
      } catch (error) {
        message.error('Lấy thông tin thất bại');
      }
    };

  const handleToggleFavorite = async () => {
    if (!userData) {
      message.error('Vui lòng đăng nhập để sử dụng tính năng này');
      return;
    }
  
    try {
      if (isFavorite) {
        await productService.removeFromMyFavoriteProduct(product!._id);
        message.success('Đã xóa khỏi danh sách yêu thích');
      } else {
        await productService.addToMyFavoriteProduct(product!._id);
        message.success('Đã thêm vào danh sách yêu thích');
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      message.error('Thao tác thất bại');
    } finally {
      fetchUserData();
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Mô Tả Chi Tiết',
      children: product?.description || 'Không có mô tả',
    },
    {
      key: '2',
      label: 'Thông Số Kỹ Thuật',
      children: <ProductAttributes variant={selectedVariant}/>
    },
    {
      key: '3',
      label: `Đánh Giá (${product?.reviews?.length ?? 0})`,
      children: (
        <ProductRating product={product}/>
      ),
    },
  ];

  const itemsShare: MenuProps['items'] = [
    {
      key: 'facebook',
      label: 'Facebook',
      icon: <FacebookOutlined />,
      onClick: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
          '_blank'
        );
      }
    },
    {
      key: 'twitter',
      label: 'Twitter',
      icon: <TwitterOutlined />,
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${product?.name} - ${window.location.href}`)}`,
          '_blank'
        );
      }
    },
    {
      key: 'email',
      label: 'Email',
      icon: <MailOutlined />,
      onClick: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(product?.name || '')}&body=${encodeURIComponent(window.location.href)}`;
      }
    },
    {
      key: 'copy',
      label: 'Sao chép link',
      icon: <LinkOutlined />,
      onClick: () => {
        navigator.clipboard.writeText(window.location.href);
        message.success('Đã sao chép link');
      }
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-8">Không tìm thấy sản phẩm</div>;
  }

  const colors = Array.from(new Set(product.variants.map((v) => v.color)));
  const storagesForColor = selectedColor
    ? Array.from(
        new Set(
          product.variants
            .filter((v) => v.color === selectedColor)
            .map((v) => v.storageCapacity),
        ),
      )
    : [];

    const renderRelatedProducts = () => {
      if (relatedProducts.length === 0) return null;
    
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-16 px-4"
        >
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
          
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            modules={[Navigation, Autoplay]}
            className="related-products-swiper"
          >
            {relatedProducts.map((product) => {
              const firstVariant = product.variants[0];
              const discount = firstVariant?.originalPrice > firstVariant?.price 
                ? Math.round(((firstVariant.originalPrice - firstVariant.price) / firstVariant.originalPrice) * 100)
                : 0;
    
              return (
                <SwiperSlide key={product._id}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="border rounded-lg p-4 hover:shadow-lg transition-all mx-2 h-full"
                  >
                    <Link to={DEFINE_USER_ROUTERS.productDetail.replace(':id', product._id)}>
                      <div className="relative">
                        <img
                          src={buildImageUrl(product.images[0])}
                          alt={product.name}
                          className="w-full h-16 object-contain mb-4"
                        />
                        {discount > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                            -{discount}%
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Tag color="blue">{product.brand}</Tag>
                          <Tag color="green">Còn {firstVariant?.stock || 0} cái</Tag>
                        </div>
                        {firstVariant && (
                          <div className="flex flex-col">
                            <span className="text-red-600 font-bold">
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              }).format(firstVariant.price)}
                            </span>
                            {discount > 0 && (
                              <span className="text-gray-400 line-through text-sm">
                                {new Intl.NumberFormat('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND',
                                }).format(firstVariant.originalPrice)}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Rate 
                            disabled 
                            allowHalf 
                            value={product.ratingAverage} 
                            className="text-sm" 
                          />
                          <span className="text-gray-500 text-sm">
                            ({product.reviews?.length || 0})
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      );
    };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Swiper
            spaceBetween={10}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="!h-[420px] rounded-lg shadow-lg"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.img
                  src={buildImageUrl(image)}
                  alt={product.name}
                  className="w-full h-full !object-contain"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress
            className="thumbnail-swiper !h-[60px]"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={buildImageUrl(image)}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full !h-16 !object-contain cursor-pointer rounded-lg border-2 border-transparent hover:border-blue-500"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              {product.ratingAverage ? (
                <>
                  <Rate 
                    allowHalf 
                    defaultValue={product.ratingAverage} 
                    className="text-sm text-yellow-500" 
                  />
                  <span className="text-gray-600 text-sm">
                    ({product.ratingAverage.toFixed(1)}/5)
                  </span>
                </>
              ) : (
                <span className="text-gray-400 text-sm">
                  Chưa có đánh giá
                </span>
              )}
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">Thương hiệu:</span>
                <Tag color="blue">{product.brand}</Tag>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Model:</span>
                <Tag color="geekblue">{product.productModel}</Tag>
              </div>
              {product.operatingSystem && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Hệ điều hành:</span>
                  <Tag color="purple">{product.operatingSystem}</Tag>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {selectedVariant && (
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-red-600">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(selectedVariant.price)}
                </span>
                {selectedVariant.originalPrice > selectedVariant.price && (
                  <span className="text-gray-400 line-through">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(selectedVariant.originalPrice)}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center gap-2">
              <Tag icon={<EnvironmentOutlined />} color="blue">
                Còn {selectedVariant?.stock ?? 0} sản phẩm
              </Tag>
              <Tag icon={<ClockCircleOutlined />} color="green">
                Giao hàng trong 2-4 ngày
              </Tag>
            </div>

            {colors.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Màu sắc:</h3>
                <div className="flex flex-wrap gap-2">
                <div className="flex gap-2">
                {colors.map((color) => (
                  <Button
                    key={color}
                    shape="circle"
                    className={`
                      !h-8 !w-8 !p-0 !min-w-0 
                      ${color === selectedColor ? 'opacity-100' : 'opacity-50'}
                      hover:opacity-100 transition-all duration-200
                      ${color === selectedColor ? 'ring-2 ring-offset-2 ring-red-600' : ''}
                    `}
                    style={{
                      backgroundColor: color,
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                    }}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedStorage(null);
                    }}
                  />
                ))}
              </div>
                </div>
              </div>
            )}

            {selectedColor && storagesForColor.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Dung lượng:</h3>
                <div className="flex flex-wrap gap-2">
                  {storagesForColor.map((storage, index) => {
                    const variantStock =
                      product.variants.find(
                        (v) =>
                          v.color === selectedColor &&
                          v.storageCapacity === storage,
                      )?.stock || 0;

                    return (
                      <Button
                        key={index}
                        type={
                          selectedStorage === storage ? 'primary' : 'default'
                        }
                        onClick={() => setSelectedStorage(storage)}
                        disabled={variantStock === 0}
                      >
                        {storage}
                        {variantStock === 0 && (
                          <span className="text-xs text-red-500 ml-1">
                            (Hết hàng)
                          </span>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={!selectedVariant}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                size="large"
                icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                className="flex-1"
                danger={isFavorite}
                onClick={handleToggleFavorite}
                disabled={!userData}
              >
                {isFavorite ? 'Đã thích' : 'Yêu thích'}
              </Button>
              <Dropdown 
                menu={{ items: itemsShare }} 
                trigger={['click']}
                placement="topCenter"
                disabled={!product}
              >
                <Button
                  size="large"
                  icon={<ShareAltOutlined />}
                  className="flex-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  Chia sẻ
                </Button>
              </Dropdown>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Danh mục:</h3>
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category, index) => (
                <Tag className="px-3 py-1" color="geekblue" key={index}>
                  {category.name}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-[40px]"
      >
        <Tabs
          items={items}
          defaultActiveKey="1"
          animated
          tabBarStyle={{ fontSize: '16px' }}
        />
      </motion.div>

      {renderRelatedProducts()}
    </motion.div>
  );
}
