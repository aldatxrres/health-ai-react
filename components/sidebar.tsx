"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, ClipboardList, MessageSquare, User, Calendar, Settings, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"

export default function Sidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(!isMobile)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/triagem", label: "Triagem", icon: ClipboardList },
    { href: "/chat", label: "Chat", icon: MessageSquare },
    { href: "/perfil", label: "Perfil", icon: User },
    { href: "/agenda", label: "Agenda", icon: Calendar },
    { href: "/configuracoes", label: "Configurações", icon: Settings },
  ]

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleSidebar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      )}

      <div
        className={cn(
          "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out h-full",
          isOpen ? "w-64" : isMobile ? "w-0" : "w-20",
          isMobile && !isOpen && "hidden",
        )}
      >
        <div className="p-4 flex items-center justify-center">
          <div className={cn("flex items-center", !isOpen && !isMobile && "flex-col")}>
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            {isOpen && <span className="ml-2 text-xl font-semibold text-teal-700">MediAssist</span>}
          </div>
        </div>

        <nav className="flex-1 pt-6">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        isActive
                          ? "bg-teal-100 text-teal-700 hover:bg-teal-200 hover:text-teal-800"
                          : "hover:bg-gray-100",
                        !isOpen && !isMobile && "justify-center px-2",
                      )}
                    >
                      <Icon size={20} className={cn(!isOpen && !isMobile ? "mx-0" : "mr-2")} />
                      {isOpen && <span>{item.label}</span>}
                    </Button>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className={cn("flex items-center", !isOpen && !isMobile && "justify-center")}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            {isOpen && (
              <div className="ml-2">
                <p className="text-sm font-medium">Dr. Silva</p>
                <p className="text-xs text-gray-500">Cardiologista</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
