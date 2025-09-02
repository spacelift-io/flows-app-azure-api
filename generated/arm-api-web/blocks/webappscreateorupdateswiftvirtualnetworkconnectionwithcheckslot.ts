import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_CreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlot: AppBlock =
  {
    name: "Web Apps / Create Or Update Swift Virtual Network Connection With Check Slot",
    description:
      'Description for Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not in use by another App Service Plan other than the one this App is in.',
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
          connectionEnvelope: {
            name: "Connection Envelope",
            description:
              "Properties of the Virtual Network connection. See example.",
            type: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    subnetResourceId: {
                      type: "string",
                    },
                    swiftSupported: {
                      type: "boolean",
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
          const requestBody = input.event.inputConfig.connectionEnvelope;

          const url =
            `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/networkConfig/virtualNetwork` +
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
                subnetResourceId: {
                  type: "string",
                },
                swiftSupported: {
                  type: "boolean",
                },
              },
            },
          },
        },
      },
    },
  };

export default WebApps_CreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlot;
