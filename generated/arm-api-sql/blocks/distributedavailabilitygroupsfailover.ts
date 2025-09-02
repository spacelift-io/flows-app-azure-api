import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DistributedAvailabilityGroups_Failover: AppBlock = {
  name: "Distributed Availability Groups / Failover",
  description:
    "Performs requested failover type in this distributed availability group.",
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
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              failoverType: {
                type: "string",
              },
            },
            required: ["failoverType"],
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/distributedAvailabilityGroups/${input.event.inputConfig.distributedAvailabilityGroupName}/failover` +
          "?api-version=2023-08-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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

export default DistributedAvailabilityGroups_Failover;
