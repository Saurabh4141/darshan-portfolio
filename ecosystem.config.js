// PM2 process definition for the production server.
// Usage (after `npm run build`):
//   pm2 start ecosystem.config.js && pm2 save
// Port 3011, the one the live server uses (3000–3004 and 3010 are other apps); nginx
// proxies darshangaikwad.cloud to it. Change it here and in nginx together.
module.exports = {
  apps: [
    {
      name: "darshangaikwad",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3011",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      env: { NODE_ENV: "production", PORT: "3011" },
    },
  ],
};
