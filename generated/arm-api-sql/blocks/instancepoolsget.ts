import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const InstancePools_Get: AppBlock = {
  name: "Instance Pools / Get",
  description: "Gets an instance pool.",
  category: "Instance Pools",
  inputs: {
    default: {
      config: {
        instancePoolName: {
          name: "Instance Pool Name",
          description: "Name of the instance pool",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/instancePools/${input.event.inputConfig.instancePoolName}` +
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
          sku: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              tier: {
                type: "string",
              },
              size: {
                type: "string",
              },
              family: {
                type: "string",
              },
              capacity: {
                type: "integer",
              },
            },
            required: ["name"],
          },
          properties: {
            type: "object",
            properties: {
              subnetId: {
                type: "string",
              },
              vCores: {
                type: "integer",
              },
              licenseType: {
                type: "string",
              },
              dnsZone: {
                type: "string",
              },
              maintenanceConfigurationId: {
                type: "string",
              },
            },
            required: ["subnetId", "vCores", "licenseType"],
          },
        },
        required: ["location"],
      },
    },
  },
};

export default InstancePools_Get;
