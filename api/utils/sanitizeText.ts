export function sanitizeText(text: string): string {
  return text
    .replace(/<script.*?>.*?<\/script>/gi, "") // hapus script tags
    .replace(/[<>]/g, "") // hapus simbol yang bisa jadi injection
    .replace(/\u0000/g, "") // hapus null-byte
    .trim();
}
