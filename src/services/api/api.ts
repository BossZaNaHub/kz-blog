import { ApisauceInstance, create } from "apisauce";

const timeout: number = parseInt(process.env.TIMEOUT || "30000", 30000);
const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

const client: ApisauceInstance = create({
  baseURL: apiURL,
  headers: {
    Accept: "application/json",
    "Cache-Control": "no-cache",
  },
  timeout: timeout,
});

// api.addMonitor()
export default client;
