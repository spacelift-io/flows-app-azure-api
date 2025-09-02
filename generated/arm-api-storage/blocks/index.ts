import Operations_List from "./operationslist";
import Skus_List from "./skuslist";
import StorageAccounts_CheckNameAvailability from "./storageaccountschecknameavailability";
import StorageAccounts_Create from "./storageaccountscreate";
import StorageAccounts_Delete from "./storageaccountsdelete";
import StorageAccounts_GetProperties from "./storageaccountsgetproperties";
import StorageAccounts_Update from "./storageaccountsupdate";
import DeletedAccounts_List from "./deletedaccountslist";
import DeletedAccounts_Get from "./deletedaccountsget";
import StorageAccounts_List from "./storageaccountslist";
import StorageAccounts_ListByResourceGroup from "./storageaccountslistbyresourcegroup";
import StorageAccounts_ListKeys from "./storageaccountslistkeys";
import StorageAccounts_RegenerateKey from "./storageaccountsregeneratekey";
import Usages_ListByLocation from "./usageslistbylocation";
import StorageAccounts_ListAccountSAS from "./storageaccountslistaccountsas";
import StorageAccounts_ListServiceSAS from "./storageaccountslistservicesas";
import StorageAccounts_Failover from "./storageaccountsfailover";
import StorageAccounts_HierarchicalNamespaceMigration from "./storageaccountshierarchicalnamespacemigration";
import StorageAccounts_AbortHierarchicalNamespaceMigration from "./storageaccountsaborthierarchicalnamespacemigration";
import StorageAccounts_CustomerInitiatedMigration from "./storageaccountscustomerinitiatedmigration";
import StorageAccounts_GetCustomerInitiatedMigration from "./storageaccountsgetcustomerinitiatedmigration";
import StorageAccounts_RestoreBlobRanges from "./storageaccountsrestoreblobranges";
import ManagementPolicies_Get from "./managementpoliciesget";
import ManagementPolicies_CreateOrUpdate from "./managementpoliciescreateorupdate";
import ManagementPolicies_Delete from "./managementpoliciesdelete";
import BlobInventoryPolicies_Get from "./blobinventorypoliciesget";
import BlobInventoryPolicies_CreateOrUpdate from "./blobinventorypoliciescreateorupdate";
import BlobInventoryPolicies_Delete from "./blobinventorypoliciesdelete";
import BlobInventoryPolicies_List from "./blobinventorypolicieslist";
import PrivateEndpointConnections_List from "./privateendpointconnectionslist";
import PrivateEndpointConnections_Get from "./privateendpointconnectionsget";
import PrivateEndpointConnections_Put from "./privateendpointconnectionsput";
import PrivateEndpointConnections_Delete from "./privateendpointconnectionsdelete";
import PrivateLinkResources_ListByStorageAccount from "./privatelinkresourceslistbystorageaccount";
import ObjectReplicationPolicies_List from "./objectreplicationpolicieslist";
import ObjectReplicationPolicies_Get from "./objectreplicationpoliciesget";
import ObjectReplicationPolicies_CreateOrUpdate from "./objectreplicationpoliciescreateorupdate";
import ObjectReplicationPolicies_Delete from "./objectreplicationpoliciesdelete";
import StorageAccounts_RevokeUserDelegationKeys from "./storageaccountsrevokeuserdelegationkeys";
import LocalUsers_List from "./localuserslist";
import LocalUsers_Get from "./localusersget";
import LocalUsers_CreateOrUpdate from "./localuserscreateorupdate";
import LocalUsers_Delete from "./localusersdelete";
import LocalUsers_ListKeys from "./localuserslistkeys";
import LocalUsers_RegeneratePassword from "./localusersregeneratepassword";
import EncryptionScopes_Put from "./encryptionscopesput";
import EncryptionScopes_Patch from "./encryptionscopespatch";
import EncryptionScopes_Get from "./encryptionscopesget";
import EncryptionScopes_List from "./encryptionscopeslist";
import BlobServices_List from "./blobserviceslist";
import BlobServices_SetServiceProperties from "./blobservicessetserviceproperties";
import BlobServices_GetServiceProperties from "./blobservicesgetserviceproperties";
import BlobContainers_List from "./blobcontainerslist";
import BlobContainers_Create from "./blobcontainerscreate";
import BlobContainers_Update from "./blobcontainersupdate";
import BlobContainers_Get from "./blobcontainersget";
import BlobContainers_Delete from "./blobcontainersdelete";
import BlobContainers_SetLegalHold from "./blobcontainerssetlegalhold";
import BlobContainers_ClearLegalHold from "./blobcontainersclearlegalhold";
import BlobContainers_CreateOrUpdateImmutabilityPolicy from "./blobcontainerscreateorupdateimmutabilitypolicy";
import BlobContainers_GetImmutabilityPolicy from "./blobcontainersgetimmutabilitypolicy";
import BlobContainers_DeleteImmutabilityPolicy from "./blobcontainersdeleteimmutabilitypolicy";
import BlobContainers_LockImmutabilityPolicy from "./blobcontainerslockimmutabilitypolicy";
import BlobContainers_ExtendImmutabilityPolicy from "./blobcontainersextendimmutabilitypolicy";
import BlobContainers_Lease from "./blobcontainerslease";
import BlobContainers_ObjectLevelWorm from "./blobcontainersobjectlevelworm";
import FileServices_List from "./fileserviceslist";
import FileServices_SetServiceProperties from "./fileservicessetserviceproperties";
import FileServices_GetServiceProperties from "./fileservicesgetserviceproperties";
import FileServices_ListServiceUsages from "./fileserviceslistserviceusages";
import FileServices_GetServiceUsage from "./fileservicesgetserviceusage";
import FileShares_List from "./fileshareslist";
import FileShares_Create from "./filesharescreate";
import FileShares_Update from "./filesharesupdate";
import FileShares_Get from "./filesharesget";
import FileShares_Delete from "./filesharesdelete";
import FileShares_Restore from "./filesharesrestore";
import FileShares_Lease from "./fileshareslease";
import QueueServices_List from "./queueserviceslist";
import QueueServices_SetServiceProperties from "./queueservicessetserviceproperties";
import QueueServices_GetServiceProperties from "./queueservicesgetserviceproperties";
import Queue_Create from "./queuecreate";
import Queue_Update from "./queueupdate";
import Queue_Get from "./queueget";
import Queue_Delete from "./queuedelete";
import Queue_List from "./queuelist";
import TableServices_List from "./tableserviceslist";
import TableServices_SetServiceProperties from "./tableservicessetserviceproperties";
import TableServices_GetServiceProperties from "./tableservicesgetserviceproperties";
import Table_Create from "./tablecreate";
import Table_Update from "./tableupdate";
import Table_Get from "./tableget";
import Table_Delete from "./tabledelete";
import Table_List from "./tablelist";
import NetworkSecurityPerimeterConfigurations_List from "./networksecurityperimeterconfigurationslist";
import NetworkSecurityPerimeterConfigurations_Get from "./networksecurityperimeterconfigurationsget";
import NetworkSecurityPerimeterConfigurations_Reconcile from "./networksecurityperimeterconfigurationsreconcile";
import StorageTaskAssignments_Create from "./storagetaskassignmentscreate";
import StorageTaskAssignments_Update from "./storagetaskassignmentsupdate";
import StorageTaskAssignments_Get from "./storagetaskassignmentsget";
import StorageTaskAssignments_Delete from "./storagetaskassignmentsdelete";
import StorageTaskAssignments_List from "./storagetaskassignmentslist";
import StorageTaskAssignmentsInstancesReport_List from "./storagetaskassignmentsinstancesreportlist";
import StorageTaskAssignmentInstancesReport_List from "./storagetaskassignmentinstancesreportlist";

