import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PipelineTemplateDefinitions_List: AppBlock = {
  name: "Pipeline Template Definitions / List",
  description:
    "Lists all pipeline templates which can be used to configure a Pipeline.",
  category: "Pipeline Template Definitions",
  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/providers/Microsoft.DevOps/pipelineTemplateDefinitions` +
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
                id: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                inputs: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      type: {
                        type: "string",
                      },
                      possibleValues: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            value: {
                              type: "string",
                            },
                            displayValue: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                    required: ["id", "type"],
                  },
                },
              },
              required: ["id"],
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

export default PipelineTemplateDefinitions_List;
