// client/src/models/body/BodyDefine.ts

export class BodyDefine {
  name: string = "";
  toXml() {
    return `<body name="${this.name}" />`;
  }
}