import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SetCertificateContacts: AppBlock = {
  name: "Set Certificate Contacts",
  description:
    "Sets the certificate contacts for the specified key vault. This operation requires the certificates/managecontacts permission.",
  category: "General",
  inputs: {
    default: {
      config: {
        contacts: {
          name: "Contacts",
          description: "The contacts for the key vault certificate.",
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
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.contacts;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/certificates/contacts`;

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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

export default SetCertificateContacts;
