import {
  AlertTriangle,
  ArrowUpRight,
  ClipboardList,
  HeartPulse,
  ShieldCheck,
  Truck,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type {
  HourlyActivity,
  MonthlyOperationCount,
  PatientInterventionCount,
} from "@/types/dashboard";

// --- Data & Config ---

const barData: MonthlyOperationCount[] = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 48 },
  { month: "Mar", value: 28 },
  { month: "Apr", value: 68 },
  { month: "May", value: 52 },
  { month: "Jun", value: 72 },
  { month: "Jul", value: 60 },
];

const pieData: PatientInterventionCount[] = [
  { name: "Minor", value: 35, color: "#8b5cf6" },
  { name: "Medical", value: 40, color: "#10b981" },
  { name: "Referral", value: 25, color: "#f59e0b" },
];

const areaData: HourlyActivity[] = [
  { time: "08:00", activity: 45 },
  { time: "10:00", activity: 55 },
  { time: "12:00", activity: 70 },
  { time: "14:00", activity: 40 },
  { time: "16:00", activity: 65 },
  { time: "18:00", activity: 45 },
  { time: "20:00", activity: 75 },
];

const barConfig = {
  value: {
    label: "Records",
    color: "hsl(var(--chart-1))",
  },
};

const pieConfig = {
  value: { label: "Cases" },
  Minor: { label: "Minor", color: "#8b5cf6" },
  Medical: { label: "Medical", color: "#10b981" },
  Referral: { label: "Referral", color: "#f59e0b" },
};

const areaConfig = {
  activity: {
    label: "Activity Level",
    color: "#8b5cf6",
  },
};

// --- Component ---

