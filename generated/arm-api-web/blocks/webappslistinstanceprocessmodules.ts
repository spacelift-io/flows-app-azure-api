import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_ListInstanceProcessModules: AppBlock = {
  name: "Web Apps / List Instance Process Modules",
  description:
    "Description for List module information for a process by its ID for a specific scaled-out instance in a web site.",
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
        instanceId: {
          name: "Instance ID",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
        processId: {
          name: "Process ID",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/instances/${input.event.inputConfig.instanceId}/processes/${input.event.inputConfig.processId}/modules` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    base_address: {
                      type: "string",
                    },
                    file_name: {
                      type: "string",
                    },
                    href: {
                      type: "string",
                    },
                    file_path: {
                      type: "string",
                    },
                    module_memory_size: {
                      type: "integer",
                    },
                    file_version: {
                      type: "string",
                    },
                    file_description: {
                      type: "string",
                    },
                    product: {
                      type: "string",
                    },
                    product_version: {
                      type: "string",
                    },
                    is_debug: {
                      type: "boolean",
                    },
                    language: {
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

export default WebApps_ListInstanceProcessModules;
