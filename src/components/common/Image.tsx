import type { ImgHTMLAttributes, CSSProperties, FC } from "react";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  className?: string;
}

/**
 * High-performance, accessible image component replacing next/image.
 * Enforces explicit width/height constraints to eliminate layout shift (CLS)
 * and prevent natural image dimensions from overflowing flex/grid parents.
 */
export const Image: FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  loading,
  decoding,
  style,
  ...rest
}) => {
  const inlineConstraints: CSSProperties = {
    ...(width !== undefined
      ? {
          width: typeof width === "number" ? `${width}px` : width,
          maxWidth: typeof width === "number" ? `${width}px` : width,
        }
      : {}),
    ...(height !== undefined
      ? {
          height: typeof height === "number" ? `${height}px` : height,
          maxHeight: typeof height === "number" ? `${height}px` : height,
        }
      : {}),
    ...style,
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding ?? (priority ? "sync" : "async")}
      // @ts-expect-error fetchpriority is standard in modern HTML browsers
      fetchpriority={priority ? "high" : "auto"}
      className={className}
      style={inlineConstraints}
      {...rest}
    />
  );
};

export default Image;
