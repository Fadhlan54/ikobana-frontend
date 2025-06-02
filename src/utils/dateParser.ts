export default function dateParser(
  date: string,
  {
    showDayName = true,
    showTime = true,
  }: { showDayName?: boolean; showTime?: boolean } = {}
): string {
  const dateObj = new Date(date);

  const dayName = dateObj.toLocaleString("id-ID", { weekday: "long" });
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("id-ID", { month: "long" });
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  let result = "";

  if (showDayName) {
    result += `${dayName}, `;
  }

  result += `${day} ${month} ${year}`;

  if (showTime) {
    result += ` ${hours}:${minutes}`;
  }

  return result;
}
