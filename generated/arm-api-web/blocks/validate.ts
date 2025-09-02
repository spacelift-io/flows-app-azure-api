import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Validate: AppBlock = {
  name: "Validate",
  description: "Description for Validate if a resource can be created.",
  category: "General",
  inputs: {
    default: {
      config: {
        validateRequest: {
          name: "Validate Request",
          description: "Request with the resources to validate.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              type: {
                type: "string",
              },
              location: {
                type: "string",
              },
              properties: {
                type: "object",
                properties: {
                  serverFarmId: {
                    type: "string",
                  },
                  skuName: {
                    type: "string",
                  },
                  needLinuxWorkers: {
                    type: "boolean",
                  },
                  isSpot: {
                    type: "boolean",
                  },
                  capacity: {
                    type: "number",
                  },
                  hostingEnvironment: {
                    type: "string",
                  },
                  isXenon: {
                    type: "boolean",
                  },
                  containerRegistryBaseUrl: {
                    type: "string",
                  },
                  containerRegistryUsername: {
                    type: "string",
                  },
                  containerRegistryPassword: {
                    type: "string",
                  },
                  containerImageRepository: {
                    type: "string",
                  },
                  containerImageTag: {
                    type: "string",
                  },
                  containerImagePlatform: {
                    type: "string",
                  },
                  appServiceEnvironment: {
                    type: "object",
                    properties: {
                      provisioningState: {
                        type: "string",
                      },
                      status: {
                        type: "string",
                      },
                      virtualNetwork: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                          name: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                          subnet: {
                            type: "string",
                          },
                        },
                        required: ["id"],
                      },
                      internalLoadBalancingMode: {
                        type: "string",
                      },
                      multiSize: {
                        type: "string",
                      },
                      multiRoleCount: {
                        type: "number",
                      },
                      ipsslAddressCount: {
                        type: "number",
                      },
                      dnsSuffix: {
                        type: "string",
                      },
                      maximumNumberOfMachines: {
                        type: "number",
                      },
                      frontEndScaleFactor: {
                        type: "number",
                      },
                      suspended: {
                        type: "boolean",
                      },
                      clusterSettings: {
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
                      userWhitelistedIpRanges: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      hasLinuxWorkers: {
                        type: "boolean",
                      },
                      upgradePreference: {
                        type: "string",
                      },
                      dedicatedHostCount: {
                        type: "number",
                      },
                      zoneRedundant: {
                        type: "boolean",
                      },
                      customDnsSuffixConfiguration: {
                        type: "object",
                        properties: {
                          properties: {
                            type: "object",
                            properties: {
                              provisioningState: {
                                type: "string",
                              },
                              provisioningDetails: {
                                type: "string",
                              },
                              dnsSuffix: {
                                type: "string",
                              },
                              certificateUrl: {
                                type: "string",
                              },
                              keyVaultReferenceIdentity: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                      networkingConfiguration: {
                        type: "object",
                        properties: {
                          properties: {
                            type: "object",
                            properties: {
                              windowsOutboundIpAddresses: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              linuxOutboundIpAddresses: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              externalInboundIpAddresses: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              internalInboundIpAddresses: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              allowNewPrivateEndpointConnections: {
                                type: "boolean",
                              },
                              ftpEnabled: {
                                type: "boolean",
                              },
                              remoteDebugEnabled: {
                                type: "boolean",
                              },
                              inboundIpAddressOverride: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                      upgradeAvailability: {
                        type: "string",
                      },
                    },
                    required: ["virtualNetwork"],
                  },
                },
              },
            },
            required: ["name", "type", "location", "properties"],
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
        const requestBody = input.event.inputConfig.validateRequest;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/validate` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          status: {
            type: "string",
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "string",
              },
              message: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default Validate;
