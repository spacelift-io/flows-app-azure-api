import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedInstanceKeys_CreateOrUpdate: AppBlock = {
  name: "Managed Instance Keys / Create Or Update",
  description: "Creates or updates a managed instance key.",
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
        keyName: {
          name: "Key Name",
          description: "Name of the key",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "The requested managed instance key resource state.",
          type: {
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/keys/${input.event.inputConfig.keyName}` +
          "?api-version=2023-08-01";

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
  },
};

export default ManagedInstanceKeys_CreateOrUpdate;
