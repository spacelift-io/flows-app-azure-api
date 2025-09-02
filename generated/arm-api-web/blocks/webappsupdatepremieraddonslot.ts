import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_UpdatePremierAddOnSlot: AppBlock = {
  name: "Web Apps / Update Premier Add On Slot",
  description: "Description for Updates a named add-on of an app.",
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
        premierAddOnName: {
          name: "Premier Add On Name",
          description: "Name of the premier add on",
          type: "string",
          required: true,
        },
        premierAddOn: {
          name: "Premier Add On",
          description: "A JSON representation of the edited premier add-on.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  sku: {
                    type: "string",
                  },
                  product: {
                    type: "string",
                  },
                  vendor: {
                    type: "string",
                  },
                  marketplacePublisher: {
                    type: "string",
                  },
                  marketplaceOffer: {
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
        const requestBody = input.event.inputConfig.premierAddOn;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/premieraddons/${input.event.inputConfig.premierAddOnName}` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
              sku: {
                type: "string",
              },
              product: {
                type: "string",
              },
              vendor: {
                type: "string",
              },
              marketplacePublisher: {
                type: "string",
              },
              marketplaceOffer: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_UpdatePremierAddOnSlot;
