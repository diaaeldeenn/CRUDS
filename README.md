CRUDS — Store Management System

🚀 A lightweight, polished front-end Store Management System built with HTML, CSS & Vanilla JavaScript.

Fully interactive CRUDS (Create / Read / Update / Delete / Search) application with real-time validation, client-side image handling, theme support, responsive UI and LocalStorage persistence — all without external JS frameworks.

🔗 Live demo
https://diaaeldeenn.github.io/CRUDS/

✨ Key features

✅ Full Create / Read / Update / Delete operations with immediate DOM updates.

✅ Advanced real-time validation for name, price, category, description and image (type & size).

✅ Client-side image upload with instant preview — images saved as Base64 in LocalStorage for persistence on the same browser.

✅ Category filtering & live search (no page reload).

✅ Dark / Light mode (theme toggling affects whole UI).

✅ Responsive, panel-based layout with polished cards, hover effects and skeleton loading for missing images.

✅ Smart UX details: live product counter, dynamic "Delete All" visibility, form reset after actions, oninput validation feedback.

✅ Semantic HTML structure and accessible labels/datalists for better UX & SEO.

✅ Clean, modular and easily extensible front-end — built without external JS libraries.

🛠 Tech stack
HTML5 | CSS3 | Vanilla JavaScript | Bootstrap 5 (for grid & util) | Font Awesome

💡 How it works — quick notes

Data is stored in LocalStorage under the key productsArray.

When user uploads an image, the app converts it to a Base64 data URL (via FileReader) and saves it inside the product object — this enables immediate preview and persistence on that browser.

Limitations: Base64 images are stored in the browser and do not sync between devices/users. Large or many Base64 images will exhaust LocalStorage (~5MB typical quota). For multi-user persistence, integrate a real backend or cloud storage (e.g., Cloudinary, Firebase Storage).

✅ Usage

Fill product details in the left panel (name, price, category, description).

Choose an image (JPG / JPEG / PNG) — must be < 2 MB.

Click Add Product → the product appears instantly on the right.

Use Edit to load product into the form, change values and click Update.

Use Delete for single product, or Delete All to clear everything.

Use the Search input or Category select to filter results live.

Toggle Dark / Light mode with the top-right button.

✅ Validation rules (high-level)

Product name: custom Regex (detects common device/category keywords).

Price: numeric with bounds and decimal support.

Category: must match allowed categories (Mobile / TV / Laptop / Accessories).

Description: 10–300 characters (letters, numbers, basic punctuation).

Image: extension and size validation (JPG/JPEG/PNG, < 2MB).

📸 Image handling & recommendations

Current strategy uses Base64 for simplicity — good for demos and single-user persistence.

If you plan to host this as a multi-user app, replace Base64 + LocalStorage with:

Upload images to a backend & store URLs (Node/Express, PHP, etc.) OR

Use Cloudinary / Firebase Storage and save returned URLs in your product objects.

Consider resizing/compressing images client-side (canvas) before converting to Base64 to save space.

✉️ Contact

LinkedIn: https://www.linkedin.com/in/diaaelseady/

GitHub: https://github.com/diaaeldeenn
