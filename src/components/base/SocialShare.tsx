import { Button } from 'antd';
import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  LinkOutlined,
} from '@ant-design/icons';
import { message } from 'antd';

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare = ({ url, title }: SocialShareProps) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    message.success('Đã sao chép liên kết vào clipboard!');
  };

  const socialLinks = [
    {
      id: 1,
      name: 'Facebook',
      icon: <FacebookFilled className="text-[#1877F2]" />,
      action: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      id: 2,
      name: 'Twitter',
      icon: <TwitterOutlined className="text-[#1DA1F2]" />,
      action: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      id: 3,
      name: 'LinkedIn',
      icon: <LinkedinFilled className="text-[#0A66C2]" />,
      action: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      id: 4,
      name: 'Copy Link',
      icon: <LinkOutlined className="text-gray-600" />,
      action: handleCopyLink,
    },
  ];

  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-600 font-medium">Chia sẻ:</span>
      <div className="flex items-center gap-3">
        {socialLinks.map((link: any) => (
          <Button
            key={link.name}
            type="text"
            shape="circle"
            size="large"
            icon={link.icon}
            onClick={() => {
              if (link.id === 4) {
                link.action();
              } else {
                window.open(
                  link.action as string,
                  '_blank',
                  'noopener,noreferrer',
                );
              }
            }}
            className="flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label={`Chia sẻ lên ${link.name}`}
            title={`Chia sẻ lên ${link.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
