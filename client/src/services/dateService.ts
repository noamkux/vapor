export function getFormattedDate(providedDate: Date) {
  let date = new Date(providedDate); // Create a date object
  const day = date.getDate(); // Get the day
  const month = date.toLocaleString("en-US", { month: "short" }); // Get the month in short form
  const year = date.getFullYear(); // Get the year
  const formattedDate = `${day} ${month}, ${year}`; // Combine them all
  return formattedDate;
}
