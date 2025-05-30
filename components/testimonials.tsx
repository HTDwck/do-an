"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const TESTIMONIALS = [
  {
    id: 1,
    name: "Chị Lan Anh",
    petName: "Miu",
    rating: 5,
    comment: "Dịch vụ tuyệt vời! Miu rất thích được tắm ở đây. Nhân viên rất chu đáo và yêu thương động vật.",
    avatar: "https://th.bing.com/th/id/OIP.WRPuEmd2-09_m8Nurp0y1AHaE7?rs=1&pid=ImgDetMain",
    service: "Tắm gội + Cắt móng",
  },
  {
    id: 2,
    name: "Anh Minh",
    petName: "Lucky",
    rating: 5,
    comment: "Lucky được cắt tỉa lông rất đẹp. Giá cả hợp lý, chất lượng dịch vụ tốt. Sẽ quay lại lần sau!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    service: "Cắt tỉa lông",
  },
  {
    id: 3,
    name: "Cô Hương",
    petName: "Bông",
    rating: 5,
    comment: "Bông rất sợ người lạ nhưng ở đây các bạn rất kiên nhẫn. Cảm ơn team đã chăm sóc Bông chu đáo!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    service: "Kiểm tra sức khỏe",
  },
]

export function Testimonials() {
  return (
    <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg mb-8 p-8">
      <h2 className="text-3xl font-bold text-cyan-600 mb-6 text-center">Khách hàng nói gì về chúng tôi</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((testimonial) => (
          <Card key={testimonial.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-cyan-200" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">Chủ của {testimonial.petName}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 mb-3 italic">"{testimonial.comment}"</p>

              <div className="text-xs text-cyan-600 font-medium bg-cyan-50 px-2 py-1 rounded-full inline-block">
                {testimonial.service}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
