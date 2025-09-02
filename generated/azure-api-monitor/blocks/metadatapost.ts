import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Metadata_Post: AppBlock = {
  name: "Metadata / Post",
  description:
    "Retrieve the metadata information for the workspace, including its schema, functions, workspace info, categories etc.",
  category: "Metadata",
  inputs: {
    default: {
      config: {
        workspaceId: {
          name: "Workspace ID",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/workspaces/${input.event.inputConfig.workspaceId}/metadata`;

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          categories: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                displayName: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                related: {
                  type: "object",
                  properties: {
                    tables: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    functions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    resourceTypes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    queries: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    solutions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              required: ["id", "displayName"],
            },
          },
          resourceTypes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                displayName: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                labels: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                tags: {
                  type: "object",
                },
                properties: {
                  type: "object",
                },
                related: {
                  type: "object",
                  properties: {
                    tables: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    functions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    categories: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    queries: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    workspaces: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    resources: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              required: ["id", "type"],
            },
          },
          solutions: {
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
                displayName: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                tags: {
                  type: "object",
                },
                properties: {
                  type: "object",
                },
                related: {
                  type: "object",
                  properties: {
                    tables: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    functions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    categories: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    queries: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    workspaces: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                  required: ["tables"],
                },
              },
              required: ["id", "name", "related"],
            },
          },
          tables: {
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
                description: {
                  type: "string",
                },
                timespanColumn: {
                  type: "string",
                },
                labels: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                tags: {
                  type: "object",
                },
                properties: {
                  type: "object",
                },
                columns: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      type: {
                        type: "string",
                      },
                      isPreferredFacet: {
                        type: "boolean",
                      },
                      source: {
                        type: "object",
                      },
                    },
                    required: ["name", "type"],
                  },
                },
                related: {
                  type: "object",
                  properties: {
                    categories: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    solutions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    resourceTypes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    workspaces: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    functions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    queries: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              required: ["id", "name"],
            },
          },
          functions: {
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
                parameters: {
                  type: "string",
                },
                displayName: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                body: {
                  type: "string",
                },
                tags: {
                  type: "object",
                },
                properties: {
                  type: "object",
                },
                related: {
                  type: "object",
                  properties: {
                    tables: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    solutions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    resourceTypes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    categories: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    workspaces: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              required: ["id", "name", "body"],
            },
          },
          queries: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                displayName: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                body: {
                  type: "string",
                },
                labels: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                tags: {
                  type: "object",
                },
                properties: {
                  type: "object",
                },
                related: {
                  type: "object",
                  properties: {
                    categories: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    solutions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    resourceTypes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    tables: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              required: ["id", "body"],
            },
          },
          applications: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                resourceId: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                region: {
                  type: "string",
                },
                related: {
                  type: "object",
                  properties: {
                    tables: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    functions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              required: ["id", "resourceId", "name", "region"],
            },
          },
          workspaces: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                resourceId: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                region: {
                  type: "string",
                },
                related: {
                  type: "object",
                  properties: {
                    tables: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    solutions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    resourceTypes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    functions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    resources: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              required: ["id", "resourceId", "name", "region"],
            },
          },
          resources: {
            type: "array",
            items: {
              type: "object",
            },
          },
          permissions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                workspaces: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      resourceId: {
                        type: "string",
                      },
                      denyTables: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
                    required: ["resourceId"],
                  },
                },
                resources: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      resourceId: {
                        type: "string",
                      },
                      denyTables: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
                    required: ["resourceId"],
                  },
                },
                applications: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      resourceId: {
                        type: "string",
                      },
                    },
                    required: ["resourceId"],
                  },
                },
              },
              required: ["workspaces"],
            },
          },
        },
      },
    },
  },
};

export default Metadata_Post;
