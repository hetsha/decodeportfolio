# Decoding Moments - Server Deployment Guide

## Architecture

```
Frontend (React/Vite)  -->  /api proxy  -->  Strapi CMS (Headless CMS)
        :3000                                    :1337
                                                    |
                                               MySQL DB
                                                  :3306
```

## Default Ports

| Service     | Port | Config File                            |
|-------------|------|----------------------------------------|
| Frontend    | 3000 | `package.json` (dev:frontend script)   |
| Strapi CMS  | 1337 | `strapi-cms/.env` (PORT)               |
| MySQL       | 3306 | `strapi-cms/.env` (DATABASE_PORT)      |

---

## Step 1: Check Available Ports on Server

```bash
# Check if ports 3000, 1337, 3306 are free
netstat -tlnp | grep -E ':(3000|1337|3306)'

# Or use ss
ss -tlnp | grep -E ':(3000|1337|3306)'

# Quick check all three
for port in 3000 1337 3306; do
  echo "Port $port: $(ss -tlnp | grep ":$port " | wc -l) in use"
done
```

## Step 2: Change Ports (if occupied)

If a port is already in use, pick a free one and update the configs:

### Change Frontend Port
```bash
# Find a free port (e.g., 3001)
# Edit package.json
# Change: "dev:frontend": "vite --port=3000 --host=0.0.0.0"
# To:     "dev:frontend": "vite --port=3001 --host=0.0.0.0"
```

### Change Strapi Port
```bash
# Edit strapi-cms/.env
# Change: PORT=1337
# To:     PORT=1338
```

### Update Frontend Proxy (if Strapi port changed)
```bash
# Edit vite.config.ts
# Change: target: 'http://localhost:1337'
# To:     target: 'http://localhost:1338'
```

### Change MySQL Port
```bash
# Edit strapi-cms/.env
# Change: DATABASE_PORT=3306
# To:     DATABASE_PORT=3307
```

---

## Step 3: Server Setup

### Install Node.js (v18+)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs
node -v  # verify
```

### Install MySQL
```bash
sudo apt-get install mysql-server
sudo mysql_secure_installation
sudo systemctl status mysql
```

### Create Database
```bash
sudo mysql -u root -p
```
```sql
CREATE DATABASE decode_moments_cms;
CREATE USER 'strapi'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON decode_moments_cms.* TO 'strapi'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Step 4: Upload Project to Server

```bash
# On your local machine - create a production zip
cd C:\xampp\htdocs\decodeportfolio
tar -czf decoding-moments.tar.gz decoding-moments/ strapi-cms/
```

### On Server
```bash
# Create project directory
mkdir -p /var/www/decode-moments
cd /var/www/decode-moments

# Upload via scp (from local machine)
scp decoding-moments.tar.gz user@server:/var/www/decode-moments/

# On server - extract
tar -xzf decoding-moments.tar.gz
```

---

## Step 5: Configure Environment Variables

### Frontend (.env)
```bash
cd /var/www/decode-moments/decoding-moments
cp .env.example .env
nano .env
```
```
GEMINI_API_KEY="your_key"
APP_URL="https://yourdomain.com"
VITE_API_URL="http://localhost:1337"
```

### Strapi CMS (.env)
```bash
cd /var/www/decode-moments/strapi-cms
cp .env.example .env
nano .env
```
```
HOST=0.0.0.0
PORT=1337
APP_KEYS="random1,random2,random3,random4"
API_TOKEN_SALT=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)
TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
ENCRYPTION_KEY=$(openssl rand -base64 32)

DATABASE_CLIENT=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=decode_moments_cms
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your_secure_password
DATABASE_SSL=false

INSTAGRAM_ACCESS_TOKEN=your_token
INSTAGRAM_USER_ID=your_user_id
CRM_WEBHOOK_URL=https://erp.upparac.com/webhook/strapi-inquiries
CRM_WEBHOOK_SECRET=your_secret
```

---

## Step 6: Install Dependencies & Build

```bash
# Strapi CMS
cd /var/www/decode-moments/strapi-cms
npm install
npm run build
npm run develop  # first time only - to set up admin
# Ctrl+C after admin is created

# Frontend
cd /var/www/decode-moments/decoding-moments
npm install
npm run build
```

---

## Step 7: Run with PM2 (Process Manager)

```bash
# Install PM2
sudo npm install -g pm2

# Start Strapi CMS
cd /var/www/decode-moments/strapi-cms
pm2 start npm --name "strapi" -- run start
pm2 save

# Start Frontend (serves built files)
cd /var/www/decode-moments/decoding-moments
pm2 start npm --name "frontend" -- run preview
pm2 save

# Or serve with a proper static server
pm2 serve /var/www/decode-moments/decoding-moments/dist 3000 --name "frontend" --spa
pm2 save

# Auto-start on reboot
pm2 startup
```

### PM2 Commands
```bash
pm2 list              # list all processes
pm2 logs strapi       # view strapi logs
pm2 logs frontend     # view frontend logs
pm2 restart strapi    # restart strapi
pm2 stop strapi       # stop strapi
pm2 delete strapi     # remove strapi from pm2
```

---

## Step 8: Nginx Reverse Proxy (Recommended)

```bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/decode-moments
```

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Strapi CMS API
    location /api {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Strapi Admin Panel
    location /admin {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Strapi Uploads (media files)
    location /uploads {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_cache_valid 200 30m;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/decode-moments /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL with Certbot
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Quick Reference - Port Changes

If you need to change the default ports, update these files:

| What to change | File | Line |
|----------------|------|------|
| Frontend port  | `package.json` | `dev:frontend` script |
| Strapi port    | `strapi-cms/.env` | `PORT=1337` |
| Proxy target   | `vite.config.ts` | `target: 'http://localhost:1337'` |
| MySQL port     | `strapi-cms/.env` | `DATABASE_PORT=3306` |
| MySQL port     | `strapi-cms/config/database.ts` | `port: env.int('DATABASE_PORT', 3306)` |

---

## Troubleshooting

### Port already in use
```bash
# Find what's using the port
lsof -i :3000
kill -9 <PID>   # kill the process, then start your app
```

### CORS errors
- Ensure Strapi `middlewares.ts` allows your frontend origin
- Check `strapi-cms/config/middlewares.ts` for the `origin` setting

### Database connection refused
```bash
sudo systemctl status mysql
sudo systemctl start mysql
```

### Strapi admin not loading
```bash
cd strapi-cms
npm run build
pm2 restart strapi
```
