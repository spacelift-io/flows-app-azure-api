import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeleteBastionShareableLinkByToken: AppBlock = {
  name: "Delete Bastion Shareable Link By Token",
  description:
    "Deletes the Bastion Shareable Links for all the tokens specified in the request.",
  category: "General",
  inputs: {
    default: {
      config: {
        bastionHostName: {
          name: "Bastion Host Name",
          description: "Name of the bastion host",
          type: "string",
          required: true,
        },
        bslTokenRequest: {
          name: "Bsl Token Request",
          description:
            "Post request for Delete Bastion Shareable Link By Token endpoint.",
          type: {
            type: "object",
            properties: {
              tokens: {
                type: "array",
                items: {
                  type: "string",
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
        const requestBody = input.event.inputConfig.bslTokenRequest;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/bastionHosts/${input.event.inputConfig.bastionHostName}/deleteShareableLinksByToken` +
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
        additionalProperties: true,
      },
    },
  },
};

export default DeleteBastionShareableLinkByToken;
