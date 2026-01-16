"use client";

import { FadeUp } from "@/components/ui/motion";

type AllocationItem = {
  percentage: number;
  label: string;
  description: string;
  color: string;
};

type DonutChartProps = {
  totalSupply: string;
  allocations: AllocationItem[];
};

// 극좌표를 데카르트 좌표로 변환
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

// 도넛 세그먼트 path 생성 함수
function createDonutSegment(
  centerX: number,
  centerY: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number
): string {
  const startOuter = polarToCartesian(
    centerX,
    centerY,
    outerRadius,
    startAngle
  );
  const endOuter = polarToCartesian(centerX, centerY, outerRadius, endAngle);
  const startInner = polarToCartesian(
    centerX,
    centerY,
    innerRadius,
    startAngle
  );
  const endInner = polarToCartesian(centerX, centerY, innerRadius, endAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    startOuter.x,
    startOuter.y,
    "A",
    outerRadius,
    outerRadius,
    0,
    largeArcFlag,
    1,
    endOuter.x,
    endOuter.y,
    "L",
    endInner.x,
    endInner.y,
    "A",
    innerRadius,
    innerRadius,
    0,
    largeArcFlag,
    0,
    startInner.x,
    startInner.y,
    "Z",
  ].join(" ");
}

type DonutChartPropsInternal = {
  allocations: AllocationItem[];
  size?: number;
  outerRadius?: number;
  innerRadius?: number;
  className?: string;
};

// SVG 도넛 차트 컴포넌트
function DonutChart({
  allocations,
  size = 200,
  outerRadius = 88,
  innerRadius = 46,
  className,
}: DonutChartPropsInternal) {
  const center = size / 2;
  const gap = 1.6; // 세그먼트 간 간격 (도 단위)

  // 각 할당량을 각도로 변환
  let currentAngle = -90; // 시작 각도 (12시 방향)
  const segments = allocations.map((item) => {
    const percentage = item.percentage / 100;
    const angle = 360 * percentage;
    const safeGap = Math.min(gap, Math.max(angle - 1, 0));
    const startAngle = currentAngle + safeGap / 2;
    const endAngle = currentAngle + angle - safeGap / 2;
    currentAngle += angle;

    return {
      ...item,
      startAngle,
      endAngle,
    };
  });

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={className}
      >
        {/* 각 세그먼트를 path로 그리기 */}
        {segments.map((segment, index) => (
          <path
            key={index}
            d={createDonutSegment(
              center,
              center,
              outerRadius,
              innerRadius,
              segment.startAngle,
              segment.endAngle
            )}
            fill={segment.color}
            className="transition-opacity duration-300 hover:opacity-90"
          />
        ))}
      </svg>
    </div>
  );
}

// 할당 항목 리스트 컴포넌트
function AllocationList({
  allocations,
  totalSupply,
}: {
  allocations: AllocationItem[];
  totalSupply: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
          Allocation of Supply
        </h3>
        <p className="font-serif mt-2 text-lg text-white/70 md:text-xl">
          Total Supply: {totalSupply}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {allocations.map((item, index) => (
          <div key={index} className="group">
            <div className="flex items-start gap-3">
              {/* 색상 인디케이터 바 */}
              <div
                className="mt-1.5 h-1.5 w-12 flex-shrink-0 rounded-full transition-all duration-300 group-hover:w-16"
                style={{ backgroundColor: item.color }}
              />
              {/* 텍스트 */}
              <div className="flex-1">
                <p className="font-heading text-base font-semibold text-white md:text-lg">
                  {item.percentage}% {item.label}
                </p>
                <p className="font-serif mt-1 text-sm leading-relaxed text-white/60 md:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TokenAllocationChart({
  totalSupply,
  allocations,
}: DonutChartProps) {
  return (
    <FadeUp delay={0.1}>
      <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_30px_65px_rgba(2,4,12,0.35)] sm:p-8 md:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* 도넛 차트 */}
          <div className="flex items-center justify-center">
            <div className="lg:hidden">
              <DonutChart
                allocations={allocations}
                className="h-auto w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px]"
              />
            </div>
            <div className="hidden lg:block">
              <DonutChart
                allocations={allocations}
                size={240}
                outerRadius={112}
                innerRadius={50}
                className="h-auto w-full max-w-[360px] lg:max-w-[440px] xl:max-w-[520px] 2xl:max-w-[600px]"
              />
            </div>
          </div>
          {/* 할당 리스트 */}
          <div className="flex items-center">
            <AllocationList
              allocations={allocations}
              totalSupply={totalSupply}
            />
          </div>
        </div>
      </div>
    </FadeUp>
  );
}
