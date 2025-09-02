import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FirewallPolicyRuleCollectionGroups_List: AppBlock = {
  name: "Firewall Policy Rule Collection Groups / List",
  description:
    "Lists all FirewallPolicyRuleCollectionGroups in a FirewallPolicy resource.",
  category: "Firewall Policy Rule Collection Groups",
  inputs: {
    default: {
      config: {
        firewallPolicyName: {
          name: "Firewall Policy Name",
          description: "Name of the firewall policy",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/firewallPolicies/${input.event.inputConfig.firewallPolicyName}/ruleCollectionGroups` +
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
                    size: {
                      type: "string",
                    },
                    priority: {
                      type: "integer",
                    },
                    ruleCollections: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          ruleCollectionType: {
                            type: "string",
                          },
                          name: {
                            type: "string",
                          },
                          priority: {
                            type: "integer",
                          },
                        },
                        required: ["ruleCollectionType"],
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default FirewallPolicyRuleCollectionGroups_List;
