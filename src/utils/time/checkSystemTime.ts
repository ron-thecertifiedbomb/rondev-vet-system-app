import { parse } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

export const checkSystemTime = (serverNow: string): boolean => {
  try {
    const parsedPH = parse(serverNow, "MMM d, yyyy, h:mm:ss a", new Date());

    const serverTime = fromZonedTime(parsedPH, "Asia/Manila");
    const clientPH = toZonedTime(new Date(), "Asia/Manila");

    const diffMinutes =
      Math.abs(serverTime.getTime() - clientPH.getTime()) / 60000;

    console.log("RAW SERVER:", serverNow);
    console.log("SERVER TIME:", serverTime.toString());
    console.log("CLIENT TIME:", clientPH.toString());
    console.log("DIFF MINUTES:", diffMinutes);

    return diffMinutes > 5;
  } catch (err) {
    console.log("Time check util failed", err);
    return false;
  }
};
``;
