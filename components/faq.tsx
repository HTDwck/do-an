"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

const FAQ_DATA = [
  {
    question: "Tôi cần chuẩn bị gì khi đưa thú cưng đến?",
    answer:
      "Bạn chỉ cần mang theo thú cưng và giấy tờ tiêm phòng (nếu có). Chúng tôi sẽ cung cấp tất cả dụng cụ và sản phẩm cần thiết.",
  },
  {
    question: "Thời gian thực hiện dịch vụ mất bao lâu?",
    answer:
      "Tùy vào dịch vụ: Tắm gội 1-1.5 giờ, Cắt tỉa lông 1.5-2 giờ, Kiểm tra sức khỏe 30 phút, Cắt móng 15-30 phút.",
  },
  {
    question: "Có cần đặt lịch trước không?",
    answer:
      "Chúng tôi khuyến khích đặt lịch trước để đảm bảo có chỗ. Bạn có thể đặt lịch online hoặc gọi điện trực tiếp.",
  },
  {
    question: "Giá dịch vụ có bao gồm thuế không?",
    answer: "Tất cả giá niêm yết đã bao gồm thuế VAT. Không có phí phát sinh thêm.",
  },
  {
    question: "Nếu thú cưng không hợp tác thì sao?",
    answer:
      "Đội ngũ của chúng tôi có kinh nghiệm xử lý các tình huống này. Chúng tôi sẽ kiên nhẫn và sử dụng các phương pháp an toàn để thú cưng cảm thấy thoải mái.",
  },
  {
    question: "Có chính sách hoàn tiền không?",
    answer: "Nếu bạn không hài lòng với dịch vụ, chúng tôi sẽ làm lại miễn phí hoặc hoàn tiền 100% trong vòng 24 giờ.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg mb-8 p-8">
      <h2 className="text-3xl font-bold text-cyan-600 mb-6 text-center flex items-center justify-center gap-2">
        <HelpCircle className="w-8 h-8" />
        Câu hỏi thường gặp
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {FAQ_DATA.map((faq, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <h3 className="font-semibold text-gray-800 pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
