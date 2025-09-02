import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const InstancePools_List: AppBlock = {
  name: "Instance Pools / List",
  description: "Gets a list of all instance pools in the subscription.",
  category: "Instance Pools",
  inputs: {
    default: {
      config: {
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Sql/instancePools` +
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default InstancePools_List;
