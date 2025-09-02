import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ListGeoRegions: AppBlock = {
  name: "List Geo Regions",
  description: "Description for Get a list of available geographical regions.",
  category: "General",
  inputs: {
    default: {
      config: {
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
        sku: {
          name: "Sku",
          description: "Name of SKU used to filter the regions.",
          type: "string",
          required: false,
        },
        linuxWorkersEnabled: {
          name: "Linux Workers Enabled",
          description:
            "Specify <code>true</code> if you want to filter to only regions that support Linux workers.",
          type: "boolean",
          required: false,
        },
        xenonWorkersEnabled: {
          name: "Xenon Workers Enabled",
          description:
            "Specify <code>true</code> if you want to filter to only regions that support Xenon workers.",
          type: "boolean",
          required: false,
        },
        linuxDynamicWorkersEnabled: {
          name: "Linux Dynamic Workers Enabled",
          description:
            "Specify <code>true</code> if you want to filter to only regions that support Linux Consumption Workers.",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/geoRegions` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.sku
            ? `&sku=${input.event.inputConfig.sku}`
            : "") +
          (input.event.inputConfig.linuxWorkersEnabled
            ? `&linuxWorkersEnabled=${input.event.inputConfig.linuxWorkersEnabled}`
            : "") +
          (input.event.inputConfig.xenonWorkersEnabled
            ? `&xenonWorkersEnabled=${input.event.inputConfig.xenonWorkersEnabled}`
            : "") +
          (input.event.inputConfig.linuxDynamicWorkersEnabled
            ? `&linuxDynamicWorkersEnabled=${input.event.inputConfig.linuxDynamicWorkersEnabled}`
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
                    orgDomain: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default ListGeoRegions;
