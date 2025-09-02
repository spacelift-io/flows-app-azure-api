import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CustomIPPrefixes_Get: AppBlock = {
  name: "Custom IP Prefixes / Get",
  description:
    "Gets the specified custom IP prefix in a specified resource group.",
  category: "Custom IP Prefixes",
  inputs: {
    default: {
      config: {
        customIpPrefixName: {
          name: "Custom IP Prefix Name",
          description: "Name of the custom ip prefix",
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
          description: "Expands referenced resources.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/customIpPrefixes/${input.event.inputConfig.customIpPrefixName}` +
          "?api-version=2024-10-01" +
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
          properties: {
            type: "object",
            properties: {
              asn: {
                type: "string",
              },
              cidr: {
                type: "string",
              },
              signedMessage: {
                type: "string",
              },
              authorizationMessage: {
                type: "string",
              },
              customIpPrefixParent: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
              childCustomIpPrefixes: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
              },
              commissionedState: {
                type: "string",
              },
              expressRouteAdvertise: {
                type: "boolean",
              },
              geo: {
                type: "string",
              },
              noInternetAdvertise: {
                type: "boolean",
              },
              prefixType: {
                type: "string",
              },
              publicIpPrefixes: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              resourceGuid: {
                type: "string",
              },
              failedReason: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
            },
          },
          etag: {
            type: "string",
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

export default CustomIPPrefixes_Get;
