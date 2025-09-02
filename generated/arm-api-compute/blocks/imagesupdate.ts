import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Images_Update: AppBlock = {
  name: "Images / Update",
  description: "Update an image.",
  category: "Images",
  inputs: {
    default: {
      config: {
        imageName: {
          name: "Image Name",
          description: "Name of the image",
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
                  sourceVirtualMachine: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                    },
                  },
                  storageProfile: {
                    type: "object",
                    properties: {
                      osDisk: {
                        type: "object",
                        properties: {
                          osType: {
                            type: "string",
                          },
                          osState: {
                            type: "string",
                          },
                        },
                        required: ["osType", "osState"],
                      },
                      dataDisks: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            lun: {
                              type: "number",
                            },
                          },
                          required: ["lun"],
                        },
                      },
                      zoneResilient: {
                        type: "boolean",
                      },
                    },
                  },
                  provisioningState: {
                    type: "string",
                  },
                  hyperVGeneration: {
                    type: "string",
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/images/${input.event.inputConfig.imageName}` +
          "?api-version=2024-11-01";

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
              sourceVirtualMachine: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
              storageProfile: {
                type: "object",
                properties: {
                  osDisk: {
                    type: "object",
                    properties: {
                      osType: {
                        type: "string",
                      },
                      osState: {
                        type: "string",
                      },
                    },
                    required: ["osType", "osState"],
                  },
                  dataDisks: {
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
                  zoneResilient: {
                    type: "boolean",
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
              hyperVGeneration: {
                type: "string",
              },
            },
          },
          extendedLocation: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              type: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default Images_Update;
