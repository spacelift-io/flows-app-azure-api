import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_CreateDeploymentSlot: AppBlock = {
  name: "Web Apps / Create Deployment Slot",
  description:
    "Description for Create a deployment for an app, or a deployment slot.",
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
        slot: {
          name: "Slot",
          type: "string",
          required: true,
        },
        id: {
          name: "ID",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
        deployment: {
          name: "Deployment",
          description: "Deployment details.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  status: {
                    type: "number",
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
        const requestBody = input.event.inputConfig.deployment;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/deployments/${input.event.inputConfig.id}` +
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

export default WebApps_CreateDeploymentSlot;
