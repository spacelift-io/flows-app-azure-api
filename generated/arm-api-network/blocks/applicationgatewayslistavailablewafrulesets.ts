import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ApplicationGateways_ListAvailableWafRuleSets: AppBlock = {
  name: "Application Gateways / List Available Waf Rule Sets",
  description: "Lists all available web application firewall rule sets.",
  category: "Application Gateways",
  inputs: {
    default: {
      config: {
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/applicationGatewayAvailableWafRuleSets` +
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
                    provisioningState: {
                      type: "string",
                    },
                    ruleSetType: {
                      type: "string",
                    },
                    ruleSetVersion: {
                      type: "string",
                    },
                    ruleGroups: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          ruleGroupName: {
                            type: "string",
                          },
                          description: {
                            type: "string",
                          },
                          rules: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                ruleId: {
                                  type: "integer",
                                },
                                ruleIdString: {
                                  type: "string",
                                },
                                state: {
                                  type: "string",
                                },
                                action: {
                                  type: "string",
                                },
                                sensitivity: {
                                  type: "string",
                                },
                                description: {
                                  type: "string",
                                },
                              },
                              required: ["ruleId"],
                            },
                          },
                        },
                        required: ["ruleGroupName", "rules"],
                      },
                    },
                    tiers: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                  required: ["ruleSetType", "ruleSetVersion", "ruleGroups"],
                },
              },
            },
          },
        },
      },
    },
  },
};

export default ApplicationGateways_ListAvailableWafRuleSets;
