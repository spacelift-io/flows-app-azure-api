import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DdosCustomPolicies_UpdateTags: AppBlock = {
  name: "Ddos Custom Policies / Update Tags",
  description: "Update a DDoS custom policy tags.",
  category: "Ddos Custom Policies",
  inputs: {
    default: {
      config: {
        ddosCustomPolicyName: {
          name: "Ddos Custom Policy Name",
          description: "Name of the ddos custom policy",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/ddosCustomPolicies/${input.event.inputConfig.ddosCustomPolicyName}` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
              resourceGuid: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
            },
          },
          etag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default DdosCustomPolicies_UpdateTags;
