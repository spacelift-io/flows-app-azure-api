import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CloudServiceRoleInstances_Reimage: AppBlock = {
  name: "Cloud Service Role Instances / Reimage",
  description:
    "The Reimage Role Instance asynchronous operation reinstalls the operating system on instances of web roles or worker roles.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/cloudServices/${input.event.inputConfig.cloudServiceName}/roleInstances/${input.event.inputConfig.roleInstanceName}/reimage` +
          "?api-version=2024-11-04";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
        additionalProperties: true,
      },
    },
  },
};

export default CloudServiceRoleInstances_Reimage;
