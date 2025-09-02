import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AzureFirewalls_PacketCapture: AppBlock = {
  name: "Azure Firewalls / Packet Capture",
  description: "Runs a packet capture on AzureFirewall.",
  category: "Azure Firewalls",
  inputs: {
    default: {
      config: {
        azureFirewallName: {
          name: "Azure Firewall Name",
          description: "Name of the azure firewall",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              durationInSeconds: {
                type: "number",
              },
              numberOfPacketsToCapture: {
                type: "number",
              },
              sasUrl: {
                type: "string",
              },
              fileName: {
                type: "string",
              },
              protocol: {
                type: "string",
              },
              flags: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                    },
                  },
                },
              },
              filters: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    sources: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    destinations: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    destinationPorts: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              operation: {
                type: "string",
              },
            },
          },
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/azureFirewalls/${input.event.inputConfig.azureFirewallName}/packetCapture` +
          "?api-version=2024-10-01";

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
        additionalProperties: true,
      },
    },
  },
};

export default AzureFirewalls_PacketCapture;
