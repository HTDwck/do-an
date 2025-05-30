"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  services?: any[]
}

const SERVICES = [
  { id: "bath", name: "Tắm thú cưng", price: 80000, duration: "1 giờ" },
  { id: "grooming", name: "Cắt tỉa lông", price: 120000, duration: "1.5 giờ" },
  { id: "health", name: "Kiểm tra sức khỏe", price: 150000, duration: "30 phút" },
  { id: "nail", name: "Cắt móng", price: 50000, duration: "30 phút" },
]

const QUICK_ACTIONS = [
  { id: "services", label: "Xem dịch vụ", icon: "🐕" },
  { id: "booking", label: "Đặt lịch", icon: "📅" },
  { id: "contact", label: "Liên hệ", icon: "📞" },
  { id: "location", label: "Địa chỉ", icon: "📍" },
]

interface AIChatWidgetProps {
  onBookingRequest?: () => void
}

export function AIChatWidget({ onBookingRequest }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là trợ lý AI của Pet Care. Tôi có thể giúp bạn tìm hiểu về dịch vụ, đặt lịch hẹn, hoặc trả lời các câu hỏi về chăm sóc thú cưng. Bạn cần hỗ trợ gì?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string) => {
    try {
      // Check if we have an API key in the environment
      const apiKey = process.env.OPENAI_API_KEY

      if (!apiKey) {
        // If no API key, use the fallback response generator
        return generateFallbackResponse(userMessage)
      }

      const context = `
      Bạn là trợ lý AI của Pet Care - dịch vụ chăm sóc thú cưng tại Việt Nam.
      
      Thông tin về dịch vụ:
      - Tắm thú cưng: 80,000đ (1 giờ)
      - Cắt tỉa lông: 120,000đ (1.5 giờ) 
      - Kiểm tra sức khỏe: 150,000đ (30 phút)
      - Cắt móng: 50,000đ (30 phút)
      
      Thông tin liên hệ:
      - Địa chỉ: 39 Hồ Tùng Mậu, Hà Nội
      - Hotline: 0914219420
      - Giờ làm việc: 8:00 - 18:00 (Thứ 2 - Thứ 7)
      
      Hãy trả lời một cách thân thiện, chuyên nghiệp và hữu ích. Nếu khách hàng hỏi về đặt lịch, hãy khuyến khích họ sử dụng tính năng đặt lịch trên website.
      `

      const { text } = await generateText({
        model: openai("gpt-3.5-turbo", { apiKey }),
        messages: [
          { role: "system", content: context },
          { role: "user", content: userMessage },
        ],
      })

      return text
    } catch (error) {
      console.error("AI Error:", error)
      return generateFallbackResponse(userMessage)
    }
  }

  // Add this new function for fallback responses
  const generateFallbackResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase()

    // Check for common questions and provide appropriate responses
    if (message.includes("giá") || message.includes("phí") || message.includes("tiền")) {
      return `Dịch vụ của chúng tôi có các mức giá như sau:
- Tắm thú cưng: 80,000đ (1 giờ)
- Cắt tỉa lông: 120,000đ (1.5 giờ) 
- Kiểm tra sức khỏe: 150,000đ (30 phút)
- Cắt móng: 50,000đ (30 phút)

Bạn có thể đặt lịch ngay trên website hoặc liên hệ hotline 0914219420 để được tư vấn thêm.`
    }

    if (message.includes("đặt lịch") || message.includes("hẹn") || message.includes("booking")) {
      return "Để đặt lịch, bạn có thể nhấn vào nút 'Đặt lịch ngay' ở đầu trang hoặc gọi hotline 0914219420. Khi đặt lịch, bạn cần cung cấp thông tin về thú cưng và chọn dịch vụ phù hợp. Bạn muốn đặt lịch cho dịch vụ nào?"
    }

    if (message.includes("địa chỉ") || message.includes("cửa hàng") || message.includes("ở đâu")) {
      return "Cửa hàng Pet Care tọa lạc tại địa chỉ: 39 Hồ Tùng Mậu, Hà Nội. Chúng tôi mở cửa từ 8:00 - 18:00 (Thứ 2 - Thứ 7), nghỉ Chủ nhật."
    }

    if (
      message.includes("liên hệ") ||
      message.includes("hotline") ||
      message.includes("điện thoại") ||
      message.includes("gọi")
    ) {
      return "Bạn có thể liên hệ với chúng tôi qua hotline: 0914219420 hoặc email: info@petcare.vn. Chúng tôi luôn sẵn sàng hỗ trợ bạn!"
    }

    if (message.includes("chó") || message.includes("dog")) {
      return "Chúng tôi cung cấp đầy đủ các dịch vụ chăm sóc cho chó như tắm, cắt tỉa lông, kiểm tra sức khỏe và cắt móng. Mỗi giống chó sẽ được chăm sóc theo cách phù hợp nhất với đặc điểm của giống."
    }

    if (message.includes("mèo") || message.includes("cat")) {
      return "Dịch vụ chăm sóc mèo của chúng tôi được thiết kế đặc biệt để phù hợp với đặc tính của mèo. Chúng tôi có nhân viên được đào tạo chuyên biệt về hành vi và nhu cầu của mèo."
    }

    if (message.includes("cảm ơn") || message.includes("thank")) {
      return "Không có gì! Pet Care luôn sẵn sàng hỗ trợ bạn và thú cưng. Nếu có bất kỳ câu hỏi nào khác, đừng ngại liên hệ với chúng tôi nhé!"
    }

    if (message.includes("xin chào") || message.includes("hello") || message.includes("hi")) {
      return "Xin chào! Rất vui được hỗ trợ bạn. Tôi là trợ lý AI của Pet Care. Bạn cần tư vấn về dịch vụ nào cho thú cưng?"
    }

    // Default response if no specific pattern is matched
    return `Cảm ơn bạn đã liên hệ với Pet Care. Chúng tôi cung cấp các dịch vụ chăm sóc thú cưng chuyên nghiệp bao gồm tắm gội, cắt tỉa lông, kiểm tra sức khỏe và cắt móng.

Bạn có thể đặt lịch trực tiếp trên website hoặc gọi hotline 0914219420. Nếu bạn có câu hỏi cụ thể về dịch vụ, giá cả hoặc cách chăm sóc thú cưng, hãy cho tôi biết để được tư vấn chi tiết hơn.`
  }

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsLoading(true)

    // Generate AI response
    const aiResponse = await generateAIResponse(inputText)

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
    setIsLoading(false)
  }

  const handleQuickAction = (actionId: string) => {
    let responseText = ""
    let services: any[] = []

    switch (actionId) {
      case "services":
        responseText = "Đây là các dịch vụ chăm sóc thú cưng của chúng tôi:"
        services = SERVICES
        break
      case "booking":
        responseText =
          "Để đặt lịch hẹn, bạn có thể click vào nút 'Đặt lịch ngay' ở đầu trang hoặc tôi có thể hướng dẫn bạn qua các bước đặt lịch. Bạn muốn đặt lịch cho dịch vụ nào?"
        if (onBookingRequest) onBookingRequest()
        break
      case "contact":
        responseText =
          "Thông tin liên hệ:\n📞 Hotline: 0914219420\n📧 Email: info@petcare.vn\n🕒 Giờ làm việc: 8:00 - 18:00 (T2-T7)"
        break
      case "location":
        responseText =
          "📍 Địa chỉ cửa hàng: 39 Hồ Tùng Mậu, Hà Nội\n🚗 Chúng tôi có chỗ đậu xe miễn phí\n🚌 Gần các tuyến xe bus: 03, 18, 23"
        break
    }

    const botMessage: Message = {
      id: Date.now().toString(),
      text: responseText,
      sender: "bot",
      timestamp: new Date(),
      services: services.length > 0 ? services : undefined,
    }

    setMessages((prev) => [...prev, botMessage])
  }

  const handleServiceSelect = (service: any) => {
    const responseText = `Bạn đã chọn dịch vụ "${service.name}". 
    
💰 Giá: ${service.price.toLocaleString()}đ
⏰ Thời gian: ${service.duration}

Bạn có muốn đặt lịch cho dịch vụ này không? Tôi có thể hướng dẫn bạn qua các bước đặt lịch.`

    const botMessage: Message = {
      id: Date.now().toString(),
      text: responseText,
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cyan-600 hover:bg-cyan-700 shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-80 h-[500px] shadow-xl">
          <CardHeader className="bg-cyan-600 text-white rounded-t-lg p-4">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Bot className="w-4 h-4" />
              Trợ lý AI Pet Care
              <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-[440px]">
            {/* Quick Actions */}
            <div className="p-3 border-b bg-gray-50">
              <div className="grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.id)}
                    className="text-xs h-8"
                  >
                    <span className="mr-1">{action.icon}</span>
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id}>
                  <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] p-3 rounded-lg ${
                        message.sender === "user" ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === "bot" && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        {message.sender === "user" && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                      </div>
                    </div>
                  </div>

                  {/* Service Cards */}
                  {message.services && (
                    <div className="mt-2 space-y-2">
                      {message.services.map((service) => (
                        <Card
                          key={service.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleServiceSelect(service)}
                        >
                          <CardContent className="p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold text-sm">{service.name}</h4>
                                <p className="text-xs text-gray-600">{service.duration}</p>
                              </div>
                              <Badge variant="secondary">{service.price.toLocaleString()}đ</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm disabled:opacity-50"
                />
                <Button
                  onClick={sendMessage}
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-700"
                  disabled={isLoading || !inputText.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
