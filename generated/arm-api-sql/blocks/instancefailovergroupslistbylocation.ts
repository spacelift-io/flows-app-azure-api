import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const InstanceFailoverGroups_ListByLocation: AppBlock = {
  name: "Instance Failover Groups / List By Location",
  description: "Lists the failover groups in a location.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/locations/${input.event.inputConfig.locationName}/instanceFailoverGroups` +
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default InstanceFailoverGroups_ListByLocation;
