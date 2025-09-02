import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_GetStaticSiteBuilds: AppBlock = {
  name: "Static Sites / Get Static Site Builds",
  description:
    "Description for Gets all static site builds for a particular static site.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/staticSites/${input.event.inputConfig.name}/builds` +
          "?api-version=2024-11-01";

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
                    buildId: {
                      type: "string",
                    },
                    sourceBranch: {
                      type: "string",
                    },
                    pullRequestTitle: {
                      type: "string",
                    },
                    hostname: {
                      type: "string",
                    },
                    createdTimeUtc: {
                      type: "string",
                    },
                    lastUpdatedOn: {
                      type: "string",
                    },
                    status: {
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

export default StaticSites_GetStaticSiteBuilds;
