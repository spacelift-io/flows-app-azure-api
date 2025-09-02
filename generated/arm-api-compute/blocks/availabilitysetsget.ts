import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AvailabilitySets_Get: AppBlock = {
  name: "Availability Sets / Get",
  description: "Retrieves information about an availability set.",
  category: "Availability Sets",
  inputs: {
    default: {
      config: {
        availabilitySetName: {
          name: "Availability Set Name",
          description: "Name of the availability set",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/availabilitySets/${input.event.inputConfig.availabilitySetName}` +
          "?api-version=2024-11-01";

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
          properties: {
            type: "object",
            properties: {
              platformUpdateDomainCount: {
                type: "integer",
              },
              platformFaultDomainCount: {
                type: "integer",
              },
              virtualMachines: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                  },
                },
              },
              proximityPlacementGroup: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              statuses: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                    },
                    level: {
                      type: "string",
                    },
                    displayStatus: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                    time: {
                      type: "string",
                    },
                  },
                },
              },
              scheduledEventsPolicy: {
                type: "object",
                properties: {
                  userInitiatedRedeploy: {
                    type: "object",
                    properties: {
                      automaticallyApprove: {
                        type: "boolean",
                      },
                    },
                  },
                  userInitiatedReboot: {
                    type: "object",
                    properties: {
                      automaticallyApprove: {
                        type: "boolean",
                      },
                    },
                  },
                  scheduledEventsAdditionalPublishingTargets: {
                    type: "object",
                    properties: {
                      eventGridAndResourceGraph: {
                        type: "object",
                        properties: {
                          enable: {
                            type: "boolean",
                          },
                        },
                      },
                    },
                  },
                },
              },
              virtualMachineScaleSetMigrationInfo: {
                type: "object",
                properties: {
                  defaultVirtualMachineScaleSetInfo: {
                    type: "object",
                    properties: {
                      constrainedMaximumCapacity: {
                        type: "boolean",
                      },
                      defaultVirtualMachineScaleSet: {
                        type: "object",
                        properties: {
                          id: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                  },
                  migrateToVirtualMachineScaleSet: {
                    type: "object",
                    properties: {
                      id: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                },
              },
            },
          },
          sku: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              tier: {
                type: "string",
              },
              capacity: {
                type: "integer",
              },
            },
          },
        },
      },
    },
  },
};

export default AvailabilitySets_Get;
