import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CloudServices_GetInstanceView: AppBlock = {
  name: "Cloud Services / Get Instance View",
  description: "Gets the status of a cloud service.",
  category: "Cloud Services",
  inputs: {
    default: {
      config: {
        cloudServiceName: {
          name: "Cloud Service Name",
          description: "Name of the cloud service",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/cloudServices/${input.event.inputConfig.cloudServiceName}/instanceView` +
          "?api-version=2024-11-04";

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
          roleInstance: {
            type: "object",
            properties: {
              statusesSummary: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                    },
                    count: {
                      type: "integer",
                    },
                  },
                },
              },
            },
          },
          sdkVersion: {
            type: "string",
          },
          privateIds: {
            type: "array",
            items: {
              type: "string",
            },
          },
          statuses: {
            type: "array",
            items: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                },
                displayStatus: {
                  type: "string",
                },
                message: {
                  type: "string",
                },
                time: {
                  type: "string",
                },
                level: {
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

export default CloudServices_GetInstanceView;
