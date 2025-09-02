import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_ListTriggeredWebJobsSlot: AppBlock = {
  name: "Web Apps / List Triggered Web Jobs Slot",
  description:
    "Description for List triggered web jobs for an app, or a deployment slot.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/triggeredwebjobs` +
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
                    latest_run: {
                      type: "object",
                      properties: {
                        web_job_id: {
                          type: "string",
                        },
                        web_job_name: {
                          type: "string",
                        },
                        status: {
                          type: "string",
                        },
                        start_time: {
                          type: "string",
                        },
                        end_time: {
                          type: "string",
                        },
                        duration: {
                          type: "string",
                        },
                        output_url: {
                          type: "string",
                        },
                        error_url: {
                          type: "string",
                        },
                        url: {
                          type: "string",
                        },
                        job_name: {
                          type: "string",
                        },
                        trigger: {
                          type: "string",
                        },
                      },
                    },
                    history_url: {
                      type: "string",
                    },
                    scheduler_logs_url: {
                      type: "string",
                    },
                    run_command: {
                      type: "string",
                    },
                    url: {
                      type: "string",
                    },
                    extra_info_url: {
                      type: "string",
                    },
                    web_job_type: {
                      type: "string",
                    },
                    error: {
                      type: "string",
                    },
                    using_sdk: {
                      type: "boolean",
                    },
                    publicNetworkAccess: {
                      type: "string",
                    },
                    storageAccountRequired: {
                      type: "boolean",
                    },
                    settings: {
                      type: "object",
                      additionalProperties: true,
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

export default WebApps_ListTriggeredWebJobsSlot;
