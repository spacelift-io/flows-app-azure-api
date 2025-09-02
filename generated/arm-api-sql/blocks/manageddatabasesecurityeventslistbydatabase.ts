import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedDatabaseSecurityEvents_ListByDatabase: AppBlock = {
  name: "Managed Database Security Events / List By Database",
  description: "Gets a list of security events.",
  category: "Managed Database Security Events",
  inputs: {
    default: {
      config: {
        managedInstanceName: {
          name: "Managed Instance Name",
          description: "Name of the managed instance",
          type: "string",
          required: true,
        },
        databaseName: {
          name: "Database Name",
          description: "Name of the database",
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
        $filter: {
          name: "Filter",
          description:
            "An OData filter expression that filters elements in the collection.",
          type: "string",
          required: false,
        },
        $skip: {
          name: "Skip",
          description: "The number of elements in the collection to skip.",
          type: "number",
          required: false,
        },
        $top: {
          name: "Top",
          description: "The number of elements to return from the collection.",
          type: "number",
          required: false,
        },
        $skiptoken: {
          name: "Skiptoken",
          description:
            "An opaque token that identifies a starting point in the collection.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/databases/${input.event.inputConfig.databaseName}/securityEvents` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.$filter
            ? `&$filter=${input.event.inputConfig.$filter}`
            : "") +
          (input.event.inputConfig.$skip
            ? `&$skip=${input.event.inputConfig.$skip}`
            : "") +
          (input.event.inputConfig.$top
            ? `&$top=${input.event.inputConfig.$top}`
            : "") +
          (input.event.inputConfig.$skiptoken
            ? `&$skiptoken=${input.event.inputConfig.$skiptoken}`
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    eventTime: {
                      type: "string",
                    },
                    securityEventType: {
                      type: "string",
                    },
                    subscription: {
                      type: "string",
                    },
                    server: {
                      type: "string",
                    },
                    database: {
                      type: "string",
                    },
                    clientIp: {
                      type: "string",
                    },
                    applicationName: {
                      type: "string",
                    },
                    principalName: {
                      type: "string",
                    },
                    securityEventSqlInjectionAdditionalProperties: {
                      type: "object",
                      properties: {
                        threatId: {
                          type: "string",
                        },
                        statement: {
                          type: "string",
                        },
                        statementHighlightOffset: {
                          type: "integer",
                        },
                        statementHighlightLength: {
                          type: "integer",
                        },
                        errorCode: {
                          type: "integer",
                        },
                        errorSeverity: {
                          type: "integer",
                        },
                        errorMessage: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ManagedDatabaseSecurityEvents_ListByDatabase;
