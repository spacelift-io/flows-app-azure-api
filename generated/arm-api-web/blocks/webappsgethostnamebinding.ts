import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_GetHostNameBinding: AppBlock = {
  name: "Web Apps / Get Host Name Binding",
  description:
    "Description for Get the named hostname binding for an app (or deployment slot, if specified).",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        hostName: {
          name: "Host Name",
          description: "Name of the host",
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
        resourceGroupName: {
          name: "Resource Group Name",
          description:
            "Azure resource group name (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/hostNameBindings/${input.event.inputConfig.hostName}` +
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
        type: "object",
        properties: {
          properties: {
            type: "object",
            properties: {
              siteName: {
                type: "string",
              },
              domainId: {
                type: "string",
              },
              azureResourceName: {
                type: "string",
              },
              azureResourceType: {
                type: "string",
              },
              customHostNameDnsRecordType: {
                type: "string",
              },
              hostNameType: {
                type: "string",
              },
              sslState: {
                type: "string",
              },
              thumbprint: {
                type: "string",
              },
              virtualIP: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_GetHostNameBinding;
