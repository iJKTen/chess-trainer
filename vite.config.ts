import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    {
      name: 'serve-data-dir',
      configureServer(server) {
        server.middlewares.use('/data', (req, res, next) => {
          const file = path.join(process.cwd(), 'data', req.url!)
          if (fs.existsSync(file)) {
            res.setHeader('Content-Type', 'application/json')
            fs.createReadStream(file).pipe(res)
          } else {
            next()
          }
        })
      },
    },
  ],
})
