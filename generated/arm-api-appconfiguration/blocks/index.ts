import ConfigurationStores_List from "./configurationstoreslist";
import ConfigurationStores_ListByResourceGroup from "./configurationstoreslistbyresourcegroup";
import ConfigurationStores_Get from "./configurationstoresget";
import ConfigurationStores_Create from "./configurationstorescreate";
import ConfigurationStores_Delete from "./configurationstoresdelete";
import ConfigurationStores_Update from "./configurationstoresupdate";
import Operations_CheckNameAvailability from "./operationschecknameavailability";
import ConfigurationStores_ListKeys from "./configurationstoreslistkeys";
import ConfigurationStores_RegenerateKey from "./configurationstoresregeneratekey";
import Operations_List from "./operationslist";
import PrivateEndpointConnections_ListByConfigurationStore from "./privateendpointconnectionslistbyconfigurationstore";
import PrivateEndpointConnections_Get from "./privateendpointconnectionsget";
import PrivateEndpointConnections_CreateOrUpdate from "./privateendpointconnectionscreateorupdate";
import PrivateEndpointConnections_Delete from "./privateendpointconnectionsdelete";
import PrivateLinkResources_ListByConfigurationStore from "./privatelinkresourceslistbyconfigurationstore";
import PrivateLinkResources_Get from "./privatelinkresourcesget";
import KeyValues_Get from "./keyvaluesget";
import KeyValues_CreateOrUpdate from "./keyvaluescreateorupdate";
import KeyValues_Delete from "./keyvaluesdelete";
import ConfigurationStores_ListDeleted from "./configurationstoreslistdeleted";
import ConfigurationStores_GetDeleted from "./configurationstoresgetdeleted";
import ConfigurationStores_PurgeDeleted from "./configurationstorespurgedeleted";
import Operations_RegionalCheckNameAvailability from "./operationsregionalchecknameavailability";
import Replicas_ListByConfigurationStore from "./replicaslistbyconfigurationstore";
import Replicas_Get from "./replicasget";
import Replicas_Create from "./replicascreate";
import Replicas_Delete from "./replicasdelete";
import Snapshots_Get from "./snapshotsget";
import Snapshots_Create from "./snapshotscreate";

export const blocks = {
  ConfigurationStores_List,
  ConfigurationStores_ListByResourceGroup,
  ConfigurationStores_Get,
  ConfigurationStores_Create,
  ConfigurationStores_Delete,
  ConfigurationStores_Update,
  Operations_CheckNameAvailability,
  ConfigurationStores_ListKeys,
  ConfigurationStores_RegenerateKey,
  Operations_List,
  PrivateEndpointConnections_ListByConfigurationStore,
  PrivateEndpointConnections_Get,
  PrivateEndpointConnections_CreateOrUpdate,
  PrivateEndpointConnections_Delete,
  PrivateLinkResources_ListByConfigurationStore,
  PrivateLinkResources_Get,
  KeyValues_Get,
  KeyValues_CreateOrUpdate,
  KeyValues_Delete,
  ConfigurationStores_ListDeleted,
  ConfigurationStores_GetDeleted,
  ConfigurationStores_PurgeDeleted,
  Operations_RegionalCheckNameAvailability,
  Replicas_ListByConfigurationStore,
  Replicas_Get,
  Replicas_Create,
  Replicas_Delete,
  Snapshots_Get,
  Snapshots_Create,
};
