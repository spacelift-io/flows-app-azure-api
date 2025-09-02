import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ObjectReplicationPolicies_List: AppBlock = {
  name: "Object Replication Policies / List",
  description:
    "List the object replication policies associated with the storage account.",
  category: "Object Replication Policies",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/objectReplicationPolicies` +
          "?api-version=2025-01-01";

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
                properties: {
                  type: "object",
                  properties: {
                    policyId: {
                      type: "string",
                    },
                    enabledTime: {
                      type: "string",
                    },
                    sourceAccount: {
                      type: "string",
                    },
                    destinationAccount: {
                      type: "string",
                    },
                    rules: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          ruleId: {
                            type: "string",
                          },
                          sourceContainer: {
                            type: "string",
                          },
                          destinationContainer: {
                            type: "string",
                          },
                          filters: {
                            type: "object",
                            properties: {
                              prefixMatch: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              minCreationTime: {
                                type: "string",
                              },
                            },
                          },
                        },
                        required: ["sourceContainer", "destinationContainer"],
                      },
                    },
                    metrics: {
                      type: "object",
                      properties: {
                        enabled: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                  required: ["sourceAccount", "destinationAccount"],
                },
              },
            },
          },
        },
      },
    },
  },
};

export default ObjectReplicationPolicies_List;
