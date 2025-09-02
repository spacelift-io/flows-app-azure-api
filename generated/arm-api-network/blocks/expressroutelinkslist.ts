import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRouteLinks_List: AppBlock = {
  name: "Express Route Links / List",
  description:
    "Retrieve the ExpressRouteLink sub-resources of the specified ExpressRoutePort resource.",
  category: "Express Route Links",
  inputs: {
    default: {
      config: {
        expressRoutePortName: {
          name: "Express Route Port Name",
          description: "Name of the express route port",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/ExpressRoutePorts/${input.event.inputConfig.expressRoutePortName}/links` +
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ExpressRouteLinks_List;
