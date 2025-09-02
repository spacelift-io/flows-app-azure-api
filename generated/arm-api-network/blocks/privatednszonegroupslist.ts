import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PrivateDnsZoneGroups_List: AppBlock = {
  name: "Private Dns Zone Groups / List",
  description: "Gets all private dns zone groups in a private endpoint.",
  category: "Private Dns Zone Groups",
  inputs: {
    default: {
      config: {
        privateEndpointName: {
          name: "Private Endpoint Name",
          description: "Name of the private endpoint",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/privateEndpoints/${input.event.inputConfig.privateEndpointName}/privateDnsZoneGroups` +
          "?api-version=2024-10-01";

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
                name: {
                  type: "string",
                },
                etag: {
                  type: "string",
                },
                properties: {
                  type: "object",
                  properties: {
                    provisioningState: {
                      type: "string",
                    },
                    privateDnsZoneConfigs: {
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
                              privateDnsZoneId: {
                                type: "string",
                              },
                              recordSets: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    recordType: {
                                      type: "string",
                                    },
                                    recordSetName: {
                                      type: "string",
                                    },
                                    fqdn: {
                                      type: "string",
                                    },
                                    provisioningState: {
                                      type: "string",
                                    },
                                    ttl: {
                                      type: "integer",
                                    },
                                    ipAddresses: {
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

export default PrivateDnsZoneGroups_List;
