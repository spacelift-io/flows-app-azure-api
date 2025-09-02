import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachines_AttachDetachDataDisks: AppBlock = {
  name: "Virtual Machines / Attach Detach Data Disks",
  description: "Attach and detach data disks to/from the virtual machine.",
  category: "Virtual Machines",
  inputs: {
    default: {
      config: {
        vmName: {
          name: "VM Name",
          description: "Name of the vm",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              dataDisksToAttach: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    diskId: {
                      type: "string",
                    },
                    lun: {
                      type: "number",
                    },
                    caching: {
                      type: "string",
                    },
                    deleteOption: {
                      type: "string",
                    },
                    diskEncryptionSet: {
                      type: "object",
                    },
                    writeAcceleratorEnabled: {
                      type: "boolean",
                    },
                  },
                  required: ["diskId"],
                },
              },
              dataDisksToDetach: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    diskId: {
                      type: "string",
                    },
                    detachOption: {
                      type: "string",
                    },
                  },
                  required: ["diskId"],
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${input.event.inputConfig.vmName}/attachDetachDataDisks` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          imageReference: {
            type: "object",
            properties: {
              publisher: {
                type: "string",
              },
              offer: {
                type: "string",
              },
              sku: {
                type: "string",
              },
              version: {
                type: "string",
              },
              exactVersion: {
                type: "string",
              },
              sharedGalleryImageId: {
                type: "string",
              },
              communityGalleryImageId: {
                type: "string",
              },
            },
          },
          osDisk: {
            type: "object",
            properties: {
              osType: {
                type: "string",
              },
              encryptionSettings: {
                type: "object",
                properties: {
                  diskEncryptionKey: {
                    type: "object",
                    properties: {
                      secretUrl: {
                        type: "string",
                      },
                      sourceVault: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                        },
                      },
                    },
                    required: ["secretUrl", "sourceVault"],
                  },
                  keyEncryptionKey: {
                    type: "object",
                    properties: {
                      keyUrl: {
                        type: "string",
                      },
                      sourceVault: {
                        type: "object",
                        properties: {
                          id: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                    required: ["keyUrl", "sourceVault"],
                  },
                  enabled: {
                    type: "boolean",
                  },
                },
              },
              name: {
                type: "string",
              },
              vhd: {
                type: "object",
                properties: {
                  uri: {
                    type: "string",
                  },
                },
              },
              image: {
                type: "object",
                properties: {
                  uri: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              caching: {
                type: "string",
              },
              writeAcceleratorEnabled: {
                type: "boolean",
              },
              diffDiskSettings: {
                type: "object",
                properties: {
                  option: {
                    type: "string",
                  },
                  placement: {
                    type: "string",
                  },
                },
              },
              createOption: {
                type: "string",
              },
              diskSizeGB: {
                type: "integer",
              },
              managedDisk: {
                type: "object",
                properties: {
                  storageAccountType: {
                    type: "string",
                  },
                  diskEncryptionSet: {
                    type: "object",
                  },
                  securityProfile: {
                    type: "object",
                    properties: {
                      securityEncryptionType: {
                        type: "string",
                      },
                      diskEncryptionSet: {
                        type: "object",
                      },
                    },
                  },
                },
              },
              deleteOption: {
                type: "string",
              },
            },
            required: ["createOption"],
          },
          dataDisks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                lun: {
                  type: "integer",
                },
                name: {
                  type: "string",
                },
                vhd: {
                  type: "object",
                  properties: {
                    uri: {
                      type: "string",
                    },
                  },
                },
                image: {
                  type: "object",
                  properties: {
                    uri: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                caching: {
                  type: "string",
                },
                writeAcceleratorEnabled: {
                  type: "boolean",
                },
                createOption: {
                  type: "string",
                },
                diskSizeGB: {
                  type: "integer",
                },
                managedDisk: {
                  type: "object",
                  properties: {
                    storageAccountType: {
                      type: "string",
                    },
                    diskEncryptionSet: {
                      type: "object",
                    },
                    securityProfile: {
                      type: "object",
                      properties: {
                        securityEncryptionType: {
                          type: "string",
                        },
                        diskEncryptionSet: {
                          type: "object",
                        },
                      },
                    },
                  },
                },
                sourceResource: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                  },
                },
                toBeDetached: {
                  type: "boolean",
                },
                diskIOPSReadWrite: {
                  type: "integer",
                },
                diskMBpsReadWrite: {
                  type: "integer",
                },
                detachOption: {
                  type: "string",
                },
                deleteOption: {
                  type: "string",
                },
              },
              required: ["lun", "createOption"],
            },
          },
          diskControllerType: {
            type: "string",
          },
          alignRegionalDisksToVMZone: {
            type: "boolean",
          },
        },
      },
    },
  },
};

export default VirtualMachines_AttachDetachDataDisks;
