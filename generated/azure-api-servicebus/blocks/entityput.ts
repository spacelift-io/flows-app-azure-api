import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Entity_Put: AppBlock = {
  name: "Entity / Put",
  description: "Create or update a queue or topic at the provided entityName",
  category: "Entity",
  inputs: {
    default: {
      config: {
        entityName: {
          name: "Entity Name",
          description: "Name of the entity",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          type: {
            type: "object",
          },
          required: true,
        },
        If_Match: {
          name: "If Match",
          description:
            "Match condition for an entity to be updated. If specified and a matching entity is not found, an error will be raised. To force an unconditional update, set to the wildcard character (*). If not specified, an insert will be performed when no existing entity is found to update and a replace will be performed if an existing entity is found.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.requestBody;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.If_Match) {
          additionalHeaders["If-Match"] = String(
            input.event.inputConfig.If_Match,
          );
        }

        const url = `${input.event.inputConfig.endpoint || input.app.config.endpoint}/${input.event.inputConfig.entityName}`;

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
          requestBody,
          additionalHeaders,
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
      },
    },
  },
};

export default Entity_Put;
