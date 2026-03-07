// client/src/models/bullet/BulletBindingDefine.ts
import { Expose } from 'class-transformer';

export class BulletBindingDefine {
    @Expose() public cnName: string | undefined = undefined;
    @Expose() public skillArr: string[] | undefined = undefined;
    @Expose() public lifeMul: number | undefined = undefined;

    public toXml(): string {
        let xml = '';
        if (this.cnName) xml += `        <cnName>${this.cnName}</cnName>\n`;
        if (this.skillArr && this.skillArr.length > 0) xml += `        <skillArr>${this.skillArr.join(',')}</skillArr>\n`;
        if (this.lifeMul !== undefined && this.lifeMul !== 1) xml += `        <lifeMul>${this.lifeMul}</lifeMul>\n`;
        return xml;
    }
}
