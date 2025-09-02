import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Pipelines_ListBySubscription: AppBlock = {
  name: "Pipelines / List By Subscription",
  description: "Lists all Pipelines under the specified subscription.",
  category: "Pipelines",
  inputs: {
    default: {
      config: {
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.DevOps/pipelines` +
          "?api-version=2020-07-13-preview";

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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Pipelines_ListBySubscription;
