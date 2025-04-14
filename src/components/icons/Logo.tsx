import LogoIcon from '@/assets/logo.png';

export default function Logo({height = 56, width = 56}: {
  height?: number;
  width?: number;
}) {
  return <img height={height} width={width} src={LogoIcon} alt="logo" />;
}
