import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkManagerDeploymentStatus_List: AppBlock = {
  name: "Network Manager Deployment Status / List",
  description: "Post to List of Network Manager Deployment Status.",
  category: "Network Manager Deployment Status",
  inputs: {
    default: {
      config: {
        networkManagerName: {
          name: "Network Manager Name",
          description: "Name of the network manager",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              regions: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              deploymentTypes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              skipToken: {
                type: "string",
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
        $top: {
          name: "Top",
          type: "number",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/listDeploymentStatus` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.$top
            ? `&$top=${input.event.inputConfig.$top}`
            : "");

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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                commitTime: {
                  type: "string",
                },
                region: {
                  type: "string",
                },
                deploymentStatus: {
                  type: "string",
                },
                configurationIds: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                deploymentType: {
                  type: "string",
                },
                errorMessage: {
                  type: "string",
                },
              },
            },
          },
          skipToken: {
            type: "string",
          },
        },
      },
    },
  },
};

export default NetworkManagerDeploymentStatus_List;
