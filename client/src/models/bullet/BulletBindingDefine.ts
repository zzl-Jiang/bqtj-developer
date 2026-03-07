// client/src/models/bullet/BulletBindingDefine.ts
import { Expose } from 'class-transformer';

export class BulletBindingDefine {
    @Expose() public cnName: string = '';
    @Expose() public skillArr: string[] = [];
    @Expose() public lifeMul: number = 1;

    public toXml(): string {
        let xml = '';
        if (this.cnName) xml += `        <cnName>${this.cnName}</cnName>\n`;
        if (this.skillArr.length > 0) xml += `        <skillArr>${this.skillArr.join(',')}</skillArr>\n`;
        if (this.lifeMul !== 1) xml += `        <lifeMul>${this.lifeMul}</lifeMul>\n`;
        return xml;
    }
}
