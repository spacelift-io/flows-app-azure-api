import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkManagerCommits_Post: AppBlock = {
  name: "Network Manager Commits / Post",
  description: "Post a Network Manager Commit.",
  category: "Network Manager Commits",
  inputs: {
    default: {
      config: {
        networkManagerName: {
          name: "Network Manager Name",
          description: "Name of the network manager",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              commitId: {
                type: "string",
              },
              targetLocations: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              configurationIds: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              commitType: {
                type: "string",
              },
            },
            required: ["targetLocations", "commitType"],
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/commit` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          commitId: {
            type: "string",
          },
          targetLocations: {
            type: "array",
            items: {
              type: "string",
            },
          },
          configurationIds: {
            type: "array",
            items: {
              type: "string",
            },
          },
          commitType: {
            type: "string",
          },
        },
        required: ["targetLocations", "commitType"],
      },
    },
  },
};

export default NetworkManagerCommits_Post;
