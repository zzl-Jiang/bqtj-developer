// client/src/models/bullet/BulletFollowDefine.ts
import { Expose } from 'class-transformer';

export class BulletFollowDefine {
    @Expose() public value: number = 0;
    @Expose() public maxTime: number = 0;
    @Expose() public delay: number = 0;
    @Expose() public hitIsTargetB: boolean = false;
    @Expose() public noLM: boolean = false;

    public toXml(): string {
        let xml = '';
        if (this.value !== 0) xml += `        <value>${this.value}</value>\n`;
        if (this.maxTime !== 0) xml += `        <maxTime>${this.maxTime}</maxTime>\n`;
        if (this.delay !== 0) xml += `        <delay>${this.delay}</delay>\n`;
        if (this.hitIsTargetB) xml += `        <hitIsTargetB>1</hitIsTargetB>\n`;
        if (this.noLM) xml += `        <noLM>1</noLM>\n`;
        return xml;
    }
}
