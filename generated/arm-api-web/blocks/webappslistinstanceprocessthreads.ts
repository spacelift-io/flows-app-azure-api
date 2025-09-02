import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_ListInstanceProcessThreads: AppBlock = {
  name: "Web Apps / List Instance Process Threads",
  description:
    "Description for List the threads in a process by its ID for a specific scaled-out instance in a web site.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/instances/${input.event.inputConfig.instanceId}/processes/${input.event.inputConfig.processId}/threads` +
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
                    identifier: {
                      type: "integer",
                    },
                    href: {
                      type: "string",
                    },
                    process: {
                      type: "string",
                    },
                    start_address: {
                      type: "string",
                    },
                    current_priority: {
                      type: "integer",
                    },
                    priority_level: {
                      type: "string",
                    },
                    base_priority: {
                      type: "integer",
                    },
                    start_time: {
                      type: "string",
                    },
                    total_processor_time: {
                      type: "string",
                    },
                    user_processor_time: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    wait_reason: {
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

export default WebApps_ListInstanceProcessThreads;
