"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UserPlus, Eye, EyeOff } from "lucide-react"

interface RegistrationFormProps {
  onRegistrationComplete: (userData: any) => void
}

export function RegistrationForm({ onRegistrationComplete }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    petName: "",
    petType: "",
    petAge: "",
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ tên"
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email không hợp lệ"
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại"
    else if (!/^[0-9]{10,11}$/.test(formData.phone)) newErrors.phone = "Số điện thoại không hợp lệ"
    if (!formData.username.trim()) newErrors.username = "Vui lòng nhập tên đăng nhập"
    else if (formData.username.length < 3) newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự"
    if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu"
    else if (formData.password.length < 6) newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
    if (!formData.agreeTerms) newErrors.agreeTerms = "Vui lòng đồng ý với điều khoản"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onRegistrationComplete(formData)
      alert("Đăng ký thành công! Chào mừng bạn đến với Pet Care!")
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-600">
          <UserPlus className="w-5 h-5" />
          Đăng ký tài khoản
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Thông tin cá nhân</h3>

              <div>
                <Label htmlFor="fullName">Họ và tên *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Nguyễn Văn A"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="0123456789"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Thông tin tài khoản</h3>

              <div>
                <Label htmlFor="username">Tên đăng nhập *</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  placeholder="username"
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>

              <div>
                <Label htmlFor="password">Mật khẩu *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Pet Information */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-gray-700">Thông tin thú cưng (tùy chọn)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="petName">Tên thú cưng</Label>
                <Input
                  id="petName"
                  value={formData.petName}
                  onChange={(e) => handleInputChange("petName", e.target.value)}
                  placeholder="Tên thú cưng"
                />
              </div>

              <div>
                <Label htmlFor="petType">Loại thú cưng</Label>
                <Select value={formData.petType} onValueChange={(value) => handleInputChange("petType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Chó</SelectItem>
                    <SelectItem value="cat">Mèo</SelectItem>
                    <SelectItem value="rabbit">Thỏ</SelectItem>
                    <SelectItem value="hamster">Hamster</SelectItem>
                    <SelectItem value="bird">Chim</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="petAge">Tuổi</Label>
                <Input
                  id="petAge"
                  value={formData.petAge}
                  onChange={(e) => handleInputChange("petAge", e.target.value)}
                  placeholder="VD: 2 tuổi"
                />
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
              />
              <Label htmlFor="agreeTerms" className="text-sm">
                Tôi đồng ý với{" "}
                <a href="#" className="text-cyan-600 hover:underline">
                  Điều khoản dịch vụ
                </a>{" "}
                và{" "}
                <a href="#" className="text-cyan-600 hover:underline">
                  Chính sách bảo mật
                </a>
              </Label>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
              Đăng ký tài khoản
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
