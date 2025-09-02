import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ServiceAssociationLinks_List: AppBlock = {
  name: "Service Association Links / List",
  description: "Gets a list of service association links for a subnet.",
  category: "Service Association Links",
  inputs: {
    default: {
      config: {
        virtualNetworkName: {
          name: "Virtual Network Name",
          description: "Name of the virtual network",
          type: "string",
          required: true,
        },
        subnetName: {
          name: "Subnet Name",
          description: "Name of the subnet",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworks/${input.event.inputConfig.virtualNetworkName}/subnets/${input.event.inputConfig.subnetName}/ServiceAssociationLinks` +
          "?api-version=2024-10-01";

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
                    linkedResourceType: {
                      type: "string",
                    },
                    link: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                    allowDelete: {
                      type: "boolean",
                    },
                    locations: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
                name: {
                  type: "string",
                },
                etag: {
                  type: "string",
                },
                type: {
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

export default ServiceAssociationLinks_List;
