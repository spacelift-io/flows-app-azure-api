import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RoleAssignments_ListForScope: AppBlock = {
  name: "Role Assignments / List For Scope",
  description: "Gets role assignments for a scope.",
  category: "Role Assignments",
  inputs: {
    default: {
      config: {
        scope: {
          name: "Scope",
          type: "string",
          required: true,
        },
        $filter: {
          name: "Filter",
          description:
            "The filter to apply on the operation. Use $filter=atScope() to return all role assignments at or above the scope. Use $filter=principalId eq {id} to return all role assignments at, above or below the scope for the specified principal.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.scope}/providers/Microsoft.Authorization/roleAssignments` +
          (input.event.inputConfig.$filter
            ? `?$filter=${input.event.inputConfig.$filter}`
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
                id: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                properties: {
                  type: "object",
                  properties: {
                    scope: {
                      type: "string",
                    },
                    roleDefinitionId: {
                      type: "string",
                    },
                    principalId: {
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

export default RoleAssignments_ListForScope;
