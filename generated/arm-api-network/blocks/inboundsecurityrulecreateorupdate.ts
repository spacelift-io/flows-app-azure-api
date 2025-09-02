import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const InboundSecurityRule_CreateOrUpdate: AppBlock = {
  name: "Inbound Security Rule / Create Or Update",
  description:
    "Creates or updates the specified Network Virtual Appliance Inbound Security Rules.",
  category: "Inbound Security Rule",
  inputs: {
    default: {
      config: {
        networkVirtualApplianceName: {
          name: "Network Virtual Appliance Name",
          description: "Name of the network virtual appliance",
          type: "string",
          required: true,
        },
        ruleCollectionName: {
          name: "Rule Collection Name",
          description: "Name of the rule collection",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/${input.event.inputConfig.networkVirtualApplianceName}/inboundSecurityRules/${input.event.inputConfig.ruleCollectionName}` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
          properties: {
            type: "object",
            properties: {
              ruleType: {
                type: "string",
              },
              rules: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    protocol: {
                      type: "string",
                    },
                    sourceAddressPrefix: {
                      type: "string",
                    },
                    destinationPortRange: {
                      type: "integer",
                    },
                    destinationPortRanges: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    appliesOn: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
            },
          },
          name: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          type: {
            type: "string",
          },
        },
      },
    },
  },
};

export default InboundSecurityRule_CreateOrUpdate;
