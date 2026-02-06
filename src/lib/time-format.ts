export default function formatTime(elapsedMs: number, formatMs = true) {
  const totalSeconds = formatMs
    ? elapsedMs / 1000
    : Math.floor(elapsedMs / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = formatMs
    ? (totalSeconds % 60).toFixed(2).padStart(2, "0")
    : (totalSeconds % 60).toString().padStart(2, "0");

  return `${totalSeconds / 3600 >= 1 ? hours + ":" : ""}${minutes}:${seconds}`;
}
