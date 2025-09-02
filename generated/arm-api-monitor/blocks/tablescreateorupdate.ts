import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Tables_CreateOrUpdate: AppBlock = {
  name: "Tables / Create Or Update",
  description: "Update or Create a Log Analytics workspace table.",
  category: "Tables",
  inputs: {
    default: {
      config: {
        workspaceName: {
          name: "Workspace Name",
          description: "Name of the workspace",
          type: "string",
          required: true,
        },
        tableName: {
          name: "Table Name",
          description: "Name of the table",
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
                  retentionInDays: {
                    type: "number",
                  },
                  totalRetentionInDays: {
                    type: "number",
                  },
                  archiveRetentionInDays: {
                    type: "number",
                  },
                  searchResults: {
                    type: "object",
                    properties: {
                      query: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      limit: {
                        type: "number",
                      },
                      startSearchTime: {
                        type: "string",
                      },
                      endSearchTime: {
                        type: "string",
                      },
                      sourceTable: {
                        type: "string",
                      },
                      azureAsyncOperationId: {
                        type: "string",
                      },
                    },
                  },
                  restoredLogs: {
                    type: "object",
                    properties: {
                      startRestoreTime: {
                        type: "string",
                      },
                      endRestoreTime: {
                        type: "string",
                      },
                      sourceTable: {
                        type: "string",
                      },
                      azureAsyncOperationId: {
                        type: "string",
                      },
                    },
                  },
                  resultStatistics: {
                    type: "object",
                    properties: {
                      progress: {
                        type: "number",
                      },
                      ingestedRecords: {
                        type: "number",
                      },
                      scannedGb: {
                        type: "number",
                      },
                    },
                  },
                  plan: {
                    type: "string",
                  },
                  lastPlanModifiedDate: {
                    type: "string",
                  },
                  schema: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      displayName: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      columns: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            type: {
                              type: "string",
                            },
                            dataTypeHint: {
                              type: "string",
                            },
                            displayName: {
                              type: "string",
                            },
                            description: {
                              type: "string",
                            },
                            isDefaultDisplay: {
                              type: "boolean",
                            },
                            isHidden: {
                              type: "boolean",
                            },
                          },
                        },
                      },
                      standardColumns: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                      categories: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      labels: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      source: {
                        type: "string",
                      },
                      tableType: {
                        type: "string",
                      },
                      tableSubType: {
                        type: "string",
                      },
                      solutions: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
                  },
                  provisioningState: {
                    type: "string",
                  },
                  retentionInDaysAsDefault: {
                    type: "boolean",
                  },
                  totalRetentionInDaysAsDefault: {
                    type: "boolean",
                  },
                },
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/${input.event.inputConfig.workspaceName}/tables/${input.event.inputConfig.tableName}` +
          "?api-version=2025-02-01";

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
              retentionInDays: {
                type: "integer",
              },
              totalRetentionInDays: {
                type: "integer",
              },
              archiveRetentionInDays: {
                type: "integer",
              },
              searchResults: {
                type: "object",
                properties: {
                  query: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  limit: {
                    type: "integer",
                  },
                  startSearchTime: {
                    type: "string",
                  },
                  endSearchTime: {
                    type: "string",
                  },
                  sourceTable: {
                    type: "string",
                  },
                  azureAsyncOperationId: {
                    type: "string",
                  },
                },
              },
              restoredLogs: {
                type: "object",
                properties: {
                  startRestoreTime: {
                    type: "string",
                  },
                  endRestoreTime: {
                    type: "string",
                  },
                  sourceTable: {
                    type: "string",
                  },
                  azureAsyncOperationId: {
                    type: "string",
                  },
                },
              },
              resultStatistics: {
                type: "object",
                properties: {
                  progress: {
                    type: "number",
                  },
                  ingestedRecords: {
                    type: "integer",
                  },
                  scannedGb: {
                    type: "number",
                  },
                },
              },
              plan: {
                type: "string",
              },
              lastPlanModifiedDate: {
                type: "string",
              },
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  displayName: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  columns: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        type: {
                          type: "string",
                        },
                        dataTypeHint: {
                          type: "string",
                        },
                        displayName: {
                          type: "string",
                        },
                        description: {
                          type: "string",
                        },
                        isDefaultDisplay: {
                          type: "boolean",
                        },
                        isHidden: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                  standardColumns: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  categories: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  labels: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  source: {
                    type: "string",
                  },
                  tableType: {
                    type: "string",
                  },
                  tableSubType: {
                    type: "string",
                  },
                  solutions: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
              retentionInDaysAsDefault: {
                type: "boolean",
              },
              totalRetentionInDaysAsDefault: {
                type: "boolean",
              },
            },
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

export default Tables_CreateOrUpdate;
