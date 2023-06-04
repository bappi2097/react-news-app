export const dateToString = (date: Date | string) => {
  return new Date(date).toLocaleString("en-us", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}
