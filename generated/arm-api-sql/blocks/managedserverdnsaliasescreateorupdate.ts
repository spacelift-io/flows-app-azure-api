import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedServerDnsAliases_CreateOrUpdate: AppBlock = {
  name: "Managed Server Dns Aliases / Create Or Update",
  description: "Creates a managed server DNS alias.",
  category: "Managed Server Dns Aliases",
  inputs: {
    default: {
      config: {
        managedInstanceName: {
          name: "Managed Instance Name",
          description: "Name of the managed instance",
          type: "string",
          required: true,
        },
        dnsAliasName: {
          name: "DNS Alias Name",
          description: "Name of the dns alias",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              createDnsRecord: {
                type: "boolean",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/dnsAliases/${input.event.inputConfig.dnsAliasName}` +
          "?api-version=2023-08-01";

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
              azureDnsRecord: {
                type: "string",
              },
              publicAzureDnsRecord: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default ManagedServerDnsAliases_CreateOrUpdate;
