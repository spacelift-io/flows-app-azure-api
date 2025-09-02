import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WorkflowVersions_List: AppBlock = {
  name: "Workflow Versions / List",
  description: "Gets a list of workflow versions.",
  category: "Workflow Versions",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        workflowName: {
          name: "Workflow Name",
          description: "Name of the workflow",
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
        $top: {
          name: "Top",
          description: "The number of items to be included in the result.",
          type: "number",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/${input.event.inputConfig.workflowName}/versions` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.$top
            ? `&$top=${input.event.inputConfig.$top}`
            : "");

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
                    provisioningState: {
                      type: "string",
                    },
                    createdTime: {
                      type: "string",
                    },
                    changedTime: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    version: {
                      type: "string",
                    },
                    accessEndpoint: {
                      type: "string",
                    },
                    endpointsConfiguration: {
                      type: "object",
                      properties: {
                        workflow: {
                          type: "object",
                          properties: {
                            outgoingIpAddresses: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  address: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            accessEndpointIpAddresses: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  address: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                },
                              },
                            },
                          },
                        },
                        connector: {
                          type: "object",
                          properties: {
                            outgoingIpAddresses: {
                              type: "object",
                              additionalProperties: true,
                            },
                            accessEndpointIpAddresses: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                      },
                    },
                    accessControl: {
                      type: "object",
                      properties: {
                        triggers: {
                          type: "object",
                          properties: {
                            allowedCallerIpAddresses: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  addressRange: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            openAuthenticationPolicies: {
                              type: "object",
                              properties: {
                                policies: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                          },
                        },
                        contents: {
                          type: "object",
                          properties: {
                            allowedCallerIpAddresses: {
                              type: "object",
                              additionalProperties: true,
                            },
                            openAuthenticationPolicies: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                        actions: {
                          type: "object",
                          properties: {
                            allowedCallerIpAddresses: {
                              type: "object",
                              additionalProperties: true,
                            },
                            openAuthenticationPolicies: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                        workflowManagement: {
                          type: "object",
                          properties: {
                            allowedCallerIpAddresses: {
                              type: "object",
                              additionalProperties: true,
                            },
                            openAuthenticationPolicies: {
                              type: "object",
                              additionalProperties: true,
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
                        plan: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            name: {
                              type: "string",
                            },
                            type: {
                              type: "string",
                            },
                          },
                        },
                      },
                      required: ["name"],
                    },
                    integrationAccount: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                        name: {
                          type: "object",
                          additionalProperties: true,
                        },
                        type: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    definition: {
                      type: "object",
                      properties: {},
                    },
                    parameters: {
                      type: "object",
                      additionalProperties: true,
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

export default WorkflowVersions_List;
