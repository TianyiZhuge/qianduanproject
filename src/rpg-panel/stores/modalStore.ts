/**
 * 模态框状态管理
 */
import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';

export interface ModalConfig {
  title?: string;
  component?: any;
  props?: Record<string, any>;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  onClose?: () => void;
}

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false);
  const config = shallowRef<ModalConfig>({});

  function open(modalConfig: ModalConfig) {
    config.value = {
      size: 'md',
      closable: true,
      ...modalConfig
    };
    isOpen.value = true;
  }

  function close() {
    if (config.value.onClose) {
      config.value.onClose();
    }
    isOpen.value = false;
    config.value = {};
  }

  return {
    isOpen,
    config,
    open,
    close
  };
});
