import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DedicatedHostGroups_CreateOrUpdate: AppBlock = {
  name: "Dedicated Host Groups / Create Or Update",
  description:
    "Create or update a dedicated host group. For details of Dedicated Host and Dedicated Host Groups please see [Dedicated Host Documentation] (https://go.microsoft.com/fwlink/?linkid=2082596)",
  category: "Dedicated Host Groups",
  inputs: {
    default: {
      config: {
        hostGroupName: {
          name: "Host Group Name",
          description: "Name of the host group",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  platformFaultDomainCount: {
                    type: "number",
                  },
                  hosts: {
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
                  instanceView: {
                    type: "object",
                    properties: {
                      hosts: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  supportAutomaticPlacement: {
                    type: "boolean",
                  },
                  additionalCapabilities: {
                    type: "object",
                    properties: {
                      ultraSSDEnabled: {
                        type: "boolean",
                      },
                    },
                  },
                },
                required: ["platformFaultDomainCount"],
              },
              zones: {
                type: "array",
                items: {
                  type: "string",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/hostGroups/${input.event.inputConfig.hostGroupName}` +
          "?api-version=2024-11-01";

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
              platformFaultDomainCount: {
                type: "integer",
              },
              hosts: {
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
              instanceView: {
                type: "object",
                properties: {
                  hosts: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              supportAutomaticPlacement: {
                type: "boolean",
              },
              additionalCapabilities: {
                type: "object",
                properties: {
                  ultraSSDEnabled: {
                    type: "boolean",
                  },
                },
              },
            },
            required: ["platformFaultDomainCount"],
          },
          zones: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

export default DedicatedHostGroups_CreateOrUpdate;
