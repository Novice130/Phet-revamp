# Deploy: learnnovice.com/phet-revamp (Google Cloud VM)

This project is a static Vite build meant to be served at the subpath:

- `https://learnnovice.com/phet-revamp/`

The repo can self-update on a VM via a `systemd` timer that periodically pulls from GitHub, builds, and copies `dist/` into the nginx web root.

## 1) VM prerequisites (Debian 12)

Install required packages:

```bash
sudo apt-get update
sudo apt-get install -y nginx git rsync ca-certificates curl
```

Install Node.js (pick one approach):

- **Recommended**: NodeSource LTS packages (gets a newer Node than Debian repo)

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

- **Alternative**: Debian repo packages

```bash
sudo apt-get install -y nodejs npm
```

Verify:

```bash
node -v
npm -v
```

## 2) Choose where the site will be served from

This setup publishes to:

- `/var/www/learnnovice/phet-revamp/`

Create the parent directory:

```bash
sudo mkdir -p /var/www/learnnovice/phet-revamp
sudo chown -R www-data:www-data /var/www/learnnovice
```

## 3) Add nginx config

Copy the provided snippet:

- `deploy/nginx-learnnovice-phet-revamp.conf`

If you already have a `server {}` for `learnnovice.com`, just copy the `location ^~ /phet-revamp/ { ... }` block into your existing HTTPS (443) server.

Reload nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 4) Install the auto-update service + timer

Clone the repo once (just to install the deploy files):

```bash
sudo mkdir -p /opt
sudo git clone https://github.com/Novice130/Phet-revamp.git /opt/phet-revamp-installer
cd /opt/phet-revamp-installer
```

Install the updater script + systemd units:

```bash
sudo install -m 0755 ./deploy/phet-revamp-update.sh /usr/local/bin/phet-revamp-update
sudo install -m 0644 ./deploy/phet-revamp-update.service /etc/systemd/system/phet-revamp-update.service
sudo install -m 0644 ./deploy/phet-revamp-update.timer /etc/systemd/system/phet-revamp-update.timer

sudo systemctl daemon-reload
```

Run once manually:

```bash
sudo systemctl start phet-revamp-update.service
```

Enable periodic updates:

```bash
sudo systemctl enable --now phet-revamp-update.timer
```

Check logs:

```bash
sudo systemctl status phet-revamp-update.timer
sudo journalctl -u phet-revamp-update.service -n 200 --no-pager
```

## Notes

- The timer runs every 5 minutes and only rebuilds when the repo HEAD changes.
- If your VM cannot access GitHub anonymously (private repo), switch to an SSH deploy key and update `REPO_URL` in `/usr/local/bin/phet-revamp-update`.
