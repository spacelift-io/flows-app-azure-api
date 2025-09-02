import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DataCollectionEndpoints_Delete: AppBlock = {
  name: "Data Collection Endpoints / Delete",
  description: "Deletes a data collection endpoint.",
  category: "Data Collection Endpoints",
  inputs: {
    default: {
      config: {
        dataCollectionEndpointName: {
          name: "Data Collection Endpoint Name",
          description: "Name of the data collection endpoint",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/${input.event.inputConfig.dataCollectionEndpointName}` +
          "?api-version=2023-03-11";

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

export default DataCollectionEndpoints_Delete;
