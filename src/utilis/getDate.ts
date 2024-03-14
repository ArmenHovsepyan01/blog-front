export function getDate(date: string) {
  const dateObject = new Date(date);

  return dateObject.toDateString().slice(3).trim().split(" ").join("/");
}
