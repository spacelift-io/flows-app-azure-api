import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RoleAssignments_Get: AppBlock = {
  name: "Role Assignments / Get",
  description: "Get the specified role assignment.",
  category: "Role Assignments",
  inputs: {
    default: {
      config: {
        scope: {
          name: "Scope",
          type: "string",
          required: true,
        },
        roleAssignmentName: {
          name: "Role Assignment Name",
          description: "Name of the role assignment",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.scope}/providers/Microsoft.Authorization/roleAssignments/${input.event.inputConfig.roleAssignmentName}`;

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
  },
};

export default RoleAssignments_Get;
