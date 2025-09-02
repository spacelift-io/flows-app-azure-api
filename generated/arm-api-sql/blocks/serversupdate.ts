import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Servers_Update: AppBlock = {
  name: "Servers / Update",
  description: "Updates a server.",
  category: "Servers",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "The requested server resource state.",
          type: {
            type: "object",
            properties: {
              identity: {
                type: "object",
                properties: {
                  userAssignedIdentities: {
                    type: "object",
                    additionalProperties: true,
                  },
                  principalId: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                  tenantId: {
                    type: "string",
                  },
                },
              },
              properties: {
                type: "object",
                properties: {
                  administratorLogin: {
                    type: "string",
                  },
                  administratorLoginPassword: {
                    type: "string",
                  },
                  version: {
                    type: "string",
                  },
                  state: {
                    type: "string",
                  },
                  fullyQualifiedDomainName: {
                    type: "string",
                  },
                  privateEndpointConnections: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        properties: {
                          type: "object",
                          properties: {
                            privateEndpoint: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "string",
                                },
                              },
                            },
                            groupIds: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            privateLinkServiceConnectionState: {
                              type: "object",
                              properties: {
                                status: {
                                  type: "string",
                                },
                                description: {
                                  type: "string",
                                },
                                actionsRequired: {
                                  type: "string",
                                },
                              },
                              required: ["status", "description"],
                            },
                            provisioningState: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  minimalTlsVersion: {
                    type: "string",
                  },
                  publicNetworkAccess: {
                    type: "string",
                  },
                  workspaceFeature: {
                    type: "string",
                  },
                  primaryUserAssignedIdentityId: {
                    type: "string",
                  },
                  federatedClientId: {
                    type: "string",
                  },
                  keyId: {
                    type: "string",
                  },
                  administrators: {
                    type: "object",
                    properties: {
                      administratorType: {
                        type: "string",
                      },
                      principalType: {
                        type: "string",
                      },
                      login: {
                        type: "string",
                      },
                      sid: {
                        type: "string",
                      },
                      tenantId: {
                        type: "string",
                      },
                      azureADOnlyAuthentication: {
                        type: "boolean",
                      },
                    },
                  },
                  restrictOutboundNetworkAccess: {
                    type: "string",
                  },
                  isIPv6Enabled: {
                    type: "string",
                  },
                  externalGovernanceStatus: {
                    type: "string",
                  },
                },
              },
              tags: {
                type: "object",
                additionalProperties: true,
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}` +
          "?api-version=2023-08-01";

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
          identity: {
            type: "object",
            properties: {
              userAssignedIdentities: {
                type: "object",
                additionalProperties: true,
              },
              principalId: {
                type: "string",
              },
              type: {
                type: "string",
              },
              tenantId: {
                type: "string",
              },
            },
          },
          kind: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              administratorLogin: {
                type: "string",
              },
              administratorLoginPassword: {
                type: "string",
              },
              version: {
                type: "string",
              },
              state: {
                type: "string",
              },
              fullyQualifiedDomainName: {
                type: "string",
              },
              privateEndpointConnections: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    properties: {
                      type: "object",
                      properties: {
                        privateEndpoint: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                          },
                        },
                        groupIds: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        privateLinkServiceConnectionState: {
                          type: "object",
                          properties: {
                            status: {
                              type: "string",
                            },
                            description: {
                              type: "string",
                            },
                            actionsRequired: {
                              type: "string",
                            },
                          },
                          required: ["status", "description"],
                        },
                        provisioningState: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              minimalTlsVersion: {
                type: "string",
              },
              publicNetworkAccess: {
                type: "string",
              },
              workspaceFeature: {
                type: "string",
              },
              primaryUserAssignedIdentityId: {
                type: "string",
              },
              federatedClientId: {
                type: "string",
              },
              keyId: {
                type: "string",
              },
              administrators: {
                type: "object",
                properties: {
                  administratorType: {
                    type: "string",
                  },
                  principalType: {
                    type: "string",
                  },
                  login: {
                    type: "string",
                  },
                  sid: {
                    type: "string",
                  },
                  tenantId: {
                    type: "string",
                  },
                  azureADOnlyAuthentication: {
                    type: "boolean",
                  },
                },
              },
              restrictOutboundNetworkAccess: {
                type: "string",
              },
              isIPv6Enabled: {
                type: "string",
              },
              externalGovernanceStatus: {
                type: "string",
              },
            },
          },
        },
        required: ["location"],
      },
    },
  },
};

export default Servers_Update;
