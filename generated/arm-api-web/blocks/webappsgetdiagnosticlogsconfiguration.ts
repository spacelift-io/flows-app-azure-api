import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_GetDiagnosticLogsConfiguration: AppBlock = {
  name: "Web Apps / Get Diagnostic Logs Configuration",
  description: "Description for Gets the logging configuration of an app.",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/config/logs` +
          "?api-version=2024-11-01";

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
              applicationLogs: {
                type: "object",
                properties: {
                  fileSystem: {
                    type: "object",
                    properties: {
                      level: {
                        type: "string",
                      },
                    },
                  },
                  azureTableStorage: {
                    type: "object",
                    properties: {
                      level: {
                        type: "string",
                      },
                      sasUrl: {
                        type: "string",
                      },
                    },
                    required: ["sasUrl"],
                  },
                  azureBlobStorage: {
                    type: "object",
                    properties: {
                      level: {
                        type: "string",
                      },
                      sasUrl: {
                        type: "string",
                      },
                      retentionInDays: {
                        type: "integer",
                      },
                    },
                  },
                },
              },
              httpLogs: {
                type: "object",
                properties: {
                  fileSystem: {
                    type: "object",
                    properties: {
                      retentionInMb: {
                        type: "integer",
                      },
                      retentionInDays: {
                        type: "integer",
                      },
                      enabled: {
                        type: "boolean",
                      },
                    },
                  },
                  azureBlobStorage: {
                    type: "object",
                    properties: {
                      sasUrl: {
                        type: "string",
                      },
                      retentionInDays: {
                        type: "integer",
                      },
                      enabled: {
                        type: "boolean",
                      },
                    },
                  },
                },
              },
              failedRequestsTracing: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                },
              },
              detailedErrorMessages: {
                type: "object",
                properties: {
                  enabled: {
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
  },
};

export default WebApps_GetDiagnosticLogsConfiguration;
