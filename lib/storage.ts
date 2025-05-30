// Local Storage utilities for Pet Care data management

export interface User {
  id: string
  username: string
  email: string
  phone: string
  fullName: string
  password: string // Thêm password vào interface
  address?: string
  emergencyContact?: string
  petInfo?: {
    name: string
    type: string
    age: string
  }
  preferences?: {
    notifications: boolean
    marketing: boolean
  }
  createdAt: string
  lastLogin: string
}

export interface Booking {
  id: string
  userId: string
  serviceId: string
  serviceName: string
  petName: string
  petType?: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  date: string
  time: string
  duration: string
  price: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: string
  category: string
  rating: number
  image: string
}

// User Management
export const userStorage = {
  // Get all users
  getUsers: (): User[] => {
    try {
      const users = localStorage.getItem("petcare_users")
      return users ? JSON.parse(users) : []
    } catch (error) {
      console.error("Error getting users:", error)
      return []
    }
  },

  // Save user
  saveUser: (user: User): boolean => {
    try {
      const users = userStorage.getUsers()
      const existingIndex = users.findIndex((u) => u.id === user.id)

      if (existingIndex >= 0) {
        users[existingIndex] = { ...user, lastLogin: new Date().toISOString() }
      } else {
        users.push(user)
      }

      localStorage.setItem("petcare_users", JSON.stringify(users))
      return true
    } catch (error) {
      console.error("Error saving user:", error)
      return false
    }
  },

  // Get user by username
  getUserByUsername: (username: string): User | null => {
    const users = userStorage.getUsers()
    return users.find((u) => u.username === username) || null
  },

  // Get user by email
  getUserByEmail: (email: string): User | null => {
    const users = userStorage.getUsers()
    return users.find((u) => u.email === email) || null
  },

  // Authenticate user
  authenticateUser: (username: string, password: string): User | null => {
    const user = userStorage.getUserByUsername(username)
    if (user && user.password === password) {
      // Update last login
      userStorage.updateLastLogin(user.id)
      return user
    }
    return null
  },

  // Update user login time
  updateLastLogin: (userId: string): boolean => {
    try {
      const users = userStorage.getUsers()
      const userIndex = users.findIndex((u) => u.id === userId)

      if (userIndex >= 0) {
        users[userIndex].lastLogin = new Date().toISOString()
        localStorage.setItem("petcare_users", JSON.stringify(users))
        return true
      }
      return false
    } catch (error) {
      console.error("Error updating last login:", error)
      return false
    }
  },
}

// Current User Session
export const sessionStorage = {
  // Set current user
  setCurrentUser: (user: User): void => {
    try {
      localStorage.setItem("petcare_current_user", JSON.stringify(user))
    } catch (error) {
      console.error("Error setting current user:", error)
    }
  },

  // Get current user
  getCurrentUser: (): User | null => {
    try {
      const user = localStorage.getItem("petcare_current_user")
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error("Error getting current user:", error)
      return null
    }
  },

  // Clear current user
  clearCurrentUser: (): void => {
    try {
      localStorage.removeItem("petcare_current_user")
    } catch (error) {
      console.error("Error clearing current user:", error)
    }
  },
}

// Booking Management
export const bookingStorage = {
  // Get all bookings
  getBookings: (): Booking[] => {
    try {
      const bookings = localStorage.getItem("petcare_bookings")
      return bookings ? JSON.parse(bookings) : []
    } catch (error) {
      console.error("Error getting bookings:", error)
      return []
    }
  },

  // Save booking
  saveBooking: (booking: Booking): boolean => {
    try {
      const bookings = bookingStorage.getBookings()
      const existingIndex = bookings.findIndex((b) => b.id === booking.id)

      if (existingIndex >= 0) {
        bookings[existingIndex] = { ...booking, updatedAt: new Date().toISOString() }
      } else {
        bookings.push(booking)
      }

      localStorage.setItem("petcare_bookings", JSON.stringify(bookings))
      return true
    } catch (error) {
      console.error("Error saving booking:", error)
      return false
    }
  },

  // Get bookings by user
  getBookingsByUser: (userId: string): Booking[] => {
    const bookings = bookingStorage.getBookings()
    return bookings.filter((b) => b.userId === userId)
  },

  // Update booking status
  updateBookingStatus: (bookingId: string, status: Booking["status"]): boolean => {
    try {
      const bookings = bookingStorage.getBookings()
      const bookingIndex = bookings.findIndex((b) => b.id === bookingId)

      if (bookingIndex >= 0) {
        bookings[bookingIndex].status = status
        bookings[bookingIndex].updatedAt = new Date().toISOString()
        localStorage.setItem("petcare_bookings", JSON.stringify(bookings))
        return true
      }
      return false
    } catch (error) {
      console.error("Error updating booking status:", error)
      return false
    }
  },

  // Delete booking
  deleteBooking: (bookingId: string): boolean => {
    try {
      const bookings = bookingStorage.getBookings()
      const filteredBookings = bookings.filter((b) => b.id !== bookingId)
      localStorage.setItem("petcare_bookings", JSON.stringify(filteredBookings))
      return true
    } catch (error) {
      console.error("Error deleting booking:", error)
      return false
    }
  },
}

