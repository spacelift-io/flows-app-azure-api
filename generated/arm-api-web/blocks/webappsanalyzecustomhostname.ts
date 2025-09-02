import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_AnalyzeCustomHostname: AppBlock = {
  name: "Web Apps / Analyze Custom Hostname",
  description: "Description for Analyze a custom hostname.",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
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
        hostName: {
          name: "Host Name",
          description: "Custom hostname.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/analyzeCustomHostname` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.hostName
            ? `&hostName=${input.event.inputConfig.hostName}`
            : "");

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
          properties: {
            type: "object",
            properties: {
              isHostnameAlreadyVerified: {
                type: "boolean",
              },
              customDomainVerificationTest: {
                type: "string",
              },
              customDomainVerificationFailureInfo: {
                type: "object",
                properties: {
                  extendedCode: {
                    type: "string",
                  },
                  messageTemplate: {
                    type: "string",
                  },
                  parameters: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  innerErrors: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        extendedCode: {
                          type: "object",
                          additionalProperties: true,
                        },
                        messageTemplate: {
                          type: "object",
                          additionalProperties: true,
                        },
                        parameters: {
                          type: "object",
                          additionalProperties: true,
                        },
                        innerErrors: {
                          type: "object",
                          additionalProperties: true,
                        },
                        details: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                        target: {
                          type: "string",
                        },
                        code: {
                          type: "string",
                        },
                        message: {
                          type: "string",
                        },
                      },
                    },
                  },
                  details: {
                    type: "object",
                    additionalProperties: true,
                  },
                  target: {
                    type: "object",
                    additionalProperties: true,
                  },
                  code: {
                    type: "object",
                    additionalProperties: true,
                  },
                  message: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              hasConflictOnScaleUnit: {
                type: "boolean",
              },
              hasConflictAcrossSubscription: {
                type: "boolean",
              },
              conflictingAppResourceId: {
                type: "string",
              },
              cNameRecords: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              txtRecords: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              aRecords: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              alternateCNameRecords: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              alternateTxtRecords: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_AnalyzeCustomHostname;
