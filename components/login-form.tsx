"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { userStorage, sessionStorage, analyticsStorage, type User } from "@/lib/storage"

interface LoginFormProps {
  onLoginSuccess: (user: User) => void
  onSwitchToRegister: () => void
  showCard?: boolean
}

export function LoginForm({ onLoginSuccess, onSwitchToRegister, showCard = true }: LoginFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!formData.username || !formData.password) {
      setError("Vui lòng nhập đầy đủ thông tin")
      setIsLoading(false)
      return
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = userStorage.authenticateUser(formData.username, formData.password)

    if (user) {
      sessionStorage.setCurrentUser(user)
      analyticsStorage.trackAction("user_login", { userId: user.id })
      onLoginSuccess(user)
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng")
    }

    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="username">Tên đăng nhập *</Label>
        <Input
          id="username"
          value={formData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          placeholder="Nhập tên đăng nhập"
          disabled={isLoading}
          aria-label="Nhập tên đăng nhập"
        />
      </div>

      <div>
        <Label htmlFor="password">Mật khẩu *</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Nhập mật khẩu"
            disabled={isLoading}
            aria-label="Nhập mật khẩu"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700" disabled={isLoading}>
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Đang đăng nhập...
          </>
        ) : (
          "Đăng nhập"
        )}
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <button type="button" onClick={onSwitchToRegister} className="text-cyan-600 hover:underline font-medium">
            Đăng ký ngay
          </button>
        </p>
      </div>
    </form>
  )

  if (showCard) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-600">
            <LogIn className="w-5 h-5" />
            Đăng nhập
          </CardTitle>
        </CardHeader>
        <CardContent>{formContent}</CardContent>
      </Card>
    )
  }

  return formContent
}
