// client/src/models/bullet/BulletBounceDefine.ts
import { Expose } from 'class-transformer';

export class BulletBounceDefine {
    @Expose() public body: number | undefined = undefined;
    @Expose() public floor: number | undefined = undefined;
    @Expose() public vMul: number | undefined = undefined;
    @Expose() public noDieB: boolean | undefined = undefined;
    @Expose() public noHitTime: number | undefined = undefined;
    @Expose() public hurtNumAdd: number | undefined = undefined;
    @Expose() public glueFloorB: boolean | undefined = undefined;
    @Expose() public shakeString: string | undefined = undefined;
    @Expose() public liveInitB: boolean | undefined = undefined;

    public toXml(): string {
        let xml = '';
        if (this.body !== undefined && this.body !== 0) xml += `        <body>${this.body}</body>\n`;
        if (this.floor !== undefined && this.floor !== 0) xml += `        <floor>${this.floor}</floor>\n`;
        if (this.vMul !== undefined && this.vMul !== 1) xml += `        <vMul>${this.vMul}</vMul>\n`;
        if (this.noDieB) xml += `        <noDieB>1</noDieB>\n`;
        if (this.noHitTime !== undefined && this.noHitTime !== 0) xml += `        <noHitTime>${this.noHitTime}</noHitTime>\n`;
        if (this.hurtNumAdd !== undefined && this.hurtNumAdd !== 0) xml += `        <hurtNumAdd>${this.hurtNumAdd}</hurtNumAdd>\n`;
        if (this.glueFloorB) xml += `        <glueFloorB>1</glueFloorB>\n`;
        if (this.shakeString) xml += `        <shakeString>${this.shakeString}</shakeString>\n`;
        if (this.liveInitB) xml += `        <liveInitB>1</liveInitB>\n`;
        return xml;
    }
}
