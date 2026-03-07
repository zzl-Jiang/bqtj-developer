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
}
