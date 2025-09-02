import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DataCollectionRules_ListByResourceGroup: AppBlock = {
  name: "Data Collection Rules / List By Resource Group",
  description:
    "Lists all data collection rules in the specified resource group.",
  category: "Data Collection Rules",
  inputs: {
    default: {
      config: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules` +
          "?api-version=2023-03-11";

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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                },
                location: {
                  type: "string",
                },
                tags: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "string",
                },
                identity: {
                  type: "object",
                },
                id: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                etag: {
                  type: "string",
                },
                systemData: {
                  type: "object",
                },
              },
              required: ["location"],
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default DataCollectionRules_ListByResourceGroup;
