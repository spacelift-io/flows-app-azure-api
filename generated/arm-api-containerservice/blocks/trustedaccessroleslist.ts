import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const TrustedAccessRoles_List: AppBlock = {
  name: "Trusted Access Roles / List",
  description: "List supported trusted access roles.",
  category: "Trusted Access Roles",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.ContainerService/locations/${input.event.inputConfig.location}/trustedAccessRoles` +
          "?api-version=2025-07-01";

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
                sourceResourceType: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                rules: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      verbs: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      apiGroups: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      resources: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      resourceNames: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      nonResourceURLs: {
                        type: "array",
                        items: {
                          type: "string",
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

export default TrustedAccessRoles_List;
