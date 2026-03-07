// client/src/models/bullet/BulletCritDefine.ts
import { Expose } from 'class-transformer';

export class BulletCritDefine {
    @Expose() public pro: number = 0;
    @Expose() public mul: number = 1;

    public toXml(): string {
        let xml = '';
        if (this.pro !== 0) xml += `        <pro>${this.pro}</pro>\n`;
        if (this.mul !== 1) xml += `        <mul>${this.mul}</mul>\n`;
        return xml;
    }
}
