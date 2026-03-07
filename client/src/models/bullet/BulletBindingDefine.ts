// client/src/models/bullet/BulletBindingDefine.ts
import { Expose } from 'class-transformer';

export class BulletBindingDefine {
    @Expose() public cnName: string = '';
    @Expose() public skillArr: string[] = [];
    @Expose() public lifeMul: number = 1;
}
