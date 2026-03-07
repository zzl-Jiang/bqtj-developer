// client/src/models/bullet/BulletPositionDefineGroup.ts
import { Expose, Type } from 'class-transformer';
import { BulletPositionDefine } from './BulletPositionDefine';

export class BulletPositionDefineGroup {
    /** 预定义的位置列表 */
    @Expose({ name: 'points' })
    @Type(() => BulletPositionDefine)
    public arr: BulletPositionDefine[] = [];

    /** 用于定位的特殊程序化逻辑的名称 */
    @Expose()
    public specialType: string = "";
}
