import type { Plugin } from 'vite'

import { join, resolve } from 'node:path'

import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Yaml from 'unplugin-yaml/vite'
import Inspect from 'vite-plugin-inspect'

import { defineConfig } from 'vite'

// For Histoire
export default defineConfig({
  resolve: {
    alias: {
      '@proj-airi/i18n': resolve(join(import.meta.dirname, '..', '..', 'packages', 'i18n', 'src')),
    },
  },
  server: {
    fs: {
      allow: [join('..', '..')],
    },
    allowedHosts: //'all', // Cho phép tất cả các host (chỉ dùng trong môi trường phát triển cục bộ)
    [
      'localhost',
      '127.0.0.1',
      '.ngrok-free.app', // <-- Thêm dòng này để cho phép các subdomain của ngrok
      // Hoặc thêm host cụ thể: ví dụ '3d0324e7742f.ngrok-free.app'
      'juniordevnam--ollama-airi-airiollama-server-dev.modal.run'
    ],
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
    }

  },
  optimizeDeps: {
    include: [
      // <MarkdownRenderer /> will be problematic in Histoire without these
      '@shikijs/rehype',
      'rehype-stringify',
      'remark-math',
      'remark-parse',
      'unified',
      // Histoire dependencies (Copied from Histoire's vite.ts)
      'flexsearch',
      'shiki',
      // Shiki dependencies
      'vscode-oniguruma',
      'vscode-textmate',
    ],
  },
  plugins: [
    // TODO: Type wrong for `unplugin-yaml` in Histoire required
    // Vite version, wait until Histoire updates to support Vite 7
    Yaml() as Plugin,
    Vue(),
    Unocss(),
    // TODO: Type wrong for `unplugin-yaml` in Histoire required
    // Vite version, wait until Histoire updates to support Vite 7
    Inspect() as Plugin,
  ],
})
