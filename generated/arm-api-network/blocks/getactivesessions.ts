import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetActiveSessions: AppBlock = {
  name: "Get Active Sessions",
  description: "Returns the list of currently active sessions on the Bastion.",
  category: "General",
  inputs: {
    default: {
      config: {
        bastionHostName: {
          name: "Bastion Host Name",
          description: "Name of the bastion host",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/bastionHosts/${input.event.inputConfig.bastionHostName}/getActiveSessions` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
                sessionId: {
                  type: "string",
                },
                startTime: {
                  type: "object",
                },
                targetSubscriptionId: {
                  type: "string",
                },
                resourceType: {
                  type: "string",
                },
                targetHostName: {
                  type: "string",
                },
                targetResourceGroup: {
                  type: "string",
                },
                userName: {
                  type: "string",
                },
                targetIpAddress: {
                  type: "string",
                },
                protocol: {
                  type: "string",
                },
                targetResourceId: {
                  type: "string",
                },
                sessionDurationInMins: {
                  type: "number",
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

export default GetActiveSessions;
