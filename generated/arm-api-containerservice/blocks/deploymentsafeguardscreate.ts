import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeploymentSafeguards_Create: AppBlock = {
  name: "Deployment Safeguards / Create",
  description: "Creates or updates a deploymentSafeguard",
  category: "Deployment Safeguards",
  inputs: {
    default: {
      config: {
        resourceUri: {
          name: "Resource Uri",
          type: "string",
          required: true,
        },
        resource: {
          name: "Resource",
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
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.resource;

        const url =
          `https://management.azure.com/${input.event.inputConfig.resourceUri}/providers/Microsoft.ContainerService/deploymentSafeguards/default` +
          "?api-version=2025-07-01";

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

export default DeploymentSafeguards_Create;
