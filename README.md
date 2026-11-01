# MERAAS Website (meraaslibya.com)

Static HTML site — no database, no build step. Upload the files as they are.

## Deploy

**cPanel / Apache:** upload everything into `public_html` (including `.htaccess`, which forces HTTPS, sets the 404 page and blocks hidden files).

**VPS with Nginx:**
```nginx
server {
    listen 80;
    server_name meraaslibya.com www.meraaslibya.com;
    root /var/www/meraas;
    index index.html;
    error_page 404 /404.html;
    location ~ /\. { deny all; }
    location / { try_files $uri $uri/ =404; }
}
```
Then add HTTPS with `sudo certbot --nginx -d meraaslibya.com -d www.meraaslibya.com`.

## Moving hosting — keep email working

Email for `@meraaslibya.com` runs on **Microsoft 365**, not on the web host. When switching hosting:

- Change **only** the `A` records for `meraaslibya.com` and `www` to the new server's IP.
- **Do not** change or delete the `MX`, `TXT` (SPF / verification), `autodiscover` or DKIM (`selector1/selector2._domainkey`) records.
- If you also move DNS away from LibyanSpider's nameservers, copy **every** record to the new DNS provider first, then switch nameservers.

`sitemap.xml`, `robots.txt` and the canonical links use `https://www.meraaslibya.com` — keep that domain or update those files.
