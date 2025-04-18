/**
 * PM2 Ecosystem Configuration for DialN AI
 * 
 * This configuration manages all background processes required for DialN:
 * - Laravel Queue Workers (for processing jobs)
 * - Laravel Scheduler (for running scheduled tasks)
 * - Reverb WebSocket Server (optional, for real-time updates)
 * 
 * Installation:
 * npm install -g pm2
 * 
 * Usage:
 * pm2 start ecosystem.config.js
 * pm2 status
 * pm2 logs
 * pm2 restart all
 * pm2 stop all
 * pm2 delete all
 */

module.exports = {
  apps: [
    /**
     * Laravel Queue Worker
     * 
     * Processes background jobs for:
     * - Campaign calls (MakeCampaignCallJob)
     * - Contact imports (ProcessContactImport, ImportContactsJob)
     * - SMS verification (SendPhoneVerificationSms)
     * - AI responses (GenerateAISmsResponseJob)
     * - Twilio pricing (FetchTwilioPricingJob)
     */
    {
      name: 'DialN-queue',
      script: 'artisan',
      args: 'queue:work database --sleep=3 --tries=3 --max-time=3600 --timeout=300',
      interpreter: 'php',
      instances: 2, // Run 2 worker instances for better performance
      exec_mode: 'fork', // Use 'fork' mode for PHP (not 'cluster')
      autorestart: true,
      watch: false, // Don't watch file changes for queue workers
      max_memory_restart: '500M', // Restart if memory exceeds 500MB
      error_file: './storage/logs/pm2-queue-error.log',
      out_file: './storage/logs/pm2-queue-out.log',
      log_file: './storage/logs/pm2-queue-combined.log',
      time: true, // Prefix logs with timestamp
      merge_logs: true, // Merge logs from all instances
      
      // Environment variables
      env: {
        APP_ENV: 'production',
        QUEUE_CONNECTION: 'database',
      },
      
      // Restart configuration
      restart_delay: 3000, // Wait 3 seconds before restart
      min_uptime: '10s', // Consider app unstable if crashes within 10s
      max_restarts: 10, // Max 10 restarts within 1 minute
      
      // Cron restart (restart worker every day at 3 AM to prevent memory leaks)
      cron_restart: '0 3 * * *',
    },

    /**
     * Laravel Scheduler Runner
     * 
     * Runs scheduled tasks every minute:
     * - Launch scheduled campaigns
     * - Process running campaigns
     * - Sync Twilio numbers (daily at 3 AM)
     * - Charge monthly phone fees (1st of month at 2 AM)
     * 
     * This replaces the cron job: * * * * * php artisan schedule:run
     */
    {
      name: 'DialN-scheduler',
      script: 'artisan',
      args: 'schedule:work', // Built-in scheduler daemon (Laravel 11+)
      interpreter: 'php',
      instances: 1, // Only 1 instance needed for scheduler
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      error_file: './storage/logs/pm2-scheduler-error.log',
      out_file: './storage/logs/pm2-scheduler-out.log',
      log_file: './storage/logs/pm2-scheduler-combined.log',
      time: true,
      
      env: {
        APP_ENV: 'production',
      },
      
      restart_delay: 5000,
      min_uptime: '30s',
      max_restarts: 10,
    },

    /**
     * Reverb WebSocket Server (Optional)
     * 
     * Provides real-time updates for:
     * - Live campaign progress
     * - Call status updates
     * - Notifications
     * - Dashboard real-time metrics
     * 
     * Note: Only needed if using Laravel Reverb for WebSockets
     * Comment out if not using real-time features
     */
    // {
    //   name: 'DialN-reverb',
    //   script: 'artisan',
    //   args: 'reverb:start --host=0.0.0.0 --port=8080',
    //   interpreter: 'php',
    //   instances: 1,
    //   exec_mode: 'fork',
    //   autorestart: true,
    //   watch: false,
    //   max_memory_restart: '300M',
    //   error_file: './storage/logs/pm2-reverb-error.log',
    //   out_file: './storage/logs/pm2-reverb-out.log',
    //   log_file: './storage/logs/pm2-reverb-combined.log',
    //   time: true,
      
    //   env: {
    //     APP_ENV: 'production',
    //     REVERB_HOST: '0.0.0.0',
    //     REVERB_PORT: '8080',
    //   },
      
    //   restart_delay: 5000,
    //   min_uptime: '30s',
    //   max_restarts: 10,
    // },

    /**
     * High-Priority Queue Worker (Optional)
     * 
     * Dedicated worker for high-priority jobs
     * Useful if you have time-sensitive tasks that need immediate processing
     * 
     * Uncomment if you use priority queues
     */
    /*
    {
      name: 'DialN-queue-high',
      script: 'artisan',
      args: 'queue:work database --queue=high,default --sleep=1 --tries=3 --max-time=3600',
      interpreter: 'php',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      error_file: './storage/logs/pm2-queue-high-error.log',
      out_file: './storage/logs/pm2-queue-high-out.log',
      time: true,
      
      env: {
        APP_ENV: 'production',
        QUEUE_CONNECTION: 'database',
      },
    },
    */

    /**
     * Campaign Queue Worker (Optional)
     * 
     * Dedicated worker for campaign-related jobs only
     * Prevents campaign jobs from blocking other jobs
     * 
     * Uncomment if you want to separate campaign processing
     */
    /*
    {
      name: 'DialN-queue-campaigns',
      script: 'artisan',
      args: 'queue:work database --queue=campaigns --sleep=2 --tries=3 --max-time=3600',
      interpreter: 'php',
      instances: 3, // More instances for campaign processing
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      error_file: './storage/logs/pm2-queue-campaigns-error.log',
      out_file: './storage/logs/pm2-queue-campaigns-out.log',
      time: true,
      
      env: {
        APP_ENV: 'production',
        QUEUE_CONNECTION: 'database',
      },
    },
    */
  ],

  /**
   * PM2 Deploy Configuration (Optional)
   * 
   * Uncomment and configure if you want to use PM2 for deployment
   */
  /*
  deploy: {
    production: {
      user: 'www-data',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:your-username/DialN.git',
      path: '/var/www/DialN',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && composer install --no-dev --optimize-autoloader && php artisan migrate --force && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
  */
};
