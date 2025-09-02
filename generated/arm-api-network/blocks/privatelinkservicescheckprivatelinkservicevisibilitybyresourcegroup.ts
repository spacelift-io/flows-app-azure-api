import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PrivateLinkServices_CheckPrivateLinkServiceVisibilityByResourceGroup: AppBlock =
  {
    name: "Private Link Services / Check Private Link Service Visibility By Resource Group",
    description:
      "Checks whether the subscription is visible to private link service in the specified resource group.",
    category: "Private Link Services",
    inputs: {
      default: {
        config: {
          location: {
            name: "Location",
            type: "string",
            required: true,
          },
          parameters: {
            name: "Parameters",
            description:
              "The request body of CheckPrivateLinkService API call.",
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
            `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/locations/${input.event.inputConfig.location}/checkPrivateLinkServiceVisibility` +
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
            visible: {
              type: "boolean",
            },
          },
        },
      },
    },
  };

export default PrivateLinkServices_CheckPrivateLinkServiceVisibilityByResourceGroup;
