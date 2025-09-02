import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RoleAssignments_Create: AppBlock = {
  name: "Role Assignments / Create",
  description: "Creates a role assignment.",
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
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  roleDefinitionId: {
                    type: "string",
                  },
                  principalId: {
                    type: "string",
                  },
                },
                required: ["roleDefinitionId", "principalId"],
              },
            },
            required: ["properties"],
          },
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.scope}/providers/Microsoft.Authorization/roleAssignments/${input.event.inputConfig.roleAssignmentName}`;

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
        additionalProperties: true,
      },
    },
  },
};

export default RoleAssignments_Create;
