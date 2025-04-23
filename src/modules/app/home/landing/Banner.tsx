import { motion } from 'framer-motion';
import { DEFINE_USER_ROUTERS } from '../../../../constants/route-mapper';
import { useNavigate } from 'react-router-dom';
export default function Banner() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <div className="w-full h-[460px] mt-8 bg-[#f3f3f3] flex justify-between items-center px-8 md:px-16 lg:px-28">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-bold leading-tight">
              <span className="text-primary">WinMobile - Công nghệ đỉnh cao</span>
              <br />
              <span className="text-secondary">
                Trải nghiệm tuyệt vời, giá cạnh tranh
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              Mua điện thoại chính hãng, với giá cực sốc. Chúng tôi cam kết chất
              lượng, bảo hành dài hạn và giao hàng nhanh chóng.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(DEFINE_USER_ROUTERS.listProduct)}
              className="bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary-dark transition-all duration-300 flex items-center gap-2"
            >
              <span>Mua ngay</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </motion.div>
        </div>
        <img src="/banner.png" className="h-[460px] w-auto" />
      </div>
    </motion.div>
  );
}
