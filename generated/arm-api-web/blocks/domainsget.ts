import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Domains_Get: AppBlock = {
  name: "Domains / Get",
  description: "Description for Get a domain.",
  category: "Domains",
  inputs: {
    default: {
      config: {
        domainName: {
          name: "Domain Name",
          description: "Name of the domain",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.DomainRegistration/domains/${input.event.inputConfig.domainName}` +
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
              contactAdmin: {
                type: "object",
                properties: {
                  addressMailing: {
                    type: "object",
                    properties: {
                      address1: {
                        type: "string",
                      },
                      address2: {
                        type: "string",
                      },
                      city: {
                        type: "string",
                      },
                      country: {
                        type: "string",
                      },
                      postalCode: {
                        type: "string",
                      },
                      state: {
                        type: "string",
                      },
                    },
                    required: [
                      "address1",
                      "city",
                      "country",
                      "postalCode",
                      "state",
                    ],
                  },
                  email: {
                    type: "string",
                  },
                  fax: {
                    type: "string",
                  },
                  jobTitle: {
                    type: "string",
                  },
                  nameFirst: {
                    type: "string",
                  },
                  nameLast: {
                    type: "string",
                  },
                  nameMiddle: {
                    type: "string",
                  },
                  organization: {
                    type: "string",
                  },
                  phone: {
                    type: "string",
                  },
                },
                required: ["email", "nameFirst", "nameLast", "phone"],
              },
              contactBilling: {
                type: "object",
                properties: {
                  addressMailing: {
                    type: "object",
                    additionalProperties: true,
                  },
                  email: {
                    type: "object",
                    additionalProperties: true,
                  },
                  fax: {
                    type: "object",
                    additionalProperties: true,
                  },
                  jobTitle: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nameFirst: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nameLast: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nameMiddle: {
                    type: "object",
                    additionalProperties: true,
                  },
                  organization: {
                    type: "object",
                    additionalProperties: true,
                  },
                  phone: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                required: ["email", "nameFirst", "nameLast", "phone"],
              },
              contactRegistrant: {
                type: "object",
                properties: {
                  addressMailing: {
                    type: "object",
                    additionalProperties: true,
                  },
                  email: {
                    type: "object",
                    additionalProperties: true,
                  },
                  fax: {
                    type: "object",
                    additionalProperties: true,
                  },
                  jobTitle: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nameFirst: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nameLast: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nameMiddle: {
                    type: "object",
                    additionalProperties: true,
                  },
                  organization: {
                    type: "object",
                    additionalProperties: true,
                  },
                  phone: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                required: ["email", "nameFirst", "nameLast", "phone"],
              },
              contactTech: {
                type: "object",
                properties: {
                  addressMailing: {
                    type: "object",
                    additionalProperties: true,
                  },
                  email: {
                    type: "object",
                    additionalProperties: true,
                  },
                  fax: {
                    type: "object",
                    additionalProperties: true,
                  },
                  jobTitle: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nameFirst: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nameLast: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nameMiddle: {
                    type: "object",
                    additionalProperties: true,
                  },
                  organization: {
                    type: "object",
                    additionalProperties: true,
                  },
                  phone: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                required: ["email", "nameFirst", "nameLast", "phone"],
              },
              registrationStatus: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              nameServers: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              privacy: {
                type: "boolean",
              },
              createdTime: {
                type: "string",
              },
              expirationTime: {
                type: "string",
              },
              lastRenewedTime: {
                type: "string",
              },
              autoRenew: {
                type: "boolean",
              },
              readyForDnsRecordManagement: {
                type: "boolean",
              },
              managedHostNames: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    siteNames: {
                      type: "array",
                      items: {
                        type: "string",
                      },
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
                  },
                },
              },
              consent: {
                type: "object",
                properties: {
                  agreementKeys: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  agreedBy: {
                    type: "string",
                  },
                  agreedAt: {
                    type: "string",
                  },
                },
              },
              domainNotRenewableReasons: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              dnsType: {
                type: "string",
              },
              dnsZoneId: {
                type: "string",
              },
              targetDnsType: {
                type: "string",
              },
              authCode: {
                type: "string",
              },
            },
            required: [
              "contactAdmin",
              "contactBilling",
              "contactRegistrant",
              "contactTech",
              "consent",
            ],
          },
        },
      },
    },
  },
};

export default Domains_Get;
