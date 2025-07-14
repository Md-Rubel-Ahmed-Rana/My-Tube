import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

export class Slugify {
  private static slugOptions = {
    lower: true,
    strict: false,
    remove: /[|&•·–—,:;"'`~!?@#$%^*()_+=<>[\]{}]/g,
  };

  private static uuidPart(parts: number, separator: string = "-"): string {
    const uuid = uuidv4();
    const splitParts = uuid.split("-");
    return splitParts.slice(0, parts).join(separator);
  }

  static generateVideoSlug(title: string, publicId: string): string {
    const baseSlug = slugify(title, this.slugOptions);
    const pubSegment = publicId.split("/").pop() ?? "vid";
    const uuid = this.uuidPart(2);
    return `${baseSlug}-${pubSegment}-${uuid}`;
  }

  static generatePlaylistSlug(name: string): string {
    const baseSlug = slugify(name, this.slugOptions);
    const uuid = this.uuidPart(4, "");
    return `${baseSlug}-${uuid}`;
  }

  static generateUserSlug(name: string, username: string): string {
    const usernameSlug = slugify(username, this.slugOptions);
    const nameSlug = slugify(name.split(" ")[0], this.slugOptions);
    const uuid = this.uuidPart(2, "");
    return `${usernameSlug}-${nameSlug}-${uuid}`;
  }
  static generateCategorySlug(name: string): string {
    const nameSlug = slugify(name, this.slugOptions);
    const uuid = this.uuidPart(2, "");
    return `${nameSlug}-${uuid}`;
  }
}
