import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_PreviewWorkflow: AppBlock = {
  name: "Static Sites / Preview Workflow",
  description:
    "Description for Generates a preview workflow file for the static site",
  category: "Static Sites",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        staticSitesWorkflowPreviewRequest: {
          name: "Static Sites Workflow Preview Request",
          description:
            "A JSON representation of the StaticSitesWorkflowPreviewRequest properties. See example.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  repositoryUrl: {
                    type: "string",
                  },
                  branch: {
                    type: "string",
                  },
                  buildProperties: {
                    type: "object",
                    properties: {
                      appLocation: {
                        type: "string",
                      },
                      apiLocation: {
                        type: "string",
                      },
                      appArtifactLocation: {
                        type: "string",
                      },
                      outputLocation: {
                        type: "string",
                      },
                      appBuildCommand: {
                        type: "string",
                      },
                      apiBuildCommand: {
                        type: "string",
                      },
                      skipGithubActionWorkflowGeneration: {
                        type: "boolean",
                      },
                      githubActionSecretNameOverride: {
                        type: "string",
                      },
                    },
                  },
                },
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
      },
      onEvent: async (input) => {
        const requestBody =
          input.event.inputConfig.staticSitesWorkflowPreviewRequest;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/locations/${input.event.inputConfig.location}/previewStaticSiteWorkflowFile` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
              path: {
                type: "string",
              },
              contents: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default StaticSites_PreviewWorkflow;
