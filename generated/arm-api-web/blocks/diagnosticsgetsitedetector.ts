import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Diagnostics_GetSiteDetector: AppBlock = {
  name: "Diagnostics / Get Site Detector",
  description: "Description for Get Detector",
  category: "Diagnostics",
  inputs: {
    default: {
      config: {
        siteName: {
          name: "Site Name",
          description: "Name of the site",
          type: "string",
          required: true,
        },
        diagnosticCategory: {
          name: "Diagnostic Category",
          type: "string",
          required: true,
        },
        detectorName: {
          name: "Detector Name",
          description: "Name of the detector",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.siteName}/diagnostics/${input.event.inputConfig.diagnosticCategory}/detectors/${input.event.inputConfig.detectorName}` +
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
              displayName: {
                type: "string",
              },
              description: {
                type: "string",
              },
              rank: {
                type: "number",
              },
              isEnabled: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
};

export default Diagnostics_GetSiteDetector;
