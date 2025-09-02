import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceEnvironments_GetAseV3NetworkingConfiguration: AppBlock = {
  name: "App Service Environments / Get Ase V3Networking Configuration",
  description:
    "Description for Get networking configuration of an App Service Environment",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.name}/configurations/networking` +
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
              windowsOutboundIpAddresses: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              linuxOutboundIpAddresses: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              externalInboundIpAddresses: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              internalInboundIpAddresses: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              allowNewPrivateEndpointConnections: {
                type: "boolean",
              },
              ftpEnabled: {
                type: "boolean",
              },
              remoteDebugEnabled: {
                type: "boolean",
              },
              inboundIpAddressOverride: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default AppServiceEnvironments_GetAseV3NetworkingConfiguration;
