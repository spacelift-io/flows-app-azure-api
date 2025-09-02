import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CloudServiceOperatingSystems_GetOSFamily: AppBlock = {
  name: "Cloud Service Operating Systems / Get OS Family",
  description:
    "Gets properties of a guest operating system family that can be specified in the XML service configuration (.cscfg) for a cloud service.",
  category: "Cloud Service Operating Systems",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        osFamilyName: {
          name: "OS Family Name",
          description: "Name of the os family",
          type: "string",
          required: true,
        },
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/locations/${input.event.inputConfig.location}/cloudServiceOsFamilies/${input.event.inputConfig.osFamilyName}` +
          "?api-version=2024-11-04";

        const result = await makeAzureRequest(
          input,
          url,
          "GET",
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
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
          location: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              label: {
                type: "string",
              },
              versions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    version: {
                      type: "string",
                    },
                    label: {
                      type: "string",
                    },
                    isDefault: {
                      type: "boolean",
                    },
                    isActive: {
                      type: "boolean",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default CloudServiceOperatingSystems_GetOSFamily;
