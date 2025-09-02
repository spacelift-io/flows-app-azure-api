import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RouteFilterRules_CreateOrUpdate: AppBlock = {
  name: "Route Filter Rules / Create Or Update",
  description: "Creates or updates a route in the specified route filter.",
  category: "Route Filter Rules",
  inputs: {
    default: {
      config: {
        routeFilterName: {
          name: "Route Filter Name",
          description: "Name of the route filter",
          type: "string",
          required: true,
        },
        ruleName: {
          name: "Rule Name",
          description: "Name of the rule",
          type: "string",
          required: true,
        },
        routeFilterRuleParameters: {
          name: "Route Filter Rule Parameters",
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
        const requestBody = input.event.inputConfig.routeFilterRuleParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/routeFilters/${input.event.inputConfig.routeFilterName}/routeFilterRules/${input.event.inputConfig.ruleName}` +
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
              access: {
                type: "string",
              },
              routeFilterRuleType: {
                type: "string",
              },
              communities: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              provisioningState: {
                type: "string",
              },
            },
            required: ["access", "routeFilterRuleType", "communities"],
          },
          name: {
            type: "string",
          },
          location: {
            type: "string",
          },
          etag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default RouteFilterRules_CreateOrUpdate;
