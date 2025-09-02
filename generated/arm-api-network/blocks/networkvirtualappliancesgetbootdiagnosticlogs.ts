import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkVirtualAppliances_GetBootDiagnosticLogs: AppBlock = {
  name: "Network Virtual Appliances / Get Boot Diagnostic Logs",
  description:
    "Retrieves the boot diagnostic logs for a VM instance belonging to the specified Network Virtual Appliance.",
  category: "Network Virtual Appliances",
  inputs: {
    default: {
      config: {
        networkVirtualApplianceName: {
          name: "Network Virtual Appliance Name",
          description: "Name of the network virtual appliance",
          type: "string",
          required: true,
        },
        request: {
          name: "Request",
          type: {
            type: "object",
            properties: {
              instanceId: {
                type: "number",
              },
              serialConsoleStorageSasUrl: {
                type: "string",
              },
              consoleScreenshotStorageSasUrl: {
                type: "string",
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
        const requestBody = input.event.inputConfig.request;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/${input.event.inputConfig.networkVirtualApplianceName}/getBootDiagnosticLogs` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          instanceId: {
            type: "integer",
          },
        },
      },
    },
  },
};

export default NetworkVirtualAppliances_GetBootDiagnosticLogs;
