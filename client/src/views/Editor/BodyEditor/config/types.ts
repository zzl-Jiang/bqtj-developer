// client/src/views/Editor/BodyEditor/config/types.ts

export interface SelectOption {
    label: string;
    value: string | number;
    desc?: string;
}

export interface BodyMetaItem {
    key: string;
    label: string;
    type: 'string' | 'number' | 'select' | 'multi_select' | 'switch';
    desc?: string;
    options?: SelectOption[];
    group?: string;
}
