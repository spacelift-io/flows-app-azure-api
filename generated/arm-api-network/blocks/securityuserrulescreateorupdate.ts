import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SecurityUserRules_CreateOrUpdate: AppBlock = {
  name: "Security User Rules / Create Or Update",
  description: "Creates or updates a security user rule.",
  category: "Security User Rules",
  inputs: {
    default: {
      config: {
        networkManagerName: {
          name: "Network Manager Name",
          description: "Name of the network manager",
          type: "string",
          required: true,
        },
        configurationName: {
          name: "Configuration Name",
          description: "Name of the configuration",
          type: "string",
          required: true,
        },
        ruleCollectionName: {
          name: "Rule Collection Name",
          description: "Name of the rule collection",
          type: "string",
          required: true,
        },
        ruleName: {
          name: "Rule Name",
          description: "Name of the rule",
          type: "string",
          required: true,
        },
        securityUserRule: {
          name: "Security User Rule",
          description: "The security user rule to create or update",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  protocol: {
                    type: "string",
                  },
                  sources: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        addressPrefix: {
                          type: "string",
                        },
                        addressPrefixType: {
                          type: "string",
                        },
                      },
                    },
                  },
                  destinations: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  sourcePortRanges: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  destinationPortRanges: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  direction: {
                    type: "string",
                  },
                  provisioningState: {
                    type: "string",
                  },
                  resourceGuid: {
                    type: "string",
                  },
                },
                required: ["protocol", "direction"],
              },
              systemData: {
                type: "object",
                properties: {
                  createdBy: {
                    type: "string",
                  },
                  createdByType: {
                    type: "string",
                  },
                  createdAt: {
                    type: "string",
                  },
                  lastModifiedBy: {
                    type: "string",
                  },
                  lastModifiedByType: {
                    type: "string",
                  },
                  lastModifiedAt: {
                    type: "string",
                  },
                },
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
        const requestBody = input.event.inputConfig.securityUserRule;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/securityUserConfigurations/${input.event.inputConfig.configurationName}/ruleCollections/${input.event.inputConfig.ruleCollectionName}/rules/${input.event.inputConfig.ruleName}` +
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
              description: {
                type: "string",
              },
              protocol: {
                type: "string",
              },
              sources: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    addressPrefix: {
                      type: "string",
                    },
                    addressPrefixType: {
                      type: "string",
                    },
                  },
                },
              },
              destinations: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              sourcePortRanges: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              destinationPortRanges: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              direction: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              resourceGuid: {
                type: "string",
              },
            },
            required: ["protocol", "direction"],
          },
          systemData: {
            type: "object",
            properties: {
              createdBy: {
                type: "string",
              },
              createdByType: {
                type: "string",
              },
              createdAt: {
                type: "string",
              },
              lastModifiedBy: {
                type: "string",
              },
              lastModifiedByType: {
                type: "string",
              },
              lastModifiedAt: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default SecurityUserRules_CreateOrUpdate;
