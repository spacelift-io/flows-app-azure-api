import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_GetProcessSlot: AppBlock = {
  name: "Web Apps / Get Process Slot",
  description:
    "Description for Get process information by its ID for a specific scaled-out instance in a web site.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/processes/${input.event.inputConfig.processId}` +
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
              identifier: {
                type: "integer",
              },
              deployment_name: {
                type: "string",
              },
              href: {
                type: "string",
              },
              minidump: {
                type: "string",
              },
              is_profile_running: {
                type: "boolean",
              },
              is_iis_profile_running: {
                type: "boolean",
              },
              iis_profile_timeout_in_seconds: {
                type: "number",
              },
              parent: {
                type: "string",
              },
              children: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              threads: {
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
              open_file_handles: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              modules: {
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
              file_name: {
                type: "string",
              },
              command_line: {
                type: "string",
              },
              user_name: {
                type: "string",
              },
              handle_count: {
                type: "integer",
              },
              module_count: {
                type: "integer",
              },
              thread_count: {
                type: "integer",
              },
              start_time: {
                type: "string",
              },
              total_cpu_time: {
                type: "string",
              },
              user_cpu_time: {
                type: "string",
              },
              privileged_cpu_time: {
                type: "string",
              },
              working_set: {
                type: "integer",
              },
              peak_working_set: {
                type: "integer",
              },
              private_memory: {
                type: "integer",
              },
              virtual_memory: {
                type: "integer",
              },
              peak_virtual_memory: {
                type: "integer",
              },
              paged_system_memory: {
                type: "integer",
              },
              non_paged_system_memory: {
                type: "integer",
              },
              paged_memory: {
                type: "integer",
              },
              peak_paged_memory: {
                type: "integer",
              },
              time_stamp: {
                type: "string",
              },
              environment_variables: {
                type: "object",
                additionalProperties: true,
              },
              is_scm_site: {
                type: "boolean",
              },
              is_webjob: {
                type: "boolean",
              },
              description: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_GetProcessSlot;
