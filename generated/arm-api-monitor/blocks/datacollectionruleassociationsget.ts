import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DataCollectionRuleAssociations_Get: AppBlock = {
  name: "Data Collection Rule Associations / Get",
  description: "Returns the specified association.",
  category: "Data Collection Rule Associations",
  inputs: {
    default: {
      config: {
        resourceUri: {
          name: "Resource Uri",
          type: "string",
          required: true,
        },
        associationName: {
          name: "Association Name",
          description: "Name of the association",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/${input.event.inputConfig.resourceUri}/providers/Microsoft.Insights/dataCollectionRuleAssociations/${input.event.inputConfig.associationName}` +
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
          properties: {
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
      },
    },
  },
};

export default DataCollectionRuleAssociations_Get;
