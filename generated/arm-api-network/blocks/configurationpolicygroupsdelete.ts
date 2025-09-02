import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ConfigurationPolicyGroups_Delete: AppBlock = {
  name: "Configuration Policy Groups / Delete",
  description: "Deletes a ConfigurationPolicyGroup.",
  category: "Configuration Policy Groups",
  inputs: {
    default: {
      config: {
        vpnServerConfigurationName: {
          name: "Vpn Server Configuration Name",
          description: "Name of the vpn server configuration",
          type: "string",
          required: true,
        },
        configurationPolicyGroupName: {
          name: "Configuration Policy Group Name",
          description: "Name of the configuration policy group",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/${input.event.inputConfig.vpnServerConfigurationName}/configurationPolicyGroups/${input.event.inputConfig.configurationPolicyGroupName}` +
          "?api-version=2024-10-01";

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

export default ConfigurationPolicyGroups_Delete;
