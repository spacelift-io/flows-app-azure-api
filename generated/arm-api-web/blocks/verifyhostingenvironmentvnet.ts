import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VerifyHostingEnvironmentVnet: AppBlock = {
  name: "Verify Hosting Environment Vnet",
  description:
    "Description for Verifies if this VNET is compatible with an App Service Environment by analyzing the Network Security Group rules.",
  category: "General",
  inputs: {
    default: {
      config: {
        parameters: {
          name: "Parameters",
          description: "VNET information",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  vnetResourceGroup: {
                    type: "string",
                  },
                  vnetName: {
                    type: "string",
                  },
                  vnetSubnetName: {
                    type: "string",
                  },
                  subnetResourceId: {
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
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/verifyHostingEnvironmentVnet` +
          "?api-version=2024-11-01";

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
          properties: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
              failed: {
                type: "boolean",
              },
              failedTests: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        testName: {
                          type: "string",
                        },
                        details: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              warnings: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
          },
        },
      },
    },
  },
};

export default VerifyHostingEnvironmentVnet;
