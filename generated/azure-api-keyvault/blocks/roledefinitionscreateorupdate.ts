import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RoleDefinitions_CreateOrUpdate: AppBlock = {
  name: "Role Definitions / Create Or Update",
  description: "Creates or updates a custom role definition.",
  category: "Role Definitions",
  inputs: {
    default: {
      config: {
        scope: {
          name: "Scope",
          type: "string",
          required: true,
        },
        roleDefinitionName: {
          name: "Role Definition Name",
          description: "Name of the role definition",
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
                  roleName: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                  permissions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        actions: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        notActions: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        dataActions: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        notDataActions: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                  },
                  assignableScopes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
            },
            required: ["properties"],
          },
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.scope}/providers/Microsoft.Authorization/roleDefinitions/${input.event.inputConfig.roleDefinitionName}`;

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

export default RoleDefinitions_CreateOrUpdate;
