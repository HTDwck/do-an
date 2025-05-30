"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UserPlus, Eye, EyeOff, CheckCircle } from "lucide-react"
import { userStorage, sessionStorage, analyticsStorage, type User } from "@/lib/storage"

interface EnhancedRegistrationProps {
  onRegistrationComplete: (userData: any) => void
  onSwitchToLogin?: () => void
  showCard?: boolean
}

export function EnhancedRegistration({
  onRegistrationComplete,
  onSwitchToLogin,
  showCard = true,
}: EnhancedRegistrationProps) {
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
    address: "",
    emergencyContact: "",
    agreeTerms: false,
    agreeMarketing: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    // Check if username already exists
    if (userStorage.getUserByUsername(formData.username)) {
      newErrors.username = "Tên đăng nhập đã tồn tại"
    }

    // Check if email already exists
    if (userStorage.getUserByEmail(formData.email)) {
      newErrors.email = "Email đã được sử dụng"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create new user object
    const newUser: User = {
      id: `user_${Date.now()}`,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      fullName: formData.fullName,
      password: formData.password,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      petInfo: formData.petName
        ? {
            name: formData.petName,
            type: formData.petType,
            age: formData.petAge,
          }
        : undefined,
      preferences: {
        notifications: true,
        marketing: formData.agreeMarketing,
      },
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }

    // Save user to storage
    const saved = userStorage.saveUser(newUser)

    if (saved) {
      // Set as current user
      sessionStorage.setCurrentUser(newUser)

      // Track analytics
      analyticsStorage.trackAction("user_registered", {
        userId: newUser.id,
        username: newUser.username,
        hasPetInfo: !!newUser.petInfo,
      })

      onRegistrationComplete(newUser)
      alert(`Đăng ký thành công! Chào mừng ${newUser.fullName} đến với Pet Care!`)
    } else {
      alert("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!")
    }

    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 text-lg border-b pb-2">Thông tin cá nhân</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Họ và tên *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Nguyễn Văn A"
              aria-label="Nhập họ và tên"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Số điện thoại *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="0914219420"
              aria-label="Nhập số điện thoại"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="example@email.com"
              aria-label="Nhập địa chỉ email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="emergencyContact">Liên hệ khẩn cấp</Label>
            <Input
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
              placeholder="Số điện thoại người thân"
              aria-label="Nhập số điện thoại liên hệ khẩn cấp"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Số nhà, đường, quận/huyện, thành phố"
            aria-label="Nhập địa chỉ"
          />
        </div>
      </div>

      {/* Account Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 text-lg border-b pb-2">Thông tin tài khoản</h3>

        <div>
          <Label htmlFor="username">Tên đăng nhập *</Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            placeholder="username"
            aria-label="Nhập tên đăng nhập"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="password">Mật khẩu *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="••••••••"
                aria-label="Nhập mật khẩu"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
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
                aria-label="Nhập lại mật khẩu để xác nhận"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Ẩn mật khẩu xác nhận" : "Hiện mật khẩu xác nhận"}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
      </div>

      {/* Pet Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 text-lg border-b pb-2">Thông tin thú cưng (tùy chọn)</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="petName">Tên thú cưng</Label>
            <Input
              id="petName"
              value={formData.petName}
              onChange={(e) => handleInputChange("petName", e.target.value)}
              placeholder="Tên thú cưng"
              aria-label="Nhập tên thú cưng"
            />
          </div>

          <div>
            <Label htmlFor="petType">Loại thú cưng</Label>
            <Select value={formData.petType} onValueChange={(value) => handleInputChange("petType", value)}>
              <SelectTrigger id="petType" aria-label="Chọn loại thú cưng">
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
              aria-label="Nhập tuổi thú cưng"
            />
          </div>
        </div>
      </div>

      {/* Terms and Submit */}
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
              aria-label="Đồng ý với điều khoản dịch vụ và chính sách bảo mật"
            />
            <Label htmlFor="agreeTerms" className="text-sm">
              Tôi đồng ý với{" "}
              <a href="/terms" target="_blank" className="text-cyan-600 hover:underline" rel="noreferrer">
                Điều khoản dịch vụ
              </a>{" "}
              và{" "}
              <a href="/privacy" target="_blank" className="text-cyan-600 hover:underline" rel="noreferrer">
                Chính sách bảo mật
              </a>
            </Label>
          </div>
          {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeMarketing"
              checked={formData.agreeMarketing}
              onCheckedChange={(checked) => handleInputChange("agreeMarketing", checked as boolean)}
              aria-label="Đồng ý nhận thông tin khuyến mãi và tin tức"
            />
            <Label htmlFor="agreeMarketing" className="text-sm">
              Tôi đồng ý nhận thông tin khuyến mãi và tin tức từ Pet Care
            </Label>
          </div>
        </div>

        <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Đang tạo tài khoản...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Tạo tài khoản
            </>
          )}
        </Button>

        {onSwitchToLogin && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <button type="button" onClick={onSwitchToLogin} className="text-cyan-600 hover:underline font-medium">
                Đăng nhập ngay
              </button>
            </p>
          </div>
        )}
      </div>
    </form>
  )

  if (showCard) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-600">
            <UserPlus className="w-5 h-5" />
            Đăng ký tài khoản Pet Care
          </CardTitle>
        </CardHeader>
        <CardContent>{formContent}</CardContent>
      </Card>
    )
  }

  return formContent
}
