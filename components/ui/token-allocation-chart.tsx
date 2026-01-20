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

function roundCoord(value: number) {
  return Number(value.toFixed(3));
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
    roundCoord(startOuter.x),
    roundCoord(startOuter.y),
    "A",
    outerRadius,
    outerRadius,
    0,
    largeArcFlag,
    1,
    roundCoord(endOuter.x),
    roundCoord(endOuter.y),
    "L",
    roundCoord(endInner.x),
    roundCoord(endInner.y),
    "A",
    innerRadius,
    innerRadius,
    0,
    largeArcFlag,
    0,
    roundCoord(startInner.x),
    roundCoord(startInner.y),
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
  size = 240,
  outerRadius = 110,
  innerRadius = 65,
  className,
}: DonutChartPropsInternal) {
  const center = size / 2;
  const gap = 2.5; // 세그먼트 간 간격 (도 단위) - 더 넓게

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
      {/* 배경 글로우 효과 */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#e0323a]/20 via-transparent to-[#6a5efb]/20 blur-2xl" />
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={className}
        style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.3))" }}
      >
        {/* 배경 원 */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius + 2}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
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
            className="cursor-pointer transition-all duration-300 hover:brightness-110"
            style={{
              filter: `drop-shadow(0 2px 8px ${segment.color}40)`,
            }}
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
    <div className="flex flex-col gap-5 sm:gap-6">
      <div>
        <h3 className="font-heading text-xl font-bold text-white sm:text-2xl md:text-3xl">
          Allocation of Supply
        </h3>
        <p className="font-serif mt-2 text-base text-white/80 sm:text-lg md:text-xl">
          Total Supply: <span className="font-semibold text-white">{totalSupply}</span>
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4">
        {allocations.map((item, index) => (
          <div
            key={index}
            className="group rounded-xl border border-transparent bg-white/5 p-3 transition-all duration-300 hover:border-white/10 hover:bg-white/10 sm:p-4"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              {/* 색상 인디케이터 - 원형 */}
              <div
                className="h-4 w-4 flex-shrink-0 rounded-full ring-2 ring-white/20 transition-all duration-300 group-hover:scale-110 group-hover:ring-white/40 sm:h-5 sm:w-5"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 12px ${item.color}60`,
                }}
              />
              {/* 퍼센트 */}
              <div
                className="min-w-[48px] text-right font-mono text-lg font-bold sm:min-w-[56px] sm:text-xl md:text-2xl"
                style={{ color: item.color }}
              >
                {item.percentage}%
              </div>
              {/* 텍스트 */}
              <div className="flex-1">
                <p className="font-heading text-sm font-semibold text-white sm:text-base md:text-lg">
                  {item.label}
                </p>
                <p className="font-serif mt-0.5 text-xs leading-relaxed text-white/70 sm:text-sm">
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
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-5 shadow-[0_30px_65px_rgba(2,4,12,0.5)] backdrop-blur-sm sm:p-6 md:p-8 lg:p-10">
        {/* 모바일/태블릿: 세로 레이아웃, PC: 2컬럼 그리드 */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          {/* 도넛 차트 */}
          <div className="flex items-center justify-center">
            {/* 모바일 */}
            <div className="sm:hidden">
              <DonutChart
                allocations={allocations}
                size={220}
                outerRadius={100}
                innerRadius={60}
              />
            </div>
            {/* 태블릿 */}
            <div className="hidden sm:block lg:hidden">
              <DonutChart
                allocations={allocations}
                size={280}
                outerRadius={125}
                innerRadius={75}
              />
            </div>
            {/* 데스크톱 lg */}
            <div className="hidden lg:block xl:hidden">
              <DonutChart
                allocations={allocations}
                size={340}
                outerRadius={155}
                innerRadius={90}
              />
            </div>
            {/* 데스크톱 xl */}
            <div className="hidden xl:block 2xl:hidden">
              <DonutChart
                allocations={allocations}
                size={400}
                outerRadius={180}
                innerRadius={105}
              />
            </div>
            {/* 데스크톱 2xl */}
            <div className="hidden 2xl:block">
              <DonutChart
                allocations={allocations}
                size={450}
                outerRadius={200}
                innerRadius={120}
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
