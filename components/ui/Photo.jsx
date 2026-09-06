import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

// Renders next/image when the referenced file actually exists under /public,
// otherwise falls back to a designed placeholder instead of a broken-image
// icon. Once real photography is dropped into /public at the same path,
// this starts rendering it automatically — no code changes needed.
export default function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  fill = true,
  width,
  height,
  priority = false,
  sizes,
}) {
  const isRemote = typeof src === "string" && /^https?:\/\//.test(src);
  const exists =
    isRemote || (Boolean(src) && fs.existsSync(path.join(process.cwd(), "public", src)));

  if (!exists) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-brand-100 via-cream to-brand-50 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="font-serif text-sm uppercase tracking-[0.3em] text-brand-600/50">Ginkgo</span>
      </div>
    );
  }

  if (fill) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes || "100vw"}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={imgClassName}
    />
  );
}
