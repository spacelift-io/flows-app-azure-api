import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const JobPrivateEndpoints_CreateOrUpdate: AppBlock = {
  name: "Job Private Endpoints / Create Or Update",
  description: "Creates or updates a private endpoint.",
  category: "Job Private Endpoints",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        jobAgentName: {
          name: "Job Agent Name",
          description: "Name of the job agent",
          type: "string",
          required: true,
        },
        privateEndpointName: {
          name: "Private Endpoint Name",
          description: "Name of the private endpoint",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "The requested private endpoint state.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  targetServerAzureResourceId: {
                    type: "string",
                  },
                  privateEndpointId: {
                    type: "string",
                  },
                },
                required: ["targetServerAzureResourceId"],
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/jobAgents/${input.event.inputConfig.jobAgentName}/privateEndpoints/${input.event.inputConfig.privateEndpointName}` +
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
          properties: {
            type: "object",
            properties: {
              targetServerAzureResourceId: {
                type: "string",
              },
              privateEndpointId: {
                type: "string",
              },
            },
            required: ["targetServerAzureResourceId"],
          },
        },
      },
    },
  },
};

export default JobPrivateEndpoints_CreateOrUpdate;
