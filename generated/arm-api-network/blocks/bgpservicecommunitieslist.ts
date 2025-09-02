import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const BgpServiceCommunities_List: AppBlock = {
  name: "Bgp Service Communities / List",
  description: "Gets all the available bgp service communities.",
  category: "Bgp Service Communities",
  inputs: {
    default: {
      config: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/bgpServiceCommunities` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    serviceName: {
                      type: "string",
                    },
                    bgpCommunities: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          serviceSupportedRegion: {
                            type: "string",
                          },
                          communityName: {
                            type: "string",
                          },
                          communityValue: {
                            type: "string",
                          },
                          communityPrefixes: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          isAuthorizedToUse: {
                            type: "boolean",
                          },
                          serviceGroup: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
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

export default BgpServiceCommunities_List;
