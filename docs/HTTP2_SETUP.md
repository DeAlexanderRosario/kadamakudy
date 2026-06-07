# Guide: Enabling HTTP/2+ Protocol for Kadamakudy

HTTP/2 significantly improves website performance by allowing multiplexing, header compression, and server push over a single TCP connection. Since HTTP/2 requires HTTPS, you must have an SSL certificate active.

Follow the instructions below based on your hosting platform:

---

## 1. Vercel (Recommended)
Vercel supports HTTP/2 and HTTP/3 (QUIC) **automatically** out of the box for all deployments.
* **Troubleshooting Custom Domains**: If you use a custom domain and get an HTTP/2 warning, ensure you are not proxying through a third-party service (like GoDaddy or an outdated CDN proxy) that downgrades the connection to HTTP/1.1.
* **DNS Settings**: Ensure your domain's CNAME points directly to `cname.vercel-dns.com` or your A record points to `76.76.21.21`.

---

## 2. Cloudflare
If your site is proxied through Cloudflare:
1. Log in to your Cloudflare Dashboard.
2. Go to **Network**.
3. Toggle **HTTP/2** to **On**.
4. (Optional) Toggle **HTTP/3 (with QUIC)** to **On** to enable the latest generation protocol.

---

## 3. Nginx Server Configuration
If you host the production bundle (`dist/`) on an Nginx server, update your virtual host file:

1. Ensure the Nginx version is `1.9.5` or higher.
2. Update the `listen` directive in the server block to include `http2`:
   ```nginx
   server {
       listen 443 ssl http2;
       server_name kadamakudy.com;

       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;

       # ... rest of configuration
   }
   ```
3. Test config and restart Nginx:
   ```bash
   nginx -t
   sudo systemctl restart nginx
   ```

---

## 4. Apache Server Configuration
If hosting on Apache:

1. Enable the HTTP2 module:
   ```bash
   sudo a2enmod http2
   ```
2. Add the `Protocols` directive to your VirtualHost configuration (or globally in `apache2.conf`):
   ```apache
   <VirtualHost *:443>
       ServerName kadamakudy.com
       
       # Enable HTTP/2 (h2) and fallback to HTTP/1.1
       Protocols h2 http/1.1

       SSLEngine on
       SSLCertificateFile /path/to/cert.pem
       SSLCertificateKeyFile /path/to/key.pem
   </VirtualHost>
   ```
3. Restart Apache:
   ```bash
   sudo systemctl restart apache2
   ```

---

## 5. Local Development (Optional)
To test HTTP/2 locally with Vite, you can enable HTTPS:
1. Install the basic-ssl plugin:
   ```bash
   npm install @vitejs/plugin-basic-ssl --save-dev
   ```
2. Add it to your `vite.config.ts`:
   ```ts
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import basicSsl from '@vitejs/plugin-basic-ssl';

   export default defineConfig({
     plugins: [react(), basicSsl()],
     optimizeDeps: {
       exclude: ['lucide-react'],
     },
   });
   ```
3. Start the dev server (`npm run dev`). Vite will serve the page over HTTPS, utilizing HTTP/2 automatically in supported browsers.
