import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeleteCertificateContacts: AppBlock = {
  name: "Delete Certificate Contacts",
  description:
    "Deletes the certificate contacts for a specified key vault certificate. This operation requires the certificates/managecontacts permission.",
  category: "General",
  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/certificates/contacts`;

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
        properties: {
          id: {
            type: "string",
          },
          contacts: {
            type: "array",
            items: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                phone: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default DeleteCertificateContacts;
