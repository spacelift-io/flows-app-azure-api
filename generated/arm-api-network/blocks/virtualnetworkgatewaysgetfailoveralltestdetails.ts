import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGateways_GetFailoverAllTestDetails: AppBlock = {
  name: "Virtual Network Gateways / Get Failover All Test Details",
  description:
    "This operation retrieves the details of all the failover tests performed on the gateway for different peering locations",
  category: "Virtual Network Gateways",
  inputs: {
    default: {
      config: {
        virtualNetworkGatewayName: {
          name: "Virtual Network Gateway Name",
          description: "Name of the virtual network gateway",
          type: "string",
          required: true,
        },
        type: {
          name: "Type",
          description: "The type of failover test",
          type: "string",
          required: true,
        },
        fetchLatest: {
          name: "Fetch Latest",
          description: "Fetch only the latest tests for each peering location",
          type: "boolean",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}/getFailoverAllTestsDetails` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.type
            ? `&type=${input.event.inputConfig.type}`
            : "") +
          (input.event.inputConfig.fetchLatest
            ? `&fetchLatest=${input.event.inputConfig.fetchLatest}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
            peeringLocation: {
              type: "string",
            },
            circuits: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  nrpResourceUri: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  connectionName: {
                    type: "string",
                  },
                },
              },
            },
            status: {
              type: "string",
            },
            startTime: {
              type: "string",
            },
            endTime: {
              type: "string",
            },
            connections: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  nrpResourceUri: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  lastUpdatedTime: {
                    type: "string",
                  },
                },
              },
            },
            testGuid: {
              type: "string",
            },
            testType: {
              type: "string",
            },
            issues: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default VirtualNetworkGateways_GetFailoverAllTestDetails;
