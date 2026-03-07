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

    public toXml(): string {
        let xml = '';
        if (this.body !== 0) xml += `        <body>${this.body}</body>\n`;
        if (this.floor !== 0) xml += `        <floor>${this.floor}</floor>\n`;
        if (this.vMul !== 1) xml += `        <vMul>${this.vMul}</vMul>\n`;
        if (this.noDieB) xml += `        <noDieB>1</noDieB>\n`;
        if (this.noHitTime !== 0) xml += `        <noHitTime>${this.noHitTime}</noHitTime>\n`;
        if (this.hurtNumAdd !== 0) xml += `        <hurtNumAdd>${this.hurtNumAdd}</hurtNumAdd>\n`;
        if (this.glueFloorB) xml += `        <glueFloorB>1</glueFloorB>\n`;
        if (this.shakeString) xml += `        <shakeString>${this.shakeString}</shakeString>\n`;
        if (this.liveInitB) xml += `        <liveInitB>1</liveInitB>\n`;
        return xml;
    }
}
