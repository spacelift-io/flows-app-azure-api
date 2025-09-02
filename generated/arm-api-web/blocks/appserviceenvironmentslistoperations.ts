import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceEnvironments_ListOperations: AppBlock = {
  name: "App Service Environments / List Operations",
  description:
    "Description for List all currently running operations on the App Service Environment.",
  category: "App Service Environments",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.name}/operations` +
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
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            status: {
              type: "string",
            },
            errors: {
              type: "array",
              items: {
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
                      additionalProperties: true,
                    },
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
            createdTime: {
              type: "string",
            },
            modifiedTime: {
              type: "string",
            },
            expirationTime: {
              type: "string",
            },
            geoMasterOperationId: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

export default AppServiceEnvironments_ListOperations;
