'use client'

import Link from 'next/link'
import { ShoppingCart, Store, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-provider'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Store className="h-6 w-6" />
            <span>E-Commerce</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium hover:underline">
              Products
            </Link>
            <Link href="/admin" className="text-sm font-medium hover:underline">
              <LayoutDashboard className="inline h-4 w-4 mr-1" />
              Admin
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/cart">
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
