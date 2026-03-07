// client/src/models/bullet/BulletSpeedDefine.ts
import { Expose } from 'class-transformer';

export class BulletSpeedDefine {
    @Expose() public min: number | undefined = undefined;
    @Expose() public max: number | undefined = undefined;
    @Expose() public a: number | undefined = undefined;
    @Expose() public random: number | undefined = undefined;
    @Expose() public selfVra: number | undefined = undefined;
    @Expose() public raBackV: number | undefined = undefined;

    public toXml(): string {
        let xml = '';
        if (this.min !== undefined && this.min !== 0) xml += `        <min>${this.min}</min>\n`;
        if (this.max !== undefined && this.max !== 0) xml += `        <max>${this.max}</max>\n`;
        if (this.a !== undefined && this.a !== 0) xml += `        <a>${this.a}</a>\n`;
        if (this.random !== undefined && this.random !== 0) xml += `        <random>${this.random}</random>\n`;
        if (this.selfVra !== undefined && this.selfVra !== 0) xml += `        <selfVra>${this.selfVra}</selfVra>\n`;
        if (this.raBackV !== undefined && this.raBackV !== 0) xml += `        <raBackV>${this.raBackV}</raBackV>\n`;
        return xml;
    }
}
