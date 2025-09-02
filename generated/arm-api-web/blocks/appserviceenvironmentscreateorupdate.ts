import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceEnvironments_CreateOrUpdate: AppBlock = {
  name: "App Service Environments / Create Or Update",
  description: "Description for Create or update an App Service Environment.",
  category: "App Service Environments",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        hostingEnvironmentEnvelope: {
          name: "Hosting Environment Envelope",
          description: "Configuration details of the App Service Environment.",
          type: {
            type: "object",
            properties: {
              properties: {
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
        const requestBody = input.event.inputConfig.hostingEnvironmentEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.name}` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
      },
    },
  },
};

export default AppServiceEnvironments_CreateOrUpdate;
