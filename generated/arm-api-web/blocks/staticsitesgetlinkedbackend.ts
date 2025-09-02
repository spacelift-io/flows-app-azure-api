import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_GetLinkedBackend: AppBlock = {
  name: "Static Sites / Get Linked Backend",
  description:
    "Returns the details of a linked backend linked to a static site by name",
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
        linkedBackendName: {
          name: "Linked Backend Name",
          description: "Name of the linked backend",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/staticSites/${input.event.inputConfig.name}/linkedBackends/${input.event.inputConfig.linkedBackendName}` +
          "?api-version=2024-11-01";

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
    },
  },
};

export default StaticSites_GetLinkedBackend;
