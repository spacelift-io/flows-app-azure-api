import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineImages_Get: AppBlock = {
  name: "Virtual Machine Images / Get",
  description: "Gets a virtual machine image.",
  category: "Virtual Machine Images",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        publisherName: {
          name: "Publisher Name",
          description: "Name of the publisher",
          type: "string",
          required: true,
        },
        offer: {
          name: "Offer",
          type: "string",
          required: true,
        },
        skus: {
          name: "Skus",
          type: "string",
          required: true,
        },
        version: {
          name: "Version",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/locations/${input.event.inputConfig.location}/publishers/${input.event.inputConfig.publisherName}/artifacttypes/vmimage/offers/${input.event.inputConfig.offer}/skus/${input.event.inputConfig.skus}/versions/${input.event.inputConfig.version}` +
          "?api-version=2024-11-01";

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
              plan: {
                type: "object",
                properties: {
                  publisher: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  product: {
                    type: "string",
                  },
                },
                required: ["publisher", "name", "product"],
              },
              osDiskImage: {
                type: "object",
                properties: {
                  operatingSystem: {
                    type: "string",
                  },
                },
                required: ["operatingSystem"],
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
                },
              },
              automaticOSUpgradeProperties: {
                type: "object",
                properties: {
                  automaticOSUpgradeSupported: {
                    type: "boolean",
                  },
                },
                required: ["automaticOSUpgradeSupported"],
              },
              hyperVGeneration: {
                type: "string",
              },
              disallowed: {
                type: "object",
                properties: {
                  vmDiskType: {
                    type: "string",
                  },
                },
              },
              features: {
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
              architecture: {
                type: "string",
              },
              imageDeprecationStatus: {
                type: "object",
                properties: {
                  imageState: {
                    type: "string",
                  },
                  scheduledDeprecationTime: {
                    type: "string",
                  },
                  alternativeOption: {
                    type: "object",
                    properties: {
                      type: {
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
        },
      },
    },
  },
};

export default VirtualMachineImages_Get;
