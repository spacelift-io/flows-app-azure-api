import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineImagesEdgeZone_ListOffers: AppBlock = {
  name: "Virtual Machine Images Edge Zone / List Offers",
  description:
    "Gets a list of virtual machine image offers for the specified location, edge zone and publisher.",
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
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/locations/${input.event.inputConfig.location}/edgeZones/${input.event.inputConfig.edgeZone}/publishers/${input.event.inputConfig.publisherName}/artifacttypes/vmimage/offers` +
          "?api-version=2024-11-01";

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

export default VirtualMachineImagesEdgeZone_ListOffers;
