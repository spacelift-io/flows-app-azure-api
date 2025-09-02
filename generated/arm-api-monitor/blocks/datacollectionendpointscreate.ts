import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DataCollectionEndpoints_Create: AppBlock = {
  name: "Data Collection Endpoints / Create",
  description: "Creates or updates a data collection endpoint.",
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
        body: {
          name: "Body",
          description: "The payload",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "string",
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
            required: ["location"],
          },
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.body;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/${input.event.inputConfig.dataCollectionEndpointName}` +
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
  },
};

export default DataCollectionEndpoints_Create;
