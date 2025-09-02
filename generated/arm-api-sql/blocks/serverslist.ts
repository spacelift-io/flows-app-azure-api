import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Servers_List: AppBlock = {
  name: "Servers / List",
  description: "Gets a list of all servers in the subscription.",
  category: "Servers",
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
        $expand: {
          name: "Expand",
          description: "The child resources to include in the response.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Sql/servers` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.$expand
            ? `&$expand=${input.event.inputConfig.$expand}`
            : "");

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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Servers_List;
