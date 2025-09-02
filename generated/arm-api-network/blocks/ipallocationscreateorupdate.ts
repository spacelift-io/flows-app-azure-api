import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const IpAllocations_CreateOrUpdate: AppBlock = {
  name: "Ip Allocations / Create Or Update",
  description:
    "Creates or updates an IpAllocation in the specified resource group.",
  category: "Ip Allocations",
  inputs: {
    default: {
      config: {
        ipAllocationName: {
          name: "IP Allocation Name",
          description: "Name of the ip allocation",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/IpAllocations/${input.event.inputConfig.ipAllocationName}` +
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
              subnet: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
              virtualNetwork: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              type: {
                type: "string",
              },
              prefix: {
                type: "string",
              },
              prefixLength: {
                type: "integer",
              },
              prefixType: {
                type: "string",
              },
              ipamAllocationId: {
                type: "string",
              },
              allocationTags: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
          etag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default IpAllocations_CreateOrUpdate;
