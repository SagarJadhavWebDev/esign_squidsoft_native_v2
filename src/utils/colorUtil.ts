function rgbToHex(rgbColor: string) {
  let rgb = rgbColor
    .substring(4, rgbColor.length - 1)
    .replace(/ /g, "")
    .split(",") as any;
  return (
    "#" +
    ((1 << 24) | (rgb[0] << 16) | (rgb[1] << 8) | rgb[2]).toString(16).slice(1)
  );
}

export { rgbToHex };
