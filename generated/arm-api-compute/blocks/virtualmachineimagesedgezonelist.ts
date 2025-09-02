import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineImagesEdgeZone_List: AppBlock = {
  name: "Virtual Machine Images Edge Zone / List",
  description:
    "Gets a list of all virtual machine image versions for the specified location, edge zone, publisher, offer, and SKU.",
  category: "Virtual Machine Images Edge Zone",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        edgeZone: {
          name: "Edge Zone",
          type: "string",
          required: true,
        },
        publisherName: {
          name: "Publisher Name",
          description: "Name of the publisher",
          type: "string",
          required: true,
        },
        offer: {
          name: "Offer",
          type: "string",
          required: true,
        },
        skus: {
          name: "Skus",
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
        $expand: {
          name: "Expand",
          description: "The expand expression to apply on the operation.",
          type: "string",
          required: false,
        },
        $top: {
          name: "Top",
          description:
            "An integer value specifying the number of images to return that matches supplied values.",
          type: "number",
          required: false,
        },
        $orderby: {
          name: "Orderby",
          description:
            "Specifies the order of the results returned. Formatted as an OData query.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/locations/${input.event.inputConfig.location}/edgeZones/${input.event.inputConfig.edgeZone}/publishers/${input.event.inputConfig.publisherName}/artifacttypes/vmimage/offers/${input.event.inputConfig.offer}/skus/${input.event.inputConfig.skus}/versions` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.$expand
            ? `&$expand=${input.event.inputConfig.$expand}`
            : "") +
          (input.event.inputConfig.$top
            ? `&$top=${input.event.inputConfig.$top}`
            : "") +
          (input.event.inputConfig.$orderby
            ? `&$orderby=${input.event.inputConfig.$orderby}`
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
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            location: {
              type: "string",
            },
            tags: {
              type: "object",
              additionalProperties: true,
            },
            extendedLocation: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
              },
            },
          },
          required: ["name", "location"],
        },
      },
    },
  },
};

export default VirtualMachineImagesEdgeZone_List;
