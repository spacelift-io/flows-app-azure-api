import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FirewallPolicies_List: AppBlock = {
  name: "Firewall Policies / List",
  description: "Lists all Firewall Policies in a resource group.",
  category: "Firewall Policies",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/firewallPolicies` +
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
                    size: {
                      type: "string",
                    },
                    ruleCollectionGroups: {
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
                    provisioningState: {
                      type: "string",
                    },
                    basePolicy: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    firewalls: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    childPolicies: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    threatIntelMode: {
                      type: "string",
                    },
                    threatIntelWhitelist: {
                      type: "object",
                      properties: {
                        ipAddresses: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        fqdns: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                    },
                    insights: {
                      type: "object",
                      properties: {
                        isEnabled: {
                          type: "boolean",
                        },
                        retentionDays: {
                          type: "integer",
                        },
                        logAnalyticsResources: {
                          type: "object",
                          properties: {
                            workspaces: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  region: {
                                    type: "string",
                                  },
                                  workspaceId: {
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
                            },
                            defaultWorkspaceId: {
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
                      },
                    },
                    snat: {
                      type: "object",
                      properties: {
                        privateRanges: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        autoLearnPrivateRanges: {
                          type: "string",
                        },
                      },
                    },
                    sql: {
                      type: "object",
                      properties: {
                        allowSqlRedirect: {
                          type: "boolean",
                        },
                      },
                    },
                    dnsSettings: {
                      type: "object",
                      properties: {
                        servers: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        enableProxy: {
                          type: "boolean",
                        },
                        requireProxyForNetworkRules: {
                          type: "boolean",
                        },
                      },
                    },
                    explicitProxy: {
                      type: "object",
                      properties: {
                        enableExplicitProxy: {
                          type: "boolean",
                        },
                        httpPort: {
                          type: "integer",
                        },
                        httpsPort: {
                          type: "integer",
                        },
                        enablePacFile: {
                          type: "boolean",
                        },
                        pacFilePort: {
                          type: "integer",
                        },
                        pacFile: {
                          type: "string",
                        },
                      },
                    },
                    intrusionDetection: {
                      type: "object",
                      properties: {
                        mode: {
                          type: "string",
                        },
                        profile: {
                          type: "string",
                        },
                        configuration: {
                          type: "object",
                          properties: {
                            signatureOverrides: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  id: {
                                    type: "string",
                                  },
                                  mode: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            bypassTrafficSettings: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  name: {
                                    type: "string",
                                  },
                                  description: {
                                    type: "string",
                                  },
                                  protocol: {
                                    type: "string",
                                  },
                                  sourceAddresses: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                  destinationAddresses: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                  destinationPorts: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                  sourceIpGroups: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                  destinationIpGroups: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                            },
                            privateRanges: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                    },
                    transportSecurity: {
                      type: "object",
                      properties: {
                        certificateAuthority: {
                          type: "object",
                          properties: {
                            keyVaultSecretId: {
                              type: "string",
                            },
                            name: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                    sku: {
                      type: "object",
                      properties: {
                        tier: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
                etag: {
                  type: "string",
                },
                identity: {
                  type: "object",
                  properties: {
                    principalId: {
                      type: "string",
                    },
                    tenantId: {
                      type: "string",
                    },
                    type: {
                      type: "string",
                    },
                    userAssignedIdentities: {
                      type: "object",
                      additionalProperties: true,
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

export default FirewallPolicies_List;
