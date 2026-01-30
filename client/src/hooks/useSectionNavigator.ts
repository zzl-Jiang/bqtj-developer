// client/src/hooks/useSectionNavigator.ts
import { watch } from 'vue';
import { useModStore, type ModuleKey } from '../store/useModStore';

interface NavigatorOptions<T> {
  module: ModuleKey;      // 所属模块，如 'level'
  tab: string;            // 所属页签，如 'events'
  list: T[] | (() => T[] | undefined | null);  // 数据列表（用于查找子项）
  onFound: (item: T) => void; // 找到子项后的动作（比如打开抽屉）
  idField?: string;       // 标识符字段，默认是 'id'
}

export function useSectionNavigator<T>(options: NavigatorOptions<T>) {
  const modStore = useModStore();

  watch(() => modStore.navigationRequest.timestamp, () => {
    const { module, tab, subId } = modStore.navigationRequest;

    // 验证是否是发送给当前页签的请求
    if (module === options.module && tab === options.tab && subId) {
      
      // 获取实时列表
      const rawList = typeof options.list === 'function' ? options.list() : options.list;
      const dataList = rawList || []; // 如果是空值，转为空数组
      
      // 寻找目标子项
      const idKey = (options.idField || 'id') as keyof T;
      const foundItem = dataList.find(item => item[idKey] === subId);

      if (foundItem) {
        // 执行回调（如打开抽屉）
        options.onFound(foundItem);

        // 自动尝试滚动定位（通用逻辑）
        // 约定 HTML 元素的 ID 格式为：tab-subId，例如 events-event_1
        setTimeout(() => {
          const el = document.getElementById(`${tab}-${subId}`);
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  });
}