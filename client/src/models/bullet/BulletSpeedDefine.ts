// client/src/models/bullet/BulletSpeedDefine.ts
import { Expose } from 'class-transformer';

export class BulletSpeedDefine {
    @Expose() public min: number = 0;
    @Expose() public max: number = 0;
    @Expose() public a: number = 0;
    @Expose() public random: number = 0;
    @Expose() public selfVra: number = 0;
    @Expose() public raBackV: number = 0;

    public toXml(): string {
        let xml = '';
        if (this.min !== 0) xml += `        <min>${this.min}</min>\n`;
        if (this.max !== 0) xml += `        <max>${this.max}</max>\n`;
        if (this.a !== 0) xml += `        <a>${this.a}</a>\n`;
        if (this.random !== 0) xml += `        <random>${this.random}</random>\n`;
        if (this.selfVra !== 0) xml += `        <selfVra>${this.selfVra}</selfVra>\n`;
        if (this.raBackV !== 0) xml += `        <raBackV>${this.raBackV}</raBackV>\n`;
        return xml;
    }
}
