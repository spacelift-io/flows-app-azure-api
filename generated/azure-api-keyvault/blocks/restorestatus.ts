import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RestoreStatus: AppBlock = {
  name: "Restore Status",
  description: "Returns the status of restore operation",
  category: "General",
  inputs: {
    default: {
      config: {
        jobId: {
          name: "Job ID",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/restore/${input.event.inputConfig.jobId}/pending`;

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
          status: {
            type: "string",
          },
          statusDetails: {
            type: "string",
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "string",
              },
              message: {
                type: "string",
              },
              innererror: {
                type: "object",
                properties: {
                  code: {
                    type: "object",
                    additionalProperties: true,
                  },
                  message: {
                    type: "object",
                    additionalProperties: true,
                  },
                  innererror: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
            },
          },
          jobId: {
            type: "string",
          },
          startTime: {
            type: "integer",
          },
          endTime: {
            type: "integer",
          },
        },
      },
    },
  },
};

export default RestoreStatus;
