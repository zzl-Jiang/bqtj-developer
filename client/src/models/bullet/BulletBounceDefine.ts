// client/src/models/bullet/BulletBounceDefine.ts
import { Expose } from 'class-transformer';

export class BulletBounceDefine {
    @Expose() public body: number = 0;
    @Expose() public floor: number = 0;
    @Expose() public vMul: number = 1;
    @Expose() public noDieB: boolean = false;
    @Expose() public noHitTime: number = 0;
    @Expose() public hurtNumAdd: number = 0;
    @Expose() public glueFloorB: boolean = false;
    @Expose() public shakeString: string = '';
    @Expose() public liveInitB: boolean = false;
}