// Services Management
export const serviceStorage = {
  // Get all services
  getServices: (): Service[] => {
    const defaultServices: Service[] = [
      {
        id: "bath",
        name: "Tắm thú cưng",
        description: "Tắm gội, vệ sinh lông, khử mùi thơm mát cho chó mèo.",
        price: 80000,
        duration: "1 giờ",
        category: "grooming",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "grooming",
        name: "Cắt tỉa lông",
        description: "Cắt tỉa tạo kiểu lông chuyên nghiệp, an toàn cho thú cưng.",
        price: 120000,
        duration: "1.5 giờ",
        category: "grooming",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "health",
        name: "Kiểm tra sức khỏe",
        description: "Khám tổng quát, tư vấn sức khỏe và dinh dưỡng cho thú cưng.",
        price: 150000,
        duration: "30 phút",
        category: "health",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "nail",
        name: "Cắt móng",
        description: "Cắt móng an toàn, vệ sinh tai và làm sạch răng miệng.",
        price: 50000,
        duration: "30 phút",
        category: "grooming",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80",
      },
    ]

    try {
      const services = localStorage.getItem("petcare_services")
      return services ? JSON.parse(services) : defaultServices
    } catch (error) {
      console.error("Error getting services:", error)
      return defaultServices
    }
  },

  // Get service by ID
  getServiceById: (serviceId: string): Service | null => {
    const services = serviceStorage.getServices()
    return services.find((s) => s.id === serviceId) || null
  },
}

// Statistics and Analytics
export const analyticsStorage = {
  // Track user action
  trackAction: (action: string, data?: any): void => {
    try {
      const analytics = JSON.parse(localStorage.getItem("petcare_analytics") || "[]")
      analytics.push({
        action,
        data,
        timestamp: new Date().toISOString(),
        userId: sessionStorage.getCurrentUser()?.id,
      })

      // Keep only last 1000 events
      if (analytics.length > 1000) {
        analytics.splice(0, analytics.length - 1000)
      }

      localStorage.setItem("petcare_analytics", JSON.stringify(analytics))
    } catch (error) {
      console.error("Error tracking action:", error)
    }
  },

  // Get analytics data
  getAnalytics: () => {
    try {
      return JSON.parse(localStorage.getItem("petcare_analytics") || "[]")
    } catch (error) {
      console.error("Error getting analytics:", error)
      return []
    }
  },
}

// Data Export/Import
export const dataManager = {
  // Export all data
  exportData: () => {
    try {
      const data = {
        users: userStorage.getUsers(),
        bookings: bookingStorage.getBookings(),
        services: serviceStorage.getServices(),
        analytics: analyticsStorage.getAnalytics(),
        exportDate: new Date().toISOString(),
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `petcare-data-${new Date().toISOString().split("T")[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting data:", error)
    }
  },

  // Clear all data
  clearAllData: () => {
    try {
      localStorage.removeItem("petcare_users")
      localStorage.removeItem("petcare_current_user")
      localStorage.removeItem("petcare_bookings")
      localStorage.removeItem("petcare_services")
      localStorage.removeItem("petcare_analytics")
      return true
    } catch (error) {
      console.error("Error clearing data:", error)
      return false
    }
  },
}
