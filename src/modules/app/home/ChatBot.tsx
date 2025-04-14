import { useState, useRef, useEffect } from 'react';
import { Button, Input, message, Tag } from 'antd';
import {
  MessageOutlined,
  CloseOutlined,
  SendOutlined,
  StarFilled,
  ClearOutlined,
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { chatService } from '../../../services';
import { IProduct } from '../../../types/product.types';
import buildImageUrl from '../../../utils/build-image-url';
import { formatCurrency } from '../../../utils/format-money';
import { DEFINE_USER_ROUTERS } from '../../../constants/route-mapper';
import { useNavigate } from 'react-router-dom';
import { IQuickAction } from '../../../types/chat';

interface PriceRange {
  min: number;
  max: number;
}

interface QueryData {
  brand?: string;
  productModel?: string;
  operatingSystem?: string;
  storageCapacity?: string;
  color?: string;
  priceRange?: PriceRange;
}

interface MessageType {
  text: string;
  isBot: boolean;
  options?: string[];
  quickActions?: IQuickAction[];
  metadata?: QueryData;
  content?: IProduct[];
}

const ChatBot = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGotoProduct = (product?: IProduct) => {
    if (!product?._id) {
      message.error('Không tìm thấy sản phẩm bạn đang tìm kiếm');
      return;
    }
    navigate(DEFINE_USER_ROUTERS.productDetail.replace(':id', product._id));
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        text: message,
        isBot: false,
      },
    ]);

    try {
      setInputValue('');
      setLoading(true);
      const rs = await chatService.chat({ message: message });
      const newMessage = rs.data.textResponse;
      const content = rs.data.content;
      setMessages((prev) => [
        ...prev,
        {
          text: newMessage,
          isBot: true,
          content,
          options: rs.data.options,
          quickActions: rs.data.quickActions,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const chatContainerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.div
        animate={{ rotate: visible ? 0 : 360 }}
        transition={{ type: 'spring' }}
      >
        <Button
          type="primary"
          shape="circle"
          icon={visible ? <CloseOutlined /> : <MessageOutlined />}
          size="large"
          onClick={() => setVisible(!visible)}
          className="shadow-lg"
        />
      </motion.div>

      <AnimatePresence>
        {visible && (
          <motion.div
            variants={chatContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-20 right-0 w-[480px] bg-white rounded-lg shadow-xl flex flex-col h-[550px]"
          >
            <div className="bg-black text-white p-4 rounded-t-lg flex items-center">
              <MessageOutlined className="mr-2" />
              <span className="font-semibold">Chatbot - SmartPhone Store</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-3/4 p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 text-black'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {message.text}
                    {message.metadata && (
                      <div className="mt-2 text-xs">
                        {message.metadata.brand && (
                          <p>Brand: {message.metadata.brand}</p>
                        )}
                        {message.metadata.priceRange && (
                          <p>
                            Price: ${message.metadata.priceRange.min} - $
                            {message.metadata.priceRange.max}
                          </p>
                        )}
                      </div>
                    )}

                    {message.options && !message.content && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.options.map((option, i) => (
                          <Button
                            key={i}
                            size="small"
                            className="text-xs"
                            onClick={() => handleSend(option)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}

                    {message.content && (
                      <div className="mt-4">
                        <h3 className="font-medium text-lg mb-4">
                          Danh sách sản phẩm:
                        </h3>
                        <div className="grid gap-4">
                          {message.content?.map((product: IProduct) => {
                            const variant = product.variants[0];
                            const hasDiscount =
                              variant.originalPrice > variant.price;
                            const discountPercentage = hasDiscount
                              ? Math.round(
                                  ((variant.originalPrice - variant.price) /
                                    variant.originalPrice) *
                                    100,
                                )
                              : 0;

                            return (
                              <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => {
                                  handleGotoProduct(product);
                                }}
                                className="group relative border p-2 rounded-lg hover:shadow-lg transition-all bg-white cursor-pointer"
                              >
                                <div className="flex gap-2 relative">
                                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                    <img
                                      alt={product.name}
                                      src={buildImageUrl(product.images[0])}
                                      className="w-full h-full object-contain p-1"
                                    />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-800 truncate">
                                      {product.name}
                                    </h4>

                                    <div className="flex gap-1 mt-1">
                                      <Tag color="blue" className="!text-xs">
                                        {variant.color}
                                      </Tag>
                                      <Tag className="!text-xs">
                                        {variant.storageCapacity}
                                      </Tag>
                                    </div>

                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                      {product.description}
                                    </p>

                                    <div className="mt-1 flex items-center gap-1">
                                      {hasDiscount && (
                                        <span className="text-xs text-gray-400 line-through">
                                          {formatCurrency(
                                            variant.originalPrice,
                                          )}
                                        </span>
                                      )}
                                      <span
                                        className={`text-sm font-bold ${
                                          hasDiscount
                                            ? 'text-red-500'
                                            : 'text-gray-800'
                                        }`}
                                      >
                                        {formatCurrency(variant.price)}
                                      </span>
                                      {hasDiscount && (
                                        <Tag color="red" className="!text-xs">
                                          -{discountPercentage}%
                                        </Tag>
                                      )}
                                    </div>
                                  </div>
                                  {product.ratingAverage && (
                                    <div className="flex-shrink-0 self-start flex items-center gap-1">
                                      <StarFilled className="text-yellow-400" />
                                      <span className="font-medium text-sm">
                                        {product.ratingAverage.toFixed(1)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="mt-2 flex gap-2 flex-wrap">
                                  {product.brand && (
                                    <Tag color="geekblue" className="!text-xs">
                                      {product.brand}
                                    </Tag>
                                  )}
                                  {product.operatingSystem && (
                                    <Tag color="purple" className="!text-xs">
                                      {product.operatingSystem}
                                    </Tag>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center rounded-lg mb-4 bg-gray-100 w-14"
                >
                  <img alt="Typing..." src="/typing.gif" className="h-10" />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={() => handleSend(inputValue)}
                placeholder="Type your message..."
                suffix={
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Clear chat"
                    >
                      <ClearOutlined
                        onClick={() => {
                          setMessages([]);
                          setInputValue('');
                        }}
                        className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Send message"
                    >
                      <SendOutlined
                        onClick={() => handleSend(inputValue)}
                        className="text-blue-500 hover:text-blue-600 cursor-pointer transition-colors"
                      />
                    </motion.div>
                  </div>
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
