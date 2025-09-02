import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualApplianceSites_Get: AppBlock = {
  name: "Virtual Appliance Sites / Get",
  description: "Gets the specified Virtual Appliance Site.",
  category: "Virtual Appliance Sites",
  inputs: {
    default: {
      config: {
        networkVirtualApplianceName: {
          name: "Network Virtual Appliance Name",
          description: "Name of the network virtual appliance",
          type: "string",
          required: true,
        },
        siteName: {
          name: "Site Name",
          description: "Name of the site",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/${input.event.inputConfig.networkVirtualApplianceName}/virtualApplianceSites/${input.event.inputConfig.siteName}` +
          "?api-version=2024-10-01";

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
              addressPrefix: {
                type: "string",
              },
              o365Policy: {
                type: "object",
                properties: {
                  breakOutCategories: {
                    type: "object",
                    properties: {
                      allow: {
                        type: "boolean",
                      },
                      optimize: {
                        type: "boolean",
                      },
                      default: {
                        type: "boolean",
                      },
                    },
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
            },
          },
          name: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          type: {
            type: "string",
          },
        },
      },
    },
  },
};

export default VirtualApplianceSites_Get;
