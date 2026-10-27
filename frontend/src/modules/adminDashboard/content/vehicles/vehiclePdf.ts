import { jsPDF } from "jspdf"
import type { VehicleDispatchDetailRecord } from "@/api/vehicularDispatches"
import { formatDate, formatTime } from "@/utils/dateTime"
import { formatVehicularDispatchId } from "@/api/vehicularDispatches"

const PAGE_MARGIN = 16
const TOP_CONTENT = 32
const BOTTOM_CONTENT = 20
const PURPLE: [number, number, number] = [86, 35, 129]
const INK: [number, number, number] = [31, 41, 55]
const MUTED: [number, number, number] = [107, 114, 128]

export function createVehiclePdf(records: VehicleDispatchDetailRecord[]) {
  if (records.length === 0) return

  const document = new jsPDF()
  const pageHeight = document.internal.pageSize.getHeight()
  const contentWidth = document.internal.pageSize.getWidth() - PAGE_MARGIN * 2
  let y = TOP_CONTENT

  function ensureSpace(requiredHeight: number) {
    if (y + requiredHeight <= pageHeight - BOTTOM_CONTENT) return
    document.addPage()
    y = TOP_CONTENT
    addPageHeader()
  }

  function addPageHeader() {
    document.setFont("helvetica", "bold")
    document.setFontSize(8)
    document.setTextColor(...PURPLE)
    document.text("VEHICLE DISPATCH REPORT", PAGE_MARGIN, 17)
    document.setDrawColor(226, 232, 240)
    document.line(PAGE_MARGIN, 22, PAGE_MARGIN + contentWidth, 22)
  }

  function addSection(title: string) {
    ensureSpace(13)
    document.setFillColor(248, 247, 250)
    document.roundedRect(PAGE_MARGIN, y - 4, contentWidth, 9, 1.5, 1.5, "F")
    document.setFont("helvetica", "bold")
    document.setFontSize(8)
    document.setTextColor(...PURPLE)
    document.text(title.toUpperCase(), PAGE_MARGIN + 3, y + 2)
    y += 11
  }

  function addLine(label: string, value: unknown) {
    const text = value === null || value === undefined || String(value).trim() === ""
      ? "—"
      : String(value)
    const lines = document.splitTextToSize(`${label}: ${text}`, contentWidth)
    const lineHeight = 5
    ensureSpace(lines.length * lineHeight + 2)
    document.setFont("helvetica", "normal")
    document.setFontSize(9)
    document.setTextColor(...INK)
    document.text(lines, PAGE_MARGIN, y)
    y += lines.length * lineHeight + 2
  }

  function addFooter() {
    const pageCount = document.getNumberOfPages()
    for (let page = 1; page <= pageCount; page += 1) {
      document.setPage(page)
      document.setFont("helvetica", "normal")
      document.setFontSize(7)
      document.setTextColor(...MUTED)
      document.text("Generated from the vehicle records dashboard", PAGE_MARGIN, pageHeight - 8)
      document.text(`Page ${page} of ${pageCount}`, PAGE_MARGIN + contentWidth, pageHeight - 8, { align: "right" })
    }
  }

  addPageHeader()
  records.forEach((record, index) => {
    if (index > 0) {
      document.addPage()
      y = TOP_CONTENT
      addPageHeader()
    }

    document.setFont("helvetica", "bold")
    document.setFontSize(15)
    document.setTextColor(...INK)
    document.text(formatVehicularDispatchId(record.dispatch_id), PAGE_MARGIN, y)
    y += 9

    addSection("Dispatch details")
    addLine("Status", record.status)
    addLine("Date", formatDate(record.dispatch_date))
    addLine("Submitted by", record.submitter_name)
    addLine("From", record.from_location)
    addLine("To", record.to_location)
    addLine("Vehicle", record.plate_number ? `${record.vehicle_name} (${record.plate_number})` : record.vehicle_name)
    addLine("Driver", record.driver_name)
    addLine("Departure", formatTime(record.depart_time))
    addLine("Arrival", formatTime(record.arrival_time))
    addLine("Transfer", record.transfers.join(", "))
    addLine("Responders", record.responders.join(", "))
    addLine("Odometer in", record.odometer_in === null ? "—" : `${record.odometer_in} km`)
    addLine("Odometer out", record.odometer_out === null ? "—" : `${record.odometer_out} km`)

    addSection("Passengers")
    if (record.passengers.length === 0) {
      addLine("Passengers", "None recorded")
    } else {
      record.passengers.forEach((passenger, passengerIndex) => {
        addLine(`Passenger ${passengerIndex + 1}`, passenger.full_name)
        addLine("Age / sex", `${passenger.age} / ${passenger.sex.toLowerCase()}`)
        addLine("Contact", passenger.contact_no)
        addLine("Address", passenger.address)
      })
    }
  })

  addFooter()
  document.save(`vehicle-dispatch-records-${formatDate(new Date(), "YYYY-MM-DD")}.pdf`)
}
