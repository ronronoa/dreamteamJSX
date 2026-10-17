import dayjs from "dayjs"
import { AlertTriangle, ClipboardList, HeartPulse, RefreshCw, Truck } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { formatDateTime } from "@/utils/dateTime"
import { useDashboardData } from "./dashboard/useDashboardData"
import {
  areaConfig,
  barConfig,
  getHourlyReportCounts,
  getMonthlyReportCounts,
  getPatientStatusCounts,
  getRecentDashboardActivity,
  getTodayReportsCount,
  pieConfig,
} from "./dashboard/dashboardData"
import { Card, LegendDot, ProgressRow, StatCard } from "./dashboard/DashboardPrimitives"

const BAR_COLORS = ["#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"]

export default function Dashboard() {
  const dashboard = useDashboardData()
  const now = dayjs()
  const reportDates = [
    ...dashboard.operations.map((record) => record.createdAt),
    ...dashboard.patients.map((record) => record.createdAt),
    ...dashboard.dispatches.map((record) => record.record.createdAt ?? record.record.dispatch_date),
  ]
  const monthlyReportCounts = getMonthlyReportCounts(dashboard.operations, dashboard.patients, dashboard.dispatches, now)
  const patientStatusCounts = getPatientStatusCounts(dashboard.patients)
  const hourlyReportCounts = getHourlyReportCounts(reportDates.map((createdAt) => ({ createdAt })), now)
  const recentActivity = getRecentDashboardActivity(dashboard.operations, dashboard.patients, dashboard.dispatches)
  const todayReportCount = getTodayReportsCount(reportDates.map((createdAt) => ({ createdAt })), now)
  const patientPendingCount = dashboard.patients.filter((record) => record.status === "PENDING" || record.status === "TO_REVIEW").length
  const dispatchPendingCount = dashboard.dispatches.filter((record) => record.status === "PENDING" || record.status === "TO_REVIEW").length
  const activeInventoryWarnings = dashboard.inventory?.items.filter((item) => item.status !== "Available") ?? []
  const availableVehicleCount = dashboard.vehicles.filter((vehicle) => vehicle.status === "AVAILABLE").length
  const vehicleAvailability = dashboard.vehicles.length === 0
    ? 0
    : Math.round((availableVehicleCount / dashboard.vehicles.length) * 100)
  const inventoryWarningPercent = dashboard.inventory?.items.length
    ? Math.round((activeInventoryWarnings.length / dashboard.inventory.items.length) * 100)
    : 0
  const stats = [
    {
      label: "Operation logs",
      value: dashboard.operations.length.toLocaleString(),
      icon: <ClipboardList size={16} />,
      tone: "purple" as const,
      footer: <><strong className="font-semibold text-purple-700">{monthlyReportCounts[monthlyReportCounts.length - 1]?.value ?? 0}</strong> submitted this month</>,
    },
    {
      label: "Patient logs",
      value: dashboard.patients.length.toLocaleString(),
      icon: <HeartPulse size={16} />,
      tone: "green" as const,
      footer: <><strong className="font-semibold text-amber-700">{patientPendingCount}</strong> awaiting review</>,
    },
    {
      label: "Vehicle dispatches",
      value: dashboard.dispatches.length.toLocaleString(),
      icon: <Truck size={16} />,
      tone: "blue" as const,
      footer: <><strong className="font-semibold text-blue-700">{dispatchPendingCount}</strong> awaiting review</>,
    },
    {
      label: "Items needing attention",
      value: dashboard.inventory ? activeInventoryWarnings.length.toLocaleString() : "—",
      icon: <AlertTriangle size={16} />,
      tone: "red" as const,
      footer: dashboard.inventory
        ? <>{activeInventoryWarnings.slice(0, 2).map((item) => item.item).join(", ") || "All stock is within limits"}</>
        : <>Inventory data unavailable</>,
    },
  ]

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Dashboard overview</h2>
          <p className="text-xs text-gray-500">Current records and operational readiness</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-600">{now.format("MMM D, YYYY")}</span>
          <button type="button" aria-label="Refresh dashboard" title="Refresh dashboard" disabled={dashboard.loading} onClick={() => void dashboard.refreshDashboard()} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50">
            <RefreshCw size={14} className={dashboard.loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {dashboard.error && <p role="alert" className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">{dashboard.error}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => <StatCard key={stat.label} {...stat} footer={stat.footer} />)}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900">Reports by month</h3>
            <p className="mt-0.5 text-xs text-gray-500">Operation, patient, and vehicle reports over the last six months</p>
          </div>
          <ChartContainer config={barConfig} className="h-52 w-full">
            <BarChart data={monthlyReportCounts}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={28} fontSize={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="value" name="Reports" radius={[4, 4, 0, 0]}>
                {monthlyReportCounts.map((entry, index) => <Cell key={entry.month} fill={BAR_COLORS[index]} />)}
              </Bar>
            </BarChart>
          </ChartContainer>
        </Card>

        <Card className="lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">Patient log status</h3>
            <p className="mt-0.5 text-xs text-gray-500">Current patient records by review status</p>
          </div>
          <div className="flex items-center justify-center py-2">
            <ChartContainer config={pieConfig} className="h-40 w-40">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={patientStatusCounts.filter((entry) => entry.value > 0)} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={2} strokeWidth={0}>
                  {patientStatusCounts.filter((entry) => entry.value > 0).map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-900 text-xl font-bold">{dashboard.patients.length}</text>
                <text x="50%" y="50%" dy={16} textAnchor="middle" dominantBaseline="middle" className="fill-gray-500 text-[10px] font-semibold">RECORDS</text>
              </PieChart>
            </ChartContainer>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[11px]">
            {patientStatusCounts.filter((entry) => entry.value > 0).map((entry) => <LegendDot key={entry.name} color={entry.color} label={entry.name.replaceAll("_", " ")} value={String(entry.value)} />)}
            {patientStatusCounts.every((entry) => entry.value === 0) && <p className="col-span-2 text-center text-gray-500">No patient records available.</p>}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">Reports submitted today</h3>
            <p className="mt-0.5 text-xs text-gray-500">{todayReportCount} reports submitted by time of day</p>
          </div>
          <ChartContainer config={areaConfig} className="h-40 w-full">
            <AreaChart data={hourlyReportCounts}>
              <defs>
                <linearGradient id="dashboardActivityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={28} fontSize={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Area type="monotone" dataKey="activity" name="Reports" stroke="#8b5cf6" strokeWidth={2} fill="url(#dashboardActivityFill)" />
            </AreaChart>
          </ChartContainer>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="mb-1 text-sm font-bold text-gray-900">Operational readiness</h3>
          <p className="mb-5 text-xs text-gray-500">Based on registered fleet and current inventory</p>
          <div className="space-y-5">
            <ProgressRow
              label="Available vehicles"
              value={dashboard.vehicles.length === 0 ? "No vehicles" : `${availableVehicleCount} / ${dashboard.vehicles.length}`}
              percent={vehicleAvailability}
              tone="blue"
            />
            <ProgressRow
              label="Stock requiring attention"
              value={dashboard.inventory ? `${activeInventoryWarnings.length} items` : "Unavailable"}
              percent={inventoryWarningPercent}
              tone="red"
            />
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Recent reports</h3>
            <p className="mt-0.5 text-xs text-gray-500">Latest submitted operation, patient, and vehicle reports</p>
          </div>
          <span className="text-xs text-gray-500">Today: {todayReportCount}</span>
        </div>
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          {recentActivity.map((activity) => (
            <div key={`${activity.type}-${activity.id}`} className="flex items-start gap-3 py-3">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.type === "operation" ? "bg-purple-50 text-purple-600" : activity.type === "patient" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
                {activity.type === "operation" ? <ClipboardList size={14} /> : activity.type === "patient" ? <HeartPulse size={14} /> : <Truck size={14} />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-900">{activity.title}</p>
                <p className="mt-0.5 truncate text-[11px] text-gray-500">{activity.description}</p>
              </div>
              <time className="shrink-0 text-[10px] text-gray-500" dateTime={activity.createdAt}>{formatDateTime(activity.createdAt)}</time>
            </div>
          ))}
          {!dashboard.loading && recentActivity.length === 0 && <p className="py-5 text-center text-sm text-gray-500">No reports have been submitted yet.</p>}
          {dashboard.loading && <p className="py-5 text-center text-sm text-gray-500">Loading recent reports…</p>}
        </div>
      </Card>
    </div>
  )
}
