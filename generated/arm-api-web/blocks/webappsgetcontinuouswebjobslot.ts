import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_GetContinuousWebJobSlot: AppBlock = {
  name: "Web Apps / Get Continuous Web Job Slot",
  description:
    "Description for Gets a continuous web job by its ID for an app, or a deployment slot.",
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
        webJobName: {
          name: "Web Job Name",
          description: "Name of the web job",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/continuouswebjobs/${input.event.inputConfig.webJobName}` +
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
              status: {
                type: "string",
              },
              detailed_status: {
                type: "string",
              },
              log_url: {
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
              settings: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_GetContinuousWebJobSlot;
