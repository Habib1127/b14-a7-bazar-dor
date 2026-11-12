<div align="center">

# 🛒 বাজার দর — BazarDor

Live Link : https://b14-a7-bazar-dor-rho.vercel.app

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

Daily Bangladeshi market prices for rice, lentils, oil, vegetables, fish, meat, eggs, dairy and spices, with price changes, market-wise comparison and a live price ticker.

</div>

---

## About

BazarDor shows today's market price of everyday products in Bengali. You can see which prices went up or down, browse by category, search and sort products, and open any product to compare minimum, maximum and average prices across different bazars.

## Technologies Used

| Purpose | Tool |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + daisyUI 5 |
| Authentication | BetterAuth (Email/Password, Google, GitHub) |
| Database | MongoDB (BetterAuth adapter) |
| Notifications | react-hot-toast |
| Font | Hind Siliguri |
| Deployment | Vercel |

## Key Features

1. **Live price ticker**: an infinite scrolling strip under the navbar showing emoji, name, price per unit and ▲/▼ change.
2. **Price movers**: top 6 products with rising prices and top 6 with falling prices on the home page.
3. **Search, filter and sort**: search by name, filter by category chip, and sort by price (low to high / high to low) with correct Bengali number handling.
4. **Product details with market comparison**: minimum, maximum and average price, plus a table of prices in each bazar. This page is protected and needs login.
5. **Authentication**: email/password sign up and sign in, Google and GitHub login, toast messages, protected-route redirects, and profile update.
6. **Fully responsive**: works on mobile, tablet and desktop, with skeleton loaders and a friendly 404 page.

## Pages

| Route | Description |
| --- | --- |
| `/` | Home: hero, price movers, all products |
| `/category/[slug]` | Category products with sort control |
| `/product/[slug]` | Product details (protected) |
| `/signin`, `/signup` | Authentication |
| `/profile` | My profile (protected) |
| `/profile/update` | Update name (protected) |

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

### Environment Variables

| Name | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `BETTER_AUTH_SECRET` | Long random secret |
| `BETTER_AUTH_URL` | Your site URL (`http://localhost:3000` locally, your Vercel URL in production) |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials |
| `NEXT_PUBLIC_API_URL` | Optional. Overrides the default API base URL |

OAuth callback URLs:

- Google: `{BETTER_AUTH_URL}/api/auth/callback/google`
- GitHub: `{BETTER_AUTH_URL}/api/auth/callback/github`

## API

Data comes from the Programming Hero BazarDor API (`/products`, `/products/:id`, `/categories`). If the main URL fails, the app tries the two alternative base URLs automatically.

## Project Structure


app/          routes (home, category, product, signin, signup, profile)
components/   navbar, ticker, cards, forms, skeletons
lib/          api, normalizer, formatters, BetterAuth setup
middleware.ts protects /product and /profile

