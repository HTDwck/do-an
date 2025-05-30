"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-cyan-600 mb-4">Liên hệ với chúng tôi</h1>
          <p className="text-lg text-gray-600">Chúng tôi luôn sẵn sàng hỗ trợ bạn và thú cưng của bạn</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-6 h-6 text-cyan-600" />
                  <h2 className="text-xl font-bold text-gray-800">Hotline hỗ trợ</h2>
                </div>
                <p className="text-2xl font-bold text-cyan-600 mb-2">0914219420</p>
                <p className="text-gray-600">Hỗ trợ 24/7 - Gọi ngay để được tư vấn</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-800">Email</h2>
                </div>
                <p className="text-lg font-semibold text-green-600 mb-2">info@petcare.vn</p>
                <p className="text-gray-600">Gửi email cho chúng tôi, phản hồi trong 24h</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-gray-800">Địa chỉ cửa hàng</h2>
                </div>
                <p className="text-lg font-semibold text-red-600 mb-2">39 Hồ Tùng Mậu, Hà Nội</p>
                <p className="text-gray-600">Ghé thăm cửa hàng để trải nghiệm dịch vụ</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-800">Giờ làm việc</h2>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-blue-600">Thứ 2 - Thứ 7: 8:00 - 18:00</p>
                  <p className="text-gray-600">Chủ nhật: Nghỉ</p>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Bản đồ</h2>
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps?q=21.036222,105.770833&z=17&output=embed"
                    width="100%"
                    height="100%"
                    className="border-0"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-cyan-600" />
                  <h2 className="text-xl font-bold text-gray-800">Gửi tin nhắn cho chúng tôi</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Họ và tên *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Nguyễn Văn A"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="0914219420"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="example@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Chủ đề</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                      placeholder="Tư vấn dịch vụ chăm sóc thú cưng"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Nội dung tin nhắn *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Mô tả chi tiết nhu cầu của bạn..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Gửi tin nhắn
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Câu hỏi thường gặp</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-left h-auto p-3">
                    <div>
                      <p className="font-medium">Làm thế nào để đặt lịch hẹn?</p>
                      <p className="text-sm text-gray-500">Hướng dẫn đặt lịch online hoặc qua điện thoại</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left h-auto p-3">
                    <div>
                      <p className="font-medium">Giá dịch vụ như thế nào?</p>
                      <p className="text-sm text-gray-500">Bảng giá chi tiết các dịch vụ chăm sóc</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left h-auto p-3">
                    <div>
                      <p className="font-medium">Cần chuẩn bị gì khi đến?</p>
                      <p className="text-sm text-gray-500">Danh sách chuẩn bị cho thú cưng</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
