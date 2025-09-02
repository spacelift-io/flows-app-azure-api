import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GalleryInVMAccessControlProfileVersions_Update: AppBlock = {
  name: "Gallery In VM Access Control Profile Versions / Update",
  description: "Update a gallery inVMAccessControlProfile version.",
  category: "Gallery In VM Access Control Profile Versions",
  inputs: {
    default: {
      config: {
        galleryName: {
          name: "Gallery Name",
          description: "Name of the gallery",
          type: "string",
          required: true,
        },
        inVMAccessControlProfileName: {
          name: "In VM Access Control Profile Name",
          description: "Name of the in vmaccess control profile",
          type: "string",
          required: true,
        },
        inVMAccessControlProfileVersionName: {
          name: "In VM Access Control Profile Version Name",
          description: "Name of the in vmaccess control profile version",
          type: "string",
          required: true,
        },
        galleryInVMAccessControlProfileVersion: {
          name: "Gallery In VM Access Control Profile Version",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  mode: {
                    type: "string",
                  },
                  defaultAccess: {
                    type: "string",
                  },
                  rules: {
                    type: "object",
                    properties: {
                      privileges: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            path: {
                              type: "string",
                            },
                            queryParameters: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                          required: ["name", "path"],
                        },
                      },
                      roles: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            privileges: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                          },
                          required: ["name", "privileges"],
                        },
                      },
                      identities: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            userName: {
                              type: "string",
                            },
                            groupName: {
                              type: "string",
                            },
                            exePath: {
                              type: "string",
                            },
                            processName: {
                              type: "string",
                            },
                          },
                          required: ["name"],
                        },
                      },
                      roleAssignments: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            role: {
                              type: "string",
                            },
                            identities: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                          },
                          required: ["role", "identities"],
                        },
                      },
                    },
                  },
                },
                required: ["mode", "defaultAccess"],
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
        const requestBody =
          input.event.inputConfig.galleryInVMAccessControlProfileVersion;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/galleries/${input.event.inputConfig.galleryName}/inVMAccessControlProfiles/${input.event.inputConfig.inVMAccessControlProfileName}/versions/${input.event.inputConfig.inVMAccessControlProfileVersionName}` +
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
              mode: {
                type: "string",
              },
              defaultAccess: {
                type: "string",
              },
              rules: {
                type: "object",
                properties: {
                  privileges: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        path: {
                          type: "string",
                        },
                        queryParameters: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                      required: ["name", "path"],
                    },
                  },
                  roles: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        privileges: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                      required: ["name", "privileges"],
                    },
                  },
                  identities: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        userName: {
                          type: "string",
                        },
                        groupName: {
                          type: "string",
                        },
                        exePath: {
                          type: "string",
                        },
                        processName: {
                          type: "string",
                        },
                      },
                      required: ["name"],
                    },
                  },
                  roleAssignments: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        role: {
                          type: "string",
                        },
                        identities: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                      required: ["role", "identities"],
                    },
                  },
                },
              },
            },
            required: ["mode", "defaultAccess"],
          },
        },
      },
    },
  },
};

export default GalleryInVMAccessControlProfileVersions_Update;
