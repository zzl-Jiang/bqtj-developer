// client/src/views/Editor/BulletEditor/config/types.ts
export interface BulletMetaItem {
    key: string;
    label: string;
    type: 'string' | 'number' | 'select' | 'multi_select' | 'switch' | 'color' | 'point';
    desc?: string;
    options?: { label: string; value: any; desc?: string }[];
    placeholder?: string;
}
