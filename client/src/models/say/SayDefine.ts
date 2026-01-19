// client/src/models/say/SayDefine.ts

export class SayDefine {
  name: string = "";
  toXml() {
    return `<say name="${this.name}" />`;
  }
}