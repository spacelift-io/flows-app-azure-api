import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CloudServiceRoleInstances_GetInstanceView: AppBlock = {
  name: "Cloud Service Role Instances / Get Instance View",
  description:
    "Retrieves information about the run-time state of a role instance in a cloud service.",
  category: "Cloud Service Role Instances",
  inputs: {
    default: {
      config: {
        cloudServiceName: {
          name: "Cloud Service Name",
          description: "Name of the cloud service",
          type: "string",
          required: true,
        },
        roleInstanceName: {
          name: "Role Instance Name",
          description: "Name of the role instance",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/cloudServices/${input.event.inputConfig.cloudServiceName}/roleInstances/${input.event.inputConfig.roleInstanceName}/instanceView` +
          "?api-version=2024-11-04";

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
          platformUpdateDomain: {
            type: "integer",
          },
          platformFaultDomain: {
            type: "integer",
          },
          privateId: {
            type: "string",
          },
          statuses: {
            type: "array",
            items: {
              type: "object",
              properties: {
                code: {
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
                level: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default CloudServiceRoleInstances_GetInstanceView;
