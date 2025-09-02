import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ActionGroups_CreateOrUpdate: AppBlock = {
  name: "Action Groups / Create Or Update",
  description: "Create a new action group or update an existing one.",
  category: "Action Groups",
  inputs: {
    default: {
      config: {
        actionGroupName: {
          name: "Action Group Name",
          description: "Name of the action group",
          type: "string",
          required: true,
        },
        actionGroup: {
          name: "Action Group",
          description: "The action group to create or use for the update.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  groupShortName: {
                    type: "string",
                  },
                  enabled: {
                    type: "boolean",
                  },
                  emailReceivers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        emailAddress: {
                          type: "string",
                        },
                        useCommonAlertSchema: {
                          type: "boolean",
                        },
                        status: {
                          type: "string",
                        },
                      },
                      required: ["name", "emailAddress"],
                    },
                  },
                  smsReceivers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        countryCode: {
                          type: "string",
                        },
                        phoneNumber: {
                          type: "string",
                        },
                        status: {
                          type: "string",
                        },
                      },
                      required: ["name", "countryCode", "phoneNumber"],
                    },
                  },
                  webhookReceivers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        serviceUri: {
                          type: "string",
                        },
                        useCommonAlertSchema: {
                          type: "boolean",
                        },
                        useAadAuth: {
                          type: "boolean",
                        },
                        objectId: {
                          type: "string",
                        },
                        identifierUri: {
                          type: "string",
                        },
                        tenantId: {
                          type: "string",
                        },
                      },
                      required: ["name", "serviceUri"],
                    },
                  },
                  itsmReceivers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        workspaceId: {
                          type: "string",
                        },
                        connectionId: {
                          type: "string",
                        },
                        ticketConfiguration: {
                          type: "string",
                        },
                        region: {
                          type: "string",
                        },
                      },
                      required: [
                        "name",
                        "workspaceId",
                        "connectionId",
                        "ticketConfiguration",
                        "region",
                      ],
                    },
                  },
                  azureAppPushReceivers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        emailAddress: {
                          type: "string",
                        },
                      },
                      required: ["name", "emailAddress"],
                    },
                  },
                  automationRunbookReceivers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        automationAccountId: {
                          type: "string",
                        },
                        runbookName: {
                          type: "string",
                        },
                        webhookResourceId: {
                          type: "string",
                        },
                        isGlobalRunbook: {
                          type: "boolean",
                        },
                        name: {
                          type: "string",
                        },
                        serviceUri: {
                          type: "string",
                        },
                        useCommonAlertSchema: {
                          type: "boolean",
                        },
                      },
                      required: [
                        "automationAccountId",
                        "runbookName",
                        "webhookResourceId",
                        "isGlobalRunbook",
                      ],
                    },
                  },
                  voiceReceivers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        countryCode: {
                          type: "string",
                        },
                        phoneNumber: {
                          type: "string",
                        },
                      },
                      required: ["name", "countryCode", "phoneNumber"],
                    },
                  },
                  logicAppReceivers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        resourceId: {
                          type: "string",
                        },
                        callbackUrl: {
                          type: "string",
                        },
                        useCommonAlertSchema: {
                          type: "boolean",
                        },
                      },
                      required: ["name", "resourceId", "callbackUrl"],
                    },
                  },
                  azureFunctionReceivers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        functionAppResourceId: {
                          type: "string",
                        },
                        functionName: {
                          type: "string",
                        },
                        httpTriggerUrl: {
                          type: "string",
                        },
                        useCommonAlertSchema: {
                          type: "boolean",
                        },
                      },
                      required: [
                        "name",
                        "functionAppResourceId",
                        "functionName",
                        "httpTriggerUrl",
                      ],
                    },
                  },
                  armRoleReceivers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        roleId: {
                          type: "string",
                        },
                        useCommonAlertSchema: {
                          type: "boolean",
                        },
                      },
                      required: ["name", "roleId"],
                    },
                  },
                  eventHubReceivers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        eventHubNameSpace: {
                          type: "string",
                        },
                        eventHubName: {
                          type: "string",
                        },
                        useCommonAlertSchema: {
                          type: "boolean",
                        },
                        tenantId: {
                          type: "string",
                        },
                        subscriptionId: {
                          type: "string",
                        },
                      },
                      required: [
                        "name",
                        "eventHubNameSpace",
                        "eventHubName",
                        "subscriptionId",
                      ],
                    },
                  },
                },
                required: ["groupShortName", "enabled"],
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
        const requestBody = input.event.inputConfig.actionGroup;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Insights/actionGroups/${input.event.inputConfig.actionGroupName}` +
          "?api-version=2023-01-01";

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
              groupShortName: {
                type: "string",
              },
              enabled: {
                type: "boolean",
              },
              emailReceivers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    emailAddress: {
                      type: "string",
                    },
                    useCommonAlertSchema: {
                      type: "boolean",
                    },
                    status: {
                      type: "string",
                    },
                  },
                  required: ["name", "emailAddress"],
                },
              },
              smsReceivers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    countryCode: {
                      type: "string",
                    },
                    phoneNumber: {
                      type: "string",
                    },
                    status: {
                      type: "string",
                    },
                  },
                  required: ["name", "countryCode", "phoneNumber"],
                },
              },
              webhookReceivers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    serviceUri: {
                      type: "string",
                    },
                    useCommonAlertSchema: {
                      type: "boolean",
                    },
                    useAadAuth: {
                      type: "boolean",
                    },
                    objectId: {
                      type: "string",
                    },
                    identifierUri: {
                      type: "string",
                    },
                    tenantId: {
                      type: "string",
                    },
                  },
                  required: ["name", "serviceUri"],
                },
              },
              itsmReceivers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    workspaceId: {
                      type: "string",
                    },
                    connectionId: {
                      type: "string",
                    },
                    ticketConfiguration: {
                      type: "string",
                    },
                    region: {
                      type: "string",
                    },
                  },
                  required: [
                    "name",
                    "workspaceId",
                    "connectionId",
                    "ticketConfiguration",
                    "region",
                  ],
                },
              },
              azureAppPushReceivers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    emailAddress: {
                      type: "string",
                    },
                  },
                  required: ["name", "emailAddress"],
                },
              },
              automationRunbookReceivers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    automationAccountId: {
                      type: "string",
                    },
                    runbookName: {
                      type: "string",
                    },
                    webhookResourceId: {
                      type: "string",
                    },
                    isGlobalRunbook: {
                      type: "boolean",
                    },
                    name: {
                      type: "string",
                    },
                    serviceUri: {
                      type: "string",
                    },
                    useCommonAlertSchema: {
                      type: "boolean",
                    },
                  },
                  required: [
                    "automationAccountId",
                    "runbookName",
                    "webhookResourceId",
                    "isGlobalRunbook",
                  ],
                },
              },
              voiceReceivers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    countryCode: {
                      type: "string",
                    },
                    phoneNumber: {
                      type: "string",
                    },
                  },
                  required: ["name", "countryCode", "phoneNumber"],
                },
              },
              logicAppReceivers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    resourceId: {
                      type: "string",
                    },
                    callbackUrl: {
                      type: "string",
                    },
                    useCommonAlertSchema: {
                      type: "boolean",
                    },
                  },
                  required: ["name", "resourceId", "callbackUrl"],
                },
              },
              azureFunctionReceivers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    functionAppResourceId: {
                      type: "string",
                    },
                    functionName: {
                      type: "string",
                    },
                    httpTriggerUrl: {
                      type: "string",
                    },
                    useCommonAlertSchema: {
                      type: "boolean",
                    },
                  },
                  required: [
                    "name",
                    "functionAppResourceId",
                    "functionName",
                    "httpTriggerUrl",
                  ],
                },
              },
              armRoleReceivers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    roleId: {
                      type: "string",
                    },
                    useCommonAlertSchema: {
                      type: "boolean",
                    },
                  },
                  required: ["name", "roleId"],
                },
              },
              eventHubReceivers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    eventHubNameSpace: {
                      type: "string",
                    },
                    eventHubName: {
                      type: "string",
                    },
                    useCommonAlertSchema: {
                      type: "boolean",
                    },
                    tenantId: {
                      type: "string",
                    },
                    subscriptionId: {
                      type: "string",
                    },
                  },
                  required: [
                    "name",
                    "eventHubNameSpace",
                    "eventHubName",
                    "subscriptionId",
                  ],
                },
              },
            },
            required: ["groupShortName", "enabled"],
          },
        },
      },
    },
  },
};

export default ActionGroups_CreateOrUpdate;
