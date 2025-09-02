import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Workspaces_ListNSP: AppBlock = {
  name: "Workspaces / List NSP",
  description: "Gets a list of NSP configurations for specified workspace.",
  category: "Workspaces",
  inputs: {
    default: {
      config: {
        workspaceName: {
          name: "Workspace Name",
          description: "Name of the workspace",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/${input.event.inputConfig.workspaceName}/networkSecurityPerimeterConfigurations` +
          "?api-version=2025-02-01";

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
                              suggestedResourceIds: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              suggestedAccessRules: {
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
                                        },
                                        fullyQualifiedDomainNames: {
                                          type: "array",
                                          items: {
                                            type: "string",
                                          },
                                        },
                                        emailAddresses: {
                                          type: "array",
                                          items: {
                                            type: "string",
                                          },
                                        },
                                        phoneNumbers: {
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
                      },
                    },
                    networkSecurityPerimeter: {
                      type: "object",
                      additionalProperties: true,
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
                          type: "integer",
                        },
                        accessRules: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                        diagnosticSettingsVersion: {
                          type: "integer",
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Workspaces_ListNSP;
