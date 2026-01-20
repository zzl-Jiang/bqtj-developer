<!-- client/src/views/Editor/LevelEitor/sections/MapRectSection.vue -->
<template>
  <div v-if="level && level.rectG">
    <div class="flex justify-between items-center mb-4">
      <n-h3 prefix="bar">地图区域配置 (rectG)</n-h3>
      <n-button type="primary" @click="handleAddRect">添加区域</n-button>
      <span style="margin-left: 20px;">注意，除非有特殊需求，该页面推荐留空，一般使用默认地图点位即可。</span>
    </div>

    <n-table size="small" :single-line="false" style="margin-top: 20px;">
      <thead>
        <tr>
          <th>ID</th>
          <th>标签 (Label)</th>
          <th>坐标 (X, Y)</th>
          <th>尺寸 (W, H)</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rect, index) in level.rectG.rects" :key="index">
          <td><n-input v-model:value="rect.id" size="small" /></td>
          <td>
            <n-select 
              v-model:value="rect.label" 
              :options="RECT_METAS.basic[1]!.options!.map((v: any) => ({label:v, value:v}))" 
              tag 
              filterable 
              placeholder="可留空"
              size="small" 
            />
          </td>
          <td>
            <n-space inline>
              <n-input-number v-model:value="rect.x" size="small" :show-button="false" placeholder="X" />
              <n-input-number v-model:value="rect.y" size="small" :show-button="false" placeholder="Y" />
            </n-space>
          </td>
          <td>
            <n-space inline>
              <n-input-number v-model:value="rect.width" size="small" :show-button="false" placeholder="W" />
              <n-input-number v-model:value="rect.height" size="small" :show-button="false" placeholder="H" />
            </n-space>
          </td>
          <td>
            <n-button size="tiny" type="error" ghost @click="level.rectG.rects.splice(index, 1)">删除</n-button>
          </td>
        </tr>
      </tbody>
    </n-table>

    <n-empty v-if="level.rectG.rects.length === 0" description="暂无区域数据" class="mt-4" />
  </div>
</template>

<script setup lang="ts">
import { useLevelState } from '../hooks/useLevelState';
import { RECT_METAS } from '../config';
import { MapRect } from '../../../../models/level/rect/MapRect';

const { selectedLevel: level } = useLevelState();

const handleAddRect = () => {
  const newRect = new MapRect();
  newRect.id = "rect_" + level.value?.rectG.rects.length;
  level.value?.rectG.rects.push(newRect);
};
</script>