"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogTitle, DialogTrigger, VisuallyHidden } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, Filter, Star, Phone, MapPin, Clock, LogOut } from "lucide-react"
import Link from "next/link"

// Import new components
import { AIChatWidget } from "@/components/ai-chat-widget"
import { EnhancedBookingCalendar } from "@/components/enhanced-booking-calendar"
import { EnhancedRegistration } from "@/components/enhanced-registration"
import { LoginForm } from "@/components/login-form"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { FAQ } from "@/components/faq"
import { UserDashboard } from "@/components/user-dashboard"

// Import storage utilities
import { sessionStorage, bookingStorage, analyticsStorage, type Booking, type User } from "@/lib/storage"

const SERVICES = [
  {
    id: "bath",
    name: "Tắm thú cưng",
    img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    desc: "Tắm gội, vệ sinh lông, khử mùi thơm mát cho chó mèo.",
    price: 80000,
    duration: "1 giờ",
    rating: 4.8,
    category: "grooming",
  },
  {
    id: "grooming",
    name: "Cắt tỉa lông",
    img: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=600&q=80",
    desc: "Cắt tỉa tạo kiểu lông chuyên nghiệp, an toàn cho thú cưng.",
    price: 120000,
    duration: "1.5 giờ",
    rating: 4.9,
    category: "grooming",
  },
  {
    id: "health",
    name: "Kiểm tra sức khỏe",
    img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80",
    desc: "Khám tổng quát, tư vấn sức khỏe và dinh dưỡng cho thú cưng.",
    price: 150000,
    duration: "30 phút",
    rating: 4.7,
    category: "health",
  },
  {
    id: "nail",
    name: "Cắt móng",
    img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80",
    desc: "Cắt móng an toàn, vệ sinh tai và làm sạch răng miệng.",
    price: 50000,
    duration: "30 phút",
    rating: 4.6,
    category: "grooming",
  },
]

const TIPS = [
  {
    title: "Dinh dưỡng cân bằng",
    content: "Chọn thức ăn phù hợp với lứa tuổi và thể trạng thú cưng. Luôn chuẩn bị nước sạch mỗi ngày.",
  },
  {
    title: "Vận động thường xuyên",
    content: "Cho thú cưng chơi đùa, đi dạo, vận động mỗi ngày để tăng sức khỏe & giảm stress.",
  },
  {
    title: "Vệ sinh & tắm rửa",
    content: "Tắm rửa định kỳ, giữ vệ sinh chỗ nằm, kiểm tra ve rận để bảo vệ sức khỏe thú cưng.",
  },
  {
    title: "Thăm khám thú y",
    content: "Cho thú cưng thăm khám và tiêm phòng định kỳ để phát hiện kịp thời các bệnh lý.",
  },
]

