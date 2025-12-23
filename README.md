# E-Commerce Frontend

A modern, production-ready e-commerce frontend built with Next.js 15, TypeScript, and TailwindCSS. This application integrates with Java Spring Boot microservices for product and inventory management.

## 🚀 Features

### Storefront
- **Product Listing**: Browse all products with real-time inventory status
- **Product Details**: View detailed product information with stock availability
- **Shopping Cart**: Add/remove items with automatic inventory reservation
- **Checkout**: Complete purchase flow with shipping and payment forms
- **Dark Mode**: Full dark mode support with theme toggle

### Admin Portal
- **Product Management**: Create, edit, and delete products
- **Inventory Tracking**: Real-time stock and reservation monitoring
- **Responsive Tables**: Clean admin interface with data tables

### Technical Highlights
- ✅ **Type Safety**: End-to-end TypeScript with Zod validation
- ✅ **Data Fetching**: SWR for efficient caching and revalidation
- ✅ **Server Components**: Next.js App Router with server components
- ✅ **Responsive Design**: Mobile-first design with TailwindCSS
- ✅ **Accessibility**: WCAG compliant UI components
- ✅ **Error Handling**: Graceful error states and toast notifications

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Data Fetching**: SWR
- **HTTP Client**: Axios
- **Validation**: Zod
- **Icons**: Lucide React

## 🛠️ Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables**:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_PRODUCTS_API=https://your-api-gateway-url.com/product-service
NEXT_PUBLIC_INVENTORY_API=https://your-api-gateway-url.com/inventory-service
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
/app
  /(storefront)
    /products
      page.tsx              # Products listing
      [id]/page.tsx         # Product details
    /cart
      page.tsx              # Shopping cart
    /checkout
      page.tsx              # Checkout flow
  /admin
    page.tsx                # Admin dashboard
    /products
      page.tsx              # Product management
      new/page.tsx          # Create product
      [id]/edit/page.tsx    # Edit product
  layout.tsx                # Root layout
  page.tsx                  # Homepage
  globals.css               # Global styles

/components
  /ui                       # shadcn/ui components
  cart-provider.tsx         # Cart context
  header.tsx                # Navigation header
  product-card.tsx          # Product card component
  theme-provider.tsx        # Theme context
  theme-toggle.tsx          # Dark mode toggle

/lib
  /api
    products.ts             # Product service API
    inventory.ts            # Inventory service API
  schemas.ts                # Zod schemas
  utils.ts                  # Utility functions
```

## 🔌 API Integration

### Product Service
- `GET /products` - List all products
- `GET /products/{id}` - Get product by ID
- `POST /products` - Create product
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Inventory Service
- `GET /inventory/{productId}` - Get stock info
- `POST /inventory/{productId}/reserve` - Reserve inventory
- `POST /inventory/{productId}/release` - Release inventory

## 🎨 UI Components

Built with shadcn/ui for consistent, accessible components:
- Button, Card, Input, Textarea, Label
- Toast notifications
- Skeleton loaders
- Badge, Table
- Dark mode support

## 🔒 Type Safety

All data is validated using Zod schemas:
- Product creation/update validation
- Inventory reservation validation
- Cart action validation
- No `any` types allowed

## 🚦 Getting Started

1. **Browse Products**: Navigate to `/products` to see all available products
2. **Add to Cart**: Click "Add to Cart" on any product (inventory is automatically reserved)
3. **Checkout**: Review your cart at `/cart` and proceed to checkout
4. **Admin**: Access the admin panel at `/admin` to manage products

## 🌙 Dark Mode

The application supports dark mode out of the box. Use the theme toggle in the header to switch between light and dark themes.

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_PRODUCTS_API` | Product service base URL | Yes |
| `NEXT_PUBLIC_INVENTORY_API` | Inventory service base URL | Yes |

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

---

Built with ❤️ using Next.js 15 and TypeScript
# Ecommerce-Frontend-NextJS
