import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FirewallPolicyIdpsSignatures_List: AppBlock = {
  name: "Firewall Policy Idps Signatures / List",
  description:
    "Retrieves the current status of IDPS signatures for the relevant policy. Maximal amount of returned signatures is 1000.",
  category: "Firewall Policy Idps Signatures",
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
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              filters: {
                type: "object",
                items: {
                  type: "object",
                  properties: {
                    field: {
                      type: "string",
                    },
                    values: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              search: {
                type: "string",
              },
              orderBy: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                  },
                  order: {
                    type: "string",
                  },
                },
              },
              resultsPerPage: {
                type: "number",
              },
              skip: {
                type: "number",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/firewallPolicies/${input.event.inputConfig.firewallPolicyName}/listIdpsSignatures` +
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
          matchingRecordsCount: {
            type: "integer",
          },
          signatures: {
            type: "array",
            items: {
              type: "object",
              properties: {
                signatureId: {
                  type: "integer",
                },
                mode: {
                  type: "integer",
                },
                severity: {
                  type: "integer",
                },
                direction: {
                  type: "integer",
                },
                group: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                protocol: {
                  type: "string",
                },
                sourcePorts: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                destinationPorts: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                lastUpdated: {
                  type: "string",
                },
                inheritedFromParentPolicy: {
                  type: "boolean",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default FirewallPolicyIdpsSignatures_List;
