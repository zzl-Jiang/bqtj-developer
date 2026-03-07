// client/src/models/bullet/BulletLineDefine.ts
import { Expose } from 'class-transformer';

export class BulletLineDefine {
    @Expose() public color: string | undefined = undefined;
    @Expose() public lightColor: string | undefined = undefined;
    @Expose() public vMul: number | undefined = undefined;
    @Expose() public size: number | undefined = undefined;
    @Expose() public lightSize: number | undefined = undefined;
    @Expose() public blendMode: string | undefined = undefined;
    @Expose() public type: string | undefined = undefined;
    @Expose() public editB: boolean | undefined = undefined;

    public toXml(): string {
        let xml = '';
        if (this.color !== undefined && this.color !== '0xFFFFFF') xml += `        <color>${this.color}</color>\n`;
        if (this.lightColor !== undefined && this.lightColor !== '0xFFFF00') xml += `        <lightColor>${this.lightColor}</lightColor>\n`;
        if (this.vMul !== undefined && this.vMul !== 1) xml += `        <vMul>${this.vMul}</vMul>\n`;
        if (this.size !== undefined && this.size !== 1) xml += `        <size>${this.size}</size>\n`;
        if (this.lightSize !== undefined && this.lightSize !== 4) xml += `        <lightSize>${this.lightSize}</lightSize>\n`;
        if (this.blendMode !== undefined && this.blendMode !== 'normal') xml += `        <blendMode>${this.blendMode}</blendMode>\n`;
        if (this.type) xml += `        <type>${this.type}</type>\n`;
        if (this.editB) xml += `        <editB>1</editB>\n`;
        return xml;
    }
}
