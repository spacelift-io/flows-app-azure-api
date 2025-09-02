import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RoleDefinitions_List: AppBlock = {
  name: "Role Definitions / List",
  description:
    "Get all role definitions that are applicable at scope and above.",
  category: "Role Definitions",
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
            "The filter to apply on the operation. Use atScopeAndBelow filter to search below the given scope as well.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.scope}/providers/Microsoft.Authorization/roleDefinitions` +
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

export default RoleDefinitions_List;
