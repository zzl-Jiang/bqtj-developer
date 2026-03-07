// client/src/models/bullet/BulletCritDefine.ts
import { Expose } from 'class-transformer';

export class BulletCritDefine {
    @Expose() public pro: number | undefined = undefined;
    @Expose() public mul: number | undefined = undefined;

    public toXml(): string {
        let xml = '';
        if (this.pro !== undefined && this.pro !== 0) xml += `        <pro>${this.pro}</pro>\n`;
        if (this.mul !== undefined && this.mul !== 1) xml += `        <mul>${this.mul}</mul>\n`;
        return xml;
    }
}
