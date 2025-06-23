import slugify from "slugify";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export class Slugify {
  private static hashId(id: string): string {
    return crypto.createHash("md5").update(id).digest("hex").slice(0, 10);
  }

  private static uuidPart(): string {
    return uuidv4().split("-")[0];
  }

  static generateVideoSlug(
    title: string,
    publicId: string,
    objectId: string
  ): string {
    const baseSlug = slugify(title, { lower: true, strict: true });
    const pubSegment = publicId.split("/").pop() ?? "vid";
    const hashedId = this.hashId(objectId);
    const uuid = this.uuidPart();
    return `${baseSlug}-${pubSegment}-${hashedId}-${uuid}`;
  }

  static generatePlaylistSlug(name: string, objectId: string): string {
    const baseSlug = slugify(name, { lower: true, strict: true });
    const hashedId = this.hashId(objectId);
    const uuid = this.uuidPart();
    return `${baseSlug}-${hashedId}-${uuid}`;
  }

  static generateUserSlug(
    name: string,
    username: string,
    objectId: string
  ): string {
    const usernameSlug = slugify(username, { lower: true, strict: true });
    const nameSlug = slugify(name.split(" ")[0], { lower: true, strict: true });
    const hashedId = this.hashId(objectId);
    const uuid = this.uuidPart();
    return `${usernameSlug}-${nameSlug}-${hashedId}-${uuid}`;
  }
}
