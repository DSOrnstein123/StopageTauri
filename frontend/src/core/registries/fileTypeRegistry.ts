export class FileTypeRegistry {
  private static fileTypes = new Set<string>(["document", "canvas"]);

  static register(type: string) {
    this.fileTypes.add(type);
  }

  static has(type: string): boolean {
    return this.fileTypes.has(type);
  }
}
