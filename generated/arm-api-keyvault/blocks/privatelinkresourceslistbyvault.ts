import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PrivateLinkResources_ListByVault: AppBlock = {
  name: "Private Link Resources / List By Vault",
  description: "Gets the private link resources supported for the key vault.",
  category: "Private Link Resources",
  inputs: {
    default: {
      config: {
        vaultName: {
          name: "Vault Name",
          description: "Name of the vault",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.KeyVault/vaults/${input.event.inputConfig.vaultName}/privateLinkResources` +
          "?api-version=2023-07-01";

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
      },
    },
  },
};

export default PrivateLinkResources_ListByVault;
