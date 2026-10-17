export default function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[10px] font-medium text-gray-500">{label}</dt>
      <dd className="mt-0.5 break-words text-xs font-bold text-gray-900">{value}</dd>
    </div>
  );
}
