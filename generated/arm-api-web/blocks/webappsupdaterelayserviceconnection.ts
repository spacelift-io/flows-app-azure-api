import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_UpdateRelayServiceConnection: AppBlock = {
  name: "Web Apps / Update Relay Service Connection",
  description:
    "Description for Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH).",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        entityName: {
          name: "Entity Name",
          description: "Name of the entity",
          type: "string",
          required: true,
        },
        connectionEnvelope: {
          name: "Connection Envelope",
          description: "Details of the hybrid connection configuration.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  entityName: {
                    type: "string",
                  },
                  entityConnectionString: {
                    type: "string",
                  },
                  resourceType: {
                    type: "string",
                  },
                  resourceConnectionString: {
                    type: "string",
                  },
                  hostname: {
                    type: "string",
                  },
                  port: {
                    type: "number",
                  },
                  biztalkUri: {
                    type: "string",
                  },
                },
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
        const requestBody = input.event.inputConfig.connectionEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/hybridconnection/${input.event.inputConfig.entityName}` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
            properties: {
              entityName: {
                type: "string",
              },
              entityConnectionString: {
                type: "string",
              },
              resourceType: {
                type: "string",
              },
              resourceConnectionString: {
                type: "string",
              },
              hostname: {
                type: "string",
              },
              port: {
                type: "integer",
              },
              biztalkUri: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_UpdateRelayServiceConnection;
