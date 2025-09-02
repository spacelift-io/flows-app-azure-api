import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRoutePortAuthorizations_CreateOrUpdate: AppBlock = {
  name: "Express Route Port Authorizations / Create Or Update",
  description:
    "Creates or updates an authorization in the specified express route port.",
  category: "Express Route Port Authorizations",
  inputs: {
    default: {
      config: {
        expressRoutePortName: {
          name: "Express Route Port Name",
          description: "Name of the express route port",
          type: "string",
          required: true,
        },
        authorizationName: {
          name: "Authorization Name",
          description: "Name of the authorization",
          type: "string",
          required: true,
        },
        authorizationParameters: {
          name: "Authorization Parameters",
          type: {
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
                  circuitResourceUri: {
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
        const requestBody = input.event.inputConfig.authorizationParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/expressRoutePorts/${input.event.inputConfig.expressRoutePortName}/authorizations/${input.event.inputConfig.authorizationName}` +
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
              authorizationKey: {
                type: "string",
              },
              authorizationUseStatus: {
                type: "string",
              },
              circuitResourceUri: {
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
  },
};

export default ExpressRoutePortAuthorizations_CreateOrUpdate;
