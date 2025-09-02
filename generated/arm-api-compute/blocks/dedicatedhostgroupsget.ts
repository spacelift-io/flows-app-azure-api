import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DedicatedHostGroups_Get: AppBlock = {
  name: "Dedicated Host Groups / Get",
  description: "Retrieves information about a dedicated host group.",
  category: "Dedicated Host Groups",
  inputs: {
    default: {
      config: {
        hostGroupName: {
          name: "Host Group Name",
          description: "Name of the host group",
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
        $expand: {
          name: "Expand",
          description:
            "The expand expression to apply on the operation. 'InstanceView' will retrieve the list of instance views of the dedicated hosts under the dedicated host group. 'UserData' is not supported for dedicated host group.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/hostGroups/${input.event.inputConfig.hostGroupName}` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.$expand
            ? `&$expand=${input.event.inputConfig.$expand}`
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
          properties: {
            type: "object",
            properties: {
              platformFaultDomainCount: {
                type: "integer",
              },
              hosts: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                  },
                },
              },
              instanceView: {
                type: "object",
                properties: {
                  hosts: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              supportAutomaticPlacement: {
                type: "boolean",
              },
              additionalCapabilities: {
                type: "object",
                properties: {
                  ultraSSDEnabled: {
                    type: "boolean",
                  },
                },
              },
            },
            required: ["platformFaultDomainCount"],
          },
          zones: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

export default DedicatedHostGroups_Get;
