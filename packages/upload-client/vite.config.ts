/*
 * @Author: gongyuqi
 * @Date: 2021-10-28 01:26:51
 * @LastEditors: gongyuqi
 * @LastEditTime: 2021-10-28 01:37:25
 * @FilePath: /pnpm-demo/packages/upload-client/vite.config.ts
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [vue()],
});
