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
}
