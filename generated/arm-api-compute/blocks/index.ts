import Operations_List from "./operationslist";
import AvailabilitySets_ListBySubscription from "./availabilitysetslistbysubscription";
import CapacityReservationGroups_ListBySubscription from "./capacityreservationgroupslistbysubscription";
import DedicatedHostGroups_ListBySubscription from "./dedicatedhostgroupslistbysubscription";
import Images_List from "./imageslist";
import VirtualMachineImagesEdgeZone_ListPublishers from "./virtualmachineimagesedgezonelistpublishers";
import VirtualMachineImagesEdgeZone_ListOffers from "./virtualmachineimagesedgezonelistoffers";
import VirtualMachineImagesEdgeZone_ListSkus from "./virtualmachineimagesedgezonelistskus";
import VirtualMachineImagesEdgeZone_List from "./virtualmachineimagesedgezonelist";
import VirtualMachineImagesEdgeZone_Get from "./virtualmachineimagesedgezoneget";
import VirtualMachineImages_ListByEdgeZone from "./virtualmachineimageslistbyedgezone";
import LogAnalytics_ExportRequestRateByInterval from "./loganalyticsexportrequestratebyinterval";
import LogAnalytics_ExportThrottledRequests from "./loganalyticsexportthrottledrequests";
import VirtualMachineImages_ListPublishers from "./virtualmachineimageslistpublishers";
import VirtualMachineExtensionImages_ListTypes from "./virtualmachineextensionimageslisttypes";
import VirtualMachineExtensionImages_ListVersions from "./virtualmachineextensionimageslistversions";
import VirtualMachineExtensionImages_Get from "./virtualmachineextensionimagesget";
import VirtualMachineImages_ListOffers from "./virtualmachineimageslistoffers";
import VirtualMachineImages_ListSkus from "./virtualmachineimageslistskus";
import VirtualMachineImages_List from "./virtualmachineimageslist";
import VirtualMachineImages_Get from "./virtualmachineimagesget";
import VirtualMachineRunCommands_List from "./virtualmachineruncommandslist";
import VirtualMachineRunCommands_Get from "./virtualmachineruncommandsget";
import Usage_List from "./usagelist";
import VirtualMachineScaleSets_ListByLocation from "./virtualmachinescalesetslistbylocation";
import VirtualMachines_ListByLocation from "./virtualmachineslistbylocation";
import VirtualMachineSizes_List from "./virtualmachinesizeslist";
import ProximityPlacementGroups_ListBySubscription from "./proximityplacementgroupslistbysubscription";
import RestorePointCollections_ListAll from "./restorepointcollectionslistall";
import SshPublicKeys_ListBySubscription from "./sshpublickeyslistbysubscription";
import VirtualMachineScaleSets_ListAll from "./virtualmachinescalesetslistall";
import VirtualMachines_ListAll from "./virtualmachineslistall";
import AvailabilitySets_List from "./availabilitysetslist";
import AvailabilitySets_Get from "./availabilitysetsget";
import AvailabilitySets_CreateOrUpdate from "./availabilitysetscreateorupdate";
import AvailabilitySets_Update from "./availabilitysetsupdate";
import AvailabilitySets_Delete from "./availabilitysetsdelete";
import AvailabilitySets_CancelMigrationToVirtualMachineScaleSet from "./availabilitysetscancelmigrationtovirtualmachinescaleset";
import AvailabilitySets_ConvertToVirtualMachineScaleSet from "./availabilitysetsconverttovirtualmachinescaleset";
import AvailabilitySets_StartMigrationToVirtualMachineScaleSet from "./availabilitysetsstartmigrationtovirtualmachinescaleset";
import AvailabilitySets_ValidateMigrationToVirtualMachineScaleSet from "./availabilitysetsvalidatemigrationtovirtualmachinescaleset";
import AvailabilitySets_ListAvailableSizes from "./availabilitysetslistavailablesizes";
import CapacityReservationGroups_ListByResourceGroup from "./capacityreservationgroupslistbyresourcegroup";
import CapacityReservationGroups_Get from "./capacityreservationgroupsget";
import CapacityReservationGroups_CreateOrUpdate from "./capacityreservationgroupscreateorupdate";
import CapacityReservationGroups_Update from "./capacityreservationgroupsupdate";
import CapacityReservationGroups_Delete from "./capacityreservationgroupsdelete";
import CapacityReservations_ListByCapacityReservationGroup from "./capacityreservationslistbycapacityreservationgroup";
import CapacityReservations_Get from "./capacityreservationsget";
import CapacityReservations_CreateOrUpdate from "./capacityreservationscreateorupdate";
import CapacityReservations_Update from "./capacityreservationsupdate";
import CapacityReservations_Delete from "./capacityreservationsdelete";
import DedicatedHostGroups_ListByResourceGroup from "./dedicatedhostgroupslistbyresourcegroup";
import DedicatedHostGroups_Get from "./dedicatedhostgroupsget";
import DedicatedHostGroups_CreateOrUpdate from "./dedicatedhostgroupscreateorupdate";
import DedicatedHostGroups_Update from "./dedicatedhostgroupsupdate";
import DedicatedHostGroups_Delete from "./dedicatedhostgroupsdelete";
import DedicatedHosts_ListByHostGroup from "./dedicatedhostslistbyhostgroup";
import DedicatedHosts_Get from "./dedicatedhostsget";
import DedicatedHosts_CreateOrUpdate from "./dedicatedhostscreateorupdate";
import DedicatedHosts_Update from "./dedicatedhostsupdate";
import DedicatedHosts_Delete from "./dedicatedhostsdelete";
import DedicatedHosts_ListAvailableSizes from "./dedicatedhostslistavailablesizes";
import DedicatedHosts_Redeploy from "./dedicatedhostsredeploy";
import DedicatedHosts_Restart from "./dedicatedhostsrestart";
import Images_ListByResourceGroup from "./imageslistbyresourcegroup";
import Images_Get from "./imagesget";
import Images_CreateOrUpdate from "./imagescreateorupdate";
import Images_Update from "./imagesupdate";
import Images_Delete from "./imagesdelete";
import ProximityPlacementGroups_ListByResourceGroup from "./proximityplacementgroupslistbyresourcegroup";
import ProximityPlacementGroups_Get from "./proximityplacementgroupsget";
import ProximityPlacementGroups_CreateOrUpdate from "./proximityplacementgroupscreateorupdate";
import ProximityPlacementGroups_Update from "./proximityplacementgroupsupdate";
import ProximityPlacementGroups_Delete from "./proximityplacementgroupsdelete";
import RestorePointCollections_List from "./restorepointcollectionslist";
import RestorePointCollections_Get from "./restorepointcollectionsget";
import RestorePointCollections_CreateOrUpdate from "./restorepointcollectionscreateorupdate";
import RestorePointCollections_Update from "./restorepointcollectionsupdate";
import RestorePointCollections_Delete from "./restorepointcollectionsdelete";
import RestorePoints_Get from "./restorepointsget";
import RestorePoints_Create from "./restorepointscreate";
import RestorePoints_Delete from "./restorepointsdelete";
import SshPublicKeys_ListByResourceGroup from "./sshpublickeyslistbyresourcegroup";
import SshPublicKeys_Get from "./sshpublickeysget";
import SshPublicKeys_Create from "./sshpublickeyscreate";
import SshPublicKeys_Update from "./sshpublickeysupdate";
import SshPublicKeys_Delete from "./sshpublickeysdelete";
import SshPublicKeys_GenerateKeyPair from "./sshpublickeysgeneratekeypair";
import VirtualMachineScaleSets_List from "./virtualmachinescalesetslist";
import VirtualMachineScaleSets_Get from "./virtualmachinescalesetsget";
import VirtualMachineScaleSets_CreateOrUpdate from "./virtualmachinescalesetscreateorupdate";
import VirtualMachineScaleSets_Update from "./virtualmachinescalesetsupdate";
import VirtualMachineScaleSets_Delete from "./virtualmachinescalesetsdelete";
import VirtualMachineScaleSets_ApproveRollingUpgrade from "./virtualmachinescalesetsapproverollingupgrade";
import VirtualMachineScaleSets_ConvertToSinglePlacementGroup from "./virtualmachinescalesetsconverttosingleplacementgroup";
import VirtualMachineScaleSets_Deallocate from "./virtualmachinescalesetsdeallocate";
import VirtualMachineScaleSets_DeleteInstances from "./virtualmachinescalesetsdeleteinstances";
import VirtualMachineScaleSetRollingUpgrades_StartExtensionUpgrade from "./virtualmachinescalesetrollingupgradesstartextensionupgrade";
import VirtualMachineScaleSetExtensions_List from "./virtualmachinescalesetextensionslist";
import VirtualMachineScaleSetExtensions_Get from "./virtualmachinescalesetextensionsget";
import VirtualMachineScaleSetExtensions_CreateOrUpdate from "./virtualmachinescalesetextensionscreateorupdate";
import VirtualMachineScaleSetExtensions_Update from "./virtualmachinescalesetextensionsupdate";
import VirtualMachineScaleSetExtensions_Delete from "./virtualmachinescalesetextensionsdelete";
import VirtualMachineScaleSets_ForceRecoveryServiceFabricPlatformUpdateDomainWalk from "./virtualmachinescalesetsforcerecoveryservicefabricplatformupdatedomainwalk";
import VirtualMachineScaleSets_GetInstanceView from "./virtualmachinescalesetsgetinstanceview";
import VirtualMachineScaleSets_UpdateInstances from "./virtualmachinescalesetsupdateinstances";
import VirtualMachineScaleSetRollingUpgrades_StartOSUpgrade from "./virtualmachinescalesetrollingupgradesstartosupgrade";
import VirtualMachineScaleSets_GetOSUpgradeHistory from "./virtualmachinescalesetsgetosupgradehistory";
import VirtualMachineScaleSets_PerformMaintenance from "./virtualmachinescalesetsperformmaintenance";
import VirtualMachineScaleSets_PowerOff from "./virtualmachinescalesetspoweroff";
import VirtualMachineScaleSets_Reapply from "./virtualmachinescalesetsreapply";
import VirtualMachineScaleSets_Redeploy from "./virtualmachinescalesetsredeploy";
import VirtualMachineScaleSets_Reimage from "./virtualmachinescalesetsreimage";
import VirtualMachineScaleSets_ReimageAll from "./virtualmachinescalesetsreimageall";
import VirtualMachineScaleSets_Restart from "./virtualmachinescalesetsrestart";
import VirtualMachineScaleSetRollingUpgrades_Cancel from "./virtualmachinescalesetrollingupgradescancel";
import VirtualMachineScaleSetRollingUpgrades_GetLatest from "./virtualmachinescalesetrollingupgradesgetlatest";
import VirtualMachineScaleSets_SetOrchestrationServiceState from "./virtualmachinescalesetssetorchestrationservicestate";
import VirtualMachineScaleSets_ListSkus from "./virtualmachinescalesetslistskus";
import VirtualMachineScaleSets_Start from "./virtualmachinescalesetsstart";
import VirtualMachineScaleSetVMs_List from "./virtualmachinescalesetvmslist";
import VirtualMachineScaleSetVMs_Get from "./virtualmachinescalesetvmsget";
import VirtualMachineScaleSetVMs_Update from "./virtualmachinescalesetvmsupdate";
import VirtualMachineScaleSetVMs_Delete from "./virtualmachinescalesetvmsdelete";
import VirtualMachineScaleSetVMs_ApproveRollingUpgrade from "./virtualmachinescalesetvmsapproverollingupgrade";
import VirtualMachineScaleSetVMs_AttachDetachDataDisks from "./virtualmachinescalesetvmsattachdetachdatadisks";
import VirtualMachineScaleSetVMs_Deallocate from "./virtualmachinescalesetvmsdeallocate";
import VirtualMachineScaleSetVMExtensions_List from "./virtualmachinescalesetvmextensionslist";
import VirtualMachineScaleSetVMExtensions_Get from "./virtualmachinescalesetvmextensionsget";
import VirtualMachineScaleSetVMExtensions_CreateOrUpdate from "./virtualmachinescalesetvmextensionscreateorupdate";
import VirtualMachineScaleSetVMExtensions_Update from "./virtualmachinescalesetvmextensionsupdate";
import VirtualMachineScaleSetVMExtensions_Delete from "./virtualmachinescalesetvmextensionsdelete";
import VirtualMachineScaleSetVMs_GetInstanceView from "./virtualmachinescalesetvmsgetinstanceview";
import VirtualMachineScaleSetVMs_PerformMaintenance from "./virtualmachinescalesetvmsperformmaintenance";
import VirtualMachineScaleSetVMs_PowerOff from "./virtualmachinescalesetvmspoweroff";
import VirtualMachineScaleSetVMs_Redeploy from "./virtualmachinescalesetvmsredeploy";
import VirtualMachineScaleSetVMs_Reimage from "./virtualmachinescalesetvmsreimage";
import VirtualMachineScaleSetVMs_ReimageAll from "./virtualmachinescalesetvmsreimageall";
import VirtualMachineScaleSetVMs_Restart from "./virtualmachinescalesetvmsrestart";
import VirtualMachineScaleSetVMs_RetrieveBootDiagnosticsData from "./virtualmachinescalesetvmsretrievebootdiagnosticsdata";
import VirtualMachineScaleSetVMs_RunCommand from "./virtualmachinescalesetvmsruncommand";
import VirtualMachineScaleSetVMRunCommands_List from "./virtualmachinescalesetvmruncommandslist";
import VirtualMachineScaleSetVMRunCommands_Get from "./virtualmachinescalesetvmruncommandsget";
import VirtualMachineScaleSetVMRunCommands_CreateOrUpdate from "./virtualmachinescalesetvmruncommandscreateorupdate";
import VirtualMachineScaleSetVMRunCommands_Update from "./virtualmachinescalesetvmruncommandsupdate";
import VirtualMachineScaleSetVMRunCommands_Delete from "./virtualmachinescalesetvmruncommandsdelete";
import VirtualMachineScaleSetVMs_SimulateEviction from "./virtualmachinescalesetvmssimulateeviction";
import VirtualMachineScaleSetVMs_Start from "./virtualmachinescalesetvmsstart";
import VirtualMachines_List from "./virtualmachineslist";
import VirtualMachines_Get from "./virtualmachinesget";
import VirtualMachines_CreateOrUpdate from "./virtualmachinescreateorupdate";
import VirtualMachines_Update from "./virtualmachinesupdate";
import VirtualMachines_Delete from "./virtualmachinesdelete";
import VirtualMachines_AssessPatches from "./virtualmachinesassesspatches";
import VirtualMachines_AttachDetachDataDisks from "./virtualmachinesattachdetachdatadisks";
import VirtualMachines_Capture from "./virtualmachinescapture";
import VirtualMachines_ConvertToManagedDisks from "./virtualmachinesconverttomanageddisks";
import VirtualMachines_Deallocate from "./virtualmachinesdeallocate";
import VirtualMachineExtensions_List from "./virtualmachineextensionslist";
import VirtualMachineExtensions_Get from "./virtualmachineextensionsget";
import VirtualMachineExtensions_CreateOrUpdate from "./virtualmachineextensionscreateorupdate";
import VirtualMachineExtensions_Update from "./virtualmachineextensionsupdate";
import VirtualMachineExtensions_Delete from "./virtualmachineextensionsdelete";
import VirtualMachines_Generalize from "./virtualmachinesgeneralize";
import VirtualMachines_InstallPatches from "./virtualmachinesinstallpatches";
import VirtualMachines_InstanceView from "./virtualmachinesinstanceview";
import VirtualMachines_migrateToVMScaleSet from "./virtualmachinesmigratetovmscaleset";
import VirtualMachines_PerformMaintenance from "./virtualmachinesperformmaintenance";
import VirtualMachines_PowerOff from "./virtualmachinespoweroff";
import VirtualMachines_Reapply from "./virtualmachinesreapply";
import VirtualMachines_Redeploy from "./virtualmachinesredeploy";
import VirtualMachines_Reimage from "./virtualmachinesreimage";
import VirtualMachines_Restart from "./virtualmachinesrestart";
import VirtualMachines_RetrieveBootDiagnosticsData from "./virtualmachinesretrievebootdiagnosticsdata";
import VirtualMachines_RunCommand from "./virtualmachinesruncommand";
import VirtualMachineRunCommands_ListByVirtualMachine from "./virtualmachineruncommandslistbyvirtualmachine";
import VirtualMachineRunCommands_GetByVirtualMachine from "./virtualmachineruncommandsgetbyvirtualmachine";
import VirtualMachineRunCommands_CreateOrUpdate from "./virtualmachineruncommandscreateorupdate";
import VirtualMachineRunCommands_Update from "./virtualmachineruncommandsupdate";
import VirtualMachineRunCommands_Delete from "./virtualmachineruncommandsdelete";
import VirtualMachines_SimulateEviction from "./virtualmachinessimulateeviction";
import VirtualMachines_Start from "./virtualmachinesstart";
import VirtualMachines_ListAvailableSizes from "./virtualmachineslistavailablesizes";
import DiskAccesses_List from "./diskaccesseslist";
import DiskEncryptionSets_List from "./diskencryptionsetslist";
import Disks_List from "./diskslist";
import Snapshots_List from "./snapshotslist";
import DiskAccesses_ListByResourceGroup from "./diskaccesseslistbyresourcegroup";
import DiskAccesses_Get from "./diskaccessesget";
import DiskAccesses_CreateOrUpdate from "./diskaccessescreateorupdate";
import DiskAccesses_Update from "./diskaccessesupdate";
import DiskAccesses_Delete from "./diskaccessesdelete";
import DiskAccesses_ListPrivateEndpointConnections from "./diskaccesseslistprivateendpointconnections";
import DiskAccesses_GetAPrivateEndpointConnection from "./diskaccessesgetaprivateendpointconnection";
import DiskAccesses_UpdateAPrivateEndpointConnection from "./diskaccessesupdateaprivateendpointconnection";
import DiskAccesses_DeleteAPrivateEndpointConnection from "./diskaccessesdeleteaprivateendpointconnection";
import DiskAccesses_GetPrivateLinkResources from "./diskaccessesgetprivatelinkresources";
import DiskEncryptionSets_ListByResourceGroup from "./diskencryptionsetslistbyresourcegroup";
import DiskEncryptionSets_Get from "./diskencryptionsetsget";
import DiskEncryptionSets_CreateOrUpdate from "./diskencryptionsetscreateorupdate";
import DiskEncryptionSets_Update from "./diskencryptionsetsupdate";
import DiskEncryptionSets_Delete from "./diskencryptionsetsdelete";
import DiskEncryptionSets_ListAssociatedResources from "./diskencryptionsetslistassociatedresources";
import Disks_ListByResourceGroup from "./diskslistbyresourcegroup";
import Disks_Get from "./disksget";
import Disks_CreateOrUpdate from "./diskscreateorupdate";
import Disks_Update from "./disksupdate";
import Disks_Delete from "./disksdelete";
import Disks_GrantAccess from "./disksgrantaccess";
import Disks_RevokeAccess from "./disksrevokeaccess";
import DiskRestorePoint_ListByRestorePoint from "./diskrestorepointlistbyrestorepoint";
import DiskRestorePoint_Get from "./diskrestorepointget";
import DiskRestorePoint_GrantAccess from "./diskrestorepointgrantaccess";
import DiskRestorePoint_RevokeAccess from "./diskrestorepointrevokeaccess";
import Snapshots_ListByResourceGroup from "./snapshotslistbyresourcegroup";
import Snapshots_Get from "./snapshotsget";
import Snapshots_CreateOrUpdate from "./snapshotscreateorupdate";
import Snapshots_Update from "./snapshotsupdate";
import Snapshots_Delete from "./snapshotsdelete";
import Snapshots_GrantAccess from "./snapshotsgrantaccess";
import Snapshots_RevokeAccess from "./snapshotsrevokeaccess";
import Galleries_List from "./gallerieslist";
import CommunityGalleries_Get from "./communitygalleriesget";
import CommunityGalleryImages_List from "./communitygalleryimageslist";
import CommunityGalleryImages_Get from "./communitygalleryimagesget";
import CommunityGalleryImageVersions_List from "./communitygalleryimageversionslist";
import CommunityGalleryImageVersions_Get from "./communitygalleryimageversionsget";
import SharedGalleries_List from "./sharedgallerieslist";
import SharedGalleries_Get from "./sharedgalleriesget";
import SharedGalleryImages_List from "./sharedgalleryimageslist";
import SharedGalleryImages_Get from "./sharedgalleryimagesget";
import SharedGalleryImageVersions_List from "./sharedgalleryimageversionslist";
import SharedGalleryImageVersions_Get from "./sharedgalleryimageversionsget";
import Galleries_ListByResourceGroup from "./gallerieslistbyresourcegroup";
import Galleries_Get from "./galleriesget";
import Galleries_CreateOrUpdate from "./galleriescreateorupdate";
import Galleries_Update from "./galleriesupdate";
import Galleries_Delete from "./galleriesdelete";
import GalleryApplications_ListByGallery from "./galleryapplicationslistbygallery";
import GalleryApplications_Get from "./galleryapplicationsget";
import GalleryApplications_CreateOrUpdate from "./galleryapplicationscreateorupdate";
import GalleryApplications_Update from "./galleryapplicationsupdate";
import GalleryApplications_Delete from "./galleryapplicationsdelete";
import GalleryApplicationVersions_ListByGalleryApplication from "./galleryapplicationversionslistbygalleryapplication";
import GalleryApplicationVersions_Get from "./galleryapplicationversionsget";
import GalleryApplicationVersions_CreateOrUpdate from "./galleryapplicationversionscreateorupdate";
import GalleryApplicationVersions_Update from "./galleryapplicationversionsupdate";
import GalleryApplicationVersions_Delete from "./galleryapplicationversionsdelete";
import GalleryImages_ListByGallery from "./galleryimageslistbygallery";
import GalleryImages_Get from "./galleryimagesget";
import GalleryImages_CreateOrUpdate from "./galleryimagescreateorupdate";
import GalleryImages_Update from "./galleryimagesupdate";
import GalleryImages_Delete from "./galleryimagesdelete";
import GalleryImageVersions_ListByGalleryImage from "./galleryimageversionslistbygalleryimage";
import GalleryImageVersions_Get from "./galleryimageversionsget";
import GalleryImageVersions_CreateOrUpdate from "./galleryimageversionscreateorupdate";
import GalleryImageVersions_Update from "./galleryimageversionsupdate";
import GalleryImageVersions_Delete from "./galleryimageversionsdelete";
import GalleryInVMAccessControlProfiles_ListByGallery from "./galleryinvmaccesscontrolprofileslistbygallery";
import GalleryInVMAccessControlProfiles_Get from "./galleryinvmaccesscontrolprofilesget";
import GalleryInVMAccessControlProfiles_CreateOrUpdate from "./galleryinvmaccesscontrolprofilescreateorupdate";
import GalleryInVMAccessControlProfiles_Update from "./galleryinvmaccesscontrolprofilesupdate";
import GalleryInVMAccessControlProfiles_Delete from "./galleryinvmaccesscontrolprofilesdelete";
import GalleryInVMAccessControlProfileVersions_ListByGalleryInVMAccessControlProfile from "./galleryinvmaccesscontrolprofileversionslistbygalleryinvmaccesscontrolprofile";
import GalleryInVMAccessControlProfileVersions_Get from "./galleryinvmaccesscontrolprofileversionsget";
import GalleryInVMAccessControlProfileVersions_CreateOrUpdate from "./galleryinvmaccesscontrolprofileversionscreateorupdate";
import GalleryInVMAccessControlProfileVersions_Update from "./galleryinvmaccesscontrolprofileversionsupdate";
import GalleryInVMAccessControlProfileVersions_Delete from "./galleryinvmaccesscontrolprofileversionsdelete";
import GallerySharingProfile_Update from "./gallerysharingprofileupdate";
import SoftDeletedResource_ListByArtifactName from "./softdeletedresourcelistbyartifactname";
import SpotPlacementScores_Get from "./spotplacementscoresget";
import SpotPlacementScores_Post from "./spotplacementscorespost";
import CloudServiceRoleInstances_Delete from "./cloudserviceroleinstancesdelete";
import CloudServiceRoleInstances_Get from "./cloudserviceroleinstancesget";
import CloudServiceRoleInstances_GetInstanceView from "./cloudserviceroleinstancesgetinstanceview";
import CloudServiceRoleInstances_List from "./cloudserviceroleinstanceslist";
import CloudServiceRoleInstances_Restart from "./cloudserviceroleinstancesrestart";
import CloudServiceRoleInstances_Reimage from "./cloudserviceroleinstancesreimage";
import CloudServiceRoleInstances_Rebuild from "./cloudserviceroleinstancesrebuild";
import CloudServiceRoleInstances_GetRemoteDesktopFile from "./cloudserviceroleinstancesgetremotedesktopfile";
import CloudServiceRoles_Get from "./cloudservicerolesget";
import CloudServiceRoles_List from "./cloudserviceroleslist";
import CloudServices_CreateOrUpdate from "./cloudservicescreateorupdate";
import CloudServices_Update from "./cloudservicesupdate";
import CloudServices_Delete from "./cloudservicesdelete";
import CloudServices_Get from "./cloudservicesget";
import CloudServices_GetInstanceView from "./cloudservicesgetinstanceview";
import CloudServices_ListAll from "./cloudserviceslistall";
import CloudServices_List from "./cloudserviceslist";
import CloudServices_Start from "./cloudservicesstart";
import CloudServices_PowerOff from "./cloudservicespoweroff";
import CloudServices_Restart from "./cloudservicesrestart";
import CloudServices_Reimage from "./cloudservicesreimage";
import CloudServices_Rebuild from "./cloudservicesrebuild";
import CloudServices_DeleteInstances from "./cloudservicesdeleteinstances";
import CloudServicesUpdateDomain_WalkUpdateDomain from "./cloudservicesupdatedomainwalkupdatedomain";
import CloudServicesUpdateDomain_GetUpdateDomain from "./cloudservicesupdatedomaingetupdatedomain";
import CloudServicesUpdateDomain_ListUpdateDomains from "./cloudservicesupdatedomainlistupdatedomains";
import CloudServiceOperatingSystems_GetOSVersion from "./cloudserviceoperatingsystemsgetosversion";
import CloudServiceOperatingSystems_ListOSVersions from "./cloudserviceoperatingsystemslistosversions";
import CloudServiceOperatingSystems_GetOSFamily from "./cloudserviceoperatingsystemsgetosfamily";
import CloudServiceOperatingSystems_ListOSFamilies from "./cloudserviceoperatingsystemslistosfamilies";
import ResourceSkus_List from "./resourceskuslist";

