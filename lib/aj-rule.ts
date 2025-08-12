import arcjet, { fixedWindow } from "./arcjet";

export const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  })
);
