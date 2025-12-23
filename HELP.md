📦 FULL FRONTEND GENERATION PROMPT

Role:
You are a senior frontend engineer expert in React, TypeScript, Next.js App Router, SWR/React Query, TailwindCSS, shadcn/ui, authentication, performance optimization, and integrating frontends with microservices APIs (REST, JSON).
You must implement a modern ecommerce frontend for a backend built using Java + Spring Boot + Postgres + AWS ECS Fargate + AWS RDS Postgres with the following microservices:

product-service

/products (GET all)

/products/{id} (GET one)

/products (POST create)

/products/{id} (PUT update)

/products/{id} (DELETE)

inventory-service

/inventory/{productId} (GET stock info)

/inventory/{productId}/reserve (POST reserve)

/inventory/{productId}/release (POST release)

Both services are deployed behind an AWS API Gateway or ALB, reachable via a base URL that I will provide.

🔧 Technical Requirements
🔹 Framework & Stack

Next.js 15+ (App Router)

TypeScript

TailwindCSS

shadcn/ui

SWR or React Query (you choose but be consistent)

Axios for HTTP requests

Zod for input validation

Server Actions where beneficial

Next.js server components whenever possible

Client components only when strictly needed

⚙️ Architecture Requirements

Frontend Structure:

/app
  /(storefront)
    /products
      page.tsx
      [id]/page.tsx
    /cart
    /checkout
  /admin
    /products
      page.tsx
      new/page.tsx
      [id]/edit/page.tsx
  /api (local wrappers for calling backend)
  /components
  /lib
  /hooks


Key Pages to Implement:

🔸 Storefront

Products listing page

Product details page (with stock info)

Cart page (with reservation logic)

Checkout page (just UI for now)

🔸 Admin Portal

Admin product management list

Create/edit product form

View real-time inventory for each product

🔌 Integration Rules
API Requests

Every API call must go through a cleanly abstracted API layer in /app/api:

Example:

export async function getProducts() {
  return axios.get(`${process.env.NEXT_PUBLIC_PRODUCTS_API}/products`);
}

Inventory Integration

When viewing a product:

Fetch product details

Fetch inventory info in parallel

When adding to cart:

Call /inventory/{productId}/reserve

When removing or decreasing cart quantity:

Call /inventory/{productId}/release

🎨 UI/UX Requirements

Use Tailwind for all styling

Use shadcn/ui for UI primitives (Button, Card, Input, Sheet, Dialog, Toast)

Ecommerce-grade UI polish:

Responsive grid layout

Product cards with image, price, stock badge

Skeleton loaders

Toast notifications

Accessible forms and buttons

Dark mode support

🧪 Quality Requirements

Strong type safety end-to-end

Zod schemas validating:

Product creation/update

Cart actions

Graceful error handling (UI + toasts)

Retry & caching strategies on SWR/React Query

No any allowed

📌 Your task

When I send this prompt you must respond with:

Folder structure

Scaffolded Next.js pages

API client layer for both microservices

UI components (product cards, inputs, forms)

Cart context or server actions

Admin interface

Everything runnable instantly — complete code, not pseudocode.

🔥 Final Instruction

Generate the final answer as a complete Next.js project with production-ready code.