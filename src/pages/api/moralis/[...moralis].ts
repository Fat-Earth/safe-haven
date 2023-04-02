import { MoralisNextApi } from "@moralisweb3/next";
import { env } from "~/env.mjs";

export default MoralisNextApi({
  apiKey: "UyjooBaWOqMAwMjT0ax5QuOt41fj22tzCOoD1jhn1h4wiw4NwbN0UM9CvKRTllmN",
  authentication: {
    domain: "Safe-Heaven",
    uri: env.NEXTAUTH_URL,
    timeout: 120,
  },
});
