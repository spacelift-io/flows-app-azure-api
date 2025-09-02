import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AgentPools_DeleteMachines: AppBlock = {
  name: "Agent Pools / Delete Machines",
  description: "Deletes specific machines in an agent pool.",
  category: "Agent Pools",
  inputs: {
    default: {
      config: {
        resourceName: {
          name: "Resource Name",
          description: "Name of the resource",
          type: "string",
          required: true,
        },
        agentPoolName: {
          name: "Agent Pool Name",
          description: "Name of the agent pool",
          type: "string",
          required: true,
        },
        machines: {
          name: "Machines",
          description: "A list of machines from the agent pool to be deleted.",
          type: {
            type: "object",
            properties: {
              machineNames: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: ["machineNames"],
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
        const requestBody = input.event.inputConfig.machines;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/${input.event.inputConfig.resourceName}/agentPools/${input.event.inputConfig.agentPoolName}/deleteMachines` +
          "?api-version=2025-07-01";

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
        additionalProperties: true,
      },
    },
  },
};

export default AgentPools_DeleteMachines;
