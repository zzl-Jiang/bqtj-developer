// client/src/models/level/LevelDefine.ts

export class LevelDefine {
  name: string = "";
  toXml() {
    return `<level name="${this.name}" />`;
  }
}