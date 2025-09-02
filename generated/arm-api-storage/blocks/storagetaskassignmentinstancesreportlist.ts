import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StorageTaskAssignmentInstancesReport_List: AppBlock = {
  name: "Storage Task Assignment Instances Report / List",
  description:
    "Fetch the report summary of a single storage task assignment's instances",
  category: "Storage Task Assignment Instances Report",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        storageTaskAssignmentName: {
          name: "Storage Task Assignment Name",
          description: "Name of the storage task assignment",
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
        $maxpagesize: {
          name: "Max Page Size",
          description:
            "Optional, specifies the maximum number of storage task assignment instances to be included in the list response.",
          type: "number",
          required: false,
        },
        $filter: {
          name: "Filter",
          description:
            "Optional. When specified, it can be used to query using reporting properties. See [Constructing Filter Strings](https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#constructing-filter-strings) for details.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/storageTaskAssignments/${input.event.inputConfig.storageTaskAssignmentName}/reports` +
          "?api-version=2025-01-01" +
          (input.event.inputConfig.$maxpagesize
            ? `&$maxpagesize=${input.event.inputConfig.$maxpagesize}`
            : "") +
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
                properties: {
                  type: "object",
                  properties: {
                    taskAssignmentId: {
                      type: "string",
                    },
                    storageAccountId: {
                      type: "string",
                    },
                    startTime: {
                      type: "string",
                    },
                    finishTime: {
                      type: "string",
                    },
                    objectsTargetedCount: {
                      type: "string",
                    },
                    objectsOperatedOnCount: {
                      type: "string",
                    },
                    objectFailedCount: {
                      type: "string",
                    },
                    objectsSucceededCount: {
                      type: "string",
                    },
                    runStatusError: {
                      type: "string",
                    },
                    runStatusEnum: {
                      type: "string",
                    },
                    summaryReportPath: {
                      type: "string",
                    },
                    taskId: {
                      type: "string",
                    },
                    taskVersion: {
                      type: "string",
                    },
                    runResult: {
                      type: "string",
                    },
                  },
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

export default StorageTaskAssignmentInstancesReport_List;
