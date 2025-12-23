import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Package, ShoppingBag, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Welcome to Our Store
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Discover amazing products at unbeatable prices. Shop the latest trends and enjoy seamless shopping experience.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Quality Products</h3>
              <p className="text-muted-foreground">
                Curated selection of high-quality products for all your needs
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy Shopping</h3>
              <p className="text-muted-foreground">
                Seamless shopping experience with real-time inventory tracking
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Best Prices</h3>
              <p className="text-muted-foreground">
                Competitive pricing and regular deals on popular items
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
