import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApplicationFirewallPolicies_CreateOrUpdate: AppBlock = {
  name: "Web Application Firewall Policies / Create Or Update",
  description:
    "Creates or update policy with specified rule set name within a resource group.",
  category: "Web Application Firewall Policies",
  inputs: {
    default: {
      config: {
        policyName: {
          name: "Policy Name",
          description: "Name of the policy",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Policy to be created.",
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/ApplicationGatewayWebApplicationFirewallPolicies/${input.event.inputConfig.policyName}` +
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
              policySettings: {
                type: "object",
                properties: {
                  state: {
                    type: "string",
                  },
                  mode: {
                    type: "string",
                  },
                  requestBodyCheck: {
                    type: "boolean",
                  },
                  requestBodyInspectLimitInKB: {
                    type: "integer",
                  },
                  requestBodyEnforcement: {
                    type: "boolean",
                  },
                  maxRequestBodySizeInKb: {
                    type: "integer",
                  },
                  fileUploadEnforcement: {
                    type: "boolean",
                  },
                  fileUploadLimitInMb: {
                    type: "integer",
                  },
                  customBlockResponseStatusCode: {
                    type: "integer",
                  },
                  customBlockResponseBody: {
                    type: "string",
                  },
                  logScrubbing: {
                    type: "object",
                    properties: {
                      state: {
                        type: "string",
                      },
                      scrubbingRules: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            matchVariable: {
                              type: "string",
                            },
                            selectorMatchOperator: {
                              type: "string",
                            },
                            selector: {
                              type: "string",
                            },
                            state: {
                              type: "string",
                            },
                          },
                          required: ["matchVariable", "selectorMatchOperator"],
                        },
                      },
                    },
                  },
                  jsChallengeCookieExpirationInMins: {
                    type: "integer",
                  },
                },
              },
              customRules: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    etag: {
                      type: "string",
                    },
                    priority: {
                      type: "integer",
                    },
                    state: {
                      type: "string",
                    },
                    rateLimitDuration: {
                      type: "string",
                    },
                    rateLimitThreshold: {
                      type: "integer",
                    },
                    ruleType: {
                      type: "string",
                    },
                    matchConditions: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          matchVariables: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                variableName: {
                                  type: "string",
                                },
                                selector: {
                                  type: "string",
                                },
                              },
                              required: ["variableName"],
                            },
                          },
                          operator: {
                            type: "string",
                          },
                          negationConditon: {
                            type: "boolean",
                          },
                          matchValues: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          transforms: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                        },
                        required: ["matchVariables", "operator", "matchValues"],
                      },
                    },
                    groupByUserSession: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          groupByVariables: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                variableName: {
                                  type: "string",
                                },
                              },
                              required: ["variableName"],
                            },
                          },
                        },
                        required: ["groupByVariables"],
                      },
                    },
                    action: {
                      type: "string",
                    },
                  },
                  required: [
                    "priority",
                    "ruleType",
                    "matchConditions",
                    "action",
                  ],
                },
              },
              applicationGateways: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        sku: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            tier: {
                              type: "string",
                            },
                            capacity: {
                              type: "integer",
                            },
                            family: {
                              type: "string",
                            },
                          },
                        },
                        sslPolicy: {
                          type: "object",
                          properties: {
                            disabledSslProtocols: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            policyType: {
                              type: "string",
                            },
                            policyName: {
                              type: "string",
                            },
                            cipherSuites: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            minProtocolVersion: {
                              type: "string",
                            },
                          },
                        },
                        operationalState: {
                          type: "string",
                        },
                        gatewayIPConfigurations: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  subnet: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  provisioningState: {
                                    type: "string",
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
                        authenticationCertificates: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  data: {
                                    type: "string",
                                  },
                                  provisioningState: {
                                    type: "string",
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
                        trustedRootCertificates: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  data: {
                                    type: "string",
                                  },
                                  keyVaultSecretId: {
                                    type: "string",
                                  },
                                  provisioningState: {
                                    type: "string",
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
                        trustedClientCertificates: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  data: {
                                    type: "string",
                                  },
                                  validatedCertData: {
                                    type: "string",
                                  },
                                  clientCertIssuerDN: {
                                    type: "string",
                                  },
                                  provisioningState: {
                                    type: "string",
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
                        sslCertificates: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  data: {
                                    type: "string",
                                  },
                                  password: {
                                    type: "string",
                                  },
                                  publicCertData: {
                                    type: "string",
                                  },
                                  keyVaultSecretId: {
                                    type: "string",
                                  },
                                  provisioningState: {
                                    type: "string",
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
                        frontendIPConfigurations: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  privateIPAddress: {
                                    type: "string",
                                  },
                                  privateIPAllocationMethod: {
                                    type: "string",
                                  },
                                  subnet: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  publicIPAddress: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  privateLinkConfiguration: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  provisioningState: {
                                    type: "string",
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
                        frontendPorts: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  port: {
                                    type: "integer",
                                  },
                                  provisioningState: {
                                    type: "string",
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
                        probes: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  protocol: {
                                    type: "string",
                                  },
                                  host: {
                                    type: "string",
                                  },
                                  path: {
                                    type: "string",
                                  },
                                  interval: {
                                    type: "integer",
                                  },
                                  timeout: {
                                    type: "integer",
                                  },
                                  unhealthyThreshold: {
                                    type: "integer",
                                  },
                                  pickHostNameFromBackendHttpSettings: {
                                    type: "boolean",
                                  },
                                  pickHostNameFromBackendSettings: {
                                    type: "boolean",
                                  },
                                  minServers: {
                                    type: "integer",
                                  },
                                  match: {
                                    type: "object",
                                    properties: {
                                      body: {
                                        type: "string",
                                      },
                                      statusCodes: {
                                        type: "array",
                                        items: {
                                          type: "string",
                                        },
                                      },
                                    },
                                  },
                                  provisioningState: {
                                    type: "string",
                                  },
                                  port: {
                                    type: "integer",
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
                        backendAddressPools: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  backendIPConfigurations: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        properties: {
                                          type: "object",
                                          properties: {
                                            gatewayLoadBalancer: {
                                              type: "object",
                                              properties: {
                                                id: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                              },
                                            },
                                            virtualNetworkTaps: {
                                              type: "array",
                                              items: {
                                                type: "object",
                                                properties: {
                                                  properties: {
                                                    type: "object",
                                                    properties: {
                                                      networkInterfaceTapConfigurations:
                                                        {
                                                          type: "array",
                                                          items: {
                                                            type: "object",
                                                            properties: {
                                                              properties: {
                                                                type: "object",
                                                                properties: {
                                                                  virtualNetworkTap:
                                                                    {
                                                                      type: "object",
                                                                      properties:
                                                                        {
                                                                          properties:
                                                                            {
                                                                              type: "object",
                                                                              additionalProperties: true,
                                                                            },
                                                                          etag: {
                                                                            type: "string",
                                                                          },
                                                                        },
                                                                    },
                                                                  provisioningState:
                                                                    {
                                                                      type: "string",
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
                                                      resourceGuid: {
                                                        type: "string",
                                                      },
                                                      provisioningState: {
                                                        type: "string",
                                                      },
                                                      destinationNetworkInterfaceIPConfiguration:
                                                        {
                                                          type: "object",
                                                          properties: {
                                                            properties: {
                                                              type: "object",
                                                              additionalProperties: true,
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
                                                      destinationLoadBalancerFrontEndIPConfiguration:
                                                        {
                                                          type: "object",
                                                          properties: {
                                                            properties: {
                                                              type: "object",
                                                              properties: {
                                                                inboundNatRules:
                                                                  {
                                                                    type: "array",
                                                                    items: {
                                                                      type: "object",
                                                                      properties:
                                                                        {
                                                                          id: {
                                                                            type: "object",
                                                                            additionalProperties: true,
                                                                          },
                                                                        },
                                                                    },
                                                                  },
                                                                inboundNatPools:
                                                                  {
                                                                    type: "array",
                                                                    items: {
                                                                      type: "object",
                                                                      additionalProperties: true,
                                                                    },
                                                                  },
                                                                outboundRules: {
                                                                  type: "array",
                                                                  items: {
                                                                    type: "object",
                                                                    additionalProperties: true,
                                                                  },
                                                                },
                                                                loadBalancingRules:
                                                                  {
                                                                    type: "array",
                                                                    items: {
                                                                      type: "object",
                                                                      additionalProperties: true,
                                                                    },
                                                                  },
                                                                privateIPAddress:
                                                                  {
                                                                    type: "string",
                                                                  },
                                                                privateIPAllocationMethod:
                                                                  {
                                                                    type: "string",
                                                                  },
                                                                privateIPAddressVersion:
                                                                  {
                                                                    type: "string",
                                                                  },
                                                                subnet: {
                                                                  type: "object",
                                                                  properties: {
                                                                    properties:
                                                                      {
                                                                        type: "object",
                                                                        properties:
                                                                          {
                                                                            addressPrefix:
                                                                              {
                                                                                type: "string",
                                                                              },
                                                                            addressPrefixes:
                                                                              {
                                                                                type: "array",
                                                                                items:
                                                                                  {
                                                                                    type: "string",
                                                                                  },
                                                                              },
                                                                            networkSecurityGroup:
                                                                              {
                                                                                type: "object",
                                                                                properties:
                                                                                  {
                                                                                    properties:
                                                                                      {
                                                                                        type: "object",
                                                                                        properties:
                                                                                          {
                                                                                            flushConnection:
                                                                                              {
                                                                                                type: "boolean",
                                                                                              },
                                                                                            securityRules:
                                                                                              {
                                                                                                type: "array",
                                                                                                items:
                                                                                                  {
                                                                                                    type: "object",
                                                                                                    properties:
                                                                                                      {
                                                                                                        properties:
                                                                                                          {
                                                                                                            type: "object",
                                                                                                            properties:
                                                                                                              {
                                                                                                                description:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                protocol:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                sourcePortRange:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                destinationPortRange:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                sourceAddressPrefix:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                sourceAddressPrefixes:
                                                                                                                  {
                                                                                                                    type: "array",
                                                                                                                    items:
                                                                                                                      {
                                                                                                                        type: "string",
                                                                                                                      },
                                                                                                                  },
                                                                                                                sourceApplicationSecurityGroups:
                                                                                                                  {
                                                                                                                    type: "array",
                                                                                                                    items:
                                                                                                                      {
                                                                                                                        type: "object",
                                                                                                                        properties:
                                                                                                                          {
                                                                                                                            properties:
                                                                                                                              {
                                                                                                                                type: "object",
                                                                                                                                properties:
                                                                                                                                  {
                                                                                                                                    resourceGuid:
                                                                                                                                      {
                                                                                                                                        type: "string",
                                                                                                                                      },
                                                                                                                                    provisioningState:
                                                                                                                                      {
                                                                                                                                        type: "string",
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                              },
                                                                                                                            etag: {
                                                                                                                              type: "string",
                                                                                                                            },
                                                                                                                          },
                                                                                                                      },
                                                                                                                  },
                                                                                                                destinationAddressPrefix:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                destinationAddressPrefixes:
                                                                                                                  {
                                                                                                                    type: "array",
                                                                                                                    items:
                                                                                                                      {
                                                                                                                        type: "string",
                                                                                                                      },
                                                                                                                  },
                                                                                                                destinationApplicationSecurityGroups:
                                                                                                                  {
                                                                                                                    type: "array",
                                                                                                                    items:
                                                                                                                      {
                                                                                                                        type: "object",
                                                                                                                        additionalProperties: true,
                                                                                                                      },
                                                                                                                  },
                                                                                                                sourcePortRanges:
                                                                                                                  {
                                                                                                                    type: "array",
                                                                                                                    items:
                                                                                                                      {
                                                                                                                        type: "string",
                                                                                                                      },
                                                                                                                  },
                                                                                                                destinationPortRanges:
                                                                                                                  {
                                                                                                                    type: "array",
                                                                                                                    items:
                                                                                                                      {
                                                                                                                        type: "string",
                                                                                                                      },
                                                                                                                  },
                                                                                                                access:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                priority:
                                                                                                                  {
                                                                                                                    type: "integer",
                                                                                                                  },
                                                                                                                direction:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                provisioningState:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                              },
                                                                                                            required:
                                                                                                              [
                                                                                                                "protocol",
                                                                                                                "access",
                                                                                                                "priority",
                                                                                                                "direction",
                                                                                                              ],
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
                                                                                            defaultSecurityRules:
                                                                                              {
                                                                                                type: "array",
                                                                                                items:
                                                                                                  {
                                                                                                    type: "object",
                                                                                                    additionalProperties: true,
                                                                                                  },
                                                                                              },
                                                                                            networkInterfaces:
                                                                                              {
                                                                                                type: "array",
                                                                                                items:
                                                                                                  {
                                                                                                    type: "object",
                                                                                                    properties:
                                                                                                      {
                                                                                                        extendedLocation:
                                                                                                          {
                                                                                                            type: "object",
                                                                                                            properties:
                                                                                                              {
                                                                                                                name: {
                                                                                                                  type: "string",
                                                                                                                },
                                                                                                                type: {
                                                                                                                  type: "string",
                                                                                                                },
                                                                                                              },
                                                                                                          },
                                                                                                        properties:
                                                                                                          {
                                                                                                            type: "object",
                                                                                                            properties:
                                                                                                              {
                                                                                                                virtualMachine:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        id: {
                                                                                                                          type: "object",
                                                                                                                          additionalProperties: true,
                                                                                                                        },
                                                                                                                      },
                                                                                                                  },
                                                                                                                networkSecurityGroup:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        properties:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            additionalProperties: true,
                                                                                                                          },
                                                                                                                        etag: {
                                                                                                                          type: "string",
                                                                                                                        },
                                                                                                                      },
                                                                                                                  },
                                                                                                                privateEndpoint:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        extendedLocation:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            properties:
                                                                                                                              {
                                                                                                                                name: {
                                                                                                                                  type: "object",
                                                                                                                                  additionalProperties: true,
                                                                                                                                },
                                                                                                                                type: {
                                                                                                                                  type: "object",
                                                                                                                                  additionalProperties: true,
                                                                                                                                },
                                                                                                                              },
                                                                                                                          },
                                                                                                                        properties:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            properties:
                                                                                                                              {
                                                                                                                                subnet:
                                                                                                                                  {
                                                                                                                                    type: "object",
                                                                                                                                    properties:
                                                                                                                                      {
                                                                                                                                        properties:
                                                                                                                                          {
                                                                                                                                            type: "object",
                                                                                                                                            additionalProperties: true,
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
                                                                                                                                networkInterfaces:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        additionalProperties: true,
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                provisioningState:
                                                                                                                                  {
                                                                                                                                    type: "string",
                                                                                                                                  },
                                                                                                                                privateLinkServiceConnections:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        properties:
                                                                                                                                          {
                                                                                                                                            properties:
                                                                                                                                              {
                                                                                                                                                type: "object",
                                                                                                                                                properties:
                                                                                                                                                  {
                                                                                                                                                    provisioningState:
                                                                                                                                                      {
                                                                                                                                                        type: "string",
                                                                                                                                                      },
                                                                                                                                                    privateLinkServiceId:
                                                                                                                                                      {
                                                                                                                                                        type: "string",
                                                                                                                                                      },
                                                                                                                                                    groupIds:
                                                                                                                                                      {
                                                                                                                                                        type: "array",
                                                                                                                                                        items:
                                                                                                                                                          {
                                                                                                                                                            type: "string",
                                                                                                                                                          },
                                                                                                                                                      },
                                                                                                                                                    requestMessage:
                                                                                                                                                      {
                                                                                                                                                        type: "string",
                                                                                                                                                      },
                                                                                                                                                    privateLinkServiceConnectionState:
                                                                                                                                                      {
                                                                                                                                                        type: "object",
                                                                                                                                                        properties:
                                                                                                                                                          {
                                                                                                                                                            status:
                                                                                                                                                              {
                                                                                                                                                                type: "string",
                                                                                                                                                              },
                                                                                                                                                            description:
                                                                                                                                                              {
                                                                                                                                                                type: "string",
                                                                                                                                                              },
                                                                                                                                                            actionsRequired:
                                                                                                                                                              {
                                                                                                                                                                type: "string",
                                                                                                                                                              },
                                                                                                                                                          },
                                                                                                                                                      },
                                                                                                                                                  },
                                                                                                                                              },
                                                                                                                                            name: {
                                                                                                                                              type: "string",
                                                                                                                                            },
                                                                                                                                            type: {
                                                                                                                                              type: "string",
                                                                                                                                            },
                                                                                                                                            etag: {
                                                                                                                                              type: "string",
                                                                                                                                            },
                                                                                                                                          },
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                manualPrivateLinkServiceConnections:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        additionalProperties: true,
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                customDnsConfigs:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        properties:
                                                                                                                                          {
                                                                                                                                            fqdn: {
                                                                                                                                              type: "string",
                                                                                                                                            },
                                                                                                                                            ipAddresses:
                                                                                                                                              {
                                                                                                                                                type: "array",
                                                                                                                                                items:
                                                                                                                                                  {
                                                                                                                                                    type: "string",
                                                                                                                                                  },
                                                                                                                                              },
                                                                                                                                          },
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                applicationSecurityGroups:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        additionalProperties: true,
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                ipConfigurations:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        properties:
                                                                                                                                          {
                                                                                                                                            properties:
                                                                                                                                              {
                                                                                                                                                type: "object",
                                                                                                                                                properties:
                                                                                                                                                  {
                                                                                                                                                    groupId:
                                                                                                                                                      {
                                                                                                                                                        type: "string",
                                                                                                                                                      },
                                                                                                                                                    memberName:
                                                                                                                                                      {
                                                                                                                                                        type: "string",
                                                                                                                                                      },
                                                                                                                                                    privateIPAddress:
                                                                                                                                                      {
                                                                                                                                                        type: "string",
                                                                                                                                                      },
                                                                                                                                                  },
                                                                                                                                              },
                                                                                                                                            name: {
                                                                                                                                              type: "string",
                                                                                                                                            },
                                                                                                                                            type: {
                                                                                                                                              type: "string",
                                                                                                                                            },
                                                                                                                                            etag: {
                                                                                                                                              type: "string",
                                                                                                                                            },
                                                                                                                                          },
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                customNetworkInterfaceName:
                                                                                                                                  {
                                                                                                                                    type: "string",
                                                                                                                                  },
                                                                                                                              },
                                                                                                                          },
                                                                                                                        etag: {
                                                                                                                          type: "string",
                                                                                                                        },
                                                                                                                      },
                                                                                                                  },
                                                                                                                ipConfigurations:
                                                                                                                  {
                                                                                                                    type: "array",
                                                                                                                    items:
                                                                                                                      {
                                                                                                                        type: "object",
                                                                                                                        additionalProperties: true,
                                                                                                                      },
                                                                                                                  },
                                                                                                                tapConfigurations:
                                                                                                                  {
                                                                                                                    type: "array",
                                                                                                                    items:
                                                                                                                      {
                                                                                                                        type: "object",
                                                                                                                        properties:
                                                                                                                          {
                                                                                                                            properties:
                                                                                                                              {
                                                                                                                                type: "object",
                                                                                                                                additionalProperties: true,
                                                                                                                              },
                                                                                                                            name: {
                                                                                                                              type: "object",
                                                                                                                              additionalProperties: true,
                                                                                                                            },
                                                                                                                            etag: {
                                                                                                                              type: "object",
                                                                                                                              additionalProperties: true,
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                              type: "object",
                                                                                                                              additionalProperties: true,
                                                                                                                            },
                                                                                                                          },
                                                                                                                      },
                                                                                                                  },
                                                                                                                dnsSettings:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        dnsServers:
                                                                                                                          {
                                                                                                                            type: "array",
                                                                                                                            items:
                                                                                                                              {
                                                                                                                                type: "string",
                                                                                                                              },
                                                                                                                          },
                                                                                                                        appliedDnsServers:
                                                                                                                          {
                                                                                                                            type: "array",
                                                                                                                            items:
                                                                                                                              {
                                                                                                                                type: "string",
                                                                                                                              },
                                                                                                                          },
                                                                                                                        internalDnsNameLabel:
                                                                                                                          {
                                                                                                                            type: "string",
                                                                                                                          },
                                                                                                                        internalFqdn:
                                                                                                                          {
                                                                                                                            type: "string",
                                                                                                                          },
                                                                                                                        internalDomainNameSuffix:
                                                                                                                          {
                                                                                                                            type: "string",
                                                                                                                          },
                                                                                                                      },
                                                                                                                  },
                                                                                                                macAddress:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                primary:
                                                                                                                  {
                                                                                                                    type: "boolean",
                                                                                                                  },
                                                                                                                vnetEncryptionSupported:
                                                                                                                  {
                                                                                                                    type: "boolean",
                                                                                                                  },
                                                                                                                defaultOutboundConnectivityEnabled:
                                                                                                                  {
                                                                                                                    type: "boolean",
                                                                                                                  },
                                                                                                                enableAcceleratedNetworking:
                                                                                                                  {
                                                                                                                    type: "boolean",
                                                                                                                  },
                                                                                                                disableTcpStateTracking:
                                                                                                                  {
                                                                                                                    type: "boolean",
                                                                                                                  },
                                                                                                                enableIPForwarding:
                                                                                                                  {
                                                                                                                    type: "boolean",
                                                                                                                  },
                                                                                                                hostedWorkloads:
                                                                                                                  {
                                                                                                                    type: "array",
                                                                                                                    items:
                                                                                                                      {
                                                                                                                        type: "string",
                                                                                                                      },
                                                                                                                  },
                                                                                                                dscpConfiguration:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        id: {
                                                                                                                          type: "object",
                                                                                                                          additionalProperties: true,
                                                                                                                        },
                                                                                                                      },
                                                                                                                  },
                                                                                                                resourceGuid:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                provisioningState:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                workloadType:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                nicType:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                privateLinkService:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        extendedLocation:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            properties:
                                                                                                                              {
                                                                                                                                name: {
                                                                                                                                  type: "object",
                                                                                                                                  additionalProperties: true,
                                                                                                                                },
                                                                                                                                type: {
                                                                                                                                  type: "object",
                                                                                                                                  additionalProperties: true,
                                                                                                                                },
                                                                                                                              },
                                                                                                                          },
                                                                                                                        properties:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            properties:
                                                                                                                              {
                                                                                                                                loadBalancerFrontendIpConfigurations:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        properties:
                                                                                                                                          {
                                                                                                                                            properties:
                                                                                                                                              {
                                                                                                                                                type: "object",
                                                                                                                                                additionalProperties: true,
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
                                                                                                                                            zones:
                                                                                                                                              {
                                                                                                                                                type: "array",
                                                                                                                                                items:
                                                                                                                                                  {
                                                                                                                                                    type: "string",
                                                                                                                                                  },
                                                                                                                                              },
                                                                                                                                          },
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                ipConfigurations:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        properties:
                                                                                                                                          {
                                                                                                                                            properties:
                                                                                                                                              {
                                                                                                                                                type: "object",
                                                                                                                                                properties:
                                                                                                                                                  {
                                                                                                                                                    privateIPAddress:
                                                                                                                                                      {
                                                                                                                                                        type: "string",
                                                                                                                                                      },
                                                                                                                                                    privateIPAllocationMethod:
                                                                                                                                                      {
                                                                                                                                                        type: "string",
                                                                                                                                                      },
                                                                                                                                                    subnet:
                                                                                                                                                      {
                                                                                                                                                        type: "object",
                                                                                                                                                        properties:
                                                                                                                                                          {
                                                                                                                                                            properties:
                                                                                                                                                              {
                                                                                                                                                                type: "object",
                                                                                                                                                                additionalProperties: true,
                                                                                                                                                              },
                                                                                                                                                            name: {
                                                                                                                                                              type: "object",
                                                                                                                                                              additionalProperties: true,
                                                                                                                                                            },
                                                                                                                                                            etag: {
                                                                                                                                                              type: "object",
                                                                                                                                                              additionalProperties: true,
                                                                                                                                                            },
                                                                                                                                                            type: {
                                                                                                                                                              type: "object",
                                                                                                                                                              additionalProperties: true,
                                                                                                                                                            },
                                                                                                                                                          },
                                                                                                                                                      },
                                                                                                                                                    primary:
                                                                                                                                                      {
                                                                                                                                                        type: "boolean",
                                                                                                                                                      },
                                                                                                                                                    provisioningState:
                                                                                                                                                      {
                                                                                                                                                        type: "string",
                                                                                                                                                      },
                                                                                                                                                    privateIPAddressVersion:
                                                                                                                                                      {
                                                                                                                                                        type: "string",
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
                                                                                                                                destinationIPAddress:
                                                                                                                                  {
                                                                                                                                    type: "string",
                                                                                                                                  },
                                                                                                                                networkInterfaces:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        additionalProperties: true,
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                provisioningState:
                                                                                                                                  {
                                                                                                                                    type: "string",
                                                                                                                                  },
                                                                                                                                privateEndpointConnections:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        properties:
                                                                                                                                          {
                                                                                                                                            properties:
                                                                                                                                              {
                                                                                                                                                type: "object",
                                                                                                                                                properties:
                                                                                                                                                  {
                                                                                                                                                    privateEndpoint:
                                                                                                                                                      {
                                                                                                                                                        type: "object",
                                                                                                                                                        properties:
                                                                                                                                                          {
                                                                                                                                                            extendedLocation:
                                                                                                                                                              {
                                                                                                                                                                type: "object",
                                                                                                                                                                additionalProperties: true,
                                                                                                                                                              },
                                                                                                                                                            properties:
                                                                                                                                                              {
                                                                                                                                                                type: "object",
                                                                                                                                                                additionalProperties: true,
                                                                                                                                                              },
                                                                                                                                                            etag: {
                                                                                                                                                              type: "object",
                                                                                                                                                              additionalProperties: true,
                                                                                                                                                            },
                                                                                                                                                          },
                                                                                                                                                      },
                                                                                                                                                    privateLinkServiceConnectionState:
                                                                                                                                                      {
                                                                                                                                                        type: "object",
                                                                                                                                                        properties:
                                                                                                                                                          {
                                                                                                                                                            status:
                                                                                                                                                              {
                                                                                                                                                                type: "object",
                                                                                                                                                                additionalProperties: true,
                                                                                                                                                              },
                                                                                                                                                            description:
                                                                                                                                                              {
                                                                                                                                                                type: "object",
                                                                                                                                                                additionalProperties: true,
                                                                                                                                                              },
                                                                                                                                                            actionsRequired:
                                                                                                                                                              {
                                                                                                                                                                type: "object",
                                                                                                                                                                additionalProperties: true,
                                                                                                                                                              },
                                                                                                                                                          },
                                                                                                                                                      },
                                                                                                                                                    provisioningState:
                                                                                                                                                      {
                                                                                                                                                        type: "string",
                                                                                                                                                      },
                                                                                                                                                    linkIdentifier:
                                                                                                                                                      {
                                                                                                                                                        type: "string",
                                                                                                                                                      },
                                                                                                                                                    privateEndpointLocation:
                                                                                                                                                      {
                                                                                                                                                        type: "string",
                                                                                                                                                      },
                                                                                                                                                  },
                                                                                                                                              },
                                                                                                                                            name: {
                                                                                                                                              type: "string",
                                                                                                                                            },
                                                                                                                                            type: {
                                                                                                                                              type: "string",
                                                                                                                                            },
                                                                                                                                            etag: {
                                                                                                                                              type: "string",
                                                                                                                                            },
                                                                                                                                          },
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                visibility:
                                                                                                                                  {
                                                                                                                                    type: "object",
                                                                                                                                  },
                                                                                                                                autoApproval:
                                                                                                                                  {
                                                                                                                                    type: "object",
                                                                                                                                  },
                                                                                                                                fqdns:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "string",
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                alias:
                                                                                                                                  {
                                                                                                                                    type: "string",
                                                                                                                                  },
                                                                                                                                enableProxyProtocol:
                                                                                                                                  {
                                                                                                                                    type: "boolean",
                                                                                                                                  },
                                                                                                                              },
                                                                                                                          },
                                                                                                                        etag: {
                                                                                                                          type: "string",
                                                                                                                        },
                                                                                                                      },
                                                                                                                  },
                                                                                                                migrationPhase:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                auxiliaryMode:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                auxiliarySku:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                              },
                                                                                                          },
                                                                                                        etag: {
                                                                                                          type: "string",
                                                                                                        },
                                                                                                      },
                                                                                                  },
                                                                                              },
                                                                                            subnets:
                                                                                              {
                                                                                                type: "array",
                                                                                                items:
                                                                                                  {
                                                                                                    type: "object",
                                                                                                    properties:
                                                                                                      {
                                                                                                        properties:
                                                                                                          {
                                                                                                            type: "object",
                                                                                                            additionalProperties: true,
                                                                                                          },
                                                                                                        name: {
                                                                                                          type: "object",
                                                                                                          additionalProperties: true,
                                                                                                        },
                                                                                                        etag: {
                                                                                                          type: "object",
                                                                                                          additionalProperties: true,
                                                                                                        },
                                                                                                        type: {
                                                                                                          type: "object",
                                                                                                          additionalProperties: true,
                                                                                                        },
                                                                                                      },
                                                                                                  },
                                                                                              },
                                                                                            flowLogs:
                                                                                              {
                                                                                                type: "array",
                                                                                                items:
                                                                                                  {
                                                                                                    type: "object",
                                                                                                    properties:
                                                                                                      {
                                                                                                        properties:
                                                                                                          {
                                                                                                            type: "object",
                                                                                                            properties:
                                                                                                              {
                                                                                                                targetResourceId:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                targetResourceGuid:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                storageId:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                enabledFilteringCriteria:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                enabled:
                                                                                                                  {
                                                                                                                    type: "boolean",
                                                                                                                  },
                                                                                                                retentionPolicy:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        days: {
                                                                                                                          type: "integer",
                                                                                                                        },
                                                                                                                        enabled:
                                                                                                                          {
                                                                                                                            type: "boolean",
                                                                                                                          },
                                                                                                                      },
                                                                                                                  },
                                                                                                                format:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        type: {
                                                                                                                          type: "string",
                                                                                                                        },
                                                                                                                        version:
                                                                                                                          {
                                                                                                                            type: "integer",
                                                                                                                          },
                                                                                                                      },
                                                                                                                  },
                                                                                                                flowAnalyticsConfiguration:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        networkWatcherFlowAnalyticsConfiguration:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            properties:
                                                                                                                              {
                                                                                                                                enabled:
                                                                                                                                  {
                                                                                                                                    type: "boolean",
                                                                                                                                  },
                                                                                                                                workspaceId:
                                                                                                                                  {
                                                                                                                                    type: "string",
                                                                                                                                  },
                                                                                                                                workspaceRegion:
                                                                                                                                  {
                                                                                                                                    type: "string",
                                                                                                                                  },
                                                                                                                                workspaceResourceId:
                                                                                                                                  {
                                                                                                                                    type: "string",
                                                                                                                                  },
                                                                                                                                trafficAnalyticsInterval:
                                                                                                                                  {
                                                                                                                                    type: "integer",
                                                                                                                                  },
                                                                                                                              },
                                                                                                                          },
                                                                                                                      },
                                                                                                                  },
                                                                                                                provisioningState:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                              },
                                                                                                            required:
                                                                                                              [
                                                                                                                "targetResourceId",
                                                                                                                "storageId",
                                                                                                              ],
                                                                                                          },
                                                                                                        etag: {
                                                                                                          type: "string",
                                                                                                        },
                                                                                                        identity:
                                                                                                          {
                                                                                                            type: "object",
                                                                                                            properties:
                                                                                                              {
                                                                                                                principalId:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                tenantId:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                type: {
                                                                                                                  type: "string",
                                                                                                                },
                                                                                                                userAssignedIdentities:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    additionalProperties: true,
                                                                                                                  },
                                                                                                              },
                                                                                                          },
                                                                                                      },
                                                                                                  },
                                                                                              },
                                                                                            resourceGuid:
                                                                                              {
                                                                                                type: "string",
                                                                                              },
                                                                                            provisioningState:
                                                                                              {
                                                                                                type: "string",
                                                                                              },
                                                                                          },
                                                                                      },
                                                                                    etag: {
                                                                                      type: "object",
                                                                                      additionalProperties: true,
                                                                                    },
                                                                                  },
                                                                              },
                                                                            routeTable:
                                                                              {
                                                                                type: "object",
                                                                                properties:
                                                                                  {
                                                                                    properties:
                                                                                      {
                                                                                        type: "object",
                                                                                        properties:
                                                                                          {
                                                                                            routes:
                                                                                              {
                                                                                                type: "array",
                                                                                                items:
                                                                                                  {
                                                                                                    type: "object",
                                                                                                    properties:
                                                                                                      {
                                                                                                        properties:
                                                                                                          {
                                                                                                            type: "object",
                                                                                                            properties:
                                                                                                              {
                                                                                                                addressPrefix:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                nextHopType:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                nextHopIpAddress:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                provisioningState:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                hasBgpOverride:
                                                                                                                  {
                                                                                                                    type: "boolean",
                                                                                                                  },
                                                                                                              },
                                                                                                            required:
                                                                                                              [
                                                                                                                "nextHopType",
                                                                                                              ],
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
                                                                                            subnets:
                                                                                              {
                                                                                                type: "array",
                                                                                                items:
                                                                                                  {
                                                                                                    type: "object",
                                                                                                    additionalProperties: true,
                                                                                                  },
                                                                                              },
                                                                                            disableBgpRoutePropagation:
                                                                                              {
                                                                                                type: "boolean",
                                                                                              },
                                                                                            provisioningState:
                                                                                              {
                                                                                                type: "string",
                                                                                              },
                                                                                            resourceGuid:
                                                                                              {
                                                                                                type: "string",
                                                                                              },
                                                                                          },
                                                                                      },
                                                                                    etag: {
                                                                                      type: "string",
                                                                                    },
                                                                                  },
                                                                              },
                                                                            natGateway:
                                                                              {
                                                                                type: "object",
                                                                                properties:
                                                                                  {
                                                                                    id: {
                                                                                      type: "object",
                                                                                      additionalProperties: true,
                                                                                    },
                                                                                  },
                                                                              },
                                                                            serviceEndpoints:
                                                                              {
                                                                                type: "array",
                                                                                items:
                                                                                  {
                                                                                    type: "object",
                                                                                    properties:
                                                                                      {
                                                                                        service:
                                                                                          {
                                                                                            type: "string",
                                                                                          },
                                                                                        networkIdentifier:
                                                                                          {
                                                                                            type: "object",
                                                                                            properties:
                                                                                              {
                                                                                                id: {
                                                                                                  type: "object",
                                                                                                  additionalProperties: true,
                                                                                                },
                                                                                              },
                                                                                          },
                                                                                        locations:
                                                                                          {
                                                                                            type: "array",
                                                                                            items:
                                                                                              {
                                                                                                type: "string",
                                                                                              },
                                                                                          },
                                                                                        provisioningState:
                                                                                          {
                                                                                            type: "string",
                                                                                          },
                                                                                      },
                                                                                  },
                                                                              },
                                                                            serviceEndpointPolicies:
                                                                              {
                                                                                type: "array",
                                                                                items:
                                                                                  {
                                                                                    type: "object",
                                                                                    properties:
                                                                                      {
                                                                                        properties:
                                                                                          {
                                                                                            type: "object",
                                                                                            properties:
                                                                                              {
                                                                                                serviceEndpointPolicyDefinitions:
                                                                                                  {
                                                                                                    type: "array",
                                                                                                    items:
                                                                                                      {
                                                                                                        type: "object",
                                                                                                        properties:
                                                                                                          {
                                                                                                            properties:
                                                                                                              {
                                                                                                                type: "object",
                                                                                                                properties:
                                                                                                                  {
                                                                                                                    description:
                                                                                                                      {
                                                                                                                        type: "string",
                                                                                                                      },
                                                                                                                    service:
                                                                                                                      {
                                                                                                                        type: "string",
                                                                                                                      },
                                                                                                                    serviceResources:
                                                                                                                      {
                                                                                                                        type: "array",
                                                                                                                        items:
                                                                                                                          {
                                                                                                                            type: "string",
                                                                                                                          },
                                                                                                                      },
                                                                                                                    provisioningState:
                                                                                                                      {
                                                                                                                        type: "string",
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
                                                                                                subnets:
                                                                                                  {
                                                                                                    type: "array",
                                                                                                    items:
                                                                                                      {
                                                                                                        type: "object",
                                                                                                        additionalProperties: true,
                                                                                                      },
                                                                                                  },
                                                                                                resourceGuid:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                                provisioningState:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                                serviceAlias:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                                contextualServiceEndpointPolicies:
                                                                                                  {
                                                                                                    type: "array",
                                                                                                    items:
                                                                                                      {
                                                                                                        type: "string",
                                                                                                      },
                                                                                                  },
                                                                                              },
                                                                                          },
                                                                                        etag: {
                                                                                          type: "string",
                                                                                        },
                                                                                        kind: {
                                                                                          type: "string",
                                                                                        },
                                                                                      },
                                                                                  },
                                                                              },
                                                                            privateEndpoints:
                                                                              {
                                                                                type: "array",
                                                                                items:
                                                                                  {
                                                                                    type: "object",
                                                                                    properties:
                                                                                      {
                                                                                        extendedLocation:
                                                                                          {
                                                                                            type: "object",
                                                                                            additionalProperties: true,
                                                                                          },
                                                                                        properties:
                                                                                          {
                                                                                            type: "object",
                                                                                            additionalProperties: true,
                                                                                          },
                                                                                        etag: {
                                                                                          type: "object",
                                                                                          additionalProperties: true,
                                                                                        },
                                                                                      },
                                                                                  },
                                                                              },
                                                                            ipConfigurations:
                                                                              {
                                                                                type: "array",
                                                                                items:
                                                                                  {
                                                                                    type: "object",
                                                                                    properties:
                                                                                      {
                                                                                        properties:
                                                                                          {
                                                                                            type: "object",
                                                                                            properties:
                                                                                              {
                                                                                                privateIPAddress:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                                privateIPAllocationMethod:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                                subnet:
                                                                                                  {
                                                                                                    type: "object",
                                                                                                    properties:
                                                                                                      {
                                                                                                        properties:
                                                                                                          {
                                                                                                            type: "object",
                                                                                                            additionalProperties: true,
                                                                                                          },
                                                                                                        name: {
                                                                                                          type: "object",
                                                                                                          additionalProperties: true,
                                                                                                        },
                                                                                                        etag: {
                                                                                                          type: "object",
                                                                                                          additionalProperties: true,
                                                                                                        },
                                                                                                        type: {
                                                                                                          type: "object",
                                                                                                          additionalProperties: true,
                                                                                                        },
                                                                                                      },
                                                                                                  },
                                                                                                publicIPAddress:
                                                                                                  {
                                                                                                    type: "object",
                                                                                                    properties:
                                                                                                      {
                                                                                                        extendedLocation:
                                                                                                          {
                                                                                                            type: "object",
                                                                                                            properties:
                                                                                                              {
                                                                                                                name: {
                                                                                                                  type: "object",
                                                                                                                  additionalProperties: true,
                                                                                                                },
                                                                                                                type: {
                                                                                                                  type: "object",
                                                                                                                  additionalProperties: true,
                                                                                                                },
                                                                                                              },
                                                                                                          },
                                                                                                        sku: {
                                                                                                          type: "object",
                                                                                                          properties:
                                                                                                            {
                                                                                                              name: {
                                                                                                                type: "string",
                                                                                                              },
                                                                                                              tier: {
                                                                                                                type: "string",
                                                                                                              },
                                                                                                            },
                                                                                                        },
                                                                                                        properties:
                                                                                                          {
                                                                                                            type: "object",
                                                                                                            properties:
                                                                                                              {
                                                                                                                publicIPAllocationMethod:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                publicIPAddressVersion:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                ipConfiguration:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        properties:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            additionalProperties: true,
                                                                                                                          },
                                                                                                                        name: {
                                                                                                                          type: "string",
                                                                                                                        },
                                                                                                                        etag: {
                                                                                                                          type: "string",
                                                                                                                        },
                                                                                                                      },
                                                                                                                  },
                                                                                                                dnsSettings:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        domainNameLabel:
                                                                                                                          {
                                                                                                                            type: "string",
                                                                                                                          },
                                                                                                                        domainNameLabelScope:
                                                                                                                          {
                                                                                                                            type: "string",
                                                                                                                          },
                                                                                                                        fqdn: {
                                                                                                                          type: "string",
                                                                                                                        },
                                                                                                                        reverseFqdn:
                                                                                                                          {
                                                                                                                            type: "string",
                                                                                                                          },
                                                                                                                      },
                                                                                                                  },
                                                                                                                ddosSettings:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        protectionMode:
                                                                                                                          {
                                                                                                                            type: "string",
                                                                                                                          },
                                                                                                                        ddosProtectionPlan:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            properties:
                                                                                                                              {
                                                                                                                                id: {
                                                                                                                                  type: "object",
                                                                                                                                  additionalProperties: true,
                                                                                                                                },
                                                                                                                              },
                                                                                                                          },
                                                                                                                      },
                                                                                                                  },
                                                                                                                ipTags:
                                                                                                                  {
                                                                                                                    type: "array",
                                                                                                                    items:
                                                                                                                      {
                                                                                                                        type: "object",
                                                                                                                        properties:
                                                                                                                          {
                                                                                                                            ipTagType:
                                                                                                                              {
                                                                                                                                type: "string",
                                                                                                                              },
                                                                                                                            tag: {
                                                                                                                              type: "string",
                                                                                                                            },
                                                                                                                          },
                                                                                                                      },
                                                                                                                  },
                                                                                                                ipAddress:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                publicIPPrefix:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        id: {
                                                                                                                          type: "object",
                                                                                                                          additionalProperties: true,
                                                                                                                        },
                                                                                                                      },
                                                                                                                  },
                                                                                                                idleTimeoutInMinutes:
                                                                                                                  {
                                                                                                                    type: "integer",
                                                                                                                  },
                                                                                                                resourceGuid:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                provisioningState:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                servicePublicIPAddress:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        extendedLocation:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            additionalProperties: true,
                                                                                                                          },
                                                                                                                        sku: {
                                                                                                                          type: "object",
                                                                                                                          additionalProperties: true,
                                                                                                                        },
                                                                                                                        properties:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            additionalProperties: true,
                                                                                                                          },
                                                                                                                        etag: {
                                                                                                                          type: "string",
                                                                                                                        },
                                                                                                                        zones:
                                                                                                                          {
                                                                                                                            type: "array",
                                                                                                                            items:
                                                                                                                              {
                                                                                                                                type: "string",
                                                                                                                              },
                                                                                                                          },
                                                                                                                      },
                                                                                                                  },
                                                                                                                natGateway:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        sku: {
                                                                                                                          type: "object",
                                                                                                                          properties:
                                                                                                                            {
                                                                                                                              name: {
                                                                                                                                type: "string",
                                                                                                                              },
                                                                                                                            },
                                                                                                                        },
                                                                                                                        properties:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            properties:
                                                                                                                              {
                                                                                                                                idleTimeoutInMinutes:
                                                                                                                                  {
                                                                                                                                    type: "integer",
                                                                                                                                  },
                                                                                                                                publicIpAddresses:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        additionalProperties: true,
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                publicIpAddressesV6:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        additionalProperties: true,
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                publicIpPrefixes:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        additionalProperties: true,
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                publicIpPrefixesV6:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        additionalProperties: true,
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                subnets:
                                                                                                                                  {
                                                                                                                                    type: "array",
                                                                                                                                    items:
                                                                                                                                      {
                                                                                                                                        type: "object",
                                                                                                                                        additionalProperties: true,
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                sourceVirtualNetwork:
                                                                                                                                  {
                                                                                                                                    type: "object",
                                                                                                                                    properties:
                                                                                                                                      {
                                                                                                                                        id: {
                                                                                                                                          type: "object",
                                                                                                                                          additionalProperties: true,
                                                                                                                                        },
                                                                                                                                      },
                                                                                                                                  },
                                                                                                                                resourceGuid:
                                                                                                                                  {
                                                                                                                                    type: "string",
                                                                                                                                  },
                                                                                                                                provisioningState:
                                                                                                                                  {
                                                                                                                                    type: "string",
                                                                                                                                  },
                                                                                                                              },
                                                                                                                          },
                                                                                                                        zones:
                                                                                                                          {
                                                                                                                            type: "array",
                                                                                                                            items:
                                                                                                                              {
                                                                                                                                type: "string",
                                                                                                                              },
                                                                                                                          },
                                                                                                                        etag: {
                                                                                                                          type: "string",
                                                                                                                        },
                                                                                                                      },
                                                                                                                  },
                                                                                                                migrationPhase:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                                linkedPublicIPAddress:
                                                                                                                  {
                                                                                                                    type: "object",
                                                                                                                    properties:
                                                                                                                      {
                                                                                                                        extendedLocation:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            additionalProperties: true,
                                                                                                                          },
                                                                                                                        sku: {
                                                                                                                          type: "object",
                                                                                                                          additionalProperties: true,
                                                                                                                        },
                                                                                                                        properties:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            additionalProperties: true,
                                                                                                                          },
                                                                                                                        etag: {
                                                                                                                          type: "object",
                                                                                                                          additionalProperties: true,
                                                                                                                        },
                                                                                                                        zones:
                                                                                                                          {
                                                                                                                            type: "object",
                                                                                                                            additionalProperties: true,
                                                                                                                          },
                                                                                                                      },
                                                                                                                  },
                                                                                                                deleteOption:
                                                                                                                  {
                                                                                                                    type: "string",
                                                                                                                  },
                                                                                                              },
                                                                                                          },
                                                                                                        etag: {
                                                                                                          type: "object",
                                                                                                          additionalProperties: true,
                                                                                                        },
                                                                                                        zones:
                                                                                                          {
                                                                                                            type: "object",
                                                                                                            additionalProperties: true,
                                                                                                          },
                                                                                                      },
                                                                                                  },
                                                                                                provisioningState:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                              },
                                                                                          },
                                                                                        name: {
                                                                                          type: "object",
                                                                                          additionalProperties: true,
                                                                                        },
                                                                                        etag: {
                                                                                          type: "object",
                                                                                          additionalProperties: true,
                                                                                        },
                                                                                      },
                                                                                  },
                                                                              },
                                                                            ipConfigurationProfiles:
                                                                              {
                                                                                type: "array",
                                                                                items:
                                                                                  {
                                                                                    type: "object",
                                                                                    properties:
                                                                                      {
                                                                                        properties:
                                                                                          {
                                                                                            type: "object",
                                                                                            properties:
                                                                                              {
                                                                                                subnet:
                                                                                                  {
                                                                                                    type: "object",
                                                                                                    properties:
                                                                                                      {
                                                                                                        properties:
                                                                                                          {
                                                                                                            type: "object",
                                                                                                            additionalProperties: true,
                                                                                                          },
                                                                                                        name: {
                                                                                                          type: "object",
                                                                                                          additionalProperties: true,
                                                                                                        },
                                                                                                        etag: {
                                                                                                          type: "object",
                                                                                                          additionalProperties: true,
                                                                                                        },
                                                                                                        type: {
                                                                                                          type: "object",
                                                                                                          additionalProperties: true,
                                                                                                        },
                                                                                                      },
                                                                                                  },
                                                                                                provisioningState:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                              },
                                                                                          },
                                                                                        name: {
                                                                                          type: "string",
                                                                                        },
                                                                                        type: {
                                                                                          type: "string",
                                                                                        },
                                                                                        etag: {
                                                                                          type: "string",
                                                                                        },
                                                                                      },
                                                                                  },
                                                                              },
                                                                            ipAllocations:
                                                                              {
                                                                                type: "array",
                                                                                items:
                                                                                  {
                                                                                    type: "object",
                                                                                    additionalProperties: true,
                                                                                  },
                                                                              },
                                                                            resourceNavigationLinks:
                                                                              {
                                                                                type: "array",
                                                                                items:
                                                                                  {
                                                                                    type: "object",
                                                                                    properties:
                                                                                      {
                                                                                        properties:
                                                                                          {
                                                                                            type: "object",
                                                                                            properties:
                                                                                              {
                                                                                                linkedResourceType:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                                link: {
                                                                                                  type: "string",
                                                                                                },
                                                                                                provisioningState:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                              },
                                                                                          },
                                                                                        name: {
                                                                                          type: "string",
                                                                                        },
                                                                                        id: {
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
                                                                            serviceAssociationLinks:
                                                                              {
                                                                                type: "array",
                                                                                items:
                                                                                  {
                                                                                    type: "object",
                                                                                    properties:
                                                                                      {
                                                                                        properties:
                                                                                          {
                                                                                            type: "object",
                                                                                            properties:
                                                                                              {
                                                                                                linkedResourceType:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                                link: {
                                                                                                  type: "string",
                                                                                                },
                                                                                                provisioningState:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                                allowDelete:
                                                                                                  {
                                                                                                    type: "boolean",
                                                                                                  },
                                                                                                locations:
                                                                                                  {
                                                                                                    type: "array",
                                                                                                    items:
                                                                                                      {
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
                                                                            delegations:
                                                                              {
                                                                                type: "array",
                                                                                items:
                                                                                  {
                                                                                    type: "object",
                                                                                    properties:
                                                                                      {
                                                                                        properties:
                                                                                          {
                                                                                            type: "object",
                                                                                            properties:
                                                                                              {
                                                                                                serviceName:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                                actions:
                                                                                                  {
                                                                                                    type: "array",
                                                                                                    items:
                                                                                                      {
                                                                                                        type: "string",
                                                                                                      },
                                                                                                  },
                                                                                                provisioningState:
                                                                                                  {
                                                                                                    type: "string",
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
                                                                            purpose:
                                                                              {
                                                                                type: "string",
                                                                              },
                                                                            provisioningState:
                                                                              {
                                                                                type: "string",
                                                                              },
                                                                            privateEndpointNetworkPolicies:
                                                                              {
                                                                                type: "string",
                                                                              },
                                                                            privateLinkServiceNetworkPolicies:
                                                                              {
                                                                                type: "string",
                                                                              },
                                                                            applicationGatewayIPConfigurations:
                                                                              {
                                                                                type: "array",
                                                                                items:
                                                                                  {
                                                                                    type: "object",
                                                                                    additionalProperties: true,
                                                                                  },
                                                                              },
                                                                            sharingScope:
                                                                              {
                                                                                type: "string",
                                                                              },
                                                                            defaultOutboundAccess:
                                                                              {
                                                                                type: "boolean",
                                                                              },
                                                                            ipamPoolPrefixAllocations:
                                                                              {
                                                                                type: "array",
                                                                                items:
                                                                                  {
                                                                                    type: "object",
                                                                                    properties:
                                                                                      {
                                                                                        pool: {
                                                                                          type: "object",
                                                                                          properties:
                                                                                            {
                                                                                              id: {
                                                                                                type: "string",
                                                                                              },
                                                                                            },
                                                                                        },
                                                                                        numberOfIpAddresses:
                                                                                          {
                                                                                            type: "string",
                                                                                          },
                                                                                        allocatedAddressPrefixes:
                                                                                          {
                                                                                            type: "array",
                                                                                            items:
                                                                                              {
                                                                                                type: "string",
                                                                                              },
                                                                                          },
                                                                                      },
                                                                                  },
                                                                              },
                                                                          },
                                                                      },
                                                                    name: {
                                                                      type: "object",
                                                                      additionalProperties: true,
                                                                    },
                                                                    etag: {
                                                                      type: "object",
                                                                      additionalProperties: true,
                                                                    },
                                                                    type: {
                                                                      type: "object",
                                                                      additionalProperties: true,
                                                                    },
                                                                  },
                                                                },
                                                                publicIPAddress:
                                                                  {
                                                                    type: "object",
                                                                    properties:
                                                                      {
                                                                        extendedLocation:
                                                                          {
                                                                            type: "object",
                                                                            additionalProperties: true,
                                                                          },
                                                                        sku: {
                                                                          type: "object",
                                                                          additionalProperties: true,
                                                                        },
                                                                        properties:
                                                                          {
                                                                            type: "object",
                                                                            additionalProperties: true,
                                                                          },
                                                                        etag: {
                                                                          type: "object",
                                                                          additionalProperties: true,
                                                                        },
                                                                        zones: {
                                                                          type: "object",
                                                                          additionalProperties: true,
                                                                        },
                                                                      },
                                                                  },
                                                                publicIPPrefix:
                                                                  {
                                                                    type: "object",
                                                                    properties:
                                                                      {
                                                                        id: {
                                                                          type: "object",
                                                                          additionalProperties: true,
                                                                        },
                                                                      },
                                                                  },
                                                                gatewayLoadBalancer:
                                                                  {
                                                                    type: "object",
                                                                    properties:
                                                                      {
                                                                        id: {
                                                                          type: "object",
                                                                          additionalProperties: true,
                                                                        },
                                                                      },
                                                                  },
                                                                provisioningState:
                                                                  {
                                                                    type: "string",
                                                                  },
                                                              },
                                                            },
                                                            name: {
                                                              type: "object",
                                                              additionalProperties: true,
                                                            },
                                                            etag: {
                                                              type: "object",
                                                              additionalProperties: true,
                                                            },
                                                            type: {
                                                              type: "object",
                                                              additionalProperties: true,
                                                            },
                                                            zones: {
                                                              type: "object",
                                                              additionalProperties: true,
                                                            },
                                                          },
                                                        },
                                                      destinationPort: {
                                                        type: "integer",
                                                      },
                                                    },
                                                  },
                                                  etag: {
                                                    type: "object",
                                                    additionalProperties: true,
                                                  },
                                                },
                                              },
                                            },
                                            applicationGatewayBackendAddressPools:
                                              {
                                                type: "array",
                                                items: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                              },
                                            loadBalancerBackendAddressPools: {
                                              type: "array",
                                              items: {
                                                type: "object",
                                                properties: {
                                                  properties: {
                                                    type: "object",
                                                    properties: {
                                                      location: {
                                                        type: "string",
                                                      },
                                                      tunnelInterfaces: {
                                                        type: "array",
                                                        items: {
                                                          type: "object",
                                                          properties: {
                                                            port: {
                                                              type: "integer",
                                                            },
                                                            identifier: {
                                                              type: "integer",
                                                            },
                                                            protocol: {
                                                              type: "string",
                                                            },
                                                            type: {
                                                              type: "string",
                                                            },
                                                          },
                                                        },
                                                      },
                                                      loadBalancerBackendAddresses:
                                                        {
                                                          type: "array",
                                                          items: {
                                                            type: "object",
                                                            properties: {
                                                              properties: {
                                                                type: "object",
                                                                properties: {
                                                                  virtualNetwork:
                                                                    {
                                                                      type: "object",
                                                                      properties:
                                                                        {
                                                                          id: {
                                                                            type: "object",
                                                                            additionalProperties: true,
                                                                          },
                                                                        },
                                                                    },
                                                                  subnet: {
                                                                    type: "object",
                                                                    properties:
                                                                      {
                                                                        id: {
                                                                          type: "object",
                                                                          additionalProperties: true,
                                                                        },
                                                                      },
                                                                  },
                                                                  ipAddress: {
                                                                    type: "string",
                                                                  },
                                                                  networkInterfaceIPConfiguration:
                                                                    {
                                                                      type: "object",
                                                                      properties:
                                                                        {
                                                                          id: {
                                                                            type: "object",
                                                                            additionalProperties: true,
                                                                          },
                                                                        },
                                                                    },
                                                                  loadBalancerFrontendIPConfiguration:
                                                                    {
                                                                      type: "object",
                                                                      properties:
                                                                        {
                                                                          id: {
                                                                            type: "object",
                                                                            additionalProperties: true,
                                                                          },
                                                                        },
                                                                    },
                                                                  inboundNatRulesPortMapping:
                                                                    {
                                                                      type: "array",
                                                                      items: {
                                                                        type: "object",
                                                                        properties:
                                                                          {
                                                                            inboundNatRuleName:
                                                                              {
                                                                                type: "string",
                                                                              },
                                                                            frontendPort:
                                                                              {
                                                                                type: "integer",
                                                                              },
                                                                            backendPort:
                                                                              {
                                                                                type: "integer",
                                                                              },
                                                                          },
                                                                      },
                                                                    },
                                                                  adminState: {
                                                                    type: "string",
                                                                  },
                                                                },
                                                              },
                                                              name: {
                                                                type: "string",
                                                              },
                                                            },
                                                          },
                                                        },
                                                      backendIPConfigurations: {
                                                        type: "array",
                                                        items: {
                                                          type: "object",
                                                          additionalProperties: true,
                                                        },
                                                      },
                                                      loadBalancingRules: {
                                                        type: "array",
                                                        items: {
                                                          type: "object",
                                                          additionalProperties: true,
                                                        },
                                                      },
                                                      outboundRule: {
                                                        type: "object",
                                                        properties: {
                                                          id: {
                                                            type: "object",
                                                            additionalProperties: true,
                                                          },
                                                        },
                                                      },
                                                      outboundRules: {
                                                        type: "array",
                                                        items: {
                                                          type: "object",
                                                          additionalProperties: true,
                                                        },
                                                      },
                                                      inboundNatRules: {
                                                        type: "array",
                                                        items: {
                                                          type: "object",
                                                          additionalProperties: true,
                                                        },
                                                      },
                                                      provisioningState: {
                                                        type: "string",
                                                      },
                                                      drainPeriodInSeconds: {
                                                        type: "integer",
                                                      },
                                                      virtualNetwork: {
                                                        type: "object",
                                                        properties: {
                                                          id: {
                                                            type: "object",
                                                            additionalProperties: true,
                                                          },
                                                        },
                                                      },
                                                      syncMode: {
                                                        type: "string",
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
                                            loadBalancerInboundNatRules: {
                                              type: "array",
                                              items: {
                                                type: "object",
                                                properties: {
                                                  properties: {
                                                    type: "object",
                                                    properties: {
                                                      frontendIPConfiguration: {
                                                        type: "object",
                                                        properties: {
                                                          id: {
                                                            type: "object",
                                                            additionalProperties: true,
                                                          },
                                                        },
                                                      },
                                                      backendIPConfiguration: {
                                                        type: "object",
                                                        properties: {
                                                          properties: {
                                                            type: "object",
                                                            additionalProperties: true,
                                                          },
                                                          name: {
                                                            type: "object",
                                                            additionalProperties: true,
                                                          },
                                                          etag: {
                                                            type: "object",
                                                            additionalProperties: true,
                                                          },
                                                          type: {
                                                            type: "object",
                                                            additionalProperties: true,
                                                          },
                                                        },
                                                      },
                                                      protocol: {
                                                        type: "string",
                                                      },
                                                      frontendPort: {
                                                        type: "integer",
                                                      },
                                                      backendPort: {
                                                        type: "integer",
                                                      },
                                                      idleTimeoutInMinutes: {
                                                        type: "integer",
                                                      },
                                                      enableFloatingIP: {
                                                        type: "boolean",
                                                      },
                                                      enableTcpReset: {
                                                        type: "boolean",
                                                      },
                                                      frontendPortRangeStart: {
                                                        type: "integer",
                                                      },
                                                      frontendPortRangeEnd: {
                                                        type: "integer",
                                                      },
                                                      backendAddressPool: {
                                                        type: "object",
                                                        properties: {
                                                          id: {
                                                            type: "object",
                                                            additionalProperties: true,
                                                          },
                                                        },
                                                      },
                                                      provisioningState: {
                                                        type: "string",
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
                                            privateIPAddress: {
                                              type: "string",
                                            },
                                            privateIPAddressPrefixLength: {
                                              type: "integer",
                                            },
                                            privateIPAllocationMethod: {
                                              type: "string",
                                            },
                                            privateIPAddressVersion: {
                                              type: "string",
                                            },
                                            subnet: {
                                              type: "object",
                                              properties: {
                                                properties: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                                name: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                                etag: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                                type: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                              },
                                            },
                                            primary: {
                                              type: "boolean",
                                            },
                                            publicIPAddress: {
                                              type: "object",
                                              properties: {
                                                extendedLocation: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                                sku: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                                properties: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                                etag: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                                zones: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                              },
                                            },
                                            applicationSecurityGroups: {
                                              type: "array",
                                              items: {
                                                type: "object",
                                                additionalProperties: true,
                                              },
                                            },
                                            provisioningState: {
                                              type: "string",
                                            },
                                            privateLinkConnectionProperties: {
                                              type: "object",
                                              properties: {
                                                groupId: {
                                                  type: "string",
                                                },
                                                requiredMemberName: {
                                                  type: "string",
                                                },
                                                fqdns: {
                                                  type: "array",
                                                  items: {
                                                    type: "string",
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        name: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        etag: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        type: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                    },
                                  },
                                  backendAddresses: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        fqdn: {
                                          type: "string",
                                        },
                                        ipAddress: {
                                          type: "string",
                                        },
                                      },
                                    },
                                  },
                                  provisioningState: {
                                    type: "string",
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
                        backendHttpSettingsCollection: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  port: {
                                    type: "integer",
                                  },
                                  protocol: {
                                    type: "string",
                                  },
                                  cookieBasedAffinity: {
                                    type: "string",
                                  },
                                  requestTimeout: {
                                    type: "integer",
                                  },
                                  probe: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  authenticationCertificates: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      additionalProperties: true,
                                    },
                                  },
                                  trustedRootCertificates: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      additionalProperties: true,
                                    },
                                  },
                                  connectionDraining: {
                                    type: "object",
                                    properties: {
                                      enabled: {
                                        type: "boolean",
                                      },
                                      drainTimeoutInSec: {
                                        type: "integer",
                                      },
                                    },
                                    required: ["enabled", "drainTimeoutInSec"],
                                  },
                                  hostName: {
                                    type: "string",
                                  },
                                  pickHostNameFromBackendAddress: {
                                    type: "boolean",
                                  },
                                  affinityCookieName: {
                                    type: "string",
                                  },
                                  probeEnabled: {
                                    type: "boolean",
                                  },
                                  path: {
                                    type: "string",
                                  },
                                  dedicatedBackendConnection: {
                                    type: "boolean",
                                  },
                                  validateCertChainAndExpiry: {
                                    type: "boolean",
                                  },
                                  validateSNI: {
                                    type: "boolean",
                                  },
                                  sniName: {
                                    type: "string",
                                  },
                                  provisioningState: {
                                    type: "string",
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
                        backendSettingsCollection: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  port: {
                                    type: "integer",
                                  },
                                  protocol: {
                                    type: "string",
                                  },
                                  timeout: {
                                    type: "integer",
                                  },
                                  probe: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  trustedRootCertificates: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      additionalProperties: true,
                                    },
                                  },
                                  hostName: {
                                    type: "string",
                                  },
                                  pickHostNameFromBackendAddress: {
                                    type: "boolean",
                                  },
                                  provisioningState: {
                                    type: "string",
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
                        httpListeners: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  frontendIPConfiguration: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  frontendPort: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  protocol: {
                                    type: "string",
                                  },
                                  hostName: {
                                    type: "string",
                                  },
                                  sslCertificate: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  sslProfile: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  requireServerNameIndication: {
                                    type: "boolean",
                                  },
                                  provisioningState: {
                                    type: "string",
                                  },
                                  customErrorConfigurations: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        statusCode: {
                                          type: "string",
                                        },
                                        customErrorPageUrl: {
                                          type: "string",
                                        },
                                      },
                                    },
                                  },
                                  firewallPolicy: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  hostNames: {
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
                        listeners: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  frontendIPConfiguration: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  frontendPort: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  protocol: {
                                    type: "string",
                                  },
                                  sslCertificate: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  sslProfile: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  provisioningState: {
                                    type: "string",
                                  },
                                  hostNames: {
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
                        sslProfiles: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  trustedClientCertificates: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      additionalProperties: true,
                                    },
                                  },
                                  sslPolicy: {
                                    type: "object",
                                    properties: {
                                      disabledSslProtocols: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      policyType: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      policyName: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      cipherSuites: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      minProtocolVersion: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  clientAuthConfiguration: {
                                    type: "object",
                                    properties: {
                                      verifyClientCertIssuerDN: {
                                        type: "boolean",
                                      },
                                      verifyClientRevocation: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  provisioningState: {
                                    type: "string",
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
                        urlPathMaps: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  defaultBackendAddressPool: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  defaultBackendHttpSettings: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  defaultRewriteRuleSet: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  defaultRedirectConfiguration: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  defaultLoadDistributionPolicy: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  pathRules: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        properties: {
                                          type: "object",
                                          properties: {
                                            paths: {
                                              type: "array",
                                              items: {
                                                type: "string",
                                              },
                                            },
                                            backendAddressPool: {
                                              type: "object",
                                              properties: {
                                                id: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                              },
                                            },
                                            backendHttpSettings: {
                                              type: "object",
                                              properties: {
                                                id: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                              },
                                            },
                                            redirectConfiguration: {
                                              type: "object",
                                              properties: {
                                                id: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                              },
                                            },
                                            rewriteRuleSet: {
                                              type: "object",
                                              properties: {
                                                id: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                              },
                                            },
                                            loadDistributionPolicy: {
                                              type: "object",
                                              properties: {
                                                id: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                              },
                                            },
                                            provisioningState: {
                                              type: "string",
                                            },
                                            firewallPolicy: {
                                              type: "object",
                                              properties: {
                                                id: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
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
                                  provisioningState: {
                                    type: "string",
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
                        requestRoutingRules: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  ruleType: {
                                    type: "string",
                                  },
                                  priority: {
                                    type: "integer",
                                  },
                                  backendAddressPool: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  backendHttpSettings: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  httpListener: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  urlPathMap: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  rewriteRuleSet: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  redirectConfiguration: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  loadDistributionPolicy: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  provisioningState: {
                                    type: "string",
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
                        routingRules: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  ruleType: {
                                    type: "string",
                                  },
                                  priority: {
                                    type: "integer",
                                  },
                                  backendAddressPool: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  backendSettings: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  listener: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  provisioningState: {
                                    type: "string",
                                  },
                                },
                                required: ["priority"],
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
                        rewriteRuleSets: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  rewriteRules: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        name: {
                                          type: "string",
                                        },
                                        ruleSequence: {
                                          type: "integer",
                                        },
                                        conditions: {
                                          type: "array",
                                          items: {
                                            type: "object",
                                            properties: {
                                              variable: {
                                                type: "string",
                                              },
                                              pattern: {
                                                type: "string",
                                              },
                                              ignoreCase: {
                                                type: "boolean",
                                              },
                                              negate: {
                                                type: "boolean",
                                              },
                                            },
                                          },
                                        },
                                        actionSet: {
                                          type: "object",
                                          properties: {
                                            requestHeaderConfigurations: {
                                              type: "array",
                                              items: {
                                                type: "object",
                                                properties: {
                                                  headerName: {
                                                    type: "string",
                                                  },
                                                  headerValueMatcher: {
                                                    type: "object",
                                                    properties: {
                                                      pattern: {
                                                        type: "string",
                                                      },
                                                      ignoreCase: {
                                                        type: "boolean",
                                                      },
                                                      negate: {
                                                        type: "boolean",
                                                      },
                                                    },
                                                  },
                                                  headerValue: {
                                                    type: "string",
                                                  },
                                                },
                                              },
                                            },
                                            responseHeaderConfigurations: {
                                              type: "array",
                                              items: {
                                                type: "object",
                                                additionalProperties: true,
                                              },
                                            },
                                            urlConfiguration: {
                                              type: "object",
                                              properties: {
                                                modifiedPath: {
                                                  type: "string",
                                                },
                                                modifiedQueryString: {
                                                  type: "string",
                                                },
                                                reroute: {
                                                  type: "boolean",
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                  provisioningState: {
                                    type: "string",
                                  },
                                },
                              },
                              name: {
                                type: "string",
                              },
                              etag: {
                                type: "string",
                              },
                            },
                          },
                        },
                        redirectConfigurations: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  redirectType: {
                                    type: "string",
                                  },
                                  targetListener: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  targetUrl: {
                                    type: "string",
                                  },
                                  includePath: {
                                    type: "boolean",
                                  },
                                  includeQueryString: {
                                    type: "boolean",
                                  },
                                  requestRoutingRules: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      additionalProperties: true,
                                    },
                                  },
                                  urlPathMaps: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      additionalProperties: true,
                                    },
                                  },
                                  pathRules: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      additionalProperties: true,
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
                        webApplicationFirewallConfiguration: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                            firewallMode: {
                              type: "string",
                            },
                            ruleSetType: {
                              type: "string",
                            },
                            ruleSetVersion: {
                              type: "string",
                            },
                            disabledRuleGroups: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  ruleGroupName: {
                                    type: "string",
                                  },
                                  rules: {
                                    type: "array",
                                    items: {
                                      type: "integer",
                                    },
                                  },
                                },
                                required: ["ruleGroupName"],
                              },
                            },
                            requestBodyCheck: {
                              type: "boolean",
                            },
                            maxRequestBodySize: {
                              type: "integer",
                            },
                            maxRequestBodySizeInKb: {
                              type: "integer",
                            },
                            fileUploadLimitInMb: {
                              type: "integer",
                            },
                            exclusions: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  matchVariable: {
                                    type: "string",
                                  },
                                  selectorMatchOperator: {
                                    type: "string",
                                  },
                                  selector: {
                                    type: "string",
                                  },
                                },
                                required: [
                                  "matchVariable",
                                  "selectorMatchOperator",
                                  "selector",
                                ],
                              },
                            },
                          },
                          required: [
                            "enabled",
                            "firewallMode",
                            "ruleSetType",
                            "ruleSetVersion",
                          ],
                        },
                        firewallPolicy: {
                          type: "object",
                          properties: {
                            id: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                        enableHttp2: {
                          type: "boolean",
                        },
                        enableFips: {
                          type: "boolean",
                        },
                        autoscaleConfiguration: {
                          type: "object",
                          properties: {
                            minCapacity: {
                              type: "integer",
                            },
                            maxCapacity: {
                              type: "integer",
                            },
                          },
                          required: ["minCapacity"],
                        },
                        privateLinkConfigurations: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  ipConfigurations: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        properties: {
                                          type: "object",
                                          properties: {
                                            privateIPAddress: {
                                              type: "string",
                                            },
                                            privateIPAllocationMethod: {
                                              type: "string",
                                            },
                                            subnet: {
                                              type: "object",
                                              properties: {
                                                id: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                              },
                                            },
                                            primary: {
                                              type: "boolean",
                                            },
                                            provisioningState: {
                                              type: "string",
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
                                  provisioningState: {
                                    type: "string",
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
                        privateEndpointConnections: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  privateEndpoint: {
                                    type: "object",
                                    properties: {
                                      extendedLocation: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      properties: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      etag: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  privateLinkServiceConnectionState: {
                                    type: "object",
                                    properties: {
                                      status: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      description: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      actionsRequired: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  provisioningState: {
                                    type: "string",
                                  },
                                  linkIdentifier: {
                                    type: "string",
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
                        resourceGuid: {
                          type: "string",
                        },
                        provisioningState: {
                          type: "string",
                        },
                        customErrorConfigurations: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                        forceFirewallPolicyAssociation: {
                          type: "boolean",
                        },
                        loadDistributionPolicies: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  loadDistributionTargets: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        properties: {
                                          type: "object",
                                          properties: {
                                            weightPerServer: {
                                              type: "integer",
                                            },
                                            backendAddressPool: {
                                              type: "object",
                                              properties: {
                                                id: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
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
                                  loadDistributionAlgorithm: {
                                    type: "string",
                                  },
                                  provisioningState: {
                                    type: "string",
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
                        globalConfiguration: {
                          type: "object",
                          properties: {
                            enableRequestBuffering: {
                              type: "boolean",
                            },
                            enableResponseBuffering: {
                              type: "boolean",
                            },
                          },
                        },
                        defaultPredefinedSslPolicy: {
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
                    identity: {
                      type: "object",
                      properties: {
                        principalId: {
                          type: "object",
                          additionalProperties: true,
                        },
                        tenantId: {
                          type: "object",
                          additionalProperties: true,
                        },
                        type: {
                          type: "object",
                          additionalProperties: true,
                        },
                        userAssignedIdentities: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
              resourceState: {
                type: "string",
              },
              managedRules: {
                type: "object",
                properties: {
                  exceptions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        matchVariable: {
                          type: "string",
                        },
                        values: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        valueMatchOperator: {
                          type: "string",
                        },
                        selectorMatchOperator: {
                          type: "string",
                        },
                        selector: {
                          type: "string",
                        },
                        exceptionManagedRuleSets: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              ruleSetType: {
                                type: "string",
                              },
                              ruleSetVersion: {
                                type: "string",
                              },
                              ruleGroups: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    ruleGroupName: {
                                      type: "string",
                                    },
                                    rules: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          ruleId: {
                                            type: "string",
                                          },
                                        },
                                        required: ["ruleId"],
                                      },
                                    },
                                  },
                                  required: ["ruleGroupName"],
                                },
                              },
                            },
                            required: ["ruleSetType", "ruleSetVersion"],
                          },
                        },
                      },
                      required: ["matchVariable", "valueMatchOperator"],
                    },
                  },
                  exclusions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        matchVariable: {
                          type: "string",
                        },
                        selectorMatchOperator: {
                          type: "string",
                        },
                        selector: {
                          type: "string",
                        },
                        exclusionManagedRuleSets: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                      required: [
                        "matchVariable",
                        "selectorMatchOperator",
                        "selector",
                      ],
                    },
                  },
                  managedRuleSets: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        ruleSetType: {
                          type: "string",
                        },
                        ruleSetVersion: {
                          type: "string",
                        },
                        ruleGroupOverrides: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              ruleGroupName: {
                                type: "string",
                              },
                              rules: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    ruleId: {
                                      type: "string",
                                    },
                                    state: {
                                      type: "string",
                                    },
                                    action: {
                                      type: "string",
                                    },
                                    sensitivity: {
                                      type: "string",
                                    },
                                  },
                                  required: ["ruleId"],
                                },
                              },
                            },
                            required: ["ruleGroupName"],
                          },
                        },
                        computedDisabledRules: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              ruleGroupName: {
                                type: "string",
                              },
                              rules: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                            required: ["ruleGroupName"],
                          },
                        },
                      },
                      required: ["ruleSetType", "ruleSetVersion"],
                    },
                  },
                },
                required: ["managedRuleSets"],
              },
              httpListeners: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              pathBasedRules: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              applicationGatewayForContainers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                  },
                  required: ["id"],
                },
              },
            },
            required: ["managedRules"],
          },
          etag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default WebApplicationFirewallPolicies_CreateOrUpdate;
