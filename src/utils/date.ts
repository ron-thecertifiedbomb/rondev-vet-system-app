export const getTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-CA"); // YYYY-MM-DD
};

export const formatDate = (date: string) => {
  const parsed = new Date(date);

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const formatTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};


