import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GalleryInVMAccessControlProfileVersions_ListByGalleryInVMAccessControlProfile: AppBlock =
  {
    name: "Gallery In VM Access Control Profile Versions / List By Gallery In VM Access Control Profile",
    description:
      "List gallery inVMAccessControlProfile versions in a gallery inVMAccessControlProfile",
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
            `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/galleries/${input.event.inputConfig.galleryName}/inVMAccessControlProfiles/${input.event.inputConfig.inVMAccessControlProfileName}/versions` +
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
            nextLink: {
              type: "string",
            },
          },
          required: ["value"],
        },
      },
    },
  };

export default GalleryInVMAccessControlProfileVersions_ListByGalleryInVMAccessControlProfile;
