import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DataMaskingPolicies_CreateOrUpdate: AppBlock = {
  name: "Data Masking Policies / Create Or Update",
  description: "Creates or updates a database data masking policy.",
  category: "Data Masking Policies",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        databaseName: {
          name: "Database Name",
          description: "Name of the database",
          type: "string",
          required: true,
        },
        dataMaskingPolicyName: {
          name: "Data Masking Policy Name",
          description: "Name of the data masking policy",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              location: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              properties: {
                type: "object",
                properties: {
                  dataMaskingState: {
                    type: "string",
                  },
                  exemptPrincipals: {
                    type: "string",
                  },
                  applicationPrincipals: {
                    type: "string",
                  },
                  maskingLevel: {
                    type: "string",
                  },
                },
                required: ["dataMaskingState"],
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/dataMaskingPolicies/${input.event.inputConfig.dataMaskingPolicyName}` +
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
          location: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              dataMaskingState: {
                type: "string",
              },
              exemptPrincipals: {
                type: "string",
              },
              applicationPrincipals: {
                type: "string",
              },
              maskingLevel: {
                type: "string",
              },
            },
            required: ["dataMaskingState"],
          },
        },
      },
    },
  },
};

export default DataMaskingPolicies_CreateOrUpdate;
