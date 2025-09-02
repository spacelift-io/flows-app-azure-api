import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ReachabilityAnalysisIntents_Create: AppBlock = {
  name: "Reachability Analysis Intents / Create",
  description: "Creates Reachability Analysis Intent.",
  category: "Reachability Analysis Intents",
  inputs: {
    default: {
      config: {
        networkManagerName: {
          name: "Network Manager Name",
          description: "Name of the network manager",
          type: "string",
          required: true,
        },
        workspaceName: {
          name: "Workspace Name",
          description: "Name of the workspace",
          type: "string",
          required: true,
        },
        reachabilityAnalysisIntentName: {
          name: "Reachability Analysis Intent Name",
          description: "Name of the reachability analysis intent",
          type: "string",
          required: true,
        },
        body: {
          name: "Body",
          description: "Reachability Analysis Intent object to create/update.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  provisioningState: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  sourceResourceId: {
                    type: "string",
                  },
                  destinationResourceId: {
                    type: "string",
                  },
                  ipTraffic: {
                    type: "object",
                    properties: {
                      sourceIps: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      destinationIps: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      sourcePorts: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      destinationPorts: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      protocols: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
                    required: [
                      "sourceIps",
                      "destinationIps",
                      "sourcePorts",
                      "destinationPorts",
                      "protocols",
                    ],
                  },
                },
                required: [
                  "destinationResourceId",
                  "ipTraffic",
                  "sourceResourceId",
                ],
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
            required: ["properties"],
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
        const requestBody = input.event.inputConfig.body;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/verifierWorkspaces/${input.event.inputConfig.workspaceName}/reachabilityAnalysisIntents/${input.event.inputConfig.reachabilityAnalysisIntentName}` +
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
              provisioningState: {
                type: "string",
              },
              description: {
                type: "string",
              },
              sourceResourceId: {
                type: "string",
              },
              destinationResourceId: {
                type: "string",
              },
              ipTraffic: {
                type: "object",
                properties: {
                  sourceIps: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  destinationIps: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  sourcePorts: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  destinationPorts: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  protocols: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: [
                  "sourceIps",
                  "destinationIps",
                  "sourcePorts",
                  "destinationPorts",
                  "protocols",
                ],
              },
            },
            required: [
              "destinationResourceId",
              "ipTraffic",
              "sourceResourceId",
            ],
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
        required: ["properties"],
      },
    },
  },
};

export default ReachabilityAnalysisIntents_Create;
