import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedInstanceDtcs_CreateOrUpdate: AppBlock = {
  name: "Managed Instance Dtcs / Create Or Update",
  description: "Updates managed instance DTC settings.",
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
        dtcName: {
          name: "Dtc Name",
          description: "Name of the dtc",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Managed instance DTC settings.",
          type: {
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
                        type: "number",
                      },
                      xaTransactionsMaximumTimeout: {
                        type: "number",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/dtc/${input.event.inputConfig.dtcName}` +
          "?api-version=2023-08-01";

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
  },
};

export default ManagedInstanceDtcs_CreateOrUpdate;
