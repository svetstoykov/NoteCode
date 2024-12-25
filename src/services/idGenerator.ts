export function generateUniqueId(count: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueId = "";

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueId += characters[randomIndex];
  }

  return uniqueId;
}