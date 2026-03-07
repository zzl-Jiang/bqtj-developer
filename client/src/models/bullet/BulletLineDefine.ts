// client/src/models/bullet/BulletLineDefine.ts
import { Expose } from 'class-transformer';

export class BulletLineDefine {
    @Expose() public color: string = '0xFFFFFF';
    @Expose() public lightColor: string = '0xFFFF00';
    @Expose() public vMul: number = 1;
    @Expose() public size: number = 1;
    @Expose() public lightSize: number = 4;
    @Expose() public blendMode: string = 'normal';
    @Expose() public type: string = '';
    @Expose() public editB: boolean = false;

    public toXml(): string {
        let xml = '';
        if (this.color !== '0xFFFFFF') xml += `        <color>${this.color}</color>\n`;
        if (this.lightColor !== '0xFFFF00') xml += `        <lightColor>${this.lightColor}</lightColor>\n`;
        if (this.vMul !== 1) xml += `        <vMul>${this.vMul}</vMul>\n`;
        if (this.size !== 1) xml += `        <size>${this.size}</size>\n`;
        if (this.lightSize !== 4) xml += `        <lightSize>${this.lightSize}</lightSize>\n`;
        if (this.blendMode !== 'normal') xml += `        <blendMode>${this.blendMode}</blendMode>\n`;
        if (this.type) xml += `        <type>${this.type}</type>\n`;
        if (this.editB) xml += `        <editB>1</editB>\n`;
        return xml;
    }
}
