"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Zap, User, Settings, LogOut, CreditCard, Plus } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">GPU云</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium">
                首页
              </Link>
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium"
              >
                控制台
              </Link>
              <Link
                href="/pricing"
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium"
              >
                价格
              </Link>
              <Link href="/docs" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium">
                文档
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              <Link href="/create-instance">创建实例</Link>
            </Button>
            <Button variant="ghost" size="sm">
              余额: ¥128.50
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>用</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">用户名</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">user@example.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>个人资料</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>账单</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>设置</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>退出登录</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
