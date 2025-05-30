"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift, Bell, Heart } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-pink-500 p-3 rounded-full">
            <Mail className="w-6 h-6 text-white" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký nhận tin tức</h3>
        <p className="text-gray-600 mb-6">
          Nhận thông tin về các chương trình khuyến mãi, mẹo chăm sóc thú cưng và tin tức mới nhất!
        </p>

        <div className="flex justify-center gap-6 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Gift className="w-4 h-4 text-pink-500" />
            <span>Ưu đãi độc quyền</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Bell className="w-4 h-4 text-pink-500" />
            <span>Tin tức mới nhất</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Heart className="w-4 h-4 text-pink-500" />
            <span>Mẹo chăm sóc</span>
          </div>
        </div>

        {subscribed ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg">
            <p className="font-semibold">Cảm ơn bạn đã đăng ký!</p>
            <p className="text-sm">Chúng tôi sẽ gửi những thông tin hữu ích nhất đến email của bạn.</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
              Đăng ký
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
