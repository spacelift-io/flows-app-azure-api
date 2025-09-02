import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ListActiveSecurityAdminRules: AppBlock = {
  name: "List Active Security Admin Rules",
  description: "Lists active security admin rules in a network manager.",
  category: "General",
  inputs: {
    default: {
      config: {
        networkManagerName: {
          name: "Network Manager Name",
          description: "Name of the network manager",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              regions: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              skipToken: {
                type: "string",
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
        $top: {
          name: "Top",
          type: "number",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/listActiveSecurityAdminRules` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.$top
            ? `&$top=${input.event.inputConfig.$top}`
            : "");

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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                commitTime: {
                  type: "string",
                },
                region: {
                  type: "string",
                },
                configurationDescription: {
                  type: "string",
                },
                ruleCollectionDescription: {
                  type: "string",
                },
                ruleCollectionAppliesToGroups: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      networkGroupId: {
                        type: "string",
                      },
                    },
                    required: ["networkGroupId"],
                  },
                },
                ruleGroups: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      properties: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          memberType: {
                            type: "string",
                          },
                          provisioningState: {
                            type: "string",
                          },
                          resourceGuid: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
                kind: {
                  type: "string",
                },
              },
              required: ["kind"],
            },
          },
          skipToken: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ListActiveSecurityAdminRules;
