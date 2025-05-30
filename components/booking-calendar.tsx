"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, User } from "lucide-react"

const TIME_SLOTS = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

const SERVICES = [
  { id: "bath", name: "Tắm thú cưng", duration: "1 giờ", price: 80000 },
  { id: "grooming", name: "Cắt tỉa lông", duration: "1.5 giờ", price: 120000 },
  { id: "health", name: "Kiểm tra sức khỏe", duration: "30 phút", price: 150000 },
  { id: "nail", name: "Cắt móng", duration: "30 phút", price: 50000 },
]

interface BookingCalendarProps {
  onBookingComplete: (booking: any) => void
}

export function BookingCalendar({ onBookingComplete }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [selectedService, setSelectedService] = useState<string>()
  const [petName, setPetName] = useState("")

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedService || !petName) {
      alert("Vui lòng điền đầy đủ thông tin!")
      return
    }

    const service = SERVICES.find((s) => s.id === selectedService)
    const booking = {
      date: selectedDate,
      time: selectedTime,
      service: service,
      petName: petName,
      id: Date.now().toString(),
    }

    onBookingComplete(booking)

    // Reset form
    setSelectedDate(undefined)
    setSelectedTime(undefined)
    setSelectedService(undefined)
    setPetName("")
  }

  const selectedServiceData = SERVICES.find((s) => s.id === selectedService)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-600">
          <Calendar className="w-5 h-5" />
          Đặt lịch chăm sóc thú cưng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Calendar */}
          <div>
            <h3 className="font-semibold mb-3">Chọn ngày</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              className="rounded-md border"
            />
          </div>

          {/* Booking Details */}
          <div className="space-y-4">
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
                        <span>{service.name}</span>
                        <Badge variant="secondary">{service.price.toLocaleString()}đ</Badge>
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
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Tên thú cưng</h3>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nhập tên thú cưng"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            <Button
              onClick={handleBooking}
              className="w-full bg-cyan-600 hover:bg-cyan-700"
              disabled={!selectedDate || !selectedTime || !selectedService || !petName}
            >
              Đặt lịch ngay
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