export default function PetCareWebsite() {
  const [user, setUser] = useState<User | null>(null)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [authOpen, setAuthOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    // Load current user and bookings on component mount
    const currentUser = sessionStorage.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      const userBookings = bookingStorage.getBookingsByUser(currentUser.id)
      setBookings(userBookings)
    }

    // Track page view
    analyticsStorage.trackAction("page_view", { page: "home" })
  }, [])

  const handleLoginSuccess = (userData: User) => {
    setUser(userData)
    setAuthOpen(false)
    const userBookings = bookingStorage.getBookingsByUser(userData.id)
    setBookings(userBookings)
    addNotification(`Chào mừng ${userData.fullName} quay lại!`)
  }

  const handleLogout = () => {
    if (user) {
      analyticsStorage.trackAction("user_logout", { userId: user.id })
    }
    sessionStorage.clearCurrentUser()
    setUser(null)
    setBookings([])
    addNotification("Bạn đã đăng xuất.")
  }

  const handleRegistration = (userData: User) => {
    setUser(userData)
    setAuthOpen(false)
    addNotification(`Chào mừng ${userData.fullName} đến với Pet Care!`)
  }

  const handleBookingComplete = (booking: Booking) => {
    const newBookings = [...bookings, booking]
    setBookings(newBookings)
    setBookingOpen(false)
    addNotification(
      `Đã đặt lịch ${booking.serviceName} cho ${booking.petName} vào ${new Date(booking.date).toLocaleDateString()} lúc ${booking.time}`,
    )
  }

  const addNotification = (message: string) => {
    setNotifications((prev) => [message, ...prev.slice(0, 4)])
    setTimeout(() => {
      setNotifications((prev) => prev.slice(0, -1))
    }, 5000)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("Vui lòng điền đầy đủ thông tin.")
      return
    }
    addNotification(`Cảm ơn ${contactForm.name}! Chúng tôi đã nhận được câu hỏi của bạn.`)
    setContactForm({ name: "", email: "", message: "" })
    analyticsStorage.trackAction("contact_form_submit", { name: contactForm.name })
  }

  const handleServiceBooking = (serviceName: string) => {
    if (!user) {
      alert("Vui lòng đăng nhập để đặt dịch vụ!")
      setAuthOpen(true)
      return
    }
    setBookingOpen(true)
    analyticsStorage.trackAction("service_booking_attempt", { serviceName })
  }

  const filteredServices = SERVICES.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.desc.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen">
      {/* Background */}
      <div
        className="page-background"
        style={{
          backgroundImage: "url('/images/background.jpg')",
        }}
      />
      <div className="page-overlay" />

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="notification-container">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item notification-enter">
              {notification}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="relative">
          {/* Header Background */}
          <div className="absolute inset-0 z-[-2] w-screen h-80 left-1/2 transform -translate-x-1/2">
            <div className="header-background">
              <div
                className="header-background-image"
                style={{
                  backgroundImage:
                    "url('https://thuthuatnhanh.com/wp-content/uploads/2021/07/anh-cho-cute-de-thuong.jpg')",
                }}
              />
            </div>
          </div>
          <div className="header-overlay" />

          {/* Navigation */}
          <div className="header-nav">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="user-info-container">
                  <span>Xin chào {user.fullName}!</span>
                  {bookings.length > 0 && <Badge className="ml-2 bg-yellow-500">{bookings.length} lịch hẹn</Badge>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDashboardOpen(true)}
                  className="text-white hover:bg-white/20"
                  title="Xem dashboard"
                  aria-label="Xem dashboard người dùng"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white hover:bg-white/20"
                  title="Đăng xuất"
                  aria-label="Đăng xuất khỏi tài khoản"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Dialog open={authOpen} onOpenChange={setAuthOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="nav-button-outline" onClick={() => setAuthMode("register")}>
                      Đăng ký
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <VisuallyHidden>
                      <DialogTitle>{authMode === "login" ? "Đăng nhập tài khoản" : "Đăng ký tài khoản"}</DialogTitle>
                    </VisuallyHidden>
                    {authMode === "login" ? (
                      <LoginForm
                        onLoginSuccess={handleLoginSuccess}
                        onSwitchToRegister={() => setAuthMode("register")}
                      />
                    ) : (
                      <EnhancedRegistration onRegistrationComplete={handleRegistration} />
                    )}
                  </DialogContent>
                </Dialog>

                <Button
                  className="nav-button-solid"
                  onClick={() => {
                    setAuthMode("login")
                    setAuthOpen(true)
                  }}
                >
                  Đăng nhập
                </Button>
              </div>
            )}
          </div>

          {/* Header Content */}
          <div className="header-content">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-wide drop-shadow-lg">
              DỊCH VỤ CHĂM SÓC THÚ CƯNG
            </h1>
            <p className="text-lg md:text-xl font-light mb-6 drop-shadow-md">
              Cổng dịch vụ & sản phẩm chăm sóc thú cưng hiện đại, uy tín!
            </p>

            {/* CTA Buttons */}
            <div className="flex justify-center gap-4 mb-6">
              <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Đặt lịch ngay
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                  <VisuallyHidden>
                    <DialogTitle>Đặt lịch chăm sóc thú cưng</DialogTitle>
                  </VisuallyHidden>
                  <EnhancedBookingCalendar onBookingComplete={handleBookingComplete} />
                </DialogContent>
              </Dialog>

              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
              >
                <Phone className="w-4 h-4 mr-2" />
                Hotline: 0914219420
              </Button>
            </div>

            {/* Pet Cover Images */}
            <div className="pet-images-grid">
              {[
                "https://vienmoitruong5014.org.vn/wp-content/uploads/2023/03/anh-cho-con-de-thuong_022907461.jpg",
                "https://img.meta.com.vn/Data/image/2021/09/21/hinh-anh-cho-con-3.jpg",
                "https://th.bing.com/th/id/OIP.KdRE7KHqL-46M8nrvOX2CgHaHa?rs=1&pid=ImgDetMain",
                "https://antimatter.vn/wp-content/uploads/2022/11/hinh-nen-meo-cute-de-thuong-nhat.jpeg",
                "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-cho-cute-de-thuong-nhat.jpg",
              ].map((src, index) => (
                <div key={index} className="pet-image-item">
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Pet ${index + 1}`}
                    width={100}
                    height={60}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Introduction Section */}
        <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg mb-8 p-8 mt-8">
          <h2 className="text-3xl font-bold text-cyan-600 mb-6">Giới thiệu</h2>
          <div className="intro-images-grid">
            {[
              "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=600&q=80",
            ].map((src, index) => (
              <div key={index} className="intro-image-item">
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Intro ${index + 1}`}
                  width={120}
                  height={70}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed text-center">
            Chúng tôi mang đến những kiến thức, dịch vụ và sản phẩm tốt nhất giúp bạn chăm sóc thú cưng khỏe mạnh, hạnh
            phúc. Dù là chó, mèo hay các thú cưng nhỏ khác, chăm sóc đúng cách sẽ giúp chúng sống vui vẻ bên bạn mỗi
            ngày!
          </p>
        </section>

        {/* Services Section */}
        <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg mb-8 p-8">
          <h2 className="text-3xl font-bold text-cyan-600 mb-6">Dịch vụ & Sản phẩm yêu thích</h2>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm dịch vụ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Tìm kiếm dịch vụ"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <Label htmlFor="category-filter" className="sr-only">
                Lọc theo danh mục dịch vụ
              </Label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500"
                aria-label="Lọc theo danh mục dịch vụ"
                title="Chọn danh mục dịch vụ để lọc"
              >
                <option value="all">Tất cả dịch vụ</option>
                <option value="grooming">Làm đẹp</option>
                <option value="health">Sức khỏe</option>
              </select>
            </div>
          </div>

          <div className="text-center mb-6">
            <span className="service-category-badge">Chăm sóc chó 50% • Chăm sóc mèo 50%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredServices.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video relative">
                  <Image src={service.img || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white/90 text-gray-800">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {service.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-cyan-600">{service.name}</h4>
                    <Badge variant="outline">{service.duration}</Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{service.desc}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold text-green-600 mb-4">{service.price.toLocaleString()}đ</div>
                    <Button
                      onClick={() => handleServiceBooking(service.name)}
                      className="bg-green-500 hover:bg-green-600"
                      aria-label={`Đặt dịch vụ ${service.name}`}
                    >
                      Đặt dịch vụ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy dịch vụ phù hợp. Vui lòng thử từ khóa khác.
            </div>
          )}
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Tips Section */}
        <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg mb-8 p-8">
          <h2 className="text-3xl font-bold text-cyan-600 mb-6">Mẹo chăm sóc thú cưng</h2>
          <div className="tips-images-grid">
            {[
              "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?auto=format&fit=crop&w=600&q=80",
            ].map((src, index) => (
              <div key={index} className="tips-image-item">
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Tip ${index + 1}`}
                  width={120}
                  height={70}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIPS.map((tip, index) => (
              <Card key={index} className="bg-green-50 border-green-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-green-600 mb-2">{tip.title}</h3>
                  <p className="text-gray-700 text-sm">{tip.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Newsletter */}
        <Newsletter />

        {/* Contact Section */}
        <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg mb-8 p-8">
          <h2 className="text-3xl font-bold text-cyan-600 mb-6">Liên hệ & Gửi câu hỏi</h2>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="text-center p-4">
              <Phone className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Hotline</h3>
              <p className="text-gray-600">0914219420</p>
            </Card>
            <Card className="text-center p-4">
              <MapPin className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Địa chỉ</h3>
              <p className="text-gray-600">39 Hồ Tùng Mậu, Hà Nội</p>
            </Card>
            <Card className="text-center p-4">
              <Clock className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Giờ làm việc</h3>
              <p className="text-gray-600">8:00 - 18:00 (T2-T7)</p>
            </Card>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-name" className="font-medium">
                  Họ tên của bạn*
                </Label>
                <Input
                  id="contact-name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  className="mt-1"
                  aria-label="Nhập họ tên của bạn"
                />
              </div>
              <div>
                <Label htmlFor="contact-email" className="font-medium">
                  Email liên hệ*
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  className="mt-1"
                  aria-label="Nhập email liên hệ"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="contact-message" className="font-medium">
                Câu hỏi hoặc nội dung*
              </Label>
              <Textarea
                id="contact-message"
                value={contactForm.message}
                onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                rows={4}
                required
                className="mt-1"
                aria-label="Nhập câu hỏi hoặc nội dung"
              />
            </div>
            <Button type="submit" className="bg-green-500 hover:bg-green-600" aria-label="Gửi tin nhắn liên hệ">
              Gửi tin nhắn
            </Button>
          </form>

          <div className="max-w-lg mx-auto">
            <iframe
              src="https://www.google.com/maps?q=21.036222,105.770833&z=17&output=embed"
              className="contact-map"
              allowFullScreen
              loading="lazy"
              title="Bản đồ vị trí Pet Care tại 39 Hồ Tùng Mậu, Hà Nội"
            />
          </div>
        </section>

        {/* Community Section */}
        <section className="glass-effect rounded-t-3xl shadow-lg mb-0 p-8 text-center community-gradient">
          <h2 className="text-3xl font-bold text-orange-600 mb-4 tracking-wide drop-shadow-sm">
            Cộng đồng chia sẻ kinh nghiệm về chăm sóc thú cưng
          </h2>
          <p className="text-lg text-orange-700 mb-6">Buôn có bạn - Chơi có hội</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://www.facebook.com/groups/yourpetgroup"
              target="_blank"
              rel="noopener noreferrer"
              className="community-link-facebook"
              aria-label="Tham gia nhóm Facebook Pet Care"
            >
              Tham gia Facebook Group
            </a>
            <a
              href="https://zalo.me/yourpetcare"
              target="_blank"
              rel="noopener noreferrer"
              className="community-link-zalo"
              aria-label="Tham gia cộng đồng Zalo Pet Care"
            >
              Zalo Community
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-white text-center py-6 mt-0 footer-background">
          <div className="flex justify-center gap-8 mb-4 text-sm">
            <Link href="/about" className="hover:text-cyan-200" aria-label="Trang về chúng tôi">
              Về chúng tôi
            </Link>
            <Link href="/privacy" className="hover:text-cyan-200" aria-label="Trang chính sách bảo mật">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="hover:text-cyan-200" aria-label="Trang điều khoản dịch vụ">
              Điều khoản dịch vụ
            </Link>
            <Link href="/contact" className="hover:text-cyan-200" aria-label="Trang liên hệ">
              Liên hệ
            </Link>
          </div>
          <p>đồ án chuyên ngành</p>
        </footer>
      </div>

      {/* User Dashboard Dialog */}
      <Dialog open={dashboardOpen} onOpenChange={setDashboardOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <VisuallyHidden>
            <DialogTitle>Dashboard người dùng</DialogTitle>
          </VisuallyHidden>
          <UserDashboard onClose={() => setDashboardOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Chat Widget */}
      <AIChatWidget onBookingRequest={() => setBookingOpen(true)} />
    </div>
  )
}
