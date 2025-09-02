import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceEnvironments_UpdateAseCustomDnsSuffixConfiguration: AppBlock = {
  name: "App Service Environments / Update Ase Custom Dns Suffix Configuration",
  description:
    "Update Custom Dns Suffix configuration of an App Service Environment",
  category: "App Service Environments",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        customDnsSuffixConfiguration: {
          name: "Custom DNS Suffix Configuration",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  provisioningState: {
                    type: "string",
                  },
                  provisioningDetails: {
                    type: "string",
                  },
                  dnsSuffix: {
                    type: "string",
                  },
                  certificateUrl: {
                    type: "string",
                  },
                  keyVaultReferenceIdentity: {
                    type: "string",
                  },
                },
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
        const requestBody =
          input.event.inputConfig.customDnsSuffixConfiguration;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.name}/configurations/customdnssuffix` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
          properties: {
            type: "object",
            properties: {
              provisioningState: {
                type: "string",
              },
              provisioningDetails: {
                type: "string",
              },
              dnsSuffix: {
                type: "string",
              },
              certificateUrl: {
                type: "string",
              },
              keyVaultReferenceIdentity: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default AppServiceEnvironments_UpdateAseCustomDnsSuffixConfiguration;
