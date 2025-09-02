import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PrivateLinkResources_Get: AppBlock = {
  name: "Private Link Resources / Get",
  description:
    "Gets a private link resource that need to be created for a configuration store.",
  category: "Private Link Resources",
  inputs: {
    default: {
      config: {
        configStoreName: {
          name: "Config Store Name",
          description: "Name of the config store",
          type: "string",
          required: true,
        },
        groupName: {
          name: "Group Name",
          description: "Name of the group",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/${input.event.inputConfig.configStoreName}/privateLinkResources/${input.event.inputConfig.groupName}` +
          "?api-version=2024-06-01";

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
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              groupId: {
                type: "string",
              },
              requiredMembers: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              requiredZoneNames: {
                type: "array",
                items: {
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

export default PrivateLinkResources_Get;
