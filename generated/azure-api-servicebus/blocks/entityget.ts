import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Entity_Get: AppBlock = {
  name: "Entity / Get",
  description:
    "Get the details about the Queue or Topic with the given entityName.",
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
        enrich: {
          name: "Enrich",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `${input.event.inputConfig.endpoint || input.app.config.endpoint}/${input.event.inputConfig.entityName}` +
          (input.event.inputConfig.enrich
            ? `?enrich=${input.event.inputConfig.enrich}`
            : "");

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
      },
    },
  },
};

export default Entity_Get;
