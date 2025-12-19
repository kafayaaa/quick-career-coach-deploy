export default function Slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and") // ubah & → and
    .replace(/\//g, "-") // ubah / → -
    .replace(/\(/g, "") // hapus (
    .replace(/\)/g, "") // hapus )
    .replace(/[^a-z0-9\s-]/g, "") // hapus simbol lain
    .replace(/\s+/g, "-") // spasi → -
    .replace(/-+/g, "-") // gabungkan ------ → -
    .trim();
}
