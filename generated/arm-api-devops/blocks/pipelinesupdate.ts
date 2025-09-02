import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Pipelines_Update: AppBlock = {
  name: "Pipelines / Update",
  description:
    "Updates the properties of an Azure Pipeline. Currently, it is not supported on 'githubWorkflow' pipeline type and only tags can be updated for 'azurePipeline' pipeline type.",
  category: "Pipelines",
  inputs: {
    default: {
      config: {
        pipelineName: {
          name: "Pipeline Name",
          description: "Name of the pipeline",
          type: "string",
          required: true,
        },
        updateOperationParameters: {
          name: "Update Operation Parameters",
          description:
            "The request payload containing the properties to update in the Azure Pipeline.",
          type: {
            type: "object",
            properties: {
              tags: {
                type: "object",
                additionalProperties: true,
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
        const requestBody = input.event.inputConfig.updateOperationParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.DevOps/pipelines/${input.event.inputConfig.pipelineName}` +
          "?api-version=2020-07-13-preview";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
              pipelineId: {
                type: "integer",
              },
              pipelineType: {
                type: "string",
              },
              bootstrapConfiguration: {
                type: "object",
                properties: {
                  sourceRepository: {
                    type: "object",
                    properties: {
                      repositoryType: {
                        type: "string",
                      },
                      id: {
                        type: "string",
                      },
                      defaultBranch: {
                        type: "string",
                      },
                      authorization: {
                        type: "object",
                        properties: {
                          authorizationType: {
                            type: "string",
                          },
                          parameters: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                        required: ["authorizationType"],
                      },
                      properties: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    required: ["repositoryType", "id", "defaultBranch"],
                  },
                  template: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      parameters: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    required: ["id"],
                  },
                },
                required: ["template"],
              },
            },
            required: ["pipelineType", "bootstrapConfiguration"],
          },
          systemData: {
            type: "object",
            properties: {
              createdBy: {
                type: "string",
              },
              createdByType: {
                type: "string",
              },
              createdAt: {
                type: "string",
              },
              lastModifiedBy: {
                type: "string",
              },
              lastModifiedByType: {
                type: "string",
              },
              lastModifiedAt: {
                type: "string",
              },
            },
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default Pipelines_Update;
