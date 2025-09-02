import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const KubeEnvironments_ListByResourceGroup: AppBlock = {
  name: "Kube Environments / List By Resource Group",
  description:
    "Description for Get all the Kubernetes Environments in a resource group.",
  category: "Kube Environments",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/kubeEnvironments` +
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
                    provisioningState: {
                      type: "string",
                    },
                    deploymentErrors: {
                      type: "string",
                    },
                    internalLoadBalancerEnabled: {
                      type: "boolean",
                    },
                    defaultDomain: {
                      type: "string",
                    },
                    staticIp: {
                      type: "string",
                    },
                    environmentType: {
                      type: "string",
                    },
                    arcConfiguration: {
                      type: "object",
                      properties: {
                        artifactsStorageType: {
                          type: "string",
                        },
                        artifactStorageClassName: {
                          type: "string",
                        },
                        artifactStorageMountPath: {
                          type: "string",
                        },
                        artifactStorageNodeName: {
                          type: "string",
                        },
                        artifactStorageAccessMode: {
                          type: "string",
                        },
                        frontEndServiceConfiguration: {
                          type: "object",
                          properties: {
                            kind: {
                              type: "string",
                            },
                          },
                        },
                        kubeConfig: {
                          type: "string",
                        },
                      },
                    },
                    appLogsConfiguration: {
                      type: "object",
                      properties: {
                        destination: {
                          type: "string",
                        },
                        logAnalyticsConfiguration: {
                          type: "object",
                          properties: {
                            customerId: {
                              type: "string",
                            },
                            sharedKey: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                    containerAppsConfiguration: {
                      type: "object",
                      properties: {
                        daprAIInstrumentationKey: {
                          type: "string",
                        },
                        platformReservedCidr: {
                          type: "string",
                        },
                        platformReservedDnsIP: {
                          type: "string",
                        },
                        controlPlaneSubnetResourceId: {
                          type: "string",
                        },
                        appSubnetResourceId: {
                          type: "string",
                        },
                        dockerBridgeCidr: {
                          type: "string",
                        },
                      },
                    },
                    aksResourceID: {
                      type: "string",
                    },
                  },
                },
                extendedLocation: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    type: {
                      type: "string",
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

export default KubeEnvironments_ListByResourceGroup;
