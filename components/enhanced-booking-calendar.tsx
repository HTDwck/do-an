"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, MapPin, CalendarIcon } from "lucide-react"
import { bookingStorage, sessionStorage, serviceStorage, analyticsStorage, type Booking } from "@/lib/storage"

const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

const SERVICES = [
  { id: "bath", name: "Tắm thú cưng", duration: "1 giờ", price: 80000 },
  { id: "grooming", name: "Cắt tỉa lông", duration: "1.5 giờ", price: 120000 },
  { id: "health", name: "Kiểm tra sức khỏe", duration: "30 phút", price: 150000 },
  { id: "nail", name: "Cắt móng", duration: "30 phút", price: 50000 },
]

interface EnhancedBookingCalendarProps {
  onBookingComplete: (booking: any) => void
}

export function EnhancedBookingCalendar({ onBookingComplete }: EnhancedBookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [selectedService, setSelectedService] = useState<string>()
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    petName: "",
    petType: "",
    petAge: "",
    notes: "",
  })

  const handleBooking = () => {
    if (
      !selectedDate ||
      !selectedTime ||
      !selectedService ||
      !customerInfo.name ||
      !customerInfo.phone ||
      !customerInfo.petName
    ) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!")
      return
    }

    const currentUser = sessionStorage.getCurrentUser()
    const service = serviceStorage.getServiceById(selectedService)

    if (!service) {
      alert("Dịch vụ không tồn tại!")
      return
    }

    const booking: Booking = {
      id: `booking_${Date.now()}`,
      userId: currentUser?.id || "guest",
      serviceId: selectedService,
      serviceName: service.name,
      petName: customerInfo.petName,
      petType: customerInfo.petType,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customerEmail: customerInfo.email,
      date: selectedDate.toISOString(),
      time: selectedTime,
      duration: service.duration,
      price: service.price,
      status: "confirmed",
      notes: customerInfo.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Save booking to storage
    const saved = bookingStorage.saveBooking(booking)

    if (saved) {
      // Track analytics
      analyticsStorage.trackAction("booking_created", {
        serviceId: selectedService,
        serviceName: service.name,
        date: selectedDate.toISOString(),
        time: selectedTime,
      })

      onBookingComplete(booking)
      alert(`Đặt lịch thành công! Mã đặt lịch: ${booking.id}`)

      // Reset form
      setSelectedDate(undefined)
      setSelectedTime(undefined)
      setSelectedService(undefined)
      setCustomerInfo({
        name: "",
        phone: "",
        email: "",
        petName: "",
        petType: "",
        petAge: "",
        notes: "",
      })
    } else {
      alert("Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại!")
    }
  }

  const selectedServiceData = SERVICES.find((s) => s.id === selectedService)

  const isWeekend = (date: Date) => {
    return date.getDay() === 0 // Sunday
  }

  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-600">
          <CalendarIcon className="w-5 h-5" />
          Đặt lịch chăm sóc thú cưng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold mb-3">Chọn ngày</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => isPastDate(date) || isWeekend(date)}
              className="rounded-md border"
            />
            <div className="mt-2 text-xs text-gray-500">* Chúng tôi nghỉ Chủ nhật</div>
          </div>

          {/* Service & Time Selection */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Chọn dịch vụ</h3>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn dịch vụ" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-gray-500">{service.duration}</div>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          {service.price.toLocaleString()}đ
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedServiceData && (
              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Thời gian: {selectedServiceData.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Tại cửa hàng: 39 Hồ Tùng Mậu, Hà Nội</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <h3 className="font-semibold mb-3">Chọn giờ</h3>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    disabled={!selectedDate}
                    className="text-xs"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-semibold mb-3">Thông tin khách hàng</h3>

            <div className="space-y-3">
              <div>
                <Label htmlFor="customerName">Họ tên *</Label>
                <Input
                  id="customerName"
                  placeholder="Nguyễn Văn A"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="customerPhone">Số điện thoại *</Label>
                <Input
                  id="customerPhone"
                  placeholder="0914219420"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  placeholder="example@email.com"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="petName">Tên thú cưng *</Label>
                <Input
                  id="petName"
                  placeholder="Tên thú cưng"
                  value={customerInfo.petName}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, petName: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="petType">Loại</Label>
                  <Select
                    value={customerInfo.petType}
                    onValueChange={(value) => setCustomerInfo((prev) => ({ ...prev, petType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Chó</SelectItem>
                      <SelectItem value="cat">Mèo</SelectItem>
                      <SelectItem value="rabbit">Thỏ</SelectItem>
                      <SelectItem value="hamster">Hamster</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="petAge">Tuổi</Label>
                  <Input
                    id="petAge"
                    placeholder="2 tuổi"
                    value={customerInfo.petAge}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, petAge: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  placeholder="Thông tin thêm về thú cưng..."
                  rows={3}
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary & Booking */}
        {selectedDate && selectedTime && selectedServiceData && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-green-700 mb-2">Tóm tắt đặt lịch</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <strong>Dịch vụ:</strong> {selectedServiceData.name}
                  </p>
                  <p>
                    <strong>Ngày:</strong> {selectedDate.toLocaleDateString("vi-VN")}
                  </p>
                  <p>
                    <strong>Giờ:</strong> {selectedTime}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Thời gian:</strong> {selectedServiceData.duration}
                  </p>
                  <p>
                    <strong>Giá:</strong> {selectedServiceData.price.toLocaleString()}đ
                  </p>
                  <p>
                    <strong>Thú cưng:</strong> {customerInfo.petName || "Chưa nhập"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center">
          <Button
            onClick={handleBooking}
            className="w-full max-w-md bg-cyan-600 hover:bg-cyan-700"
            size="lg"
            disabled={
              !selectedDate ||
              !selectedTime ||
              !selectedService ||
              !customerInfo.name ||
              !customerInfo.phone ||
              !customerInfo.petName
            }
          >
            Xác nhận đặt lịch
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
