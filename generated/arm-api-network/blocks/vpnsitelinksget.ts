import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VpnSiteLinks_Get: AppBlock = {
  name: "Vpn Site Links / Get",
  description: "Retrieves the details of a VPN site link.",
  category: "Vpn Site Links",
  inputs: {
    default: {
      config: {
        vpnSiteName: {
          name: "Vpn Site Name",
          description: "Name of the vpn site",
          type: "string",
          required: true,
        },
        vpnSiteLinkName: {
          name: "Vpn Site Link Name",
          description: "Name of the vpn site link",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/vpnSites/${input.event.inputConfig.vpnSiteName}/vpnSiteLinks/${input.event.inputConfig.vpnSiteLinkName}` +
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
          properties: {
            type: "object",
            properties: {
              linkProperties: {
                type: "object",
                properties: {
                  linkProviderName: {
                    type: "string",
                  },
                  linkSpeedInMbps: {
                    type: "integer",
                  },
                },
              },
              ipAddress: {
                type: "string",
              },
              fqdn: {
                type: "string",
              },
              bgpProperties: {
                type: "object",
                properties: {
                  asn: {
                    type: "integer",
                  },
                  bgpPeeringAddress: {
                    type: "string",
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
            },
          },
          etag: {
            type: "string",
          },
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
        },
      },
    },
  },
};

export default VpnSiteLinks_Get;
