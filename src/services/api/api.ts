import { ApisauceInstance, create } from "apisauce";
import { redirect } from "next/navigation";

const timeout: number = parseInt(process.env.TIMEOUT || "30000", 30000);
const apiURL = process.env.NEXT_PUBLIC_API_URL || "";
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";

const client: ApisauceInstance = create({
  baseURL: apiURL,
  headers: {
    Accept: "application/json",
    "Cache-Control": "no-cache",
    "KZ-API": `${accessToken}`,
  },
  timeout: timeout,
});

client.addResponseTransform((transform) => {
  if (!transform.ok && transform.status === 403) {
    redirect("/login");
  }
});

// api.addMonitor()
export default client;
