"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, Home, Radio, ShieldAlert, Users, Moon, Sun, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Exploits",
    href: "/exploits",
    icon: ShieldAlert,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Resources",
    href: "/resources",
    icon: FileText,
  },
  {
    title: "Live Tracker",
    href: "/live-tracker",
    icon: Radio,
  },
  {
    title: "Contribute",
    href: "/contribute",
    icon: Users,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  const SidebarContent = () => (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <ShieldAlert className="h-5 w-5 text-emerald-600" />
          <span>Superteam Security</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive(item.href) ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <>
              <Sun className="mr-2 h-4 w-4" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4" />
              Dark Mode
            </>
          )}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden border-r md:block md:w-64">
        <SidebarContent />
      </div>
    </>
  )
}
