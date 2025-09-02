import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DiskAccesses_GetPrivateLinkResources: AppBlock = {
  name: "Disk Accesses / Get Private Link Resources",
  description:
    "Gets the private link resources possible under disk access resource",
  category: "Disk Accesses",
  inputs: {
    default: {
      config: {
        diskAccessName: {
          name: "Disk Access Name",
          description: "Name of the disk access",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/diskAccesses/${input.event.inputConfig.diskAccessName}/privatelinkresources` +
          "?api-version=2025-01-02";

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
                id: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                type: {
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

export default DiskAccesses_GetPrivateLinkResources;
