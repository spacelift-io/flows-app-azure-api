import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkSecurityPerimeterLinks_Get: AppBlock = {
  name: "Network Security Perimeter Links / Get",
  description: "Gets the specified NSP link resource.",
  category: "Network Security Perimeter Links",
  inputs: {
    default: {
      config: {
        networkSecurityPerimeterName: {
          name: "Network Security Perimeter Name",
          description: "Name of the network security perimeter",
          type: "string",
          required: true,
        },
        linkName: {
          name: "Link Name",
          description: "Name of the link",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/${input.event.inputConfig.networkSecurityPerimeterName}/links/${input.event.inputConfig.linkName}` +
          "?api-version=2024-10-01";

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
              provisioningState: {
                type: "string",
              },
              autoApprovedRemotePerimeterResourceId: {
                type: "string",
              },
              remotePerimeterGuid: {
                type: "string",
              },
              remotePerimeterLocation: {
                type: "string",
              },
              localInboundProfiles: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              localOutboundProfiles: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              remoteInboundProfiles: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              remoteOutboundProfiles: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              description: {
                type: "string",
              },
              status: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default NetworkSecurityPerimeterLinks_Get;
