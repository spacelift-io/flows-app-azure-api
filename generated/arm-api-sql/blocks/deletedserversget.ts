import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeletedServers_Get: AppBlock = {
  name: "Deleted Servers / Get",
  description: "Gets a deleted server.",
  category: "Deleted Servers",
  inputs: {
    default: {
      config: {
        locationName: {
          name: "Location Name",
          description: "Name of the location",
          type: "string",
          required: true,
        },
        deletedServerName: {
          name: "Deleted Server Name",
          description: "Name of the deleted server",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Sql/locations/${input.event.inputConfig.locationName}/deletedServers/${input.event.inputConfig.deletedServerName}` +
          "?api-version=2023-08-01";

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
          properties: {
            type: "object",
            properties: {
              version: {
                type: "string",
              },
              deletionTime: {
                type: "string",
              },
              originalId: {
                type: "string",
              },
              fullyQualifiedDomainName: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default DeletedServers_Get;
