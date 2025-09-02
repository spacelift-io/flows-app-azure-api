import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Entity_Delete: AppBlock = {
  name: "Entity / Delete",
  description: "Delete the Queue or Topic with the given entityName.",
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
      },
      onEvent: async (input) => {
        const url = `${input.event.inputConfig.endpoint || input.app.config.endpoint}/${input.event.inputConfig.entityName}`;

        const result = await makeAzureRequest(
          input,
          url,
          "DELETE",
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
      },
    },
  },
};

export default Entity_Delete;
