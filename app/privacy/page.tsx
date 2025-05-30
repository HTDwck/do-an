"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Lock, Eye, UserCheck } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-cyan-600 mb-4">Chính sách bảo mật</h1>
          <p className="text-lg text-gray-600">Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}</p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-cyan-600" />
              <h2 className="text-2xl font-bold text-gray-800">Cam kết bảo mật</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Pet Care cam kết bảo vệ thông tin cá nhân của khách hàng. Chính sách này mô tả cách chúng tôi thu thập, sử
              dụng, lưu trữ và bảo vệ thông tin của bạn khi sử dụng dịch vụ của chúng tôi.
            </p>
          </CardContent>
        </Card>

        {/* Information Collection */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Thông tin chúng tôi thu thập</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Thông tin cá nhân</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Họ tên, số điện thoại, địa chỉ email</li>
                  <li>Thông tin thú cưng (tên, loại, tuổi, tình trạng sức khỏe)</li>
                  <li>Lịch sử sử dụng dịch vụ</li>
                  <li>Thông tin thanh toán (được mã hóa an toàn)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Thông tin tự động</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Địa chỉ IP, loại trình duyệt</li>
                  <li>Thời gian truy cập website</li>
                  <li>Cookies và dữ liệu phiên làm việc</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information Usage */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Cách chúng tôi sử dụng thông tin</h2>
            </div>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Cung cấp và cải thiện dịch vụ chăm sóc thú cưng</li>
              <li>Xử lý đặt lịch hẹn và thanh toán</li>
              <li>Gửi thông báo về lịch hẹn và chăm sóc thú cưng</li>
              <li>Hỗ trợ khách hàng và giải đáp thắc mắc</li>
              <li>Phân tích và cải thiện trải nghiệm người dùng</li>
              <li>Tuân thủ các yêu cầu pháp lý</li>
            </ul>
          </CardContent>
        </Card>

        {/* Information Protection */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-800">Bảo vệ thông tin</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Biện pháp bảo mật</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Mã hóa SSL/TLS cho tất cả dữ liệu truyền tải</li>
                  <li>Hệ thống firewall và bảo mật nhiều lớp</li>
                  <li>Kiểm soát truy cập nghiêm ngặt</li>
                  <li>Sao lưu dữ liệu định kỳ</li>
                  <li>Đào tạo nhân viên về bảo mật thông tin</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Lưu trữ dữ liệu</h3>
                <p className="text-gray-600">
                  Thông tin của bạn được lưu trữ trên máy chủ an toàn tại Việt Nam, tuân thủ các quy định về bảo vệ dữ
                  liệu cá nhân.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Rights */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quyền của bạn</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Quyền truy cập</h3>
                <p className="text-gray-600 text-sm">
                  Bạn có quyền yêu cầu xem thông tin cá nhân mà chúng tôi đang lưu trữ.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Quyền chỉnh sửa</h3>
                <p className="text-gray-600 text-sm">Bạn có thể yêu cầu cập nhật hoặc sửa đổi thông tin cá nhân.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Quyền xóa</h3>
                <p className="text-gray-600 text-sm">
                  Bạn có quyền yêu cầu xóa thông tin cá nhân trong một số trường hợp.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Quyền phản đối</h3>
                <p className="text-gray-600 text-sm">Bạn có thể từ chối việc xử lý thông tin cho mục đích marketing.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-cyan-50 border-cyan-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-cyan-700 mb-4">Liên hệ về bảo mật</h2>
            <p className="text-gray-600 mb-4">
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc muốn thực hiện các quyền của mình, vui lòng
              liên hệ:
            </p>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Email:</strong> privacy@petcare.vn
              </p>
              <p>
                <strong>Điện thoại:</strong> 0914219420
              </p>
              <p>
                <strong>Địa chỉ:</strong> 39 Hồ Tùng Mậu, Hà Nội
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
