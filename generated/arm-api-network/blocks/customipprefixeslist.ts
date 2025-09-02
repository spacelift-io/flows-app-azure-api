import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CustomIPPrefixes_List: AppBlock = {
  name: "Custom IP Prefixes / List",
  description: "Gets all custom IP prefixes in a resource group.",
  category: "Custom IP Prefixes",
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
        resourceGroupName: {
          name: "Resource Group Name",
          description:
            "Azure resource group name (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/customIpPrefixes` +
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
                extendedLocation: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    type: {
                      type: "string",
                    },
                  },
                },
                properties: {
                  type: "object",
                  properties: {
                    asn: {
                      type: "string",
                    },
                    cidr: {
                      type: "string",
                    },
                    signedMessage: {
                      type: "string",
                    },
                    authorizationMessage: {
                      type: "string",
                    },
                    customIpPrefixParent: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
                    },
                    childCustomIpPrefixes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                    commissionedState: {
                      type: "string",
                    },
                    expressRouteAdvertise: {
                      type: "boolean",
                    },
                    geo: {
                      type: "string",
                    },
                    noInternetAdvertise: {
                      type: "boolean",
                    },
                    prefixType: {
                      type: "string",
                    },
                    publicIpPrefixes: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    resourceGuid: {
                      type: "string",
                    },
                    failedReason: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                  },
                },
                etag: {
                  type: "string",
                },
                zones: {
                  type: "array",
                  items: {
                    type: "string",
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

export default CustomIPPrefixes_List;
