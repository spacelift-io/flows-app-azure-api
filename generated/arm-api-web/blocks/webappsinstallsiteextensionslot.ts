import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_InstallSiteExtensionSlot: AppBlock = {
  name: "Web Apps / Install Site Extension Slot",
  description:
    "Description for Install site extension on a web site, or a deployment slot.",
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
        siteExtensionId: {
          name: "Site Extension ID",
          description: "Unique identifier",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/siteextensions/${input.event.inputConfig.siteExtensionId}` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
              extension_id: {
                type: "string",
              },
              title: {
                type: "string",
              },
              extension_type: {
                type: "string",
              },
              summary: {
                type: "string",
              },
              description: {
                type: "string",
              },
              version: {
                type: "string",
              },
              extension_url: {
                type: "string",
              },
              project_url: {
                type: "string",
              },
              icon_url: {
                type: "string",
              },
              license_url: {
                type: "string",
              },
              feed_url: {
                type: "string",
              },
              authors: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              installer_command_line_params: {
                type: "string",
              },
              published_date_time: {
                type: "string",
              },
              download_count: {
                type: "integer",
              },
              local_is_latest_version: {
                type: "boolean",
              },
              local_path: {
                type: "string",
              },
              installed_date_time: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              comment: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_InstallSiteExtensionSlot;
