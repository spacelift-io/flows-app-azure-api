import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SecurityUserRuleCollections_Delete: AppBlock = {
  name: "Security User Rule Collections / Delete",
  description: "Deletes a Security User Rule collection.",
  category: "Security User Rule Collections",
  inputs: {
    default: {
      config: {
        networkManagerName: {
          name: "Network Manager Name",
          description: "Name of the network manager",
          type: "string",
          required: true,
        },
        configurationName: {
          name: "Configuration Name",
          description: "Name of the configuration",
          type: "string",
          required: true,
        },
        ruleCollectionName: {
          name: "Rule Collection Name",
          description: "Name of the rule collection",
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
        force: {
          name: "Force",
          description:
            "Deletes the resource even if it is part of a deployed configuration. If the configuration has been deployed, the service will do a cleanup deployment in the background, prior to the delete.",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/securityUserConfigurations/${input.event.inputConfig.configurationName}/ruleCollections/${input.event.inputConfig.ruleCollectionName}` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.force
            ? `&force=${input.event.inputConfig.force}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "DELETE",
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
        additionalProperties: true,
      },
    },
  },
};

export default SecurityUserRuleCollections_Delete;
