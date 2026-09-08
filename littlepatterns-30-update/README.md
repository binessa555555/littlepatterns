# Little Patterns - 30 Fabric Update

This pack contains the 30 new fabric images in PDF page order, a product data file with the exact supplied names, and an updated Ziina checkout route charging AED 250 per item.

Fast install from your project folder `/Users/ma/littlepatterns`:

1. Delete the old files inside `public/fabrics`.
2. Copy this pack's `public/fabrics` folder contents into your project's `public/fabrics`.
3. Copy `data/products.ts` into your project (create `data` if needed).
4. Replace `app/api/checkout/route.ts` with the included route.
5. Your `app/page.tsx` must render/import `products` from `data/products.ts`. If your current page has its own products array, replace that old array with the 30 entries from `data/products.ts` while keeping the rest of the page design unchanged.
6. Commit and push once.

Price: AED 250 each. Ziina amount: 25000 fils x quantity.
