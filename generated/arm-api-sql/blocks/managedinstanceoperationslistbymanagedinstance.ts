import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedInstanceOperations_ListByManagedInstance: AppBlock = {
  name: "Managed Instance Operations / List By Managed Instance",
  description: "Gets a list of operations performed on the managed instance.",
  category: "Managed Instance Operations",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/operations` +
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
                    managedInstanceName: {
                      type: "string",
                    },
                    operation: {
                      type: "string",
                    },
                    operationFriendlyName: {
                      type: "string",
                    },
                    percentComplete: {
                      type: "integer",
                    },
                    startTime: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    errorCode: {
                      type: "integer",
                    },
                    errorDescription: {
                      type: "string",
                    },
                    errorSeverity: {
                      type: "integer",
                    },
                    isUserError: {
                      type: "boolean",
                    },
                    estimatedCompletionTime: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    isCancellable: {
                      type: "boolean",
                    },
                    operationParameters: {
                      type: "object",
                      properties: {
                        currentParameters: {
                          type: "object",
                          properties: {
                            family: {
                              type: "string",
                            },
                            tier: {
                              type: "string",
                            },
                            vCores: {
                              type: "integer",
                            },
                            storageSizeInGB: {
                              type: "integer",
                            },
                          },
                        },
                        requestedParameters: {
                          type: "object",
                          properties: {
                            family: {
                              type: "object",
                              additionalProperties: true,
                            },
                            tier: {
                              type: "object",
                              additionalProperties: true,
                            },
                            vCores: {
                              type: "object",
                              additionalProperties: true,
                            },
                            storageSizeInGB: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                      },
                    },
                    operationSteps: {
                      type: "object",
                      properties: {
                        totalSteps: {
                          type: "string",
                        },
                        currentStep: {
                          type: "integer",
                        },
                        stepsList: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              stepStartTime: {
                                type: "string",
                              },
                              stepEndTime: {
                                type: "string",
                              },
                              timeElapsed: {
                                type: "string",
                              },
                              order: {
                                type: "integer",
                              },
                              name: {
                                type: "string",
                              },
                              status: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
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

export default ManagedInstanceOperations_ListByManagedInstance;
