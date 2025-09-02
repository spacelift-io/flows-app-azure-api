import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedInstanceDtcs_ListByManagedInstance: AppBlock = {
  name: "Managed Instance Dtcs / List By Managed Instance",
  description: "Gets a list of managed instance DTC settings.",
  category: "Managed Instance Dtcs",
  inputs: {
    default: {
      config: {
        managedInstanceName: {
          name: "Managed Instance Name",
          description: "Name of the managed instance",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/dtc` +
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
                properties: {
                  type: "object",
                  properties: {
                    dtcEnabled: {
                      type: "boolean",
                    },
                    securitySettings: {
                      type: "object",
                      properties: {
                        transactionManagerCommunicationSettings: {
                          type: "object",
                          properties: {
                            allowInboundEnabled: {
                              type: "boolean",
                            },
                            allowOutboundEnabled: {
                              type: "boolean",
                            },
                            authentication: {
                              type: "string",
                            },
                          },
                        },
                        xaTransactionsEnabled: {
                          type: "boolean",
                        },
                        snaLu6point2TransactionsEnabled: {
                          type: "boolean",
                        },
                        xaTransactionsDefaultTimeout: {
                          type: "integer",
                        },
                        xaTransactionsMaximumTimeout: {
                          type: "integer",
                        },
                      },
                    },
                    externalDnsSuffixSearchList: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    dtcHostNameDnsSuffix: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                  },
                },
              },
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

export default ManagedInstanceDtcs_ListByManagedInstance;
