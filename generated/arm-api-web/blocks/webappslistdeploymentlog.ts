import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_ListDeploymentLog: AppBlock = {
  name: "Web Apps / List Deployment Log",
  description:
    "Description for List deployment log for specific deployment for an app, or a deployment slot.",
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
        id: {
          name: "ID",
          description: "Unique identifier",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/deployments/${input.event.inputConfig.id}/log` +
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
              status: {
                type: "integer",
              },
              message: {
                type: "string",
              },
              author: {
                type: "string",
              },
              deployer: {
                type: "string",
              },
              author_email: {
                type: "string",
              },
              start_time: {
                type: "string",
              },
              end_time: {
                type: "string",
              },
              active: {
                type: "boolean",
              },
              details: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_ListDeploymentLog;
