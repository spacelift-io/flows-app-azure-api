import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_CreateMSDeployOperation: AppBlock = {
  name: "Web Apps / Create MS Deploy Operation",
  description: "Description for Invoke the MSDeploy web app extension.",
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
        MSDeploy: {
          name: "Ms Deploy",
          description: "Details of MSDeploy operation",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  addOnPackages: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        packageUri: {
                          type: "string",
                        },
                        connectionString: {
                          type: "string",
                        },
                        dbType: {
                          type: "string",
                        },
                        setParametersXmlFileUri: {
                          type: "string",
                        },
                        setParameters: {
                          type: "object",
                          additionalProperties: true,
                        },
                        skipAppData: {
                          type: "boolean",
                        },
                        appOffline: {
                          type: "boolean",
                        },
                      },
                    },
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
        const requestBody = input.event.inputConfig.MSDeploy;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/extensions/MSDeploy` +
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
        additionalProperties: true,
      },
    },
  },
};

export default WebApps_CreateMSDeployOperation;
