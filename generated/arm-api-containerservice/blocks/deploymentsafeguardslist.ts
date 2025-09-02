import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeploymentSafeguards_List: AppBlock = {
  name: "Deployment Safeguards / List",
  description: "List DeploymentSafeguards by parent resource",
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
          `https://management.azure.com/${input.event.inputConfig.resourceUri}/providers/Microsoft.ContainerService/deploymentSafeguards` +
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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default DeploymentSafeguards_List;
