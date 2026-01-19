// client/src/models/bullet/BulletDefine.ts

export class BulletDefine {
  name: string = "";
  toXml() {
    return `<bullet name="${this.name}" />`;
  }
}