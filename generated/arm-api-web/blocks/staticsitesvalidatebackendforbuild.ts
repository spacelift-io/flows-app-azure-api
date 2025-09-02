import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_ValidateBackendForBuild: AppBlock = {
  name: "Static Sites / Validate Backend For Build",
  description: "Validates that a backend can be linked to a static site build",
  category: "Static Sites",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        environmentName: {
          name: "Environment Name",
          description: "Name of the environment",
          type: "string",
          required: true,
        },
        linkedBackendName: {
          name: "Linked Backend Name",
          description: "Name of the linked backend",
          type: "string",
          required: true,
        },
        staticSiteLinkedBackendEnvelope: {
          name: "Static Site Linked Backend Envelope",
          description:
            "A JSON representation of the linked backend request properties",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  backendResourceId: {
                    type: "string",
                  },
                  region: {
                    type: "string",
                  },
                  createdOn: {
                    type: "string",
                  },
                  provisioningState: {
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
        const requestBody =
          input.event.inputConfig.staticSiteLinkedBackendEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/staticSites/${input.event.inputConfig.name}/builds/${input.event.inputConfig.environmentName}/linkedBackends/${input.event.inputConfig.linkedBackendName}/validate` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
        additionalProperties: true,
      },
    },
  },
};

export default StaticSites_ValidateBackendForBuild;
