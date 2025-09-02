import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DdosProtectionPlans_Get: AppBlock = {
  name: "Ddos Protection Plans / Get",
  description: "Gets information about the specified DDoS protection plan.",
  category: "Ddos Protection Plans",
  inputs: {
    default: {
      config: {
        ddosProtectionPlanName: {
          name: "Ddos Protection Plan Name",
          description: "Name of the ddos protection plan",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/ddosProtectionPlans/${input.event.inputConfig.ddosProtectionPlanName}` +
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
          tags: {
            type: "object",
            additionalProperties: true,
          },
          properties: {
            type: "object",
            properties: {
              resourceGuid: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              publicIPAddresses: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                  },
                },
              },
              virtualNetworks: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
          },
          etag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default DdosProtectionPlans_Get;
