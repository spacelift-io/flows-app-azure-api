import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetKeys: AppBlock = {
  name: "Get Keys",
  description: "Gets a list of keys.",
  category: "General",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "A filter for the name of the returned keys.",
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
        Sync_Token: {
          name: "Sync Token",
          description:
            "Used to guarantee real-time consistency between requests.",
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

        const url =
          `${input.event.inputConfig.endpoint || input.app.config.endpoint}/keys` +
          (input.event.inputConfig.name
            ? `?name=${input.event.inputConfig.name}`
            : "") +
          (input.event.inputConfig.After
            ? `&After=${input.event.inputConfig.After}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "GET",
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
        properties: {
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
              },
              required: ["name"],
            },
          },
          "@nextLink": {
            type: "string",
          },
        },
      },
    },
  },
};

export default GetKeys;
