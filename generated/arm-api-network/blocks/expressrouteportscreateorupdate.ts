import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRoutePorts_CreateOrUpdate: AppBlock = {
  name: "Express Route Ports / Create Or Update",
  description: "Creates or updates the specified ExpressRoutePort resource.",
  category: "Express Route Ports",
  inputs: {
    default: {
      config: {
        expressRoutePortName: {
          name: "Express Route Port Name",
          description: "Name of the express route port",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/ExpressRoutePorts/${input.event.inputConfig.expressRoutePortName}` +
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
              peeringLocation: {
                type: "string",
              },
              bandwidthInGbps: {
                type: "integer",
              },
              provisionedBandwidthInGbps: {
                type: "number",
              },
              mtu: {
                type: "string",
              },
              encapsulation: {
                type: "string",
              },
              etherType: {
                type: "string",
              },
              allocationDate: {
                type: "string",
              },
              links: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        routerName: {
                          type: "string",
                        },
                        interfaceName: {
                          type: "string",
                        },
                        patchPanelId: {
                          type: "string",
                        },
                        rackId: {
                          type: "string",
                        },
                        coloLocation: {
                          type: "string",
                        },
                        connectorType: {
                          type: "string",
                        },
                        adminState: {
                          type: "string",
                        },
                        provisioningState: {
                          type: "string",
                        },
                        macSecConfig: {
                          type: "object",
                          properties: {
                            cknSecretIdentifier: {
                              type: "string",
                            },
                            cakSecretIdentifier: {
                              type: "string",
                            },
                            cipher: {
                              type: "string",
                            },
                            sciState: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                    name: {
                      type: "string",
                    },
                    etag: {
                      type: "string",
                    },
                  },
                },
              },
              circuits: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
              resourceGuid: {
                type: "string",
              },
              billingType: {
                type: "string",
              },
            },
          },
          etag: {
            type: "string",
          },
          identity: {
            type: "object",
            properties: {
              principalId: {
                type: "string",
              },
              tenantId: {
                type: "string",
              },
              type: {
                type: "string",
              },
              userAssignedIdentities: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
        },
      },
    },
  },
};

export default ExpressRoutePorts_CreateOrUpdate;
