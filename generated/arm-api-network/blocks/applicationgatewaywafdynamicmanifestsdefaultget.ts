import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ApplicationGatewayWafDynamicManifestsDefault_Get: AppBlock = {
  name: "Application Gateway Waf Dynamic Manifests Default / Get",
  description: "Gets the regional application gateway waf manifest.",
  category: "Application Gateway Waf Dynamic Manifests Default",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/locations/${input.event.inputConfig.location}/applicationGatewayWafDynamicManifests/dafault` +
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
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              defaultRuleSet: {
                type: "object",
                properties: {
                  ruleSetType: {
                    type: "string",
                  },
                  ruleSetVersion: {
                    type: "string",
                  },
                },
              },
              availableRuleSets: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    ruleSetType: {
                      type: "string",
                    },
                    ruleSetVersion: {
                      type: "string",
                    },
                    status: {
                      type: "string",
                    },
                    tiers: {
                      type: "array",
                      items: {
                        type: "string",
                      },
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

export default ApplicationGatewayWafDynamicManifestsDefault_Get;
