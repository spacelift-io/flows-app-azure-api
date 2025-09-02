import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CheckKeyValues: AppBlock = {
  name: "Check Key Values",
  description: "Requests the headers and status of the given resource.",
  category: "General",
  inputs: {
    default: {
      config: {
        key: {
          name: "Key",
          description:
            "A filter used to match keys. Syntax reference: https://aka.ms/azconfig/docs/keyvaluefiltering",
          type: "string",
          required: false,
        },
        label: {
          name: "Label",
          description:
            "A filter used to match labels. Syntax reference: https://aka.ms/azconfig/docs/keyvaluefiltering",
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
        snapshot: {
          name: "Snapshot",
          description:
            "A filter used get key-values for a snapshot. The value should be the name of the snapshot. Not valid when used with 'key' and 'label' filters.",
          type: "string",
          required: false,
        },
        If_Match: {
          name: "If Match",
          description:
            "Used to perform an operation only if the targeted resource's etag matches the value provided.",
          type: "string",
          required: false,
        },
        If_None_Match: {
          name: "If None Match",
          description:
            "Used to perform an operation only if the targeted resource's etag does not match the value provided.",
          type: "string",
          required: false,
        },
        tags: {
          name: "Tags",
          description:
            "A filter used to query by tags. Syntax reference: https://aka.ms/azconfig/docs/keyvaluefiltering",
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
        if (input.event.inputConfig.If_Match) {
          additionalHeaders["If-Match"] = String(
            input.event.inputConfig.If_Match,
          );
        }
        if (input.event.inputConfig.If_None_Match) {
          additionalHeaders["If-None-Match"] = String(
            input.event.inputConfig.If_None_Match,
          );
        }
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/kv` +
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
          (input.event.inputConfig.snapshot
            ? `&snapshot=${input.event.inputConfig.snapshot}`
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

export default CheckKeyValues;
