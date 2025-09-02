import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const TrustedAccessRoleBindings_CreateOrUpdate: AppBlock = {
  name: "Trusted Access Role Bindings / Create Or Update",
  description: "Create or update a trusted access role binding",
  category: "Trusted Access Role Bindings",
  inputs: {
    default: {
      config: {
        resourceName: {
          name: "Resource Name",
          description: "Name of the resource",
          type: "string",
          required: true,
        },
        trustedAccessRoleBindingName: {
          name: "Trusted Access Role Binding Name",
          description: "Name of the trusted access role binding",
          type: "string",
          required: true,
        },
        trustedAccessRoleBinding: {
          name: "Trusted Access Role Binding",
          description: "A trusted access role binding",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  provisioningState: {
                    type: "string",
                  },
                  sourceResourceId: {
                    type: "string",
                  },
                  roles: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["sourceResourceId", "roles"],
              },
            },
            required: ["properties"],
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
        const requestBody = input.event.inputConfig.trustedAccessRoleBinding;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/${input.event.inputConfig.resourceName}/trustedAccessRoleBindings/${input.event.inputConfig.trustedAccessRoleBindingName}` +
          "?api-version=2025-07-01";

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
              provisioningState: {
                type: "string",
              },
              sourceResourceId: {
                type: "string",
              },
              roles: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: ["sourceResourceId", "roles"],
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default TrustedAccessRoleBindings_CreateOrUpdate;
