// import { defineConfig } from 'vite'

export default {
    // Set the base directory for GitHub pages
    base: '/warhammer-v1/',

    // Set the project root directory (relative to the config file)
    root: './src',

    // Set the directory to serve static files from (relative to the root)
    publicDir: './public',

    // Set the build output directory
    // build: {
    //   outDir: './dist'
    // },

    server: {
      host: 'localhost',
      open: '/',
      port: 1234,
    },
}