export default function Dashboard() {
  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Operation logs"
          value="24"
          icon={<ClipboardList size={16} />}
          tone="purple"
          footer={
            <>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                <ArrowUpRight size={12} /> +12.5%
              </span>{" "}
              <span className="text-gray-500">vs last month</span>
              <p className="mt-1 text-gray-500">6 new reports since last week</p>
            </>
          }
        />

        <StatCard
          label="Patient logs"
          value="5"
          icon={<HeartPulse size={16} />}
          tone="green"
          footer={
            <>
              <span className="font-semibold text-emerald-600">• 1 resolved case</span>
              <p className="mt-1 text-gray-500">4 cases currently monitored</p>
            </>
          }
        />

        <StatCard
          label="Vehicle dispatches"
          value="3"
          icon={<Truck size={16} />}
          tone="blue"
          footer={
            <>
              <span className="font-semibold text-blue-600">• 2 active dispatches</span>
              <p className="mt-1 text-gray-500">Avg. response time: 14 min</p>
            </>
          }
        />

        <StatCard
          label="Low stock items"
          value="2"
          icon={<AlertTriangle size={16} />}
          tone="red"
          footer={
            <>
              <span className="font-semibold text-red-600">• Urgent attention needed</span>
              <p className="mt-1 text-gray-500">N95 masks &amp; First-aid below limits</p>
            </>
          }
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Operations over time</h3>
              <p className="mt-0.5 text-xs text-gray-500">
                Monthly activity volume and submitted records
              </p>
            </div>
            <button className="text-xs font-semibold text-purple-600 hover:text-purple-700">
              View logs →
            </button>
          </div>
          <ChartContainer config={barConfig} className="h-44 w-full">
            <BarChart data={barData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={10}
              />
              <YAxis hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="55%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#3b0764" />
                </linearGradient>
              </defs>
            </BarChart>
          </ChartContainer>
        </Card>

        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Patient intervention</h3>
              <p className="mt-0.5 text-xs text-gray-500">Current case distribution</p>
            </div>
            <span className="rounded-md border border-purple-200 bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700">
              84 cases
            </span>
          </div>

          <div className="flex items-center justify-center py-3">
            <ChartContainer config={pieConfig} className="h-40 w-40">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-900 text-xl font-bold"
                >
                  84
                </text>
                <text
                  x="50%"
                  y="50%"
                  dy={16}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-500 text-[10px] font-semibold"
                >
                  ACTIVE
                </text>
              </PieChart>
            </ChartContainer>
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px]">
            <LegendDot color="#8b5cf6" label="Minor" value="35%" />
            <LegendDot color="#10b981" label="Medical" value="40%" />
            <LegendDot color="#f59e0b" label="Referral" value="25%" />
          </div>
        </Card>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Response activity today</h3>
              <p className="mt-0.5 text-xs text-gray-500">
                Incoming reports and dispatch activity by hour
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-700">
              <span className="h-2 w-2 rounded-full bg-purple-600" />
              Activity level
            </span>
          </div>
          <ChartContainer config={areaConfig} className="h-32 w-full">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={10}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Area
                type="monotone"
                dataKey="activity"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#areaFill)"
              />
            </AreaChart>
          </ChartContainer>
        </Card>

        <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-5 lg:col-span-2">
          <div className="mb-4 flex items-start justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
              Response readiness
            </p>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-white">
              <ShieldCheck size={14} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ReadinessRing value={82} />
            <div>
              <p className="text-xl font-bold text-gray-900">82% prepared</p>
              <p className="text-[11px] text-gray-600">
                Ready response posture in shift A
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <ProgressRow label="Available vehicles" value="3 / 4" percent={75} tone="blue" />
            <ProgressRow label="Critical supplies" value="2 alerts" percent={35} tone="red" />
          </div>
        </div>
      </div>

      {/* Row 4 */}
      <Card>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Today's summary</h3>
            <p className="mt-0.5 text-xs text-gray-500">
              Live response activity and latest updates
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-gray-600">
            <span className="text-orange-500">📅</span>
            25 Aug 2026
          </div>
        </div>

        <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Truck size={14} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-900">
              Ambulance dispatched to Brgy. 176
            </p>
            <p className="mt-0.5 text-[11px] text-gray-500">
              Unit A-02 assigned to medical assistance call
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              EN ROUTE
            </span>
            <span className="text-[10px] text-gray-500">08:30</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ── Primitives ───────────────────────────────────────────── */

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-5 ${className}`}>
      {children}
    </div>
  );
}

const toneMap = {
  purple: { bg: "bg-purple-50", fg: "text-purple-600" },
  green:  { bg: "bg-emerald-50", fg: "text-emerald-600" },
  blue:   { bg: "bg-blue-50",   fg: "text-blue-600" },
  red:    { bg: "bg-red-50",    fg: "text-red-600" },
} as const;

function StatCard({
  label, value, icon, tone, footer,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  tone: keyof typeof toneMap;
  footer: ReactNode;
}) {
  const t = toneMap[tone];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-xs text-gray-500">{label}</p>
        <span className={`flex h-7 w-7 items-center justify-center rounded-md ${t.bg} ${t.fg}`}>
          {icon}
        </span>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="mt-3 text-[11px]">{footer}</div>
    </div>
  );
}

function LegendDot({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <span className="flex items-center gap-1.5 text-gray-600">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      <span className="text-gray-700">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </span>
  );
}

function ReadinessRing({ value }: { value: number }) {
  const r = 24;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative">
      <svg width="64" height="64" viewBox="0 0 60 60" className="-rotate-90">
        <circle cx="30" cy="30" r={r} fill="none" stroke="#e9d5ff" strokeWidth="6" />
        <circle
          cx="30" cy="30" r={r}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * c} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-purple-700">
        {value}%
      </div>
    </div>
  );
}

function ProgressRow({
  label, value, percent, tone,
}: {
  label: string;
  value: string;
  percent: number;
  tone: "blue" | "red";
}) {
  const bar = tone === "blue" ? "bg-blue-500" : "bg-red-500";
  const txt = tone === "blue" ? "text-blue-600" : "text-red-600";
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="font-semibold text-gray-800">{label}</span>
        <span className={`font-semibold ${txt}`}>{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-purple-200/60">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
