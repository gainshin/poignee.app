module.exports = {
  apps: [{
    name: 'poignee-app',
    script: 'npm',
    args: 'run dev',
    env: {
      NODE_ENV: 'development',
      PORT: 5173
    },
    cwd: '/home/user/webapp',
    interpreter: 'none',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    merge_logs: true,
    time: true
  }]
}