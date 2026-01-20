// client/src/models/drop/DropDefine.ts

export class DropDefine {
  name: string = "";
  toXml() {
    return `<drop name="${this.name}" />`;
  }
}