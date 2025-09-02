import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeploymentSafeguards_Get: AppBlock = {
  name: "Deployment Safeguards / Get",
  description: "Fetch a deployment safeguard by name",
  category: "Deployment Safeguards",
  inputs: {
    default: {
      config: {
        resourceUri: {
          name: "Resource Uri",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/${input.event.inputConfig.resourceUri}/providers/Microsoft.ContainerService/deploymentSafeguards/default` +
          "?api-version=2025-07-01";

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
              provisioningState: {
                type: "string",
              },
              level: {
                type: "string",
              },
              excludedNamespaces: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              systemExcludedNamespaces: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              podSecurityStandardsLevel: {
                type: "string",
              },
            },
            required: ["level", "systemExcludedNamespaces"],
          },
          eTag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default DeploymentSafeguards_Get;
