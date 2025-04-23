export default function Logo({height = 56, width = 56}: {
  height?: number;
  width?: number;
}) {
  return (
    <div
      style={{height, width}}
      className="flex items-center justify-center bg-blue-600 rounded-full text-white font-bold text-xl"
    >
      <span>W</span>
    </div>
  );
}
