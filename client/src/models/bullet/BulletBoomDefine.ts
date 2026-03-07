// client/src/models/bullet/BulletBoomDefine.ts
import { Expose } from 'class-transformer';

export class BulletBoomDefine {
    @Expose() public floorB: boolean = false;
    @Expose() public bodyB: boolean = false;
    @Expose() public selfB: boolean = false;
    @Expose() public radius: number = 0;
    @Expose() public hurtMul: number = 1;
    @Expose() public maxHurtNum: number = 7;
    @Expose() public noExcludeBodyB: boolean = false;
    @Expose() public haveBodyHitEffectB: boolean = false;

    public toXml(): string {
        let xml = '';
        if (this.floorB) xml += `        <floorB>1</floorB>\n`;
        if (this.bodyB) xml += `        <bodyB>1</bodyB>\n`;
        if (this.selfB) xml += `        <selfB>1</selfB>\n`;
        if (this.radius !== 0) xml += `        <radius>${this.radius}</radius>\n`;
        if (this.hurtMul !== 1) xml += `        <hurtMul>${this.hurtMul}</hurtMul>\n`;
        if (this.maxHurtNum !== 7) xml += `        <maxHurtNum>${this.maxHurtNum}</maxHurtNum>\n`;
        if (this.noExcludeBodyB) xml += `        <noExcludeBodyB>1</noExcludeBodyB>\n`;
        if (this.haveBodyHitEffectB) xml += `        <haveBodyHitEffectB>1</haveBodyHitEffectB>\n`;
        return xml;
    }
}
