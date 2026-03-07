// client/src/models/arms/ArmsRecordDefine.ts
import { Expose } from 'class-transformer';

export class ArmsRecordDefine {
    /** 弦音的钢琴数据字符串 */
    @Expose()
    public piano: string | undefined = undefined;

    /** 特殊动能/移动间隔数据 */
    @Expose()
    public moveGap: number | undefined = undefined;

    public toXml(): string {
        if (!this.piano && this.moveGap === 0) return '';
        let xml = `      <recordD>\n`;
        if (this.piano) xml += `        <piano>${this.piano}</piano>\n`;
        if (this.moveGap !== 0) xml += `        <moveGap>${this.moveGap}</moveGap>\n`;
        xml += `      </recordD>\n`;
        return xml;
    }
}
