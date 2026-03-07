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

    public toXml(): string {
        let xml = '';
        if (this.specialType) xml += `        <specialType>${this.specialType}</specialType>\n`;
        if (this.arr.length > 0) {
            xml += `        <arr>\n`;
            for (const pos of this.arr) {
                const posXml = pos.toXml();
                if (posXml) {
                    xml += `          <point>\n${posXml}          </point>\n`;
                }
            }
            xml += `        </arr>\n`;
        }
        return xml;
    }
}
