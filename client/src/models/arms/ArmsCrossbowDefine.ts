// client/src/models/arms/ArmsCrossbowDefine.ts
import { Expose } from 'class-transformer';

export class ArmsCrossbowDefine {
    /** 是否开启蓄力/聚焦 */
    @Expose()
    public focoB: boolean = false;

    /** 最小延迟倍率/蓄力修正 */
    @Expose()
    public minDelayMul: number = 0;

    /** 蓄力相关的附加值 */
    @Expose()
    public vAtt: number = 0;

    public toXml(): string {
        if (!this.focoB && this.minDelayMul === 0 && this.vAtt === 0) return '';
        let xml = `      <crossbowD>\n`;
        if (this.focoB) xml += `        <focoB>1</focoB>\n`;
        if (this.minDelayMul !== 0) xml += `        <minDelayMul>${this.minDelayMul}</minDelayMul>\n`;
        if (this.vAtt !== 0) xml += `        <vAtt>${this.vAtt}</vAtt>\n`;
        xml += `      </crossbowD>\n`;
        return xml;
    }
}
