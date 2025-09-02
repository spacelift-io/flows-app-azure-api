import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_UpdateAuthSettingsV2: AppBlock = {
  name: "Web Apps / Update Auth Settings V2",
  description:
    "Description for Updates site's Authentication / Authorization settings for apps via the V2 format",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        siteAuthSettingsV2: {
          name: "Site Auth Settings V2",
          description: "Auth settings associated with web app.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  platform: {
                    type: "object",
                    properties: {
                      enabled: {
                        type: "boolean",
                      },
                      runtimeVersion: {
                        type: "string",
                      },
                      configFilePath: {
                        type: "string",
                      },
                    },
                  },
                  globalValidation: {
                    type: "object",
                    properties: {
                      requireAuthentication: {
                        type: "boolean",
                      },
                      unauthenticatedClientAction: {
                        type: "string",
                      },
                      redirectToProvider: {
                        type: "string",
                      },
                      excludedPaths: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
                  },
                  identityProviders: {
                    type: "object",
                    properties: {
                      azureActiveDirectory: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "boolean",
                          },
                          registration: {
                            type: "object",
                            properties: {
                              openIdIssuer: {
                                type: "string",
                              },
                              clientId: {
                                type: "string",
                              },
                              clientSecretSettingName: {
                                type: "string",
                              },
                              clientSecretCertificateThumbprint: {
                                type: "string",
                              },
                              clientSecretCertificateSubjectAlternativeName: {
                                type: "string",
                              },
                              clientSecretCertificateIssuer: {
                                type: "string",
                              },
                            },
                          },
                          login: {
                            type: "object",
                            properties: {
                              loginParameters: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              disableWWWAuthenticate: {
                                type: "boolean",
                              },
                            },
                          },
                          validation: {
                            type: "object",
                            properties: {
                              jwtClaimChecks: {
                                type: "object",
                                properties: {
                                  allowedGroups: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                  allowedClientApplications: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                              allowedAudiences: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              defaultAuthorizationPolicy: {
                                type: "object",
                                properties: {
                                  allowedPrincipals: {
                                    type: "object",
                                    properties: {
                                      groups: {
                                        type: "array",
                                        items: {
                                          type: "string",
                                        },
                                      },
                                      identities: {
                                        type: "array",
                                        items: {
                                          type: "string",
                                        },
                                      },
                                    },
                                  },
                                  allowedApplications: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                            },
                          },
                          isAutoProvisioned: {
                            type: "boolean",
                          },
                        },
                      },
                      facebook: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "boolean",
                          },
                          registration: {
                            type: "object",
                            properties: {
                              appId: {
                                type: "string",
                              },
                              appSecretSettingName: {
                                type: "string",
                              },
                            },
                          },
                          graphApiVersion: {
                            type: "string",
                          },
                          login: {
                            type: "object",
                            properties: {
                              scopes: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                          },
                        },
                      },
                      gitHub: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "boolean",
                          },
                          registration: {
                            type: "object",
                            properties: {
                              clientId: {
                                type: "string",
                              },
                              clientSecretSettingName: {
                                type: "string",
                              },
                            },
                          },
                          login: {
                            type: "object",
                            properties: {
                              scopes: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                        },
                      },
                      google: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "boolean",
                          },
                          registration: {
                            type: "object",
                            properties: {
                              clientId: {
                                type: "object",
                                additionalProperties: true,
                              },
                              clientSecretSettingName: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                          login: {
                            type: "object",
                            properties: {
                              scopes: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                          validation: {
                            type: "object",
                            properties: {
                              allowedAudiences: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                          },
                        },
                      },
                      legacyMicrosoftAccount: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "boolean",
                          },
                          registration: {
                            type: "object",
                            properties: {
                              clientId: {
                                type: "object",
                                additionalProperties: true,
                              },
                              clientSecretSettingName: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                          login: {
                            type: "object",
                            properties: {
                              scopes: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                          validation: {
                            type: "object",
                            properties: {
                              allowedAudiences: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                        },
                      },
                      twitter: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "boolean",
                          },
                          registration: {
                            type: "object",
                            properties: {
                              consumerKey: {
                                type: "string",
                              },
                              consumerSecretSettingName: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                      apple: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "boolean",
                          },
                          registration: {
                            type: "object",
                            properties: {
                              clientId: {
                                type: "string",
                              },
                              clientSecretSettingName: {
                                type: "string",
                              },
                            },
                          },
                          login: {
                            type: "object",
                            properties: {
                              scopes: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                        },
                      },
                      azureStaticWebApps: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "boolean",
                          },
                          registration: {
                            type: "object",
                            properties: {
                              clientId: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                      customOpenIdConnectProviders: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                  login: {
                    type: "object",
                    properties: {
                      routes: {
                        type: "object",
                        properties: {
                          logoutEndpoint: {
                            type: "string",
                          },
                        },
                      },
                      tokenStore: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "boolean",
                          },
                          tokenRefreshExtensionHours: {
                            type: "number",
                          },
                          fileSystem: {
                            type: "object",
                            properties: {
                              directory: {
                                type: "string",
                              },
                            },
                          },
                          azureBlobStorage: {
                            type: "object",
                            properties: {
                              sasUrlSettingName: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                      preserveUrlFragmentsForLogins: {
                        type: "boolean",
                      },
                      allowedExternalRedirectUrls: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      cookieExpiration: {
                        type: "object",
                        properties: {
                          convention: {
                            type: "string",
                          },
                          timeToExpiration: {
                            type: "string",
                          },
                        },
                      },
                      nonce: {
                        type: "object",
                        properties: {
                          validateNonce: {
                            type: "boolean",
                          },
                          nonceExpirationInterval: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                  httpSettings: {
                    type: "object",
                    properties: {
                      requireHttps: {
                        type: "boolean",
                      },
                      routes: {
                        type: "object",
                        properties: {
                          apiPrefix: {
                            type: "string",
                          },
                        },
                      },
                      forwardProxy: {
                        type: "object",
                        properties: {
                          convention: {
                            type: "string",
                          },
                          customHostHeaderName: {
                            type: "string",
                          },
                          customProtoHeaderName: {
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
        const requestBody = input.event.inputConfig.siteAuthSettingsV2;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/config/authsettingsV2` +
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
              platform: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  runtimeVersion: {
                    type: "string",
                  },
                  configFilePath: {
                    type: "string",
                  },
                },
              },
              globalValidation: {
                type: "object",
                properties: {
                  requireAuthentication: {
                    type: "boolean",
                  },
                  unauthenticatedClientAction: {
                    type: "string",
                  },
                  redirectToProvider: {
                    type: "string",
                  },
                  excludedPaths: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
              identityProviders: {
                type: "object",
                properties: {
                  azureActiveDirectory: {
                    type: "object",
                    properties: {
                      enabled: {
                        type: "boolean",
                      },
                      registration: {
                        type: "object",
                        properties: {
                          openIdIssuer: {
                            type: "string",
                          },
                          clientId: {
                            type: "string",
                          },
                          clientSecretSettingName: {
                            type: "string",
                          },
                          clientSecretCertificateThumbprint: {
                            type: "string",
                          },
                          clientSecretCertificateSubjectAlternativeName: {
                            type: "string",
                          },
                          clientSecretCertificateIssuer: {
                            type: "string",
                          },
                        },
                      },
                      login: {
                        type: "object",
                        properties: {
                          loginParameters: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          disableWWWAuthenticate: {
                            type: "boolean",
                          },
                        },
                      },
                      validation: {
                        type: "object",
                        properties: {
                          jwtClaimChecks: {
                            type: "object",
                            properties: {
                              allowedGroups: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              allowedClientApplications: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                          },
                          allowedAudiences: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          defaultAuthorizationPolicy: {
                            type: "object",
                            properties: {
                              allowedPrincipals: {
                                type: "object",
                                properties: {
                                  groups: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                  identities: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                              allowedApplications: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                          },
                        },
                      },
                      isAutoProvisioned: {
                        type: "boolean",
                      },
                    },
                  },
                  facebook: {
                    type: "object",
                    properties: {
                      enabled: {
                        type: "boolean",
                      },
                      registration: {
                        type: "object",
                        properties: {
                          appId: {
                            type: "string",
                          },
                          appSecretSettingName: {
                            type: "string",
                          },
                        },
                      },
                      graphApiVersion: {
                        type: "string",
                      },
                      login: {
                        type: "object",
                        properties: {
                          scopes: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  gitHub: {
                    type: "object",
                    properties: {
                      enabled: {
                        type: "boolean",
                      },
                      registration: {
                        type: "object",
                        properties: {
                          clientId: {
                            type: "string",
                          },
                          clientSecretSettingName: {
                            type: "string",
                          },
                        },
                      },
                      login: {
                        type: "object",
                        properties: {
                          scopes: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                  },
                  google: {
                    type: "object",
                    properties: {
                      enabled: {
                        type: "boolean",
                      },
                      registration: {
                        type: "object",
                        properties: {
                          clientId: {
                            type: "object",
                            additionalProperties: true,
                          },
                          clientSecretSettingName: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                      login: {
                        type: "object",
                        properties: {
                          scopes: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                      validation: {
                        type: "object",
                        properties: {
                          allowedAudiences: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  legacyMicrosoftAccount: {
                    type: "object",
                    properties: {
                      enabled: {
                        type: "boolean",
                      },
                      registration: {
                        type: "object",
                        properties: {
                          clientId: {
                            type: "object",
                            additionalProperties: true,
                          },
                          clientSecretSettingName: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                      login: {
                        type: "object",
                        properties: {
                          scopes: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                      validation: {
                        type: "object",
                        properties: {
                          allowedAudiences: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                  },
                  twitter: {
                    type: "object",
                    properties: {
                      enabled: {
                        type: "boolean",
                      },
                      registration: {
                        type: "object",
                        properties: {
                          consumerKey: {
                            type: "string",
                          },
                          consumerSecretSettingName: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                  apple: {
                    type: "object",
                    properties: {
                      enabled: {
                        type: "boolean",
                      },
                      registration: {
                        type: "object",
                        properties: {
                          clientId: {
                            type: "string",
                          },
                          clientSecretSettingName: {
                            type: "string",
                          },
                        },
                      },
                      login: {
                        type: "object",
                        properties: {
                          scopes: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                  },
                  azureStaticWebApps: {
                    type: "object",
                    properties: {
                      enabled: {
                        type: "boolean",
                      },
                      registration: {
                        type: "object",
                        properties: {
                          clientId: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                  customOpenIdConnectProviders: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              login: {
                type: "object",
                properties: {
                  routes: {
                    type: "object",
                    properties: {
                      logoutEndpoint: {
                        type: "string",
                      },
                    },
                  },
                  tokenStore: {
                    type: "object",
                    properties: {
                      enabled: {
                        type: "boolean",
                      },
                      tokenRefreshExtensionHours: {
                        type: "number",
                      },
                      fileSystem: {
                        type: "object",
                        properties: {
                          directory: {
                            type: "string",
                          },
                        },
                      },
                      azureBlobStorage: {
                        type: "object",
                        properties: {
                          sasUrlSettingName: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                  preserveUrlFragmentsForLogins: {
                    type: "boolean",
                  },
                  allowedExternalRedirectUrls: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  cookieExpiration: {
                    type: "object",
                    properties: {
                      convention: {
                        type: "string",
                      },
                      timeToExpiration: {
                        type: "string",
                      },
                    },
                  },
                  nonce: {
                    type: "object",
                    properties: {
                      validateNonce: {
                        type: "boolean",
                      },
                      nonceExpirationInterval: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              httpSettings: {
                type: "object",
                properties: {
                  requireHttps: {
                    type: "boolean",
                  },
                  routes: {
                    type: "object",
                    properties: {
                      apiPrefix: {
                        type: "string",
                      },
                    },
                  },
                  forwardProxy: {
                    type: "object",
                    properties: {
                      convention: {
                        type: "string",
                      },
                      customHostHeaderName: {
                        type: "string",
                      },
                      customProtoHeaderName: {
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
    },
  },
};

export default WebApps_UpdateAuthSettingsV2;
