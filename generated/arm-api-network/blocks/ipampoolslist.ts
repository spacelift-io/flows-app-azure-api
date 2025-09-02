import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const IpamPools_List: AppBlock = {
  name: "Ipam Pools / List",
  description: "Gets list of Pool resources at Network Manager level.",
  category: "Ipam Pools",
  inputs: {
    default: {
      config: {
        networkManagerName: {
          name: "Network Manager Name",
          description: "Name of the network manager",
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
        skipToken: {
          name: "Skip Token",
          description: "Optional skip token.",
          type: "string",
          required: false,
        },
        skip: {
          name: "Skip",
          description: "Optional num entries to skip.",
          type: "number",
          required: false,
        },
        top: {
          name: "Top",
          description: "Optional num entries to show.",
          type: "number",
          required: false,
        },
        sortKey: {
          name: "Sort Key",
          description: "Optional key by which to sort.",
          type: "string",
          required: false,
        },
        sortValue: {
          name: "Sort Value",
          description: "Optional sort value for pagination.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/ipamPools` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.skipToken
            ? `&skipToken=${input.event.inputConfig.skipToken}`
            : "") +
          (input.event.inputConfig.skip
            ? `&skip=${input.event.inputConfig.skip}`
            : "") +
          (input.event.inputConfig.top
            ? `&top=${input.event.inputConfig.top}`
            : "") +
          (input.event.inputConfig.sortKey
            ? `&sortKey=${input.event.inputConfig.sortKey}`
            : "") +
          (input.event.inputConfig.sortValue
            ? `&sortValue=${input.event.inputConfig.sortValue}`
            : "");

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
                    description: {
                      type: "string",
                    },
                    displayName: {
                      type: "string",
                    },
                    ipAddressType: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    parentPoolName: {
                      type: "string",
                    },
                    addressPrefixes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    provisioningState: {
                      type: "string",
                    },
                  },
                  required: ["addressPrefixes"],
                },
                etag: {
                  type: "string",
                },
              },
              required: ["properties"],
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

export default IpamPools_List;
