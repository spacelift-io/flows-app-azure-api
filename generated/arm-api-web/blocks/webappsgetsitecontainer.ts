import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_GetSiteContainer: AppBlock = {
  name: "Web Apps / Get Site Container",
  description: "Gets a site container of a site, or a deployment slot.",
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
        containerName: {
          name: "Container Name",
          description: "Name of the container",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/sitecontainers/${input.event.inputConfig.containerName}` +
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
              image: {
                type: "string",
              },
              targetPort: {
                type: "string",
              },
              isMain: {
                type: "boolean",
              },
              startUpCommand: {
                type: "string",
              },
              authType: {
                type: "string",
              },
              userName: {
                type: "string",
              },
              passwordSecret: {
                type: "string",
              },
              userManagedIdentityClientId: {
                type: "string",
              },
              createdTime: {
                type: "string",
              },
              lastModifiedTime: {
                type: "string",
              },
              volumeMounts: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    volumeSubPath: {
                      type: "string",
                    },
                    containerMountPath: {
                      type: "string",
                    },
                    data: {
                      type: "string",
                    },
                    readOnly: {
                      type: "boolean",
                    },
                  },
                  required: ["volumeSubPath", "containerMountPath"],
                },
              },
              inheritAppSettingsAndConnectionStrings: {
                type: "boolean",
              },
              environmentVariables: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    value: {
                      type: "string",
                    },
                  },
                  required: ["name", "value"],
                },
              },
            },
            required: ["image", "isMain"],
          },
        },
      },
    },
  },
};

export default WebApps_GetSiteContainer;
