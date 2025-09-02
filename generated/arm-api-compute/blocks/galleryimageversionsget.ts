import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GalleryImageVersions_Get: AppBlock = {
  name: "Gallery Image Versions / Get",
  description: "Retrieves information about a gallery image version.",
  category: "Gallery Image Versions",
  inputs: {
    default: {
      config: {
        galleryName: {
          name: "Gallery Name",
          description: "Name of the gallery",
          type: "string",
          required: true,
        },
        galleryImageName: {
          name: "Gallery Image Name",
          description: "Name of the gallery image",
          type: "string",
          required: true,
        },
        galleryImageVersionName: {
          name: "Gallery Image Version Name",
          description: "Name of the gallery image version",
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
        $expand: {
          name: "Expand",
          description: "The expand expression to apply on the operation.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/galleries/${input.event.inputConfig.galleryName}/images/${input.event.inputConfig.galleryImageName}/versions/${input.event.inputConfig.galleryImageVersionName}` +
          "?api-version=2024-03-03" +
          (input.event.inputConfig.$expand
            ? `&$expand=${input.event.inputConfig.$expand}`
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
          properties: {
            type: "object",
            properties: {
              publishingProfile: {
                type: "object",
              },
              provisioningState: {
                type: "string",
              },
              storageProfile: {
                type: "object",
                properties: {
                  source: {
                    type: "object",
                    properties: {
                      communityGalleryImageId: {
                        type: "string",
                      },
                      virtualMachineId: {
                        type: "string",
                      },
                    },
                  },
                  osDiskImage: {
                    type: "object",
                  },
                  dataDiskImages: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        lun: {
                          type: "integer",
                        },
                      },
                      required: ["lun"],
                    },
                  },
                },
              },
              safetyProfile: {
                type: "object",
                properties: {
                  reportedForPolicyViolation: {
                    type: "boolean",
                  },
                  policyViolations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        category: {
                          type: "string",
                        },
                        details: {
                          type: "string",
                        },
                      },
                    },
                  },
                  blockDeletionBeforeEndOfLife: {
                    type: "boolean",
                  },
                },
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
              securityProfile: {
                type: "object",
                properties: {
                  uefiSettings: {
                    type: "object",
                    properties: {
                      signatureTemplateNames: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      additionalSignatures: {
                        type: "object",
                        properties: {
                          pk: {
                            type: "object",
                            properties: {
                              type: {
                                type: "string",
                              },
                              value: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                          },
                          kek: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                type: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                value: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                          },
                          db: {
                            type: "array",
                            items: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                          dbx: {
                            type: "array",
                            items: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              restore: {
                type: "boolean",
              },
              validationsProfile: {
                type: "object",
                properties: {
                  validationEtag: {
                    type: "string",
                  },
                  executedValidations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        type: {
                          type: "string",
                        },
                        status: {
                          type: "string",
                        },
                        version: {
                          type: "string",
                        },
                        executionTime: {
                          type: "string",
                        },
                      },
                    },
                  },
                  platformAttributes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        value: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
            required: ["storageProfile"],
          },
        },
      },
    },
  },
};

export default GalleryImageVersions_Get;
