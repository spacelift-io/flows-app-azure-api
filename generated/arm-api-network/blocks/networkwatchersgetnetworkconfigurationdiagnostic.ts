import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkWatchers_GetNetworkConfigurationDiagnostic: AppBlock = {
  name: "Network Watchers / Get Network Configuration Diagnostic",
  description:
    "Gets Network Configuration Diagnostic data to help customers understand and debug network behavior. It provides detailed information on what security rules were applied to a specified traffic flow and the result of evaluating these rules. Customers must provide details of a flow like source, destination, protocol, etc. The API returns whether traffic was allowed or denied, the rules evaluated for the specified flow and the evaluation results.",
  category: "Network Watchers",
  inputs: {
    default: {
      config: {
        networkWatcherName: {
          name: "Network Watcher Name",
          description: "Name of the network watcher",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkWatchers/${input.event.inputConfig.networkWatcherName}/networkConfigurationDiagnostic` +
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
        properties: {
          results: {
            type: "array",
            items: {
              type: "object",
              properties: {
                profile: {
                  type: "object",
                  properties: {
                    direction: {
                      type: "string",
                    },
                    protocol: {
                      type: "string",
                    },
                    source: {
                      type: "string",
                    },
                    destination: {
                      type: "string",
                    },
                    destinationPort: {
                      type: "string",
                    },
                  },
                  required: [
                    "direction",
                    "protocol",
                    "source",
                    "destination",
                    "destinationPort",
                  ],
                },
                networkSecurityGroupResult: {
                  type: "object",
                  properties: {
                    securityRuleAccessResult: {
                      type: "string",
                    },
                    evaluatedNetworkSecurityGroups: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          networkSecurityGroupId: {
                            type: "string",
                          },
                          appliedTo: {
                            type: "string",
                          },
                          matchedRule: {
                            type: "object",
                            properties: {
                              ruleName: {
                                type: "string",
                              },
                              action: {
                                type: "string",
                              },
                            },
                          },
                          rulesEvaluationResult: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                name: {
                                  type: "string",
                                },
                                protocolMatched: {
                                  type: "boolean",
                                },
                                sourceMatched: {
                                  type: "boolean",
                                },
                                sourcePortMatched: {
                                  type: "boolean",
                                },
                                destinationMatched: {
                                  type: "boolean",
                                },
                                destinationPortMatched: {
                                  type: "boolean",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default NetworkWatchers_GetNetworkConfigurationDiagnostic;
