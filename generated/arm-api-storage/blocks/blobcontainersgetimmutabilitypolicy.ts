import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const BlobContainers_GetImmutabilityPolicy: AppBlock = {
  name: "Blob Containers / Get Immutability Policy",
  description:
    "Gets the existing immutability policy along with the corresponding ETag in response headers and body.",
  category: "Blob Containers",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        containerName: {
          name: "Container Name",
          description: "Name of the container",
          type: "string",
          required: true,
        },
        immutabilityPolicyName: {
          name: "Immutability Policy Name",
          description: "Name of the immutability policy",
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
        If_Match: {
          name: "If Match",
          description:
            "The entity state (ETag) version of the immutability policy to update must be returned to the server for all update operations. The ETag value must include the leading and trailing double quotes as returned by the service.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.If_Match) {
          additionalHeaders["If-Match"] = String(
            input.event.inputConfig.If_Match,
          );
        }

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/blobServices/default/containers/${input.event.inputConfig.containerName}/immutabilityPolicies/${input.event.inputConfig.immutabilityPolicyName}` +
          "?api-version=2025-01-01";

        const result = await makeAzureRequest(
          input,
          url,
          "GET",
          undefined,
          additionalHeaders,
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
              immutabilityPeriodSinceCreationInDays: {
                type: "integer",
              },
              state: {
                type: "string",
              },
              allowProtectedAppendWrites: {
                type: "boolean",
              },
              allowProtectedAppendWritesAll: {
                type: "boolean",
              },
            },
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default BlobContainers_GetImmutabilityPolicy;
