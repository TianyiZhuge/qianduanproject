/**
 * RPG Panel - 回合制战略RPG界面
 * 主入口文件
 */
import { waitUntil } from 'async-wait-until';
import App from './App.vue';
import './global.css';

$(async () => {
  // 等待酒馆全局初始化完成
  await waitGlobalInitialized('Mvu');

  // 创建 Vue 应用
  const app = createApp(App);
  app.use(createPinia());

  // 挂载到指定容器
  app.mount('#rpg-panel-app');

  console.log('[RPG Panel] 界面已加载');
});
