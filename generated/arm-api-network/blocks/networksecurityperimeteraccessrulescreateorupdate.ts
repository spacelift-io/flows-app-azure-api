import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkSecurityPerimeterAccessRules_CreateOrUpdate: AppBlock = {
  name: "Network Security Perimeter Access Rules / Create Or Update",
  description: "Creates or updates a network access rule.",
  category: "Network Security Perimeter Access Rules",
  inputs: {
    default: {
      config: {
        networkSecurityPerimeterName: {
          name: "Network Security Perimeter Name",
          description: "Name of the network security perimeter",
          type: "string",
          required: true,
        },
        profileName: {
          name: "Profile Name",
          description: "Name of the profile",
          type: "string",
          required: true,
        },
        accessRuleName: {
          name: "Access Rule Name",
          description: "Name of the access rule",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  provisioningState: {
                    type: "string",
                  },
                  direction: {
                    type: "string",
                  },
                  addressPrefixes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  fullyQualifiedDomainNames: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  subscriptions: {
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
                  networkSecurityPerimeters: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        perimeterGuid: {
                          type: "string",
                        },
                        location: {
                          type: "string",
                        },
                      },
                    },
                  },
                  emailAddresses: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  phoneNumbers: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  serviceTags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/${input.event.inputConfig.networkSecurityPerimeterName}/profiles/${input.event.inputConfig.profileName}/accessRules/${input.event.inputConfig.accessRuleName}` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
          requestBody,
          undefined,
          input.event.inputConfig.isBinaryData || false,
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
              provisioningState: {
                type: "string",
              },
              direction: {
                type: "string",
              },
              addressPrefixes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              fullyQualifiedDomainNames: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              subscriptions: {
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
              networkSecurityPerimeters: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    perimeterGuid: {
                      type: "string",
                    },
                    location: {
                      type: "string",
                    },
                  },
                },
              },
              emailAddresses: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              phoneNumbers: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              serviceTags: {
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
  },
};

export default NetworkSecurityPerimeterAccessRules_CreateOrUpdate;
