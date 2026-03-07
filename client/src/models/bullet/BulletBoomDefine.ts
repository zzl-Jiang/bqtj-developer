// client/src/models/bullet/BulletBoomDefine.ts
import { Expose } from 'class-transformer';

export class BulletBoomDefine {
    @Expose() public floorB: boolean | undefined = undefined;
    @Expose() public bodyB: boolean | undefined = undefined;
    @Expose() public selfB: boolean | undefined = undefined;
    @Expose() public radius: number | undefined = undefined;
    @Expose() public hurtMul: number | undefined = undefined;
    @Expose() public maxHurtNum: number | undefined = undefined;
    @Expose() public noExcludeBodyB: boolean | undefined = undefined;
    @Expose() public haveBodyHitEffectB: boolean | undefined = undefined;

    public toXml(): string {
        let xml = '';
        if (this.floorB) xml += `        <floorB>1</floorB>\n`;
        if (this.bodyB) xml += `        <bodyB>1</bodyB>\n`;
        if (this.selfB) xml += `        <selfB>1</selfB>\n`;
        if (this.radius !== undefined && this.radius !== 0) xml += `        <radius>${this.radius}</radius>\n`;
        if (this.hurtMul !== undefined && this.hurtMul !== 1) xml += `        <hurtMul>${this.hurtMul}</hurtMul>\n`;
        if (this.maxHurtNum !== undefined && this.maxHurtNum !== 7) xml += `        <maxHurtNum>${this.maxHurtNum}</maxHurtNum>\n`;
        if (this.noExcludeBodyB) xml += `        <noExcludeBodyB>1</noExcludeBodyB>\n`;
        if (this.haveBodyHitEffectB) xml += `        <haveBodyHitEffectB>1</haveBodyHitEffectB>\n`;
        return xml;
    }
}
