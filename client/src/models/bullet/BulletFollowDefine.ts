// client/src/models/bullet/BulletFollowDefine.ts
import { Expose } from 'class-transformer';

export class BulletFollowDefine {
    @Expose() public value: number = 0;
    @Expose() public maxTime: number = 0;
    @Expose() public delay: number = 0;
    @Expose() public hitIsTargetB: boolean = false;
    @Expose() public noLM: boolean = false;
}
