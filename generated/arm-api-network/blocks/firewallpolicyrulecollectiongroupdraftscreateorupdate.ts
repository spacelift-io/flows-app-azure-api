import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FirewallPolicyRuleCollectionGroupDrafts_CreateOrUpdate: AppBlock = {
  name: "Firewall Policy Rule Collection Group Drafts / Create Or Update",
  description: "Create or Update Rule Collection Group Draft.",
  category: "Firewall Policy Rule Collection Group Drafts",
  inputs: {
    default: {
      config: {
        firewallPolicyName: {
          name: "Firewall Policy Name",
          description: "Name of the firewall policy",
          type: "string",
          required: true,
        },
        ruleCollectionGroupName: {
          name: "Rule Collection Group Name",
          description: "Name of the rule collection group",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  size: {
                    type: "string",
                  },
                  priority: {
                    type: "number",
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
                          type: "number",
                        },
                      },
                      required: ["ruleCollectionType"],
                    },
                  },
                },
              },
              name: {
                type: "string",
              },
              type: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/firewallPolicies/${input.event.inputConfig.firewallPolicyName}/ruleCollectionGroups/${input.event.inputConfig.ruleCollectionGroupName}/ruleCollectionGroupDrafts/default` +
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
            },
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
  },
};

export default FirewallPolicyRuleCollectionGroupDrafts_CreateOrUpdate;
