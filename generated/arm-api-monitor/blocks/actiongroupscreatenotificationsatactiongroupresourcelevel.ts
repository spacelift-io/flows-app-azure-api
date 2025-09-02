import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ActionGroups_CreateNotificationsAtActionGroupResourceLevel: AppBlock = {
  name: "Action Groups / Create Notifications At Action Group Resource Level",
  description: "Send test notifications to a set of provided receivers",
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
        notificationRequest: {
          name: "Notification Request",
          description:
            "The notification request body which includes the contact details",
          type: {
            type: "object",
            properties: {
              alertType: {
                type: "string",
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
            required: ["alertType"],
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
        const requestBody = input.event.inputConfig.notificationRequest;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Insights/actionGroups/${input.event.inputConfig.actionGroupName}/createNotifications` +
          "?api-version=2023-01-01";

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
          context: {
            type: "object",
            properties: {
              notificationSource: {
                type: "string",
              },
              contextType: {
                type: "string",
              },
            },
          },
          state: {
            type: "string",
          },
          completedTime: {
            type: "string",
          },
          createdTime: {
            type: "string",
          },
          actionDetails: {
            type: "array",
            items: {
              type: "object",
              properties: {
                MechanismType: {
                  type: "string",
                },
                Name: {
                  type: "string",
                },
                Status: {
                  type: "string",
                },
                SubState: {
                  type: "string",
                },
                SendTime: {
                  type: "string",
                },
                Detail: {
                  type: "string",
                },
              },
            },
          },
        },
        required: ["state"],
      },
    },
  },
};

export default ActionGroups_CreateNotificationsAtActionGroupResourceLevel;
