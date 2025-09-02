import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RoutingRules_CreateOrUpdate: AppBlock = {
  name: "Routing Rules / Create Or Update",
  description: "Creates or updates an routing rule.",
  category: "Routing Rules",
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
        routingRule: {
          name: "Routing Rule",
          description: "The routing rule to create or update",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  provisioningState: {
                    type: "string",
                  },
                  resourceGuid: {
                    type: "string",
                  },
                  destination: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                      },
                      destinationAddress: {
                        type: "string",
                      },
                    },
                    required: ["type", "destinationAddress"],
                  },
                  nextHop: {
                    type: "object",
                    properties: {
                      nextHopType: {
                        type: "string",
                      },
                      nextHopAddress: {
                        type: "string",
                      },
                    },
                    required: ["nextHopType"],
                  },
                },
                required: ["destination", "nextHop"],
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
        const requestBody = input.event.inputConfig.routingRule;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/routingConfigurations/${input.event.inputConfig.configurationName}/ruleCollections/${input.event.inputConfig.ruleCollectionName}/rules/${input.event.inputConfig.ruleName}` +
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
              provisioningState: {
                type: "string",
              },
              resourceGuid: {
                type: "string",
              },
              destination: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                  },
                  destinationAddress: {
                    type: "string",
                  },
                },
                required: ["type", "destinationAddress"],
              },
              nextHop: {
                type: "object",
                properties: {
                  nextHopType: {
                    type: "string",
                  },
                  nextHopAddress: {
                    type: "string",
                  },
                },
                required: ["nextHopType"],
              },
            },
            required: ["destination", "nextHop"],
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

export default RoutingRules_CreateOrUpdate;
