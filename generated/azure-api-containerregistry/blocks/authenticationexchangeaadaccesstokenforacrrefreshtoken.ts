import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Authentication_ExchangeAadAccessTokenForAcrRefreshToken: AppBlock = {
  name: "Authentication / Exchange Aad Access Token For Acr Refresh Token",
  description: "Exchange AAD tokens for an ACR refresh Token",
  category: "Authentication",
  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/oauth2/exchange`;

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
          undefined,
          undefined,
          false,
        );
        await events.emit(result || {});
      },
    },
  },
  outputs: {
    default: {
      possiblePrimaryParents: ["default"],
      type: {
        type: "object",
        properties: {
          refresh_token: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Authentication_ExchangeAadAccessTokenForAcrRefreshToken;
