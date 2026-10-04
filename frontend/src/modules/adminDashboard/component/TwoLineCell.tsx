import type { ReactNode } from "react";

interface TwoLineCellProps {
  top: ReactNode;
  bottom: ReactNode;
}

export default function TwoLineCell({ top, bottom }: TwoLineCellProps) {
  return (
    <div className="leading-tight">
      <p className="text-xs font-semibold text-gray-900">{top}</p>
      <p className="text-[10px] text-gray-400">{bottom}</p>
    </div>
  );
}
