import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "run-pairing-engine",
  { seconds: 5 }, // Adjust speed based on your needs
  internal.matching.runPairing,
);

export default crons;