import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_GetSourceControlSlot: AppBlock = {
  name: "Web Apps / Get Source Control Slot",
  description:
    "Description for Gets the source control configuration of an app.",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        slot: {
          name: "Slot",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/sourcecontrols/web` +
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
              repoUrl: {
                type: "string",
              },
              branch: {
                type: "string",
              },
              isManualIntegration: {
                type: "boolean",
              },
              isGitHubAction: {
                type: "boolean",
              },
              deploymentRollbackEnabled: {
                type: "boolean",
              },
              isMercurial: {
                type: "boolean",
              },
              gitHubActionConfiguration: {
                type: "object",
                properties: {
                  codeConfiguration: {
                    type: "object",
                    properties: {
                      runtimeStack: {
                        type: "string",
                      },
                      runtimeVersion: {
                        type: "string",
                      },
                    },
                  },
                  containerConfiguration: {
                    type: "object",
                    properties: {
                      serverUrl: {
                        type: "string",
                      },
                      imageName: {
                        type: "string",
                      },
                      username: {
                        type: "string",
                      },
                      password: {
                        type: "string",
                      },
                    },
                  },
                  isLinux: {
                    type: "boolean",
                  },
                  generateWorkflowFile: {
                    type: "boolean",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_GetSourceControlSlot;
