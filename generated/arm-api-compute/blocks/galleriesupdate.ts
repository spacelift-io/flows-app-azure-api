import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Galleries_Update: AppBlock = {
  name: "Galleries / Update",
  description: "Update a Shared Image Gallery.",
  category: "Galleries",
  inputs: {
    default: {
      config: {
        galleryName: {
          name: "Gallery Name",
          description: "Name of the gallery",
          type: "string",
          required: true,
        },
        gallery: {
          name: "Gallery",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  identifier: {
                    type: "object",
                    properties: {
                      uniqueName: {
                        type: "string",
                      },
                    },
                  },
                  provisioningState: {
                    type: "string",
                  },
                  sharingProfile: {
                    type: "object",
                    properties: {
                      permissions: {
                        type: "string",
                      },
                      groups: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            type: {
                              type: "string",
                            },
                            ids: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                      communityGalleryInfo: {
                        type: "object",
                        properties: {
                          publisherUri: {
                            type: "string",
                          },
                          publisherContact: {
                            type: "string",
                          },
                          eula: {
                            type: "string",
                          },
                          publicNamePrefix: {
                            type: "string",
                          },
                          communityGalleryEnabled: {
                            type: "boolean",
                          },
                          publicNames: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  softDeletePolicy: {
                    type: "object",
                    properties: {
                      isSoftDeleteEnabled: {
                        type: "boolean",
                      },
                    },
                  },
                  sharingStatus: {
                    type: "object",
                    properties: {
                      aggregatedState: {
                        type: "string",
                      },
                      summary: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            region: {
                              type: "string",
                            },
                            state: {
                              type: "string",
                            },
                            details: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              identity: {
                type: "object",
                properties: {
                  principalId: {
                    type: "string",
                  },
                  tenantId: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                  userAssignedIdentities: {
                    type: "object",
                    additionalProperties: true,
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
        const requestBody = input.event.inputConfig.gallery;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/galleries/${input.event.inputConfig.galleryName}` +
          "?api-version=2024-03-03";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
              description: {
                type: "string",
              },
              identifier: {
                type: "object",
                properties: {
                  uniqueName: {
                    type: "string",
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
              sharingProfile: {
                type: "object",
                properties: {
                  permissions: {
                    type: "string",
                  },
                  groups: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        type: {
                          type: "string",
                        },
                        ids: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                  communityGalleryInfo: {
                    type: "object",
                    properties: {
                      publisherUri: {
                        type: "string",
                      },
                      publisherContact: {
                        type: "string",
                      },
                      eula: {
                        type: "string",
                      },
                      publicNamePrefix: {
                        type: "string",
                      },
                      communityGalleryEnabled: {
                        type: "boolean",
                      },
                      publicNames: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              softDeletePolicy: {
                type: "object",
                properties: {
                  isSoftDeleteEnabled: {
                    type: "boolean",
                  },
                },
              },
              sharingStatus: {
                type: "object",
                properties: {
                  aggregatedState: {
                    type: "string",
                  },
                  summary: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        region: {
                          type: "string",
                        },
                        state: {
                          type: "string",
                        },
                        details: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          identity: {
            type: "object",
            properties: {
              principalId: {
                type: "string",
              },
              tenantId: {
                type: "string",
              },
              type: {
                type: "string",
              },
              userAssignedIdentities: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
        },
      },
    },
  },
};

export default Galleries_Update;
