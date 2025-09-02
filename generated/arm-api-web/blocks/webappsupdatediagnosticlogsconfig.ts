import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_UpdateDiagnosticLogsConfig: AppBlock = {
  name: "Web Apps / Update Diagnostic Logs Config",
  description: "Description for Updates the logging configuration of an app.",
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
        siteLogsConfig: {
          name: "Site Logs Config",
          description:
            'A SiteLogsConfig JSON object that contains the logging configuration to change in the "properties" property.',
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
                            type: "number",
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
                            type: "number",
                          },
                          retentionInDays: {
                            type: "number",
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
                            type: "number",
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
        const requestBody = input.event.inputConfig.siteLogsConfig;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/config/logs` +
          "?api-version=2024-11-01";

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

export default WebApps_UpdateDiagnosticLogsConfig;
