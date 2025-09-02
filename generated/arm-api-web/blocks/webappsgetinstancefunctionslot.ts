import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_GetInstanceFunctionSlot: AppBlock = {
  name: "Web Apps / Get Instance Function Slot",
  description:
    "Description for Get function information by its ID for web site, or a deployment slot.",
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
        functionName: {
          name: "Function Name",
          description: "Name of the function",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/functions/${input.event.inputConfig.functionName}` +
          "?api-version=2024-11-01";

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
              function_app_id: {
                type: "string",
              },
              script_root_path_href: {
                type: "string",
              },
              script_href: {
                type: "string",
              },
              config_href: {
                type: "string",
              },
              test_data_href: {
                type: "string",
              },
              secrets_file_href: {
                type: "string",
              },
              href: {
                type: "string",
              },
              config: {
                type: "object",
              },
              files: {
                type: "object",
                additionalProperties: true,
              },
              test_data: {
                type: "string",
              },
              invoke_url_template: {
                type: "string",
              },
              language: {
                type: "string",
              },
              isDisabled: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_GetInstanceFunctionSlot;
