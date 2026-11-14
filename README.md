# Veltrix

React + Vite storefront with Supabase auth.

## Run
npm install
npm run dev

Copy .env.example to .env and add your Supabase keys.

## Structure
src/components  layout, common, auth, home, shop
src/pages       one file per route
src/context     Auth, Cart, Toast
src/styles      base (Variables, Mixins, Main), components, pages
src/data        products and store constants

## Guest mode
Guests can browse and fill a cart. Checkout and /account require a real account.
