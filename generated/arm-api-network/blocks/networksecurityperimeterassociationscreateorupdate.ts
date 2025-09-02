import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkSecurityPerimeterAssociations_CreateOrUpdate: AppBlock = {
  name: "Network Security Perimeter Associations / Create Or Update",
  description: "Creates or updates a NSP resource association.",
  category: "Network Security Perimeter Associations",
  inputs: {
    default: {
      config: {
        networkSecurityPerimeterName: {
          name: "Network Security Perimeter Name",
          description: "Name of the network security perimeter",
          type: "string",
          required: true,
        },
        associationName: {
          name: "Association Name",
          description: "Name of the association",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  provisioningState: {
                    type: "string",
                  },
                  privateLinkResource: {
                    type: "string",
                  },
                  profile: {
                    type: "string",
                  },
                  accessMode: {
                    type: "string",
                  },
                  hasProvisioningIssues: {
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/${input.event.inputConfig.networkSecurityPerimeterName}/resourceAssociations/${input.event.inputConfig.associationName}` +
          "?api-version=2024-10-01";

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
              privateLinkResource: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
              profile: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              accessMode: {
                type: "string",
              },
              hasProvisioningIssues: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default NetworkSecurityPerimeterAssociations_CreateOrUpdate;
