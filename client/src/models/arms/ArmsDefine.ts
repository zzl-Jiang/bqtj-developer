// client/src/models/arms/ArmsDefine.ts

export class ArmsDefine {
  name: string = "";
  toXml() {
    return `<bullet name="${this.name}" />`;
  }
}