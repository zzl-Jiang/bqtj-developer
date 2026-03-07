// client/src/models/bullet/BulletPositionDefine.ts
import { Expose } from 'class-transformer';

export class BulletPositionDefine {
    /** 散射角度 */
    @Expose()
    public shakeAngle: number = 0;

    /** 多发子弹的发射夹角 */
    @Expose()
    public shootAngle: number = 0;

    /** 加特林模式下的子弹数量 */
    @Expose()
    public gatlinNum: number = 0;

    /** 加特林模式下的散射范围 */
    @Expose()
    public gatlinRange: number = 0;

    /** 固定的发射点偏移 (x,y) */
    @Expose()
    public shootPoint: string = '0,0';

    /** 子弹实体自身的角度（-1000表示不设置） */
    @Expose()
    public bulletAngle: number = -1000;

    /** 子弹实体角度的随机范围 */
    @Expose()
    public bulletAngleRange: number = 0;

    /** 额外间隔 */
    @Expose()
    public extendGap: number = 0;
}
