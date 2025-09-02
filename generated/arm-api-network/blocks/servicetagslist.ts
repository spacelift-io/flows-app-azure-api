import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ServiceTags_List: AppBlock = {
  name: "Service Tags / List",
  description: "Gets a list of service tag information resources.",
  category: "Service Tags",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/locations/${input.event.inputConfig.location}/serviceTags` +
          "?api-version=2024-10-01";

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
          name: {
            type: "string",
          },
          id: {
            type: "string",
          },
          type: {
            type: "string",
          },
          changeNumber: {
            type: "string",
          },
          cloud: {
            type: "string",
          },
          values: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    changeNumber: {
                      type: "string",
                    },
                    region: {
                      type: "string",
                    },
                    systemService: {
                      type: "string",
                    },
                    addressPrefixes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    state: {
                      type: "string",
                    },
                  },
                },
                name: {
                  type: "string",
                },
                id: {
                  type: "string",
                },
                serviceTagChangeNumber: {
                  type: "string",
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ServiceTags_List;
