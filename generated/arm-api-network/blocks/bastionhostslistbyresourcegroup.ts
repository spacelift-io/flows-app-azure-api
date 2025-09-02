import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const BastionHosts_ListByResourceGroup: AppBlock = {
  name: "Bastion Hosts / List By Resource Group",
  description: "Lists all Bastion Hosts in a resource group.",
  category: "Bastion Hosts",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/bastionHosts` +
          "?api-version=2024-10-01";

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
                    ipConfigurations: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          properties: {
                            type: "object",
                            properties: {
                              subnet: {
                                type: "object",
                                properties: {
                                  id: {
                                    type: "string",
                                  },
                                },
                              },
                              publicIPAddress: {
                                type: "object",
                                properties: {
                                  id: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                },
                              },
                              provisioningState: {
                                type: "string",
                              },
                              privateIPAllocationMethod: {
                                type: "string",
                              },
                            },
                            required: ["subnet"],
                          },
                          name: {
                            type: "string",
                          },
                          etag: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                        },
                      },
                    },
                    dnsName: {
                      type: "string",
                    },
                    virtualNetwork: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    networkAcls: {
                      type: "object",
                      properties: {
                        ipRules: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              addressPrefix: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                    },
                    provisioningState: {
                      type: "string",
                    },
                    scaleUnits: {
                      type: "integer",
                    },
                    disableCopyPaste: {
                      type: "boolean",
                    },
                    enableFileCopy: {
                      type: "boolean",
                    },
                    enableIpConnect: {
                      type: "boolean",
                    },
                    enableShareableLink: {
                      type: "boolean",
                    },
                    enableTunneling: {
                      type: "boolean",
                    },
                    enableKerberos: {
                      type: "boolean",
                    },
                    enableSessionRecording: {
                      type: "boolean",
                    },
                    enablePrivateOnlyBastion: {
                      type: "boolean",
                    },
                  },
                },
                zones: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                etag: {
                  type: "string",
                },
                sku: {
                  type: "object",
                  properties: {
                    name: {
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
      },
    },
  },
};

export default BastionHosts_ListByResourceGroup;
