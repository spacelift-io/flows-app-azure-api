import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DataCollectionRules_Delete: AppBlock = {
  name: "Data Collection Rules / Delete",
  description: "Deletes a data collection rule.",
  category: "Data Collection Rules",
  inputs: {
    default: {
      config: {
        dataCollectionRuleName: {
          name: "Data Collection Rule Name",
          description: "Name of the data collection rule",
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
        deleteAssociations: {
          name: "Delete Associations",
          description:
            "If set to 'true' then all associations of this data collection rule will also be deleted",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/${input.event.inputConfig.dataCollectionRuleName}` +
          "?api-version=2023-03-11" +
          (input.event.inputConfig.deleteAssociations
            ? `&deleteAssociations=${input.event.inputConfig.deleteAssociations}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "DELETE",
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
        additionalProperties: true,
      },
    },
  },
};

export default DataCollectionRules_Delete;
