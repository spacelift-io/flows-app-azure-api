import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRoutePorts_GenerateLOA: AppBlock = {
  name: "Express Route Ports / Generate LOA",
  description:
    "Generate a letter of authorization for the requested ExpressRoutePort resource.",
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
        request: {
          name: "Request",
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
        const requestBody = input.event.inputConfig.request;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/expressRoutePorts/${input.event.inputConfig.expressRoutePortName}/generateLoa` +
          "?api-version=2024-10-01";

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
          encodedContent: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ExpressRoutePorts_GenerateLOA;
