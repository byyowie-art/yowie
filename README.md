# YOWIE

One-product shop for hand knitted fluffy Mary Janes. Plain HTML/CSS/JS, no build step.

- Open `index.html` in a browser to preview.
- Change the price, colours, sizes, photos and payment link in `config.js`.
- Photos live in `assets/`.

## Payments

Checkout runs on Shopify (Starter plan). The Buy button sends the customer to
`https://<shopifyStore>/cart/<variant>:1` for the chosen size, with the colour attached as an
order attribute. Shipping is calculated by Shopify from the customer's address using the
shipping zones set in Shopify admin. Set `shopifyStore` and each size's `variant` in `config.js`.

While these are empty, the Buy button opens an email with the order details.

## Hosting

Any static host works. Vercel or Netlify: import this repo, no settings needed.
