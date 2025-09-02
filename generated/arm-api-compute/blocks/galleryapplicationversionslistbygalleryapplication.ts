import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GalleryApplicationVersions_ListByGalleryApplication: AppBlock = {
  name: "Gallery Application Versions / List By Gallery Application",
  description:
    "List gallery Application Versions in a gallery Application Definition.",
  category: "Gallery Application Versions",
  inputs: {
    default: {
      config: {
        galleryName: {
          name: "Gallery Name",
          description: "Name of the gallery",
          type: "string",
          required: true,
        },
        galleryApplicationName: {
          name: "Gallery Application Name",
          description: "Name of the gallery application",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/galleries/${input.event.inputConfig.galleryName}/applications/${input.event.inputConfig.galleryApplicationName}/versions` +
          "?api-version=2024-03-03";

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
                properties: {
                  type: "object",
                  properties: {
                    publishingProfile: {
                      type: "object",
                      properties: {
                        source: {
                          type: "object",
                          properties: {
                            mediaLink: {
                              type: "string",
                            },
                            defaultConfigurationLink: {
                              type: "string",
                            },
                          },
                          required: ["mediaLink"],
                        },
                        manageActions: {
                          type: "object",
                          properties: {
                            install: {
                              type: "string",
                            },
                            remove: {
                              type: "string",
                            },
                            update: {
                              type: "string",
                            },
                          },
                          required: ["install", "remove"],
                        },
                        settings: {
                          type: "object",
                          properties: {
                            packageFileName: {
                              type: "string",
                            },
                            configFileName: {
                              type: "string",
                            },
                            scriptBehaviorAfterReboot: {
                              type: "string",
                            },
                          },
                        },
                        advancedSettings: {
                          type: "object",
                          additionalProperties: true,
                        },
                        enableHealthCheck: {
                          type: "boolean",
                        },
                        customActions: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                              },
                              script: {
                                type: "string",
                              },
                              description: {
                                type: "string",
                              },
                              parameters: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    name: {
                                      type: "string",
                                    },
                                    required: {
                                      type: "boolean",
                                    },
                                    type: {
                                      type: "string",
                                    },
                                    defaultValue: {
                                      type: "string",
                                    },
                                    description: {
                                      type: "string",
                                    },
                                  },
                                  required: ["name"],
                                },
                              },
                            },
                            required: ["name", "script"],
                          },
                        },
                      },
                      required: ["source"],
                    },
                    safetyProfile: {
                      type: "object",
                    },
                    provisioningState: {
                      type: "string",
                    },
                    replicationStatus: {
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
                              progress: {
                                type: "integer",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  required: ["publishingProfile"],
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default GalleryApplicationVersions_ListByGalleryApplication;
