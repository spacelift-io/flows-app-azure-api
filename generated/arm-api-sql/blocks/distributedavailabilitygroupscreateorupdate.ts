import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DistributedAvailabilityGroups_CreateOrUpdate: AppBlock = {
  name: "Distributed Availability Groups / Create Or Update",
  description:
    "Creates a distributed availability group between Sql On-Prem and Sql Managed Instance.",
  category: "Distributed Availability Groups",
  inputs: {
    default: {
      config: {
        managedInstanceName: {
          name: "Managed Instance Name",
          description: "Name of the managed instance",
          type: "string",
          required: true,
        },
        distributedAvailabilityGroupName: {
          name: "Distributed Availability Group Name",
          description: "Name of the distributed availability group",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "The distributed availability group info.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  distributedAvailabilityGroupName: {
                    type: "string",
                  },
                  distributedAvailabilityGroupId: {
                    type: "string",
                  },
                  replicationMode: {
                    type: "string",
                  },
                  partnerLinkRole: {
                    type: "string",
                  },
                  partnerAvailabilityGroupName: {
                    type: "string",
                  },
                  partnerEndpoint: {
                    type: "string",
                  },
                  instanceLinkRole: {
                    type: "string",
                  },
                  instanceAvailabilityGroupName: {
                    type: "string",
                  },
                  failoverMode: {
                    type: "string",
                  },
                  seedingMode: {
                    type: "string",
                  },
                  databases: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        databaseName: {
                          type: "string",
                        },
                        instanceReplicaId: {
                          type: "string",
                        },
                        partnerReplicaId: {
                          type: "string",
                        },
                        replicaState: {
                          type: "string",
                        },
                        seedingProgress: {
                          type: "string",
                        },
                        synchronizationHealth: {
                          type: "string",
                        },
                        connectedState: {
                          type: "string",
                        },
                        lastReceivedLsn: {
                          type: "string",
                        },
                        lastReceivedTime: {
                          type: "string",
                        },
                        lastSentLsn: {
                          type: "string",
                        },
                        lastSentTime: {
                          type: "string",
                        },
                        lastCommitLsn: {
                          type: "string",
                        },
                        lastCommitTime: {
                          type: "string",
                        },
                        lastHardenedLsn: {
                          type: "string",
                        },
                        lastHardenedTime: {
                          type: "string",
                        },
                        lastBackupLsn: {
                          type: "string",
                        },
                        lastBackupTime: {
                          type: "string",
                        },
                        mostRecentLinkError: {
                          type: "string",
                        },
                        partnerAuthCertValidity: {
                          type: "object",
                          properties: {
                            certificateName: {
                              type: "string",
                            },
                            expiryDate: {
                              type: "string",
                            },
                          },
                        },
                        instanceSendReplicationLagSeconds: {
                          type: "number",
                        },
                        instanceRedoReplicationLagSeconds: {
                          type: "number",
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/distributedAvailabilityGroups/${input.event.inputConfig.distributedAvailabilityGroupName}` +
          "?api-version=2023-08-01";

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
              distributedAvailabilityGroupName: {
                type: "string",
              },
              distributedAvailabilityGroupId: {
                type: "string",
              },
              replicationMode: {
                type: "string",
              },
              partnerLinkRole: {
                type: "string",
              },
              partnerAvailabilityGroupName: {
                type: "string",
              },
              partnerEndpoint: {
                type: "string",
              },
              instanceLinkRole: {
                type: "string",
              },
              instanceAvailabilityGroupName: {
                type: "string",
              },
              failoverMode: {
                type: "string",
              },
              seedingMode: {
                type: "string",
              },
              databases: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    databaseName: {
                      type: "string",
                    },
                    instanceReplicaId: {
                      type: "string",
                    },
                    partnerReplicaId: {
                      type: "string",
                    },
                    replicaState: {
                      type: "string",
                    },
                    seedingProgress: {
                      type: "string",
                    },
                    synchronizationHealth: {
                      type: "string",
                    },
                    connectedState: {
                      type: "string",
                    },
                    lastReceivedLsn: {
                      type: "string",
                    },
                    lastReceivedTime: {
                      type: "string",
                    },
                    lastSentLsn: {
                      type: "string",
                    },
                    lastSentTime: {
                      type: "string",
                    },
                    lastCommitLsn: {
                      type: "string",
                    },
                    lastCommitTime: {
                      type: "string",
                    },
                    lastHardenedLsn: {
                      type: "string",
                    },
                    lastHardenedTime: {
                      type: "string",
                    },
                    lastBackupLsn: {
                      type: "string",
                    },
                    lastBackupTime: {
                      type: "string",
                    },
                    mostRecentLinkError: {
                      type: "string",
                    },
                    partnerAuthCertValidity: {
                      type: "object",
                      properties: {
                        certificateName: {
                          type: "string",
                        },
                        expiryDate: {
                          type: "string",
                        },
                      },
                    },
                    instanceSendReplicationLagSeconds: {
                      type: "integer",
                    },
                    instanceRedoReplicationLagSeconds: {
                      type: "integer",
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

export default DistributedAvailabilityGroups_CreateOrUpdate;
