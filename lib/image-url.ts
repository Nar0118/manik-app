import { z } from "zod";

/** Accepts https? URLs and data:image/*;base64,... (for admin previews / small assets). */
export const imageUrlField = z
  .string()
  .min(1)
  .refine(
    (val) => {
      const v = val.trim();
      if (v.startsWith("data:image/") && v.includes("base64,")) {
        return true;
      }
      try {
        const u = new URL(v);
        return u.protocol === "http:" || u.protocol === "https:";
      } catch {
        return false;
      }
    },
    { message: "Must be a valid http(s) image URL or a data:image base64 string" },
  );

export function canPreviewImageSource(value: string): boolean {
  const v = value.trim();
  if (!v) {
    return false;
  }
  if (v.startsWith("data:image/") && v.includes("base64,")) {
    return true;
  }
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
