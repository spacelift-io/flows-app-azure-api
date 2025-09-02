import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CloudServices_ListAll: AppBlock = {
  name: "Cloud Services / List All",
  description:
    "Gets a list of all cloud services in the subscription, regardless of the associated resource group. Use nextLink property in the response to get the next page of Cloud Services. Do this till nextLink is null to fetch all the Cloud Services.",
  category: "Cloud Services",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/cloudServices` +
          "?api-version=2024-11-04";

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
                id: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                location: {
                  type: "string",
                },
                tags: {
                  type: "object",
                  additionalProperties: true,
                },
                properties: {
                  type: "object",
                  properties: {
                    packageUrl: {
                      type: "string",
                    },
                    configuration: {
                      type: "string",
                    },
                    configurationUrl: {
                      type: "string",
                    },
                    startCloudService: {
                      type: "boolean",
                    },
                    allowModelOverride: {
                      type: "boolean",
                    },
                    upgradeMode: {
                      type: "string",
                    },
                    roleProfile: {
                      type: "object",
                      properties: {
                        roles: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
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
                          },
                        },
                      },
                    },
                    osProfile: {
                      type: "object",
                      properties: {
                        secrets: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              sourceVault: {
                                type: "object",
                                properties: {
                                  id: {
                                    type: "string",
                                  },
                                },
                              },
                              vaultCertificates: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    certificateUrl: {
                                      type: "string",
                                    },
                                    isBootstrapCertificate: {
                                      type: "boolean",
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    networkProfile: {
                      type: "object",
                      properties: {
                        loadBalancerConfigurations: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                              name: {
                                type: "string",
                              },
                              properties: {
                                type: "object",
                                properties: {
                                  frontendIpConfigurations: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        name: {
                                          type: "string",
                                        },
                                        properties: {
                                          type: "object",
                                          properties: {
                                            publicIPAddress: {
                                              type: "object",
                                              properties: {
                                                id: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                              },
                                            },
                                            subnet: {
                                              type: "object",
                                              properties: {
                                                id: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                              },
                                            },
                                            privateIPAddress: {
                                              type: "string",
                                            },
                                          },
                                        },
                                      },
                                      required: ["name", "properties"],
                                    },
                                  },
                                },
                                required: ["frontendIpConfigurations"],
                              },
                            },
                            required: ["name", "properties"],
                          },
                        },
                        slotType: {
                          type: "string",
                        },
                        swappableCloudService: {
                          type: "object",
                          properties: {
                            id: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                      },
                    },
                    extensionProfile: {
                      type: "object",
                      properties: {
                        extensions: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                              },
                              properties: {
                                type: "object",
                                properties: {
                                  publisher: {
                                    type: "string",
                                  },
                                  type: {
                                    type: "string",
                                  },
                                  typeHandlerVersion: {
                                    type: "string",
                                  },
                                  autoUpgradeMinorVersion: {
                                    type: "boolean",
                                  },
                                  settings: {
                                    type: "object",
                                  },
                                  protectedSettings: {
                                    type: "object",
                                  },
                                  protectedSettingsFromKeyVault: {
                                    type: "object",
                                    properties: {
                                      sourceVault: {
                                        type: "object",
                                        properties: {
                                          id: {
                                            type: "object",
                                            additionalProperties: true,
                                          },
                                        },
                                      },
                                      secretUrl: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  forceUpdateTag: {
                                    type: "string",
                                  },
                                  provisioningState: {
                                    type: "string",
                                  },
                                  rolesAppliedTo: {
                                    type: "array",
                                    items: {
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
                    provisioningState: {
                      type: "string",
                    },
                    uniqueId: {
                      type: "string",
                    },
                  },
                },
                systemData: {
                  type: "object",
                  properties: {
                    createdBy: {
                      type: "string",
                    },
                    createdByType: {
                      type: "string",
                    },
                    createdAt: {
                      type: "string",
                    },
                    lastModifiedBy: {
                      type: "string",
                    },
                    lastModifiedByType: {
                      type: "string",
                    },
                    lastModifiedAt: {
                      type: "string",
                    },
                  },
                },
                zones: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
              required: ["location"],
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

export default CloudServices_ListAll;
