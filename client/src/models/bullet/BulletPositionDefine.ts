// client/src/models/bullet/BulletPositionDefine.ts
import { Expose } from 'class-transformer';

export class BulletPositionDefine {
    /** 散射角度 */
    @Expose()
    public shakeAngle: number | undefined = undefined;

    /** 多发子弹的发射夹角 */
    @Expose()
    public shootAngle: number | undefined = undefined;

    /** 加特林模式下的子弹数量 */
    @Expose()
    public gatlinNum: number | undefined = undefined;

    /** 加特林模式下的散射范围 */
    @Expose()
    public gatlinRange: number | undefined = undefined;

    /** 固定的发射点偏移 (x,y) */
    @Expose()
    public shootPoint: string | undefined = undefined;

    /** 子弹实体自身的角度（-1000表示不设置） */
    @Expose()
    public bulletAngle: number | undefined = undefined;

    /** 子弹实体角度的随机范围 */
    @Expose()
    public bulletAngleRange: number | undefined = undefined;

    /** 额外间隔 */
    @Expose()
    public extendGap: number | undefined = undefined;

    public toXml(): string {
        let xml = '';
        if (this.shakeAngle !== undefined && this.shakeAngle !== 0) xml += `          <shakeAngle>${this.shakeAngle}</shakeAngle>\n`;
        if (this.shootAngle !== undefined && this.shootAngle !== 0) xml += `          <shootAngle>${this.shootAngle}</shootAngle>\n`;
        if (this.gatlinNum !== undefined && this.gatlinNum !== 0) xml += `          <gatlinNum>${this.gatlinNum}</gatlinNum>\n`;
        if (this.gatlinRange !== undefined && this.gatlinRange !== 0) xml += `          <gatlinRange>${this.gatlinRange}</gatlinRange>\n`;
        if (this.shootPoint !== undefined && this.shootPoint !== '0,0') xml += `          <shootPoint>${this.shootPoint}</shootPoint>\n`;
        if (this.bulletAngle !== undefined && this.bulletAngle !== -1000) xml += `          <bulletAngle>${this.bulletAngle}</bulletAngle>\n`;
        if (this.bulletAngleRange !== undefined && this.bulletAngleRange !== 0) xml += `          <bulletAngleRange>${this.bulletAngleRange}</bulletAngleRange>\n`;
        if (this.extendGap !== undefined && this.extendGap !== 0) xml += `          <extendGap>${this.extendGap}</extendGap>\n`;
        return xml;
    }
}
