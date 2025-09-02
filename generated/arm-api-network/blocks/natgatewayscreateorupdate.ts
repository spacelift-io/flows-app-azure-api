import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NatGateways_CreateOrUpdate: AppBlock = {
  name: "Nat Gateways / Create Or Update",
  description: "Creates or updates a nat gateway.",
  category: "Nat Gateways",
  inputs: {
    default: {
      config: {
        natGatewayName: {
          name: "Nat Gateway Name",
          description: "Name of the nat gateway",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/natGateways/${input.event.inputConfig.natGatewayName}` +
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
          sku: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
            },
          },
          properties: {
            type: "object",
            properties: {
              idleTimeoutInMinutes: {
                type: "integer",
              },
              publicIpAddresses: {
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
              publicIpAddressesV6: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              publicIpPrefixes: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              publicIpPrefixesV6: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              subnets: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              sourceVirtualNetwork: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              resourceGuid: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
            },
          },
          zones: {
            type: "array",
            items: {
              type: "string",
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

export default NatGateways_CreateOrUpdate;
