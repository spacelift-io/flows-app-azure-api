import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ServiceTagInformation_List: AppBlock = {
  name: "Service Tag Information / List",
  description:
    "Gets a list of service tag information resources with pagination.",
  category: "Service Tag Information",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
        noAddressPrefixes: {
          name: "No Address Prefixes",
          description: "Do not return address prefixes for the tag(s).",
          type: "boolean",
          required: false,
        },
        tagName: {
          name: "Tag Name",
          description: "Return tag information for a particular tag.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/locations/${input.event.inputConfig.location}/serviceTagDetails` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.noAddressPrefixes
            ? `&noAddressPrefixes=${input.event.inputConfig.noAddressPrefixes}`
            : "") +
          (input.event.inputConfig.tagName
            ? `&tagName=${input.event.inputConfig.tagName}`
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
        properties: {
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    changeNumber: {
                      type: "string",
                    },
                    region: {
                      type: "string",
                    },
                    systemService: {
                      type: "string",
                    },
                    addressPrefixes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    state: {
                      type: "string",
                    },
                  },
                },
                name: {
                  type: "string",
                },
                id: {
                  type: "string",
                },
                serviceTagChangeNumber: {
                  type: "string",
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ServiceTagInformation_List;
