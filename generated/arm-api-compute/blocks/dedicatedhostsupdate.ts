import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DedicatedHosts_Update: AppBlock = {
  name: "Dedicated Hosts / Update",
  description: "Update a dedicated host .",
  category: "Dedicated Hosts",
  inputs: {
    default: {
      config: {
        hostGroupName: {
          name: "Host Group Name",
          description: "Name of the host group",
          type: "string",
          required: true,
        },
        hostName: {
          name: "Host Name",
          description: "Name of the host",
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
                  platformFaultDomain: {
                    type: "number",
                  },
                  autoReplaceOnFailure: {
                    type: "boolean",
                  },
                  hostId: {
                    type: "string",
                  },
                  virtualMachines: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
                    },
                  },
                  licenseType: {
                    type: "string",
                  },
                  provisioningTime: {
                    type: "string",
                  },
                  provisioningState: {
                    type: "string",
                  },
                  instanceView: {
                    type: "object",
                    properties: {
                      assetId: {
                        type: "string",
                      },
                      availableCapacity: {
                        type: "object",
                        properties: {
                          allocatableVMs: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                vmSize: {
                                  type: "string",
                                },
                                count: {
                                  type: "number",
                                },
                              },
                            },
                          },
                        },
                      },
                      statuses: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                            },
                            level: {
                              type: "string",
                            },
                            displayStatus: {
                              type: "string",
                            },
                            message: {
                              type: "string",
                            },
                            time: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  timeCreated: {
                    type: "string",
                  },
                },
              },
              sku: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  tier: {
                    type: "string",
                  },
                  capacity: {
                    type: "number",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/hostGroups/${input.event.inputConfig.hostGroupName}/hosts/${input.event.inputConfig.hostName}` +
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
              platformFaultDomain: {
                type: "integer",
              },
              autoReplaceOnFailure: {
                type: "boolean",
              },
              hostId: {
                type: "string",
              },
              virtualMachines: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                  },
                },
              },
              licenseType: {
                type: "string",
              },
              provisioningTime: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              instanceView: {
                type: "object",
                properties: {
                  assetId: {
                    type: "string",
                  },
                  availableCapacity: {
                    type: "object",
                    properties: {
                      allocatableVMs: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            vmSize: {
                              type: "string",
                            },
                            count: {
                              type: "number",
                            },
                          },
                        },
                      },
                    },
                  },
                  statuses: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                        },
                        level: {
                          type: "string",
                        },
                        displayStatus: {
                          type: "string",
                        },
                        message: {
                          type: "string",
                        },
                        time: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              timeCreated: {
                type: "string",
              },
            },
          },
          sku: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              tier: {
                type: "string",
              },
              capacity: {
                type: "integer",
              },
            },
          },
        },
        required: ["sku"],
      },
    },
  },
};

export default DedicatedHosts_Update;
