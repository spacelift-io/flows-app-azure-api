import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkSecurityPerimeterAssociableResourceTypes_List: AppBlock = {
  name: "Network Security Perimeter Associable Resource Types / List",
  description:
    "Gets the list of resources that are onboarded with NSP. These resources can be associated with a network security perimeter",
  category: "Network Security Perimeter Associable Resource Types",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/locations/${input.event.inputConfig.location}/perimeterAssociableResourceTypes` +
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
                    displayName: {
                      type: "string",
                    },
                    resourceType: {
                      type: "string",
                    },
                    publicDnsZones: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
                name: {
                  type: "string",
                },
                id: {
                  type: "string",
                },
                type: {
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

export default NetworkSecurityPerimeterAssociableResourceTypes_List;
