import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PurgeDeletedSecret: AppBlock = {
  name: "Purge Deleted Secret",
  description:
    "The purge deleted secret operation removes the secret permanently, without the possibility of recovery. This operation can only be enabled on a soft-delete enabled vault. This operation requires the secrets/purge permission.",
  category: "General",
  inputs: {
    default: {
      config: {
        secret_name: {
          name: "Secret Name",
          description: "Name of the secret-",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/deletedsecrets/${input.event.inputConfig.secret_name}`;

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
        additionalProperties: true,
      },
    },
  },
};

export default PurgeDeletedSecret;
