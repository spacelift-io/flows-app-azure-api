import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Sku_ListByLocation: AppBlock = {
  name: "Sku / List By Location",
  description: "List ResourceSku resources by subscription ID",
  category: "Sku",
  inputs: {
    default: {
      config: {
        locationName: {
          name: "Location Name",
          description: "Name of the location",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.DevOpsInfrastructure/locations/${input.event.inputConfig.locationName}/skus` +
          "?api-version=2025-01-21";

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
                    resourceType: {
                      type: "string",
                    },
                    tier: {
                      type: "string",
                    },
                    size: {
                      type: "string",
                    },
                    family: {
                      type: "string",
                    },
                    locations: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    locationInfo: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          location: {
                            type: "string",
                          },
                          zones: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          zoneDetails: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                name: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                                capabilities: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      name: {
                                        type: "string",
                                      },
                                      value: {
                                        type: "string",
                                      },
                                    },
                                    required: ["name", "value"],
                                  },
                                },
                              },
                              required: ["name", "capabilities"],
                            },
                          },
                        },
                        required: ["location", "zones", "zoneDetails"],
                      },
                    },
                    capabilities: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    restrictions: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          type: {
                            type: "string",
                          },
                          values: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          restrictionInfo: {
                            type: "object",
                            properties: {
                              locations: {
                                type: "array",
                                items: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                              zones: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                          },
                          reasonCode: {
                            type: "string",
                          },
                        },
                        required: ["values", "restrictionInfo"],
                      },
                    },
                  },
                  required: [
                    "resourceType",
                    "tier",
                    "size",
                    "family",
                    "locations",
                    "locationInfo",
                    "capabilities",
                    "restrictions",
                  ],
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default Sku_ListByLocation;
