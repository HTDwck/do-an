"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-cyan-600 mb-4">Điều khoản dịch vụ</h1>
          <p className="text-lg text-gray-600">Có hiệu lực từ: {new Date().toLocaleDateString("vi-VN")}</p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-cyan-600" />
              <h2 className="text-2xl font-bold text-gray-800">Điều khoản chung</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Chào mừng bạn đến với Pet Care. Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ và bị ràng
              buộc bởi các điều khoản và điều kiện sau đây. Vui lòng đọc kỹ trước khi sử dụng dịch vụ.
            </p>
          </CardContent>
        </Card>

        {/* Service Terms */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Điều khoản dịch vụ</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">1. Đặt lịch hẹn</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Khách hàng cần đặt lịch trước ít nhất 24 giờ</li>
                  <li>Xác nhận đặt lịch qua điện thoại hoặc email</li>
                  <li>Thông tin thú cưng phải chính xác và đầy đủ</li>
                  <li>Mang theo giấy tờ tiêm phòng (nếu có)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">2. Thanh toán</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Thanh toán sau khi hoàn thành dịch vụ</li>
                  <li>Chấp nhận tiền mặt, chuyển khoản, thẻ</li>
                  <li>Giá dịch vụ có thể thay đổi theo thông báo</li>
                  <li>Hóa đơn VAT theo yêu cầu</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">3. Chất lượng dịch vụ</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Cam kết sử dụng sản phẩm chất lượng cao</li>
                  <li>Nhân viên được đào tạo chuyên nghiệp</li>
                  <li>Đảm bảo an toàn cho thú cưng</li>
                  <li>Hỗ trợ tư vấn miễn phí</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cancellation Policy */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-800">Chính sách hủy lịch</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-yellow-800">Lưu ý quan trọng</h3>
                </div>
                <p className="text-yellow-700 text-sm">
                  Vui lòng thông báo hủy lịch sớm để chúng tôi có thể sắp xếp cho khách hàng khác.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-600">Hủy miễn phí</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Hủy trước 24 giờ: Miễn phí</li>
                    <li>Hủy do thời tiết xấu: Miễn phí</li>
                    <li>Hủy do thú cưng ốm: Miễn phí</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-red-600">Phí hủy lịch</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Hủy trong vòng 24 giờ: 50% phí dịch vụ</li>
                    <li>Không đến không báo: 100% phí dịch vụ</li>
                    <li>Hủy lần 3 trong tháng: Tạm ngưng dịch vụ</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Responsibilities */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Trách nhiệm các bên</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-cyan-600">Pet Care cam kết</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Cung cấp dịch vụ chất lượng cao</li>
                  <li>Đảm bảo an toàn cho thú cưng</li>
                  <li>Bảo mật thông tin khách hàng</li>
                  <li>Hỗ trợ khách hàng 24/7</li>
                  <li>Bồi thường nếu có sự cố do lỗi của chúng tôi</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange-600">Khách hàng cần</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Cung cấp thông tin chính xác</li>
                  <li>Tuân thủ lịch hẹn đã đặt</li>
                  <li>Thông báo tình trạng sức khỏe thú cưng</li>
                  <li>Thanh toán đúng hạn</li>
                  <li>Tôn trọng nhân viên và quy định</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limitation */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Giới hạn trách nhiệm</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm leading-relaxed">
                Pet Care không chịu trách nhiệm cho các tổn thất gián tiếp, ngẫu nhiên hoặc hậu quả phát sinh từ việc sử
                dụng dịch vụ. Trách nhiệm của chúng tôi được giới hạn trong phạm vi giá trị dịch vụ đã thanh toán.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-cyan-50 border-cyan-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-cyan-700 mb-4">Liên hệ hỗ trợ</h2>
            <p className="text-gray-600 mb-4">Nếu bạn có câu hỏi về điều khoản dịch vụ, vui lòng liên hệ:</p>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Hotline:</strong> 0914219420
              </p>
              <p>
                <strong>Email:</strong> support@petcare.vn
              </p>
              <p>
                <strong>Địa chỉ:</strong> 39 Hồ Tùng Mậu, Hà Nội
              </p>
              <p>
                <strong>Giờ hỗ trợ:</strong> 8:00 - 18:00 (T2-T7)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
