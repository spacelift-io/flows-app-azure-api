import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_UpdateStaticSite: AppBlock = {
  name: "Static Sites / Update Static Site",
  description:
    "Description for Creates a new static site in an existing resource group, or updates an existing static site.",
  category: "Static Sites",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        staticSiteEnvelope: {
          name: "Static Site Envelope",
          description:
            "A JSON representation of the staticsite properties. See example.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  defaultHostname: {
                    type: "string",
                  },
                  repositoryUrl: {
                    type: "string",
                  },
                  branch: {
                    type: "string",
                  },
                  customDomains: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  repositoryToken: {
                    type: "string",
                  },
                  buildProperties: {
                    type: "object",
                    properties: {
                      appLocation: {
                        type: "string",
                      },
                      apiLocation: {
                        type: "string",
                      },
                      appArtifactLocation: {
                        type: "string",
                      },
                      outputLocation: {
                        type: "string",
                      },
                      appBuildCommand: {
                        type: "string",
                      },
                      apiBuildCommand: {
                        type: "string",
                      },
                      skipGithubActionWorkflowGeneration: {
                        type: "boolean",
                      },
                      githubActionSecretNameOverride: {
                        type: "string",
                      },
                    },
                  },
                  privateEndpointConnections: {
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
                        plan: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            publisher: {
                              type: "string",
                            },
                            product: {
                              type: "string",
                            },
                            promotionCode: {
                              type: "string",
                            },
                            version: {
                              type: "string",
                            },
                          },
                        },
                        properties: {
                          type: "object",
                          properties: {
                            properties: {
                              type: "object",
                              properties: {
                                provisioningState: {
                                  type: "string",
                                },
                                privateEndpoint: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "string",
                                    },
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
                                },
                                ipAddresses: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                              },
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
                            size: {
                              type: "string",
                            },
                            family: {
                              type: "string",
                            },
                            capacity: {
                              type: "number",
                            },
                            skuCapacity: {
                              type: "object",
                              properties: {
                                minimum: {
                                  type: "number",
                                },
                                maximum: {
                                  type: "number",
                                },
                                elasticMaximum: {
                                  type: "number",
                                },
                                default: {
                                  type: "number",
                                },
                                scaleType: {
                                  type: "string",
                                },
                              },
                            },
                            locations: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            capabilities: {
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
                                  reason: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                          },
                        },
                        status: {
                          type: "string",
                        },
                        error: {
                          type: "object",
                          properties: {
                            extendedCode: {
                              type: "string",
                            },
                            messageTemplate: {
                              type: "string",
                            },
                            parameters: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            innerErrors: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  extendedCode: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  messageTemplate: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  parameters: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  innerErrors: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  details: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      additionalProperties: true,
                                    },
                                  },
                                  target: {
                                    type: "string",
                                  },
                                  code: {
                                    type: "string",
                                  },
                                  message: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            details: {
                              type: "object",
                              additionalProperties: true,
                            },
                            target: {
                              type: "object",
                              additionalProperties: true,
                            },
                            code: {
                              type: "object",
                              additionalProperties: true,
                            },
                            message: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                        identity: {
                          type: "object",
                          properties: {
                            type: {
                              type: "string",
                            },
                            tenantId: {
                              type: "string",
                            },
                            principalId: {
                              type: "string",
                            },
                            userAssignedIdentities: {
                              type: "object",
                              additionalProperties: true,
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
                    },
                  },
                  stagingEnvironmentPolicy: {
                    type: "string",
                  },
                  allowConfigFileUpdates: {
                    type: "boolean",
                  },
                  templateProperties: {
                    type: "object",
                    properties: {
                      templateRepositoryUrl: {
                        type: "string",
                      },
                      owner: {
                        type: "string",
                      },
                      repositoryName: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      isPrivate: {
                        type: "boolean",
                      },
                    },
                  },
                  contentDistributionEndpoint: {
                    type: "string",
                  },
                  keyVaultReferenceIdentity: {
                    type: "string",
                  },
                  userProvidedFunctionApps: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        properties: {
                          type: "object",
                          properties: {
                            functionAppResourceId: {
                              type: "string",
                            },
                            functionAppRegion: {
                              type: "string",
                            },
                            createdOn: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  linkedBackends: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        backendResourceId: {
                          type: "string",
                        },
                        region: {
                          type: "string",
                        },
                        createdOn: {
                          type: "string",
                        },
                        provisioningState: {
                          type: "string",
                        },
                      },
                    },
                  },
                  provider: {
                    type: "string",
                  },
                  enterpriseGradeCdnStatus: {
                    type: "string",
                  },
                  publicNetworkAccess: {
                    type: "string",
                  },
                  databaseConnections: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        resourceId: {
                          type: "string",
                        },
                        connectionIdentity: {
                          type: "string",
                        },
                        region: {
                          type: "string",
                        },
                        configurationFiles: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              fileName: {
                                type: "string",
                              },
                              contents: {
                                type: "string",
                              },
                              type: {
                                type: "string",
                              },
                            },
                          },
                        },
                        name: {
                          type: "string",
                        },
                      },
                    },
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
        const requestBody = input.event.inputConfig.staticSiteEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/staticSites/${input.event.inputConfig.name}` +
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
              defaultHostname: {
                type: "string",
              },
              repositoryUrl: {
                type: "string",
              },
              branch: {
                type: "string",
              },
              customDomains: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              repositoryToken: {
                type: "string",
              },
              buildProperties: {
                type: "object",
                properties: {
                  appLocation: {
                    type: "string",
                  },
                  apiLocation: {
                    type: "string",
                  },
                  appArtifactLocation: {
                    type: "string",
                  },
                  outputLocation: {
                    type: "string",
                  },
                  appBuildCommand: {
                    type: "string",
                  },
                  apiBuildCommand: {
                    type: "string",
                  },
                  skipGithubActionWorkflowGeneration: {
                    type: "boolean",
                  },
                  githubActionSecretNameOverride: {
                    type: "string",
                  },
                },
              },
              privateEndpointConnections: {
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
                    plan: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        publisher: {
                          type: "string",
                        },
                        product: {
                          type: "string",
                        },
                        promotionCode: {
                          type: "string",
                        },
                        version: {
                          type: "string",
                        },
                      },
                    },
                    properties: {
                      type: "object",
                      properties: {
                        properties: {
                          type: "object",
                          properties: {
                            provisioningState: {
                              type: "string",
                            },
                            privateEndpoint: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "string",
                                },
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
                            },
                            ipAddresses: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                          },
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
                        size: {
                          type: "string",
                        },
                        family: {
                          type: "string",
                        },
                        capacity: {
                          type: "integer",
                        },
                        skuCapacity: {
                          type: "object",
                          properties: {
                            minimum: {
                              type: "integer",
                            },
                            maximum: {
                              type: "integer",
                            },
                            elasticMaximum: {
                              type: "integer",
                            },
                            default: {
                              type: "integer",
                            },
                            scaleType: {
                              type: "string",
                            },
                          },
                        },
                        locations: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        capabilities: {
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
                              reason: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                    },
                    status: {
                      type: "string",
                    },
                    error: {
                      type: "object",
                      properties: {
                        extendedCode: {
                          type: "string",
                        },
                        messageTemplate: {
                          type: "string",
                        },
                        parameters: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        innerErrors: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              extendedCode: {
                                type: "object",
                                additionalProperties: true,
                              },
                              messageTemplate: {
                                type: "object",
                                additionalProperties: true,
                              },
                              parameters: {
                                type: "object",
                                additionalProperties: true,
                              },
                              innerErrors: {
                                type: "object",
                                additionalProperties: true,
                              },
                              details: {
                                type: "array",
                                items: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                              target: {
                                type: "string",
                              },
                              code: {
                                type: "string",
                              },
                              message: {
                                type: "string",
                              },
                            },
                          },
                        },
                        details: {
                          type: "object",
                          additionalProperties: true,
                        },
                        target: {
                          type: "object",
                          additionalProperties: true,
                        },
                        code: {
                          type: "object",
                          additionalProperties: true,
                        },
                        message: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    identity: {
                      type: "object",
                      properties: {
                        type: {
                          type: "string",
                        },
                        tenantId: {
                          type: "string",
                        },
                        principalId: {
                          type: "string",
                        },
                        userAssignedIdentities: {
                          type: "object",
                          additionalProperties: true,
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
                },
              },
              stagingEnvironmentPolicy: {
                type: "string",
              },
              allowConfigFileUpdates: {
                type: "boolean",
              },
              templateProperties: {
                type: "object",
                properties: {
                  templateRepositoryUrl: {
                    type: "string",
                  },
                  owner: {
                    type: "string",
                  },
                  repositoryName: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  isPrivate: {
                    type: "boolean",
                  },
                },
              },
              contentDistributionEndpoint: {
                type: "string",
              },
              keyVaultReferenceIdentity: {
                type: "string",
              },
              userProvidedFunctionApps: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        functionAppResourceId: {
                          type: "string",
                        },
                        functionAppRegion: {
                          type: "string",
                        },
                        createdOn: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              linkedBackends: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    backendResourceId: {
                      type: "string",
                    },
                    region: {
                      type: "string",
                    },
                    createdOn: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                  },
                },
              },
              provider: {
                type: "string",
              },
              enterpriseGradeCdnStatus: {
                type: "string",
              },
              publicNetworkAccess: {
                type: "string",
              },
              databaseConnections: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    resourceId: {
                      type: "string",
                    },
                    connectionIdentity: {
                      type: "string",
                    },
                    region: {
                      type: "string",
                    },
                    configurationFiles: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          fileName: {
                            type: "string",
                          },
                          contents: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                        },
                      },
                    },
                    name: {
                      type: "string",
                    },
                  },
                },
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
              size: {
                type: "string",
              },
              family: {
                type: "string",
              },
              capacity: {
                type: "integer",
              },
              skuCapacity: {
                type: "object",
                properties: {
                  minimum: {
                    type: "integer",
                  },
                  maximum: {
                    type: "integer",
                  },
                  elasticMaximum: {
                    type: "integer",
                  },
                  default: {
                    type: "integer",
                  },
                  scaleType: {
                    type: "string",
                  },
                },
              },
              locations: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              capabilities: {
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
                    reason: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          identity: {
            type: "object",
            properties: {
              type: {
                type: "string",
              },
              tenantId: {
                type: "string",
              },
              principalId: {
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
  },
};

export default StaticSites_UpdateStaticSite;
