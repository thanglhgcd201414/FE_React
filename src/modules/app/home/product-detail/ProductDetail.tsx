import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
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
  ShareAltOutlined,
  ClockCircleOutlined,
  LinkOutlined,
  MailOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Thumbs } from 'swiper/modules';
import { IProduct } from '../../../../types/product.types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { cartService, productService } from '../../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../lib/store';
import { addCartInfo } from '../../../../lib/reducer/cartSlice';
import buildImageUrl from '../../../../utils/build-image-url';
import { DEFINE_USER_ROUTERS } from '../../../../constants/route-mapper';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const dispatch = useDispatch();
  const { cartInfo } = useSelector((state: IRootState) => state.cart);
  const { userData } = useSelector((state: IRootState) => state.user);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const response = await productService.findOne(id);
          const {productDetail: productData, relatedProducts} = response.data;
          setProduct(productData);
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



  const handleAddToCart = async () => {
    if(!userData) {
      message.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }

    if(!cartInfo?._id) {
      message.error("Không tìm thấy giỏ hàng của bạn. Vui lòng tải lại trang");
      console.error("Cart info not found:", cartInfo);
      return;
    }

    try {
      console.log("Adding to cart:", {
        cartId: cartInfo._id,
        productId: product!._id,
        quantity: 1
      });

      // Trong schema mới, chúng ta chỉ cần truyền productId và quantity
      const rs = await cartService.addItemToCart(cartInfo._id, {
        productId: product!._id,
        quantity: 1
      });

      dispatch(addCartInfo(rs.data))

      message.success('Đã thêm vào giỏ hàng');
    } catch (error) {
      console.error("Add to cart error:", error);
      message.error('Thêm vào giỏ hàng thất bại');
    }
  };



  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Mô Tả Chi Tiết',
      children: product?.description || 'Không có mô tả',
    }
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
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <div className="space-y-2">
                        <div className="flex flex-col">
                          <span className="text-red-600 font-bold">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(product.price)}
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
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-red-600">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product.price)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Tag icon={<ClockCircleOutlined />} color="green">
                Giao hàng trong 2-4 ngày
              </Tag>
            </div>

            <div className="flex gap-4 mt-6">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Thêm vào giỏ hàng
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
