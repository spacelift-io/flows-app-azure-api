import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedInstanceKeys_ListByInstance: AppBlock = {
  name: "Managed Instance Keys / List By Instance",
  description: "Gets a list of managed instance keys.",
  category: "Managed Instance Keys",
  inputs: {
    default: {
      config: {
        managedInstanceName: {
          name: "Managed Instance Name",
          description: "Name of the managed instance",
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
        $filter: {
          name: "Filter",
          description:
            "An OData filter expression that filters elements in the collection.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/keys` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.$filter
            ? `&$filter=${input.event.inputConfig.$filter}`
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
                kind: {
                  type: "string",
                },
                properties: {
                  type: "object",
                  properties: {
                    serverKeyType: {
                      type: "string",
                    },
                    uri: {
                      type: "string",
                    },
                    thumbprint: {
                      type: "string",
                    },
                    creationDate: {
                      type: "string",
                    },
                    autoRotationEnabled: {
                      type: "boolean",
                    },
                  },
                  required: ["serverKeyType"],
                },
              },
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

export default ManagedInstanceKeys_ListByInstance;
