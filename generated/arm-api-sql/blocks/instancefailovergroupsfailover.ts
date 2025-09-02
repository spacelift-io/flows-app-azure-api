import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const InstanceFailoverGroups_Failover: AppBlock = {
  name: "Instance Failover Groups / Failover",
  description:
    "Fails over from the current primary managed instance to this managed instance.",
  category: "Instance Failover Groups",
  inputs: {
    default: {
      config: {
        locationName: {
          name: "Location Name",
          description: "Name of the location",
          type: "string",
          required: true,
        },
        failoverGroupName: {
          name: "Failover Group Name",
          description: "Name of the failover group",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/locations/${input.event.inputConfig.locationName}/instanceFailoverGroups/${input.event.inputConfig.failoverGroupName}/failover` +
          "?api-version=2023-08-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
              secondaryType: {
                type: "string",
              },
              readWriteEndpoint: {
                type: "object",
                properties: {
                  failoverPolicy: {
                    type: "string",
                  },
                  failoverWithDataLossGracePeriodMinutes: {
                    type: "integer",
                  },
                },
                required: ["failoverPolicy"],
              },
              readOnlyEndpoint: {
                type: "object",
                properties: {
                  failoverPolicy: {
                    type: "string",
                  },
                },
              },
              replicationRole: {
                type: "string",
              },
              replicationState: {
                type: "string",
              },
              partnerRegions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    location: {
                      type: "string",
                    },
                    replicationRole: {
                      type: "string",
                    },
                  },
                },
              },
              managedInstancePairs: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    primaryManagedInstanceId: {
                      type: "string",
                    },
                    partnerManagedInstanceId: {
                      type: "string",
                    },
                  },
                },
              },
            },
            required: [
              "readWriteEndpoint",
              "partnerRegions",
              "managedInstancePairs",
            ],
          },
        },
      },
    },
  },
};

export default InstanceFailoverGroups_Failover;
