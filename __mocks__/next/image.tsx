export default function Image(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...props} />;
}
