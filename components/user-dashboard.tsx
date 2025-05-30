"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Calendar, Clock, Phone, Mail, MapPin, Trash2, Download, BarChart3 } from "lucide-react"
import {
  sessionStorage,
  bookingStorage,
  analyticsStorage,
  dataManager,
  type User as UserType,
  type Booking,
} from "@/lib/storage"

interface UserDashboardProps {
  onClose: () => void
}

export function UserDashboard({ onClose }: UserDashboardProps) {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [userBookings, setUserBookings] = useState<Booking[]>([])
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    const user = sessionStorage.getCurrentUser()
    if (user) {
      setCurrentUser(user)
      const bookings = bookingStorage.getBookingsByUser(user.id)
      setUserBookings(bookings)
    }
  }, [])

  const handleCancelBooking = (bookingId: string) => {
    if (confirm("Bạn có chắc chắn muốn hủy lịch hẹn này?")) {
      const success = bookingStorage.updateBookingStatus(bookingId, "cancelled")
      if (success) {
        setUserBookings((prev) =>
          prev.map((booking) => (booking.id === bookingId ? { ...booking, status: "cancelled" as const } : booking)),
        )
        analyticsStorage.trackAction("booking_cancelled", { bookingId })
        alert("Đã hủy lịch hẹn thành công!")
      }
    }
  }

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "completed":
        return "bg-blue-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận"
      case "pending":
        return "Chờ xác nhận"
      case "completed":
        return "Hoàn thành"
      case "cancelled":
        return "Đã hủy"
      default:
        return "Không xác định"
    }
  }

  if (!currentUser) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <p>Vui lòng đăng nhập để xem dashboard</p>
          <Button onClick={onClose} className="mt-4">
            Đóng
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Dashboard - {currentUser.fullName}
          </div>
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
            <TabsTrigger value="bookings">Lịch hẹn</TabsTrigger>
            <TabsTrigger value="statistics">Thống kê</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin cá nhân</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Họ tên:</span>
                    <span>{currentUser.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Email:</span>
                    <span>{currentUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Điện thoại:</span>
                    <span>{currentUser.phone}</span>
                  </div>
                  {currentUser.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Địa chỉ:</span>
                      <span>{currentUser.address}</span>
                    </div>
                  )}
                </div>

                {currentUser.petInfo && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Thông tin thú cưng</h4>
                    <div className="grid md:grid-cols-3 gap-2 text-sm">
                      <div>
                        <strong>Tên:</strong> {currentUser.petInfo.name}
                      </div>
                      <div>
                        <strong>Loại:</strong> {currentUser.petInfo.type}
                      </div>
                      <div>
                        <strong>Tuổi:</strong> {currentUser.petInfo.age}
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  <p>Tham gia: {new Date(currentUser.createdAt).toLocaleDateString("vi-VN")}</p>
                  <p>Đăng nhập lần cuối: {new Date(currentUser.lastLogin).toLocaleDateString("vi-VN")}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lịch hẹn của bạn ({userBookings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {userBookings.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Bạn chưa có lịch hẹn nào</p>
                ) : (
                  <div className="space-y-4">
                    {userBookings.map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-cyan-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{booking.serviceName}</h4>
                                <Badge className={getStatusColor(booking.status)}>
                                  {getStatusText(booking.status)}
                                </Badge>
                              </div>
                              <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(booking.date).toLocaleDateString("vi-VN")}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {booking.time} ({booking.duration})
                                </div>
                                <div>Thú cưng: {booking.petName}</div>
                                <div>Giá: {booking.price.toLocaleString()}đ</div>
                              </div>
                              {booking.notes && <p className="text-sm text-gray-600">Ghi chú: {booking.notes}</p>}
                            </div>
                            <div className="flex gap-2">
                              {booking.status === "confirmed" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCancelBooking(booking.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{userBookings.length}</div>
                  <div className="text-sm text-gray-600">Tổng lịch hẹn</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {userBookings.filter((b) => b.status === "completed").length}
                  </div>
                  <div className="text-sm text-gray-600">Đã hoàn thành</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {userBookings.reduce((sum, b) => sum + b.price, 0).toLocaleString()}đ
                  </div>
                  <div className="text-sm text-gray-600">Tổng chi tiêu</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Dịch vụ đã sử dụng
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userBookings.length === 0 ? (
                  <p className="text-center text-gray-500">Chưa có dữ liệu</p>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(
                      userBookings.reduce(
                        (acc, booking) => {
                          acc[booking.serviceName] = (acc[booking.serviceName] || 0) + 1
                          return acc
                        },
                        {} as Record<string, number>,
                      ),
                    ).map(([service, count]) => (
                      <div key={service} className="flex justify-between items-center">
                        <span>{service}</span>
                        <Badge variant="outline">{count} lần</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cài đặt tài khoản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Xuất dữ liệu</h4>
                    <p className="text-sm text-gray-600">Tải xuống tất cả dữ liệu của bạn</p>
                  </div>
                  <Button variant="outline" onClick={dataManager.exportData}>
                    <Download className="w-4 h-4 mr-2" />
                    Xuất dữ liệu
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Thông báo</h4>
                    <p className="text-sm text-gray-600">Nhận thông báo về lịch hẹn</p>
                  </div>
                  <Badge variant={currentUser.preferences?.notifications ? "default" : "secondary"}>
                    {currentUser.preferences?.notifications ? "Bật" : "Tắt"}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Email marketing</h4>
                    <p className="text-sm text-gray-600">Nhận email khuyến mãi</p>
                  </div>
                  <Badge variant={currentUser.preferences?.marketing ? "default" : "secondary"}>
                    {currentUser.preferences?.marketing ? "Bật" : "Tắt"}
                  </Badge>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (confirm("Bạn có chắc chắn muốn xóa tất cả dữ liệu? Hành động này không thể hoàn tác!")) {
                        dataManager.clearAllData()
                        alert("Đã xóa tất cả dữ liệu!")
                        onClose()
                      }
                    }}
                  >
                    Xóa tất cả dữ liệu
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
