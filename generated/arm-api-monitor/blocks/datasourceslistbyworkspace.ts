import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DataSources_ListByWorkspace: AppBlock = {
  name: "Data Sources / List By Workspace",
  description:
    "Gets the first page of data source instances in a workspace with the link to the next page.",
  category: "Data Sources",
  inputs: {
    default: {
      config: {
        workspaceName: {
          name: "Workspace Name",
          description: "Name of the workspace",
          type: "string",
          required: true,
        },
        $filter: {
          name: "Filter",
          description: "The filter to apply on the operation.",
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
        $skiptoken: {
          name: "Skiptoken",
          description:
            "Starting point of the collection of data source instances.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourcegroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/${input.event.inputConfig.workspaceName}/dataSources` +
          "?api-version=2025-02-01" +
          (input.event.inputConfig.$filter
            ? `&$filter=${input.event.inputConfig.$filter}`
            : "") +
          (input.event.inputConfig.$skiptoken
            ? `&$skiptoken=${input.event.inputConfig.$skiptoken}`
            : "");

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
                  properties: {},
                },
                etag: {
                  type: "string",
                },
                kind: {
                  type: "string",
                },
                tags: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              required: ["kind", "properties"],
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

export default DataSources_ListByWorkspace;
