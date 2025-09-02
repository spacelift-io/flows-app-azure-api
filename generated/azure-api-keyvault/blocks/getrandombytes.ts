import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetRandomBytes: AppBlock = {
  name: "Get Random Bytes",
  description:
    "Get the requested number of bytes containing random values from a managed HSM.",
  category: "General",
  inputs: {
    default: {
      config: {
        parameters: {
          name: "Parameters",
          description: "The request object to get random bytes.",
          type: {
            type: "object",
            properties: {
              count: {
                type: "number",
              },
            },
            required: ["count"],
          },
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/rng`;

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
          requestBody,
          undefined,
          input.event.inputConfig.isBinaryData || false,
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
          value: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default GetRandomBytes;
