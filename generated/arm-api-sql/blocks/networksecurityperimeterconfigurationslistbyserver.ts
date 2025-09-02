import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkSecurityPerimeterConfigurations_ListByServer: AppBlock = {
  name: "Network Security Perimeter Configurations / List By Server",
  description: "Gets a list of NSP configurations for a server.",
  category: "Network Security Perimeter Configurations",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/networkSecurityPerimeterConfigurations` +
          "?api-version=2023-08-01";

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
                          type: "string",
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
                                  fullyQualifiedDomainNames: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                  subscriptions: {
                                    type: "array",
                                    items: {
                                      type: "string",
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
                                  serviceTags: {
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default NetworkSecurityPerimeterConfigurations_ListByServer;
