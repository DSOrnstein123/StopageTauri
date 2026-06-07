import { type AnyExtension } from "@tiptap/react";

class ExtensionRegistry {
  private definitions = new Map<string, AnyExtension[]>();

  register(featureName: string, extensions: AnyExtension | AnyExtension[]) {
    const extensionArray = Array.isArray(extensions)
      ? extensions
      : [extensions];
    this.definitions.set(featureName, extensionArray);
  }

  has(featureName: string) {
    if (!this.definitions.has(featureName)) {
      console.error("This feature doesn't have any extensions");
      return false;
    }
    return true;
  }

  getAllExtensions() {
    return Array.from(this.definitions.values()).flat();
  }
}

export const extensionRegistry = new ExtensionRegistry();
