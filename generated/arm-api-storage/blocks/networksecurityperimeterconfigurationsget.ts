import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkSecurityPerimeterConfigurations_Get: AppBlock = {
  name: "Network Security Perimeter Configurations / Get",
  description:
    "Gets effective NetworkSecurityPerimeterConfiguration for association",
  category: "Network Security Perimeter Configurations",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        networkSecurityPerimeterConfigurationName: {
          name: "Network Security Perimeter Configuration Name",
          description: "Name of the network security perimeter configuration",
          type: "string",
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
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/networkSecurityPerimeterConfigurations/${input.event.inputConfig.networkSecurityPerimeterConfigurationName}` +
          "?api-version=2025-01-01";

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
          properties: {
            type: "object",
            properties: {
              provisioningState: {
                type: "string",
              },
              provisioningIssues: {
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
                        issueType: {
                          type: "string",
                        },
                        severity: {
                          type: "string",
                        },
                        description: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              networkSecurityPerimeter: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  perimeterGuid: {
                    type: "string",
                  },
                  location: {
                    type: "string",
                  },
                },
              },
              resourceAssociation: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  accessMode: {
                    type: "string",
                  },
                },
              },
              profile: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  accessRulesVersion: {
                    type: "number",
                  },
                  accessRules: {
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
                            direction: {
                              type: "string",
                            },
                            addressPrefixes: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            subscriptions: {
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
                            networkSecurityPerimeters: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  id: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  perimeterGuid: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  location: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                },
                              },
                            },
                            fullyQualifiedDomainNames: {
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
                  diagnosticSettingsVersion: {
                    type: "number",
                  },
                  enabledLogCategories: {
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
  },
};

export default NetworkSecurityPerimeterConfigurations_Get;
