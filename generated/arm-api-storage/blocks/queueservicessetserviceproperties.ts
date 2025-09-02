import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const QueueServices_SetServiceProperties: AppBlock = {
  name: "Queue Services / Set Service Properties",
  description:
    "Sets the properties of a storage account’s Queue service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.",
  category: "Queue Services",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        queueServiceName: {
          name: "Queue Service Name",
          description: "Name of the queue service",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description:
            "The properties of a storage account’s Queue service, only properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules can be specified.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/queueServices/${input.event.inputConfig.queueServiceName}` +
          "?api-version=2025-01-01";

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
              cors: {
                type: "object",
                properties: {
                  corsRules: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        allowedOrigins: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        allowedMethods: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        maxAgeInSeconds: {
                          type: "integer",
                        },
                        exposedHeaders: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        allowedHeaders: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                      required: [
                        "allowedOrigins",
                        "allowedMethods",
                        "maxAgeInSeconds",
                        "exposedHeaders",
                        "allowedHeaders",
                      ],
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

export default QueueServices_SetServiceProperties;
