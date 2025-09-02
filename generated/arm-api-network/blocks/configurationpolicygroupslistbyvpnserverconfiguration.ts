import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const configurationPolicyGroups_ListByVpnServerConfiguration: AppBlock = {
  name: "configuration Policy Groups / List By Vpn Server Configuration",
  description:
    "Lists all the configurationPolicyGroups in a resource group for a vpnServerConfiguration.",
  category: "configuration Policy Groups",
  inputs: {
    default: {
      config: {
        vpnServerConfigurationName: {
          name: "Vpn Server Configuration Name",
          description: "Name of the vpn server configuration",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/${input.event.inputConfig.vpnServerConfigurationName}/configurationPolicyGroups` +
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
                    isDefault: {
                      type: "boolean",
                    },
                    priority: {
                      type: "integer",
                    },
                    policyMembers: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                          attributeType: {
                            type: "string",
                          },
                          attributeValue: {
                            type: "string",
                          },
                        },
                      },
                    },
                    p2SConnectionConfigurations: {
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
                    provisioningState: {
                      type: "string",
                    },
                  },
                },
                etag: {
                  type: "string",
                },
                name: {
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

export default configurationPolicyGroups_ListByVpnServerConfiguration;
