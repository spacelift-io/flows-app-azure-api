import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRouteCircuitAuthorizations_List: AppBlock = {
  name: "Express Route Circuit Authorizations / List",
  description: "Gets all authorizations in an express route circuit.",
  category: "Express Route Circuit Authorizations",
  inputs: {
    default: {
      config: {
        circuitName: {
          name: "Circuit Name",
          description: "Name of the circuit",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/${input.event.inputConfig.circuitName}/authorizations` +
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
                    authorizationKey: {
                      type: "string",
                    },
                    authorizationUseStatus: {
                      type: "string",
                    },
                    connectionResourceUri: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                  },
                },
                name: {
                  type: "string",
                },
                etag: {
                  type: "string",
                },
                type: {
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

export default ExpressRouteCircuitAuthorizations_List;
