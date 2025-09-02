import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GalleryApplications_CreateOrUpdate: AppBlock = {
  name: "Gallery Applications / Create Or Update",
  description: "Create or update a gallery Application Definition.",
  category: "Gallery Applications",
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
        galleryApplication: {
          name: "Gallery Application",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  eula: {
                    type: "string",
                  },
                  privacyStatementUri: {
                    type: "string",
                  },
                  releaseNoteUri: {
                    type: "string",
                  },
                  endOfLifeDate: {
                    type: "string",
                  },
                  supportedOSType: {
                    type: "string",
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
                required: ["supportedOSType"],
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
        const requestBody = input.event.inputConfig.galleryApplication;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/galleries/${input.event.inputConfig.galleryName}/applications/${input.event.inputConfig.galleryApplicationName}` +
          "?api-version=2024-03-03";

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
              description: {
                type: "string",
              },
              eula: {
                type: "string",
              },
              privacyStatementUri: {
                type: "string",
              },
              releaseNoteUri: {
                type: "string",
              },
              endOfLifeDate: {
                type: "string",
              },
              supportedOSType: {
                type: "string",
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
            required: ["supportedOSType"],
          },
        },
      },
    },
  },
};

export default GalleryApplications_CreateOrUpdate;
