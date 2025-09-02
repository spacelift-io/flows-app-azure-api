import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_GetAppSettingKeyVaultReference: AppBlock = {
  name: "Web Apps / Get App Setting Key Vault Reference",
  description: "Description for Gets the config reference and status of an app",
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
        appSettingKey: {
          name: "App Setting Key",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/config/configreferences/appsettings/${input.event.inputConfig.appSettingKey}` +
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
              reference: {
                type: "string",
              },
              status: {
                type: "string",
              },
              vaultName: {
                type: "string",
              },
              secretName: {
                type: "string",
              },
              secretVersion: {
                type: "string",
              },
              identityType: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                  },
                  tenantId: {
                    type: "string",
                  },
                  principalId: {
                    type: "string",
                  },
                  userAssignedIdentities: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              details: {
                type: "string",
              },
              source: {
                type: "string",
              },
              activeVersion: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_GetAppSettingKeyVaultReference;
