import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetBastionShareableLink: AppBlock = {
  name: "Get Bastion Shareable Link",
  description:
    "Return the Bastion Shareable Links for all the VMs specified in the request.",
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
        bslRequest: {
          name: "Bsl Request",
          description:
            "Post request for Create/Delete/Get Bastion Shareable Link endpoints.",
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
        const requestBody = input.event.inputConfig.bslRequest;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/bastionHosts/${input.event.inputConfig.bastionHostName}/getShareableLinks` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                vm: {
                  type: "object",
                },
                bsl: {
                  type: "string",
                },
                createdAt: {
                  type: "string",
                },
                message: {
                  type: "string",
                },
              },
              required: ["vm"],
            },
          },
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default GetBastionShareableLink;