export const blocks = {
  Operations_List,
  Skus_List,
  StorageAccounts_CheckNameAvailability,
  StorageAccounts_Create,
  StorageAccounts_Delete,
  StorageAccounts_GetProperties,
  StorageAccounts_Update,
  DeletedAccounts_List,
  DeletedAccounts_Get,
  StorageAccounts_List,
  StorageAccounts_ListByResourceGroup,
  StorageAccounts_ListKeys,
  StorageAccounts_RegenerateKey,
  Usages_ListByLocation,
  StorageAccounts_ListAccountSAS,
  StorageAccounts_ListServiceSAS,
  StorageAccounts_Failover,
  StorageAccounts_HierarchicalNamespaceMigration,
  StorageAccounts_AbortHierarchicalNamespaceMigration,
  StorageAccounts_CustomerInitiatedMigration,
  StorageAccounts_GetCustomerInitiatedMigration,
  StorageAccounts_RestoreBlobRanges,
  ManagementPolicies_Get,
  ManagementPolicies_CreateOrUpdate,
  ManagementPolicies_Delete,
  BlobInventoryPolicies_Get,
  BlobInventoryPolicies_CreateOrUpdate,
  BlobInventoryPolicies_Delete,
  BlobInventoryPolicies_List,
  PrivateEndpointConnections_List,
  PrivateEndpointConnections_Get,
  PrivateEndpointConnections_Put,
  PrivateEndpointConnections_Delete,
  PrivateLinkResources_ListByStorageAccount,
  ObjectReplicationPolicies_List,
  ObjectReplicationPolicies_Get,
  ObjectReplicationPolicies_CreateOrUpdate,
  ObjectReplicationPolicies_Delete,
  StorageAccounts_RevokeUserDelegationKeys,
  LocalUsers_List,
  LocalUsers_Get,
  LocalUsers_CreateOrUpdate,
  LocalUsers_Delete,
  LocalUsers_ListKeys,
  LocalUsers_RegeneratePassword,
  EncryptionScopes_Put,
  EncryptionScopes_Patch,
  EncryptionScopes_Get,
  EncryptionScopes_List,
  BlobServices_List,
  BlobServices_SetServiceProperties,
  BlobServices_GetServiceProperties,
  BlobContainers_List,
  BlobContainers_Create,
  BlobContainers_Update,
  BlobContainers_Get,
  BlobContainers_Delete,
  BlobContainers_SetLegalHold,
  BlobContainers_ClearLegalHold,
  BlobContainers_CreateOrUpdateImmutabilityPolicy,
  BlobContainers_GetImmutabilityPolicy,
  BlobContainers_DeleteImmutabilityPolicy,
  BlobContainers_LockImmutabilityPolicy,
  BlobContainers_ExtendImmutabilityPolicy,
  BlobContainers_Lease,
  BlobContainers_ObjectLevelWorm,
  FileServices_List,
  FileServices_SetServiceProperties,
  FileServices_GetServiceProperties,
  FileServices_ListServiceUsages,
  FileServices_GetServiceUsage,
  FileShares_List,
  FileShares_Create,
  FileShares_Update,
  FileShares_Get,
  FileShares_Delete,
  FileShares_Restore,
  FileShares_Lease,
  QueueServices_List,
  QueueServices_SetServiceProperties,
  QueueServices_GetServiceProperties,
  Queue_Create,
  Queue_Update,
  Queue_Get,
  Queue_Delete,
  Queue_List,
  TableServices_List,
  TableServices_SetServiceProperties,
  TableServices_GetServiceProperties,
  Table_Create,
  Table_Update,
  Table_Get,
  Table_Delete,
  Table_List,
  NetworkSecurityPerimeterConfigurations_List,
  NetworkSecurityPerimeterConfigurations_Get,
  NetworkSecurityPerimeterConfigurations_Reconcile,
  StorageTaskAssignments_Create,
  StorageTaskAssignments_Update,
  StorageTaskAssignments_Get,
  StorageTaskAssignments_Delete,
  StorageTaskAssignments_List,
  StorageTaskAssignmentsInstancesReport_List,
  StorageTaskAssignmentInstancesReport_List,
};
