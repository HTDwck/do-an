"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const BOT_RESPONSES = [
  "Xin chào! Tôi có thể giúp gì cho bạn về dịch vụ chăm sóc thú cưng?",
  "Chúng tôi có các dịch vụ: Tắm gội, cắt tỉa lông, kiểm tra sức khỏe, cắt móng. Bạn quan tâm dịch vụ nào?",
  "Giờ làm việc của chúng tôi là 8:00 - 18:00 từ thứ 2 đến thứ 7. Chủ nhật nghỉ.",
  "Bạn có thể đặt lịch trực tiếp trên website hoặc gọi hotline 0123-456-789.",
  "Giá dịch vụ tắm gội từ 80.000đ, cắt tỉa lông từ 120.000đ tùy theo kích thước thú cưng.",
  "Chúng tôi chăm sóc tất cả các loại thú cưng: chó, mèo, thỏ, hamster...",
  "Cảm ơn bạn đã quan tâm! Nhân viên sẽ liên hệ lại trong thời gian sớm nhất.",
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là trợ lý ảo của Pet Care. Tôi có thể giúp gì cho bạn?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)],
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
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
        <Card className="fixed bottom-24 right-6 z-40 w-80 h-96 shadow-xl">
          <CardHeader className="bg-cyan-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Bot className="w-4 h-4" />
              Trợ lý Pet Care
              <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user" ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === "bot" && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                      <p className="text-sm">{message.text}</p>
                      {message.sender === "user" && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
              ))}
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
                  className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                />
                <Button onClick={sendMessage} size="sm" className="bg-cyan-600 hover:bg-cyan-700">
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
