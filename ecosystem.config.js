// PM2 process definition for the production server.
// Usage (after `npm run build`):
//   pm2 start ecosystem.config.js && pm2 save
// Port 3002 sits beside gaikwadsaurabh.com (3001) on the same server; nginx
// proxies darshangaikwad.cloud to it. Change it here and in nginx together.
module.exports = {
  apps: [
    {
      name: "darshan-portfolio",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3002",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      env: { NODE_ENV: "production", PORT: "3002" },
    },
  ],
};
