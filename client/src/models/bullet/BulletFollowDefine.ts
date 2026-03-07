// client/src/models/bullet/BulletFollowDefine.ts
import { Expose } from 'class-transformer';

export class BulletFollowDefine {
    @Expose() public value: number | undefined = undefined;
    @Expose() public maxTime: number | undefined = undefined;
    @Expose() public delay: number | undefined = undefined;
    @Expose() public hitIsTargetB: boolean | undefined = undefined;
    @Expose() public noLM: boolean | undefined = undefined;

    public toXml(): string {
        let xml = '';
        if (this.value !== undefined && this.value !== 0) xml += `        <value>${this.value}</value>\n`;
        if (this.maxTime !== undefined && this.maxTime !== 0) xml += `        <maxTime>${this.maxTime}</maxTime>\n`;
        if (this.delay !== undefined && this.delay !== 0) xml += `        <delay>${this.delay}</delay>\n`;
        if (this.hitIsTargetB) xml += `        <hitIsTargetB>1</hitIsTargetB>\n`;
        if (this.noLM) xml += `        <noLM>1</noLM>\n`;
        return xml;
    }
}
