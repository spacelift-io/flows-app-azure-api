import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_UpdateAuthSettings: AppBlock = {
  name: "Web Apps / Update Auth Settings",
  description:
    "Description for Updates the Authentication / Authorization settings associated with web app.",
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
        siteAuthSettings: {
          name: "Site Auth Settings",
          description: "Auth settings associated with web app.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  runtimeVersion: {
                    type: "string",
                  },
                  unauthenticatedClientAction: {
                    type: "string",
                  },
                  tokenStoreEnabled: {
                    type: "boolean",
                  },
                  allowedExternalRedirectUrls: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  defaultProvider: {
                    type: "string",
                  },
                  tokenRefreshExtensionHours: {
                    type: "number",
                  },
                  clientId: {
                    type: "string",
                  },
                  clientSecret: {
                    type: "string",
                  },
                  clientSecretSettingName: {
                    type: "string",
                  },
                  clientSecretCertificateThumbprint: {
                    type: "string",
                  },
                  issuer: {
                    type: "string",
                  },
                  validateIssuer: {
                    type: "boolean",
                  },
                  allowedAudiences: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  additionalLoginParams: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  aadClaimsAuthorization: {
                    type: "string",
                  },
                  googleClientId: {
                    type: "string",
                  },
                  googleClientSecret: {
                    type: "string",
                  },
                  googleClientSecretSettingName: {
                    type: "string",
                  },
                  googleOAuthScopes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  facebookAppId: {
                    type: "string",
                  },
                  facebookAppSecret: {
                    type: "string",
                  },
                  facebookAppSecretSettingName: {
                    type: "string",
                  },
                  facebookOAuthScopes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  gitHubClientId: {
                    type: "string",
                  },
                  gitHubClientSecret: {
                    type: "string",
                  },
                  gitHubClientSecretSettingName: {
                    type: "string",
                  },
                  gitHubOAuthScopes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  twitterConsumerKey: {
                    type: "string",
                  },
                  twitterConsumerSecret: {
                    type: "string",
                  },
                  twitterConsumerSecretSettingName: {
                    type: "string",
                  },
                  microsoftAccountClientId: {
                    type: "string",
                  },
                  microsoftAccountClientSecret: {
                    type: "string",
                  },
                  microsoftAccountClientSecretSettingName: {
                    type: "string",
                  },
                  microsoftAccountOAuthScopes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  isAuthFromFile: {
                    type: "string",
                  },
                  authFilePath: {
                    type: "string",
                  },
                  configVersion: {
                    type: "string",
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
        const requestBody = input.event.inputConfig.siteAuthSettings;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/config/authsettings` +
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
              enabled: {
                type: "boolean",
              },
              runtimeVersion: {
                type: "string",
              },
              unauthenticatedClientAction: {
                type: "string",
              },
              tokenStoreEnabled: {
                type: "boolean",
              },
              allowedExternalRedirectUrls: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              defaultProvider: {
                type: "string",
              },
              tokenRefreshExtensionHours: {
                type: "number",
              },
              clientId: {
                type: "string",
              },
              clientSecret: {
                type: "string",
              },
              clientSecretSettingName: {
                type: "string",
              },
              clientSecretCertificateThumbprint: {
                type: "string",
              },
              issuer: {
                type: "string",
              },
              validateIssuer: {
                type: "boolean",
              },
              allowedAudiences: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              additionalLoginParams: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              aadClaimsAuthorization: {
                type: "string",
              },
              googleClientId: {
                type: "string",
              },
              googleClientSecret: {
                type: "string",
              },
              googleClientSecretSettingName: {
                type: "string",
              },
              googleOAuthScopes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              facebookAppId: {
                type: "string",
              },
              facebookAppSecret: {
                type: "string",
              },
              facebookAppSecretSettingName: {
                type: "string",
              },
              facebookOAuthScopes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              gitHubClientId: {
                type: "string",
              },
              gitHubClientSecret: {
                type: "string",
              },
              gitHubClientSecretSettingName: {
                type: "string",
              },
              gitHubOAuthScopes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              twitterConsumerKey: {
                type: "string",
              },
              twitterConsumerSecret: {
                type: "string",
              },
              twitterConsumerSecretSettingName: {
                type: "string",
              },
              microsoftAccountClientId: {
                type: "string",
              },
              microsoftAccountClientSecret: {
                type: "string",
              },
              microsoftAccountClientSecretSettingName: {
                type: "string",
              },
              microsoftAccountOAuthScopes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              isAuthFromFile: {
                type: "string",
              },
              authFilePath: {
                type: "string",
              },
              configVersion: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_UpdateAuthSettings;
