import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedDatabaseAdvancedThreatProtectionSettings_CreateOrUpdate: AppBlock =
  {
    name: "Managed Database Advanced Threat Protection Settings / Create Or Update",
    description:
      "Creates or updates a managed database's Advanced Threat Protection state.",
    category: "Managed Database Advanced Threat Protection Settings",
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
          advancedThreatProtectionName: {
            name: "Advanced Threat Protection Name",
            description: "Name of the advanced threat protection",
            type: "string",
            required: true,
          },
          parameters: {
            name: "Parameters",
            description:
              "The managed database Advanced Threat Protection state.",
            type: {
              type: "object",
              properties: {
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
                properties: {
                  type: "object",
                  properties: {
                    state: {
                      type: "string",
                    },
                    creationTime: {
                      type: "string",
                    },
                  },
                  required: ["state"],
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
            `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/databases/${input.event.inputConfig.databaseName}/advancedThreatProtectionSettings/${input.event.inputConfig.advancedThreatProtectionName}` +
            "?api-version=2023-08-01";

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
            properties: {
              type: "object",
              properties: {
                state: {
                  type: "string",
                },
                creationTime: {
                  type: "string",
                },
              },
              required: ["state"],
            },
          },
        },
      },
    },
  };

export default ManagedDatabaseAdvancedThreatProtectionSettings_CreateOrUpdate;
