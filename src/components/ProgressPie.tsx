import React from 'react';
import Svg, {Path, G, Circle} from 'react-native-svg';

interface PieInterface {
  percentage: number;
  radius: number;
  strokeWidth?: number;
}

const Pie = ({percentage, radius, strokeWidth = 0}: PieInterface) => {
  const r = radius;
  const cx = r + strokeWidth;
  const cy = r + strokeWidth;
  const a = (percentage / 100) * Math.PI * 2;
  const x = cx + r * Math.sin(a);
  const y = cy - r * Math.cos(a);
  const d =
    percentage === 100
      ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`
      : `M ${cx} ${cy - r} A ${r} ${r} 0 ${
          percentage > 50 ? 1 : 0
        } 1 ${x} ${y}`;
  return (
    <Svg width={r * 2 + strokeWidth * 2} height={r * 2 + strokeWidth * 2}>
      <G>
        {/* <Circle cx={cx} cy={cy} r={r} fill="#D1FED6" />
        <Path d={d + ` L ${cx} ${cy}`} fill="#26D136" /> */}
        <Circle cx={cx} cy={cy} r={r} fill="#D1FED6" />
        <Path d={d + ` L ${cx} ${cy}`} fill="#26D136" />
        <Circle cx={cx} cy={cy} r={r / 2} fill="white" />
      </G>
    </Svg>
  );
};

export default function ProgressPie({
  percentage,
  radius,
  strokeWidth,
}: PieInterface) {
  return (
    <Pie percentage={percentage} radius={radius} strokeWidth={strokeWidth} />
  );
}
