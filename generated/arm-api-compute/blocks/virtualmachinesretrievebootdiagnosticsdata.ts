import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachines_RetrieveBootDiagnosticsData: AppBlock = {
  name: "Virtual Machines / Retrieve Boot Diagnostics Data",
  description:
    "The operation to retrieve SAS URIs for a virtual machine's boot diagnostic logs.",
  category: "Virtual Machines",
  inputs: {
    default: {
      config: {
        vmName: {
          name: "VM Name",
          description: "Name of the vm",
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
        sasUriExpirationTimeInMinutes: {
          name: "SAS Uri Expiration Time In Minutes",
          description:
            "Expiration duration in minutes for the SAS URIs with a value between 1 to 1440 minutes. **Note:** If not specified, SAS URIs will be generated with a default expiration duration of 120 minutes.",
          type: "number",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${input.event.inputConfig.vmName}/retrieveBootDiagnosticsData` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.sasUriExpirationTimeInMinutes
            ? `&sasUriExpirationTimeInMinutes=${input.event.inputConfig.sasUriExpirationTimeInMinutes}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          consoleScreenshotBlobUri: {
            type: "string",
          },
          serialConsoleLogBlobUri: {
            type: "string",
          },
        },
      },
    },
  },
};

export default VirtualMachines_RetrieveBootDiagnosticsData;
