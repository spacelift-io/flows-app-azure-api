import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CheckRevisions: AppBlock = {
  name: "Check Revisions",
  description: "Requests the headers and status of the given resource.",
  category: "General",
  inputs: {
    default: {
      config: {
        key: {
          name: "Key",
          description:
            "A filter used to match keys. Syntax reference: https://aka.ms/azconfig/docs/restapirevisions",
          type: "string",
          required: false,
        },
        label: {
          name: "Label",
          description:
            "A filter used to match labels. Syntax reference: https://aka.ms/azconfig/docs/restapirevisions",
          type: "string",
          required: false,
        },
        Sync_Token: {
          name: "Sync Token",
          description:
            "Used to guarantee real-time consistency between requests.",
          type: "string",
          required: false,
        },
        After: {
          name: "After",
          description:
            "Instructs the server to return elements that appear after the element referred to by the specified token.",
          type: "string",
          required: false,
        },
        Accept_Datetime: {
          name: "Accept Date Time",
          description:
            "Requests the server to respond with the state of the resource at the specified time.",
          type: "string",
          required: false,
        },
        $Select: {
          name: "Select",
          description:
            "Used to select what fields are present in the returned resource(s).",
          type: {
            type: "array",
          },
          required: false,
        },
        tags: {
          name: "Tags",
          description:
            "A filter used to query by tags. Syntax reference: https://aka.ms/azconfig/docs/restapirevisions",
          type: {
            type: "array",
          },
          required: false,
        },
        x_ms_client_request_id: {
          name: "Client Request ID",
          description:
            "An opaque, globally-unique, client-generated string identifier for the request.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.Sync_Token) {
          additionalHeaders["Sync-Token"] = String(
            input.event.inputConfig.Sync_Token,
          );
        }
        if (input.event.inputConfig.Accept_Datetime) {
          additionalHeaders["Accept-Datetime"] = String(
            input.event.inputConfig.Accept_Datetime,
          );
        }
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }

        const url =
          `${input.event.inputConfig.endpoint || input.app.config.endpoint}/revisions` +
          (input.event.inputConfig.key
            ? `?key=${input.event.inputConfig.key}`
            : "") +
          (input.event.inputConfig.label
            ? `&label=${input.event.inputConfig.label}`
            : "") +
          (input.event.inputConfig.After
            ? `&After=${input.event.inputConfig.After}`
            : "") +
          (input.event.inputConfig.$Select
            ? `&$Select=${input.event.inputConfig.$Select}`
            : "") +
          (input.event.inputConfig.tags
            ? `&tags=${input.event.inputConfig.tags}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "HEAD",
          undefined,
          additionalHeaders,
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

export default CheckRevisions;
