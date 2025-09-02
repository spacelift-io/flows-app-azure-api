import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ConnectivityConfigurations_CreateOrUpdate: AppBlock = {
  name: "Connectivity Configurations / Create Or Update",
  description:
    "Creates/Updates a new network manager connectivity configuration",
  category: "Connectivity Configurations",
  inputs: {
    default: {
      config: {
        networkManagerName: {
          name: "Network Manager Name",
          description: "Name of the network manager",
          type: "string",
          required: true,
        },
        configurationName: {
          name: "Configuration Name",
          description: "Name of the configuration",
          type: "string",
          required: true,
        },
        connectivityConfiguration: {
          name: "Connectivity Configuration",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  connectivityTopology: {
                    type: "string",
                  },
                  hubs: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        resourceId: {
                          type: "string",
                        },
                        resourceType: {
                          type: "string",
                        },
                      },
                    },
                  },
                  isGlobal: {
                    type: "string",
                  },
                  connectivityCapabilities: {
                    type: "object",
                    properties: {
                      connectedGroupPrivateEndpointsScale: {
                        type: "string",
                      },
                      connectedGroupAddressOverlap: {
                        type: "string",
                      },
                      peeringEnforcement: {
                        type: "string",
                      },
                    },
                    required: [
                      "connectedGroupPrivateEndpointsScale",
                      "connectedGroupAddressOverlap",
                      "peeringEnforcement",
                    ],
                  },
                  appliesToGroups: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        networkGroupId: {
                          type: "string",
                        },
                        useHubGateway: {
                          type: "string",
                        },
                        isGlobal: {
                          type: "string",
                        },
                        groupConnectivity: {
                          type: "string",
                        },
                      },
                      required: ["networkGroupId", "groupConnectivity"],
                    },
                  },
                  provisioningState: {
                    type: "string",
                  },
                  deleteExistingPeering: {
                    type: "string",
                  },
                  resourceGuid: {
                    type: "string",
                  },
                },
                required: ["connectivityTopology", "appliesToGroups"],
              },
              systemData: {
                type: "object",
                properties: {
                  createdBy: {
                    type: "string",
                  },
                  createdByType: {
                    type: "string",
                  },
                  createdAt: {
                    type: "string",
                  },
                  lastModifiedBy: {
                    type: "string",
                  },
                  lastModifiedByType: {
                    type: "string",
                  },
                  lastModifiedAt: {
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
        const requestBody = input.event.inputConfig.connectivityConfiguration;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/connectivityConfigurations/${input.event.inputConfig.configurationName}` +
          "?api-version=2024-10-01";

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
              description: {
                type: "string",
              },
              connectivityTopology: {
                type: "string",
              },
              hubs: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    resourceId: {
                      type: "string",
                    },
                    resourceType: {
                      type: "string",
                    },
                  },
                },
              },
              isGlobal: {
                type: "string",
              },
              connectivityCapabilities: {
                type: "object",
                properties: {
                  connectedGroupPrivateEndpointsScale: {
                    type: "string",
                  },
                  connectedGroupAddressOverlap: {
                    type: "string",
                  },
                  peeringEnforcement: {
                    type: "string",
                  },
                },
                required: [
                  "connectedGroupPrivateEndpointsScale",
                  "connectedGroupAddressOverlap",
                  "peeringEnforcement",
                ],
              },
              appliesToGroups: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    networkGroupId: {
                      type: "string",
                    },
                    useHubGateway: {
                      type: "string",
                    },
                    isGlobal: {
                      type: "string",
                    },
                    groupConnectivity: {
                      type: "string",
                    },
                  },
                  required: ["networkGroupId", "groupConnectivity"],
                },
              },
              provisioningState: {
                type: "string",
              },
              deleteExistingPeering: {
                type: "string",
              },
              resourceGuid: {
                type: "string",
              },
            },
            required: ["connectivityTopology", "appliesToGroups"],
          },
          systemData: {
            type: "object",
            properties: {
              createdBy: {
                type: "string",
              },
              createdByType: {
                type: "string",
              },
              createdAt: {
                type: "string",
              },
              lastModifiedBy: {
                type: "string",
              },
              lastModifiedByType: {
                type: "string",
              },
              lastModifiedAt: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default ConnectivityConfigurations_CreateOrUpdate;
