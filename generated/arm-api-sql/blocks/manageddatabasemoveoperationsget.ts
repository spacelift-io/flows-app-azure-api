import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedDatabaseMoveOperations_Get: AppBlock = {
  name: "Managed Database Move Operations / Get",
  description: "Gets a managed database move operation.",
  category: "Managed Database Move Operations",
  inputs: {
    default: {
      config: {
        locationName: {
          name: "Location Name",
          description: "Name of the location",
          type: "string",
          required: true,
        },
        operationId: {
          name: "Operation ID",
          description: "Unique identifier",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/locations/${input.event.inputConfig.locationName}/managedDatabaseMoveOperationResults/${input.event.inputConfig.operationId}` +
          "?api-version=2023-08-01";

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
            properties: {
              operation: {
                type: "string",
              },
              operationFriendlyName: {
                type: "string",
              },
              startTime: {
                type: "string",
              },
              state: {
                type: "string",
              },
              operationMode: {
                type: "string",
              },
              sourceManagedInstanceName: {
                type: "string",
              },
              targetManagedInstanceName: {
                type: "string",
              },
              sourceManagedInstanceId: {
                type: "string",
              },
              targetManagedInstanceId: {
                type: "string",
              },
              sourceDatabaseName: {
                type: "string",
              },
              targetDatabaseName: {
                type: "string",
              },
              isCancellable: {
                type: "boolean",
              },
              errorCode: {
                type: "integer",
              },
              errorDescription: {
                type: "string",
              },
              errorSeverity: {
                type: "integer",
              },
              isUserError: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
};

export default ManagedDatabaseMoveOperations_Get;
