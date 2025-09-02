import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetSubscriptionDeploymentLocations: AppBlock = {
  name: "Get Subscription Deployment Locations",
  description:
    "Description for Gets list of available geo regions plus ministamps",
  category: "General",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/deploymentLocations` +
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
          locations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    description: {
                      type: "string",
                    },
                    displayName: {
                      type: "string",
                    },
                    orgDomain: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          hostingEnvironments: {
            type: "array",
            items: {
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
                  type: "integer",
                },
                ipsslAddressCount: {
                  type: "integer",
                },
                dnsSuffix: {
                  type: "string",
                },
                maximumNumberOfMachines: {
                  type: "integer",
                },
                frontEndScaleFactor: {
                  type: "integer",
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
                  type: "integer",
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
          hostingEnvironmentDeploymentInfos: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                location: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default GetSubscriptionDeploymentLocations;
