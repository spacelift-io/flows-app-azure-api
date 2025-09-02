import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DataCollectionRuleAssociations_Create: AppBlock = {
  name: "Data Collection Rule Associations / Create",
  description: "Creates or updates an association.",
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
        body: {
          name: "Body",
          description: "The payload",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "string",
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
                type: "string",
              },
            },
          },
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.body;

        const url =
          `https://management.azure.com/${input.event.inputConfig.resourceUri}/providers/Microsoft.Insights/dataCollectionRuleAssociations/${input.event.inputConfig.associationName}` +
          "?api-version=2023-03-11";

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

export default DataCollectionRuleAssociations_Create;
