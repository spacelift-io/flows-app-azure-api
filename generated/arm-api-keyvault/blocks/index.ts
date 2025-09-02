import Vaults_CreateOrUpdate from "./vaultscreateorupdate";
import Vaults_Update from "./vaultsupdate";
import Vaults_Delete from "./vaultsdelete";
import Vaults_Get from "./vaultsget";
import Vaults_UpdateAccessPolicy from "./vaultsupdateaccesspolicy";
import Vaults_ListByResourceGroup from "./vaultslistbyresourcegroup";
import Vaults_ListBySubscription from "./vaultslistbysubscription";
import Vaults_ListDeleted from "./vaultslistdeleted";
import Vaults_GetDeleted from "./vaultsgetdeleted";
import Vaults_PurgeDeleted from "./vaultspurgedeleted";
import Vaults_List from "./vaultslist";
import Vaults_CheckNameAvailability from "./vaultschecknameavailability";
import PrivateEndpointConnections_Get from "./privateendpointconnectionsget";
import PrivateEndpointConnections_Put from "./privateendpointconnectionsput";
import PrivateEndpointConnections_Delete from "./privateendpointconnectionsdelete";
import PrivateEndpointConnections_ListByResource from "./privateendpointconnectionslistbyresource";
import PrivateLinkResources_ListByVault from "./privatelinkresourceslistbyvault";
import Secrets_CreateOrUpdate from "./secretscreateorupdate";
import Secrets_Update from "./secretsupdate";
import Secrets_Get from "./secretsget";
import Secrets_List from "./secretslist";
import Keys_CreateIfNotExist from "./keyscreateifnotexist";
import Keys_Get from "./keysget";
import Keys_List from "./keyslist";
import Keys_GetVersion from "./keysgetversion";
import Keys_ListVersions from "./keyslistversions";
import ManagedHsms_CreateOrUpdate from "./managedhsmscreateorupdate";
import ManagedHsms_Update from "./managedhsmsupdate";
import ManagedHsms_Delete from "./managedhsmsdelete";
import ManagedHsms_Get from "./managedhsmsget";
import ManagedHsms_ListByResourceGroup from "./managedhsmslistbyresourcegroup";
import ManagedHsms_ListBySubscription from "./managedhsmslistbysubscription";
import MHSMPrivateEndpointConnections_ListByResource from "./mhsmprivateendpointconnectionslistbyresource";
import ManagedHsms_ListDeleted from "./managedhsmslistdeleted";
import ManagedHsms_GetDeleted from "./managedhsmsgetdeleted";
import ManagedHsms_PurgeDeleted from "./managedhsmspurgedeleted";
import MHSMPrivateEndpointConnections_Get from "./mhsmprivateendpointconnectionsget";
import MHSMPrivateEndpointConnections_Put from "./mhsmprivateendpointconnectionsput";
import MHSMPrivateEndpointConnections_Delete from "./mhsmprivateendpointconnectionsdelete";
import MHSMPrivateLinkResources_ListByMHSMResource from "./mhsmprivatelinkresourceslistbymhsmresource";
import MHSMRegions_ListByResource from "./mhsmregionslistbyresource";
import ManagedHsms_CheckMhsmNameAvailability from "./managedhsmscheckmhsmnameavailability";

export const blocks = {
  Vaults_CreateOrUpdate,
  Vaults_Update,
  Vaults_Delete,
  Vaults_Get,
  Vaults_UpdateAccessPolicy,
  Vaults_ListByResourceGroup,
  Vaults_ListBySubscription,
  Vaults_ListDeleted,
  Vaults_GetDeleted,
  Vaults_PurgeDeleted,
  Vaults_List,
  Vaults_CheckNameAvailability,
  PrivateEndpointConnections_Get,
  PrivateEndpointConnections_Put,
  PrivateEndpointConnections_Delete,
  PrivateEndpointConnections_ListByResource,
  PrivateLinkResources_ListByVault,
  Secrets_CreateOrUpdate,
  Secrets_Update,
  Secrets_Get,
  Secrets_List,
  Keys_CreateIfNotExist,
  Keys_Get,
  Keys_List,
  Keys_GetVersion,
  Keys_ListVersions,
  ManagedHsms_CreateOrUpdate,
  ManagedHsms_Update,
  ManagedHsms_Delete,
  ManagedHsms_Get,
  ManagedHsms_ListByResourceGroup,
  ManagedHsms_ListBySubscription,
  MHSMPrivateEndpointConnections_ListByResource,
  ManagedHsms_ListDeleted,
  ManagedHsms_GetDeleted,
  ManagedHsms_PurgeDeleted,
  MHSMPrivateEndpointConnections_Get,
  MHSMPrivateEndpointConnections_Put,
  MHSMPrivateEndpointConnections_Delete,
  MHSMPrivateLinkResources_ListByMHSMResource,
  MHSMRegions_ListByResource,
  ManagedHsms_CheckMhsmNameAvailability,
};
