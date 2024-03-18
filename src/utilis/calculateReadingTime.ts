export function calculateReadingTime(content: string, wpm = 180) {
  const words = content.split(" ");
  return Math.ceil(words.length / wpm);
}
