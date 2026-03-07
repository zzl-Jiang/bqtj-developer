// client/src/models/bullet/BulletSpeedDefine.ts
import { Expose } from 'class-transformer';

export class BulletSpeedDefine {
    @Expose() public min: number = 0;
    @Expose() public max: number = 0;
    @Expose() public a: number = 0;
    @Expose() public random: number = 0;
    @Expose() public selfVra: number = 0;
    @Expose() public raBackV: number = 0;
}
