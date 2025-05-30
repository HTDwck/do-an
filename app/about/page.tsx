"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Award, Users, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background */}
      <div
        className="fixed inset-0 z-[-2] bg-cover bg-center bg-fixed opacity-20"
        style={{
          backgroundImage: "url('https://thuthuatnhanh.com/wp-content/uploads/2021/07/anh-cho-cute-de-thuong.jpg')",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-cyan-600 mb-4">Về chúng tôi</h1>
          <p className="text-lg text-gray-600">Pet Care - Đồng hành cùng bạn trong hành trình chăm sóc thú cưng</p>
        </div>

        {/* Mission */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sứ mệnh của chúng tôi</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Pet Care được thành lập với sứ mệnh mang đến những dịch vụ chăm sóc thú cưng chất lượng cao, an toàn và
              đầy yêu thương. Chúng tôi hiểu rằng thú cưng không chỉ là động vật nuôi mà còn là thành viên quan trọng
              trong gia đình bạn.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Với đội ngũ chuyên gia giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết mang đến cho thú
              cưng của bạn những trải nghiệm tuyệt vời nhất.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Yêu thương</h3>
              <p className="text-gray-600">
                Chúng tôi đối xử với mọi thú cưng như chính con em của mình, với tình yêu thương và sự chăm sóc tận tâm.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chất lượng</h3>
              <p className="text-gray-600">
                Sử dụng sản phẩm và thiết bị chất lượng cao, đảm bảo an toàn tuyệt đối cho thú cưng.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chuyên nghiệp</h3>
              <p className="text-gray-600">
                Đội ngũ nhân viên được đào tạo bài bản, có kinh nghiệm lâu năm trong lĩnh vực chăm sóc thú cưng.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tận tâm</h3>
              <p className="text-gray-600">
                Luôn lắng nghe và đáp ứng nhu cầu của khách hàng, hỗ trợ 24/7 khi cần thiết.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Đội ngũ của chúng tôi</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80"
                    alt="Dr. Nguyễn Văn A"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">Dr. Nguyễn Văn A</h3>
                <p className="text-sm text-gray-600">Bác sĩ thú y trưởng</p>
                <p className="text-xs text-gray-500 mt-2">10+ năm kinh nghiệm</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="https://media.ultv.edu.vn/resize/rps/1366/files/trankhuong/2022/02/24/ty-11-105320.png"
                    alt="Chị Trần Thị B"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">Chị Trần Thị B</h3>
                <p className="text-sm text-gray-600">Chuyên viên grooming</p>
                <p className="text-xs text-gray-500 mt-2">8+ năm kinh nghiệm</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80"
                    alt="Anh Lê Văn C"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">Anh Lê Văn C</h3>
                <p className="text-sm text-gray-600">Chuyên viên chăm sóc</p>
                <p className="text-xs text-gray-500 mt-2">5+ năm kinh nghiệm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-cyan-50 border-cyan-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-cyan-700 mb-4">Sẵn sàng chăm sóc thú cưng của bạn?</h2>
            <p className="text-gray-600 mb-6">
              Liên hệ với chúng tôi ngay hôm nay để đặt lịch hẹn hoặc tư vấn miễn phí!
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/">
                <Button className="bg-cyan-600 hover:bg-cyan-700">Đặt lịch ngay</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Liên hệ tư vấn</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}