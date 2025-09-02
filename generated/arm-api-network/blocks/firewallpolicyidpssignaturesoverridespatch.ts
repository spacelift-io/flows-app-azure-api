import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FirewallPolicyIdpsSignaturesOverrides_Patch: AppBlock = {
  name: "Firewall Policy Idps Signatures Overrides / Patch",
  description:
    "Will update the status of policy's signature overrides for IDPS",
  category: "Firewall Policy Idps Signatures Overrides",
  inputs: {
    default: {
      config: {
        firewallPolicyName: {
          name: "Firewall Policy Name",
          description: "Name of the firewall policy",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Will contain all properties of the object to put",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              id: {
                type: "string",
              },
              type: {
                type: "string",
              },
              properties: {
                type: "object",
                properties: {
                  signatures: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/firewallPolicies/${input.event.inputConfig.firewallPolicyName}/signatureOverrides/default` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
          name: {
            type: "string",
          },
          id: {
            type: "string",
          },
          type: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              signatures: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
        },
      },
    },
  },
};

export default FirewallPolicyIdpsSignaturesOverrides_Patch;
