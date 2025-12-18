# Deploy: learnnovice.com/phet-revamp (Google Cloud VM)

This project is a static Vite build served at:
- `https://learnnovice.com/phet-revamp/`

The repo auto-updates on the VM via a `systemd` timer that periodically pulls from GitHub, builds, and copies `dist/` into the nginx web root.

---

## Quick Start (VM Commands)

### First-Time Setup

```bash
# 1. Clone repo
sudo git clone https://github.com/Novice130/Phet-revamp.git /opt/phet-revamp-installer
cd /opt/phet-revamp-installer

# 2. Create web directory
sudo mkdir -p /var/www/learnnovice/phet-revamp
sudo chown -R www-data:www-data /var/www/learnnovice

# 3. Install systemd units
sudo install -m 0755 ./deploy/phet-revamp-update.sh /usr/local/bin/phet-revamp-update
sudo install -m 0644 ./deploy/phet-revamp-update.service /etc/systemd/system/
sudo install -m 0644 ./deploy/phet-revamp-update.timer /etc/systemd/system/
sudo systemctl daemon-reload

# 4. Run first build
sudo systemctl start phet-revamp-update.service

# 5. Enable auto-updates (every 5 min)
sudo systemctl enable --now phet-revamp-update.timer
```

### Add to Nginx

Open your existing nginx config and add the PhET location block:

```bash
sudo nano /etc/nginx/sites-available/default
```

Add inside your `server { listen 443 ... }` block:

```nginx
    # PhET Revamp SPA
    location ^~ /phet-revamp/ {
        alias /var/www/learnnovice/phet-revamp/;
        try_files $uri $uri/ /phet-revamp/index.html;
    }
```

Test and reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## Verify Everything

```bash
# Check timer
sudo systemctl status phet-revamp-update.timer

# Check logs
sudo journalctl -u phet-revamp-update.service -n 50

# Test endpoints
curl -I https://learnnovice.com/phet-revamp/
```

---

## Troubleshooting

### All Sites Not Working?

Check your main nginx config has all location blocks:

```nginx
server {
    listen 443 ssl http2;
    server_name learnnovice.com;
    
    root /var/www/learnnovice;
    
    # Main site
    location / {
        try_files $uri $uri/ =404;
    }
    
    # CITCD-website (working)
    location /citcd-website {
        alias /var/www/learnnovice/citcd-website/;
        try_files $uri $uri/ /citcd-website/index.html;
    }
    
    # CITCD
    location /citcd {
        alias /var/www/learnnovice/citcd/;
        try_files $uri $uri/ /citcd/index.html;
    }
    
    # PhET Revamp
    location ^~ /phet-revamp/ {
        alias /var/www/learnnovice/phet-revamp/;
        try_files $uri $uri/ /phet-revamp/index.html;
    }
}
```

### Service Fails?

```bash
sudo journalctl -u phet-revamp-update.service --no-pager
```

Common issues:
- Node.js not installed → `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs`
- Permission denied → `sudo chown -R root:root /opt/phet-revamp`