export const blocks = {
  Operations_List,
  AvailabilitySets_ListBySubscription,
  CapacityReservationGroups_ListBySubscription,
  DedicatedHostGroups_ListBySubscription,
  Images_List,
  VirtualMachineImagesEdgeZone_ListPublishers,
  VirtualMachineImagesEdgeZone_ListOffers,
  VirtualMachineImagesEdgeZone_ListSkus,
  VirtualMachineImagesEdgeZone_List,
  VirtualMachineImagesEdgeZone_Get,
  VirtualMachineImages_ListByEdgeZone,
  LogAnalytics_ExportRequestRateByInterval,
  LogAnalytics_ExportThrottledRequests,
  VirtualMachineImages_ListPublishers,
  VirtualMachineExtensionImages_ListTypes,
  VirtualMachineExtensionImages_ListVersions,
  VirtualMachineExtensionImages_Get,
  VirtualMachineImages_ListOffers,
  VirtualMachineImages_ListSkus,
  VirtualMachineImages_List,
  VirtualMachineImages_Get,
  VirtualMachineRunCommands_List,
  VirtualMachineRunCommands_Get,
  Usage_List,
  VirtualMachineScaleSets_ListByLocation,
  VirtualMachines_ListByLocation,
  VirtualMachineSizes_List,
  ProximityPlacementGroups_ListBySubscription,
  RestorePointCollections_ListAll,
  SshPublicKeys_ListBySubscription,
  VirtualMachineScaleSets_ListAll,
  VirtualMachines_ListAll,
  AvailabilitySets_List,
  AvailabilitySets_Get,
  AvailabilitySets_CreateOrUpdate,
  AvailabilitySets_Update,
  AvailabilitySets_Delete,
  AvailabilitySets_CancelMigrationToVirtualMachineScaleSet,
  AvailabilitySets_ConvertToVirtualMachineScaleSet,
  AvailabilitySets_StartMigrationToVirtualMachineScaleSet,
  AvailabilitySets_ValidateMigrationToVirtualMachineScaleSet,
  AvailabilitySets_ListAvailableSizes,
  CapacityReservationGroups_ListByResourceGroup,
  CapacityReservationGroups_Get,
  CapacityReservationGroups_CreateOrUpdate,
  CapacityReservationGroups_Update,
  CapacityReservationGroups_Delete,
  CapacityReservations_ListByCapacityReservationGroup,
  CapacityReservations_Get,
  CapacityReservations_CreateOrUpdate,
  CapacityReservations_Update,
  CapacityReservations_Delete,
  DedicatedHostGroups_ListByResourceGroup,
  DedicatedHostGroups_Get,
  DedicatedHostGroups_CreateOrUpdate,
  DedicatedHostGroups_Update,
  DedicatedHostGroups_Delete,
  DedicatedHosts_ListByHostGroup,
  DedicatedHosts_Get,
  DedicatedHosts_CreateOrUpdate,
  DedicatedHosts_Update,
  DedicatedHosts_Delete,
  DedicatedHosts_ListAvailableSizes,
  DedicatedHosts_Redeploy,
  DedicatedHosts_Restart,
  Images_ListByResourceGroup,
  Images_Get,
  Images_CreateOrUpdate,
  Images_Update,
  Images_Delete,
  ProximityPlacementGroups_ListByResourceGroup,
  ProximityPlacementGroups_Get,
  ProximityPlacementGroups_CreateOrUpdate,
  ProximityPlacementGroups_Update,
  ProximityPlacementGroups_Delete,
  RestorePointCollections_List,
  RestorePointCollections_Get,
  RestorePointCollections_CreateOrUpdate,
  RestorePointCollections_Update,
  RestorePointCollections_Delete,
  RestorePoints_Get,
  RestorePoints_Create,
  RestorePoints_Delete,
  SshPublicKeys_ListByResourceGroup,
  SshPublicKeys_Get,
  SshPublicKeys_Create,
  SshPublicKeys_Update,
  SshPublicKeys_Delete,
  SshPublicKeys_GenerateKeyPair,
  VirtualMachineScaleSets_List,
  VirtualMachineScaleSets_Get,
  VirtualMachineScaleSets_CreateOrUpdate,
  VirtualMachineScaleSets_Update,
  VirtualMachineScaleSets_Delete,
  VirtualMachineScaleSets_ApproveRollingUpgrade,
  VirtualMachineScaleSets_ConvertToSinglePlacementGroup,
  VirtualMachineScaleSets_Deallocate,
  VirtualMachineScaleSets_DeleteInstances,
  VirtualMachineScaleSetRollingUpgrades_StartExtensionUpgrade,
  VirtualMachineScaleSetExtensions_List,
  VirtualMachineScaleSetExtensions_Get,
  VirtualMachineScaleSetExtensions_CreateOrUpdate,
  VirtualMachineScaleSetExtensions_Update,
  VirtualMachineScaleSetExtensions_Delete,
  VirtualMachineScaleSets_ForceRecoveryServiceFabricPlatformUpdateDomainWalk,
  VirtualMachineScaleSets_GetInstanceView,
  VirtualMachineScaleSets_UpdateInstances,
  VirtualMachineScaleSetRollingUpgrades_StartOSUpgrade,
  VirtualMachineScaleSets_GetOSUpgradeHistory,
  VirtualMachineScaleSets_PerformMaintenance,
  VirtualMachineScaleSets_PowerOff,
  VirtualMachineScaleSets_Reapply,
  VirtualMachineScaleSets_Redeploy,
  VirtualMachineScaleSets_Reimage,
  VirtualMachineScaleSets_ReimageAll,
  VirtualMachineScaleSets_Restart,
  VirtualMachineScaleSetRollingUpgrades_Cancel,
  VirtualMachineScaleSetRollingUpgrades_GetLatest,
  VirtualMachineScaleSets_SetOrchestrationServiceState,
  VirtualMachineScaleSets_ListSkus,
  VirtualMachineScaleSets_Start,
  VirtualMachineScaleSetVMs_List,
  VirtualMachineScaleSetVMs_Get,
  VirtualMachineScaleSetVMs_Update,
  VirtualMachineScaleSetVMs_Delete,
  VirtualMachineScaleSetVMs_ApproveRollingUpgrade,
  VirtualMachineScaleSetVMs_AttachDetachDataDisks,
  VirtualMachineScaleSetVMs_Deallocate,
  VirtualMachineScaleSetVMExtensions_List,
  VirtualMachineScaleSetVMExtensions_Get,
  VirtualMachineScaleSetVMExtensions_CreateOrUpdate,
  VirtualMachineScaleSetVMExtensions_Update,
  VirtualMachineScaleSetVMExtensions_Delete,
  VirtualMachineScaleSetVMs_GetInstanceView,
  VirtualMachineScaleSetVMs_PerformMaintenance,
  VirtualMachineScaleSetVMs_PowerOff,
  VirtualMachineScaleSetVMs_Redeploy,
  VirtualMachineScaleSetVMs_Reimage,
  VirtualMachineScaleSetVMs_ReimageAll,
  VirtualMachineScaleSetVMs_Restart,
  VirtualMachineScaleSetVMs_RetrieveBootDiagnosticsData,
  VirtualMachineScaleSetVMs_RunCommand,
  VirtualMachineScaleSetVMRunCommands_List,
  VirtualMachineScaleSetVMRunCommands_Get,
  VirtualMachineScaleSetVMRunCommands_CreateOrUpdate,
  VirtualMachineScaleSetVMRunCommands_Update,
  VirtualMachineScaleSetVMRunCommands_Delete,
  VirtualMachineScaleSetVMs_SimulateEviction,
  VirtualMachineScaleSetVMs_Start,
  VirtualMachines_List,
  VirtualMachines_Get,
  VirtualMachines_CreateOrUpdate,
  VirtualMachines_Update,
  VirtualMachines_Delete,
  VirtualMachines_AssessPatches,
  VirtualMachines_AttachDetachDataDisks,
  VirtualMachines_Capture,
  VirtualMachines_ConvertToManagedDisks,
  VirtualMachines_Deallocate,
  VirtualMachineExtensions_List,
  VirtualMachineExtensions_Get,
  VirtualMachineExtensions_CreateOrUpdate,
  VirtualMachineExtensions_Update,
  VirtualMachineExtensions_Delete,
  VirtualMachines_Generalize,
  VirtualMachines_InstallPatches,
  VirtualMachines_InstanceView,
  VirtualMachines_migrateToVMScaleSet,
  VirtualMachines_PerformMaintenance,
  VirtualMachines_PowerOff,
  VirtualMachines_Reapply,
  VirtualMachines_Redeploy,
  VirtualMachines_Reimage,
  VirtualMachines_Restart,
  VirtualMachines_RetrieveBootDiagnosticsData,
  VirtualMachines_RunCommand,
  VirtualMachineRunCommands_ListByVirtualMachine,
  VirtualMachineRunCommands_GetByVirtualMachine,
  VirtualMachineRunCommands_CreateOrUpdate,
  VirtualMachineRunCommands_Update,
  VirtualMachineRunCommands_Delete,
  VirtualMachines_SimulateEviction,
  VirtualMachines_Start,
  VirtualMachines_ListAvailableSizes,
  DiskAccesses_List,
  DiskEncryptionSets_List,
  Disks_List,
  Snapshots_List,
  DiskAccesses_ListByResourceGroup,
  DiskAccesses_Get,
  DiskAccesses_CreateOrUpdate,
  DiskAccesses_Update,
  DiskAccesses_Delete,
  DiskAccesses_ListPrivateEndpointConnections,
  DiskAccesses_GetAPrivateEndpointConnection,
  DiskAccesses_UpdateAPrivateEndpointConnection,
  DiskAccesses_DeleteAPrivateEndpointConnection,
  DiskAccesses_GetPrivateLinkResources,
  DiskEncryptionSets_ListByResourceGroup,
  DiskEncryptionSets_Get,
  DiskEncryptionSets_CreateOrUpdate,
  DiskEncryptionSets_Update,
  DiskEncryptionSets_Delete,
  DiskEncryptionSets_ListAssociatedResources,
  Disks_ListByResourceGroup,
  Disks_Get,
  Disks_CreateOrUpdate,
  Disks_Update,
  Disks_Delete,
  Disks_GrantAccess,
  Disks_RevokeAccess,
  DiskRestorePoint_ListByRestorePoint,
  DiskRestorePoint_Get,
  DiskRestorePoint_GrantAccess,
  DiskRestorePoint_RevokeAccess,
  Snapshots_ListByResourceGroup,
  Snapshots_Get,
  Snapshots_CreateOrUpdate,
  Snapshots_Update,
  Snapshots_Delete,
  Snapshots_GrantAccess,
  Snapshots_RevokeAccess,
  Galleries_List,
  CommunityGalleries_Get,
  CommunityGalleryImages_List,
  CommunityGalleryImages_Get,
  CommunityGalleryImageVersions_List,
  CommunityGalleryImageVersions_Get,
  SharedGalleries_List,
  SharedGalleries_Get,
  SharedGalleryImages_List,
  SharedGalleryImages_Get,
  SharedGalleryImageVersions_List,
  SharedGalleryImageVersions_Get,
  Galleries_ListByResourceGroup,
  Galleries_Get,
  Galleries_CreateOrUpdate,
  Galleries_Update,
  Galleries_Delete,
  GalleryApplications_ListByGallery,
  GalleryApplications_Get,
  GalleryApplications_CreateOrUpdate,
  GalleryApplications_Update,
  GalleryApplications_Delete,
  GalleryApplicationVersions_ListByGalleryApplication,
  GalleryApplicationVersions_Get,
  GalleryApplicationVersions_CreateOrUpdate,
  GalleryApplicationVersions_Update,
  GalleryApplicationVersions_Delete,
  GalleryImages_ListByGallery,
  GalleryImages_Get,
  GalleryImages_CreateOrUpdate,
  GalleryImages_Update,
  GalleryImages_Delete,
  GalleryImageVersions_ListByGalleryImage,
  GalleryImageVersions_Get,
  GalleryImageVersions_CreateOrUpdate,
  GalleryImageVersions_Update,
  GalleryImageVersions_Delete,
  GalleryInVMAccessControlProfiles_ListByGallery,
  GalleryInVMAccessControlProfiles_Get,
  GalleryInVMAccessControlProfiles_CreateOrUpdate,
  GalleryInVMAccessControlProfiles_Update,
  GalleryInVMAccessControlProfiles_Delete,
  GalleryInVMAccessControlProfileVersions_ListByGalleryInVMAccessControlProfile,
  GalleryInVMAccessControlProfileVersions_Get,
  GalleryInVMAccessControlProfileVersions_CreateOrUpdate,
  GalleryInVMAccessControlProfileVersions_Update,
  GalleryInVMAccessControlProfileVersions_Delete,
  GallerySharingProfile_Update,
  SoftDeletedResource_ListByArtifactName,
  SpotPlacementScores_Get,
  SpotPlacementScores_Post,
  CloudServiceRoleInstances_Delete,
  CloudServiceRoleInstances_Get,
  CloudServiceRoleInstances_GetInstanceView,
  CloudServiceRoleInstances_List,
  CloudServiceRoleInstances_Restart,
  CloudServiceRoleInstances_Reimage,
  CloudServiceRoleInstances_Rebuild,
  CloudServiceRoleInstances_GetRemoteDesktopFile,
  CloudServiceRoles_Get,
  CloudServiceRoles_List,
  CloudServices_CreateOrUpdate,
  CloudServices_Update,
  CloudServices_Delete,
  CloudServices_Get,
  CloudServices_GetInstanceView,
  CloudServices_ListAll,
  CloudServices_List,
  CloudServices_Start,
  CloudServices_PowerOff,
  CloudServices_Restart,
  CloudServices_Reimage,
  CloudServices_Rebuild,
  CloudServices_DeleteInstances,
  CloudServicesUpdateDomain_WalkUpdateDomain,
  CloudServicesUpdateDomain_GetUpdateDomain,
  CloudServicesUpdateDomain_ListUpdateDomains,
  CloudServiceOperatingSystems_GetOSVersion,
  CloudServiceOperatingSystems_ListOSVersions,
  CloudServiceOperatingSystems_GetOSFamily,
  CloudServiceOperatingSystems_ListOSFamilies,
  ResourceSkus_List,
};
