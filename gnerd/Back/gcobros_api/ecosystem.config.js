module.exports = {
    apps : [{
      name: "gcobros-api",
      script: "npm",
      args: "run start",
      exec_mode: "cluster",
      intences: 1,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }, {
       name: 'worker',
       script: 'worker.js'
    }]
  }