import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Images_List: AppBlock = {
  name: "Images / List",
  description:
    "Gets the list of Images in the subscription. Use nextLink property in the response to get the next page of Images. Do this till nextLink is null to fetch all the Images.",
  category: "Images",
  inputs: {
    default: {
      config: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/images` +
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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default Images_List;
