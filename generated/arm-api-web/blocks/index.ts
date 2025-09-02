import AppServiceEnvironments_List from "./appserviceenvironmentslist";
import AppServiceEnvironments_ListByResourceGroup from "./appserviceenvironmentslistbyresourcegroup";
import AppServiceEnvironments_Get from "./appserviceenvironmentsget";
import AppServiceEnvironments_CreateOrUpdate from "./appserviceenvironmentscreateorupdate";
import AppServiceEnvironments_Delete from "./appserviceenvironmentsdelete";
import AppServiceEnvironments_Update from "./appserviceenvironmentsupdate";
import AppServiceEnvironments_ListCapacities from "./appserviceenvironmentslistcapacities";
import AppServiceEnvironments_GetVipInfo from "./appserviceenvironmentsgetvipinfo";
import AppServiceEnvironments_ChangeVnet from "./appserviceenvironmentschangevnet";
import AppServiceEnvironments_GetAseCustomDnsSuffixConfiguration from "./appserviceenvironmentsgetasecustomdnssuffixconfiguration";
import AppServiceEnvironments_UpdateAseCustomDnsSuffixConfiguration from "./appserviceenvironmentsupdateasecustomdnssuffixconfiguration";
import AppServiceEnvironments_DeleteAseCustomDnsSuffixConfiguration from "./appserviceenvironmentsdeleteasecustomdnssuffixconfiguration";
import AppServiceEnvironments_GetAseV3NetworkingConfiguration from "./appserviceenvironmentsgetasev3networkingconfiguration";
import AppServiceEnvironments_UpdateAseNetworkingConfiguration from "./appserviceenvironmentsupdateasenetworkingconfiguration";
import AppServiceEnvironments_ListDiagnostics from "./appserviceenvironmentslistdiagnostics";
import AppServiceEnvironments_GetDiagnosticsItem from "./appserviceenvironmentsgetdiagnosticsitem";
import AppServiceEnvironments_GetInboundNetworkDependenciesEndpoints from "./appserviceenvironmentsgetinboundnetworkdependenciesendpoints";
import AppServiceEnvironments_ListMultiRolePools from "./appserviceenvironmentslistmultirolepools";
import AppServiceEnvironments_GetMultiRolePool from "./appserviceenvironmentsgetmultirolepool";
import AppServiceEnvironments_CreateOrUpdateMultiRolePool from "./appserviceenvironmentscreateorupdatemultirolepool";
import AppServiceEnvironments_UpdateMultiRolePool from "./appserviceenvironmentsupdatemultirolepool";
import AppServiceEnvironments_ListMultiRolePoolInstanceMetricDefinitions from "./appserviceenvironmentslistmultirolepoolinstancemetricdefinitions";
import AppServiceEnvironments_ListMultiRoleMetricDefinitions from "./appserviceenvironmentslistmultirolemetricdefinitions";
import AppServiceEnvironments_ListMultiRolePoolSkus from "./appserviceenvironmentslistmultirolepoolskus";
import AppServiceEnvironments_TestUpgradeAvailableNotification from "./appserviceenvironmentstestupgradeavailablenotification";
import AppServiceEnvironments_Upgrade from "./appserviceenvironmentsupgrade";
import AppServiceEnvironments_ListMultiRoleUsages from "./appserviceenvironmentslistmultiroleusages";
import AppServiceEnvironments_ListOperations from "./appserviceenvironmentslistoperations";
import AppServiceEnvironments_GetOutboundNetworkDependenciesEndpoints from "./appserviceenvironmentsgetoutboundnetworkdependenciesendpoints";
import AppServiceEnvironments_GetPrivateEndpointConnectionList from "./appserviceenvironmentsgetprivateendpointconnectionlist";
import AppServiceEnvironments_GetPrivateEndpointConnection from "./appserviceenvironmentsgetprivateendpointconnection";
import AppServiceEnvironments_ApproveOrRejectPrivateEndpointConnection from "./appserviceenvironmentsapproveorrejectprivateendpointconnection";
import AppServiceEnvironments_DeletePrivateEndpointConnection from "./appserviceenvironmentsdeleteprivateendpointconnection";
import AppServiceEnvironments_GetPrivateLinkResources from "./appserviceenvironmentsgetprivatelinkresources";
import AppServiceEnvironments_Reboot from "./appserviceenvironmentsreboot";
import AppServiceEnvironments_Resume from "./appserviceenvironmentsresume";
import AppServiceEnvironments_ListAppServicePlans from "./appserviceenvironmentslistappserviceplans";
import AppServiceEnvironments_ListWebApps from "./appserviceenvironmentslistwebapps";
import AppServiceEnvironments_Suspend from "./appserviceenvironmentssuspend";
import AppServiceEnvironments_ListUsages from "./appserviceenvironmentslistusages";
import AppServiceEnvironments_ListWorkerPools from "./appserviceenvironmentslistworkerpools";
import AppServiceEnvironments_GetWorkerPool from "./appserviceenvironmentsgetworkerpool";
import AppServiceEnvironments_CreateOrUpdateWorkerPool from "./appserviceenvironmentscreateorupdateworkerpool";
import AppServiceEnvironments_UpdateWorkerPool from "./appserviceenvironmentsupdateworkerpool";
import AppServiceEnvironments_ListWorkerPoolInstanceMetricDefinitions from "./appserviceenvironmentslistworkerpoolinstancemetricdefinitions";
import AppServiceEnvironments_ListWebWorkerMetricDefinitions from "./appserviceenvironmentslistwebworkermetricdefinitions";
import AppServiceEnvironments_ListWorkerPoolSkus from "./appserviceenvironmentslistworkerpoolskus";
import AppServiceEnvironments_ListWebWorkerUsages from "./appserviceenvironmentslistwebworkerusages";
import AppServicePlans_List from "./appserviceplanslist";
import AppServicePlans_ListByResourceGroup from "./appserviceplanslistbyresourcegroup";
import AppServicePlans_Get from "./appserviceplansget";
import AppServicePlans_CreateOrUpdate from "./appserviceplanscreateorupdate";
import AppServicePlans_Delete from "./appserviceplansdelete";
import AppServicePlans_Update from "./appserviceplansupdate";
import AppServicePlans_ListCapabilities from "./appserviceplanslistcapabilities";
import AppServicePlans_GetHybridConnection from "./appserviceplansgethybridconnection";
import AppServicePlans_DeleteHybridConnection from "./appserviceplansdeletehybridconnection";
import AppServicePlans_ListHybridConnectionKeys from "./appserviceplanslisthybridconnectionkeys";
import AppServicePlans_ListWebAppsByHybridConnection from "./appserviceplanslistwebappsbyhybridconnection";
import AppServicePlans_GetHybridConnectionPlanLimit from "./appserviceplansgethybridconnectionplanlimit";
import AppServicePlans_ListHybridConnections from "./appserviceplanslisthybridconnections";
import AppServicePlans_RestartWebApps from "./appserviceplansrestartwebapps";
import AppServicePlans_ListWebApps from "./appserviceplanslistwebapps";
import AppServicePlans_GetServerFarmSkus from "./appserviceplansgetserverfarmskus";
import AppServicePlans_ListUsages from "./appserviceplanslistusages";
import AppServicePlans_ListVnets from "./appserviceplanslistvnets";
import AppServicePlans_GetVnetFromServerFarm from "./appserviceplansgetvnetfromserverfarm";
import AppServicePlans_GetVnetGateway from "./appserviceplansgetvnetgateway";
import AppServicePlans_UpdateVnetGateway from "./appserviceplansupdatevnetgateway";
import AppServicePlans_ListRoutesForVnet from "./appserviceplanslistroutesforvnet";
import AppServicePlans_GetRouteForVnet from "./appserviceplansgetrouteforvnet";
import AppServicePlans_CreateOrUpdateVnetRoute from "./appserviceplanscreateorupdatevnetroute";
import AppServicePlans_DeleteVnetRoute from "./appserviceplansdeletevnetroute";
import AppServicePlans_UpdateVnetRoute from "./appserviceplansupdatevnetroute";
import AppServicePlans_RebootWorker from "./appserviceplansrebootworker";
import Certificates_List from "./certificateslist";
import Certificates_ListByResourceGroup from "./certificateslistbyresourcegroup";
import Certificates_Get from "./certificatesget";
import Certificates_CreateOrUpdate from "./certificatescreateorupdate";
import Certificates_Delete from "./certificatesdelete";
import Certificates_Update from "./certificatesupdate";
import DeletedWebApps_List from "./deletedwebappslist";
import DeletedWebApps_ListByLocation from "./deletedwebappslistbylocation";
import DeletedWebApps_GetDeletedWebAppByLocation from "./deletedwebappsgetdeletedwebappbylocation";
import Diagnostics_ListHostingEnvironmentDetectorResponses from "./diagnosticslisthostingenvironmentdetectorresponses";
import Diagnostics_GetHostingEnvironmentDetectorResponse from "./diagnosticsgethostingenvironmentdetectorresponse";
import Diagnostics_ListSiteDetectorResponses from "./diagnosticslistsitedetectorresponses";
import Diagnostics_GetSiteDetectorResponse from "./diagnosticsgetsitedetectorresponse";
import Diagnostics_ListSiteDiagnosticCategories from "./diagnosticslistsitediagnosticcategories";
import Diagnostics_GetSiteDiagnosticCategory from "./diagnosticsgetsitediagnosticcategory";
import Diagnostics_ListSiteAnalyses from "./diagnosticslistsiteanalyses";
import Diagnostics_GetSiteAnalysis from "./diagnosticsgetsiteanalysis";
import Diagnostics_ExecuteSiteAnalysis from "./diagnosticsexecutesiteanalysis";
import Diagnostics_ListSiteDetectors from "./diagnosticslistsitedetectors";
import Diagnostics_GetSiteDetector from "./diagnosticsgetsitedetector";
import Diagnostics_ExecuteSiteDetector from "./diagnosticsexecutesitedetector";
import Diagnostics_ListSiteDetectorResponsesSlot from "./diagnosticslistsitedetectorresponsesslot";
import Diagnostics_GetSiteDetectorResponseSlot from "./diagnosticsgetsitedetectorresponseslot";
import Diagnostics_ListSiteDiagnosticCategoriesSlot from "./diagnosticslistsitediagnosticcategoriesslot";
import Diagnostics_GetSiteDiagnosticCategorySlot from "./diagnosticsgetsitediagnosticcategoryslot";
import Diagnostics_ListSiteAnalysesSlot from "./diagnosticslistsiteanalysesslot";
import Diagnostics_GetSiteAnalysisSlot from "./diagnosticsgetsiteanalysisslot";
import Diagnostics_ExecuteSiteAnalysisSlot from "./diagnosticsexecutesiteanalysisslot";
import Diagnostics_ListSiteDetectorsSlot from "./diagnosticslistsitedetectorsslot";
import Diagnostics_GetSiteDetectorSlot from "./diagnosticsgetsitedetectorslot";
import Diagnostics_ExecuteSiteDetectorSlot from "./diagnosticsexecutesitedetectorslot";
import Global_GetDeletedWebApp from "./globalgetdeletedwebapp";
import Global_GetDeletedWebAppSnapshots from "./globalgetdeletedwebappsnapshots";
import Global_GetSubscriptionOperationWithAsyncResponse from "./globalgetsubscriptionoperationwithasyncresponse";
import KubeEnvironments_ListBySubscription from "./kubeenvironmentslistbysubscription";
import KubeEnvironments_ListByResourceGroup from "./kubeenvironmentslistbyresourcegroup";
import KubeEnvironments_Get from "./kubeenvironmentsget";
import KubeEnvironments_CreateOrUpdate from "./kubeenvironmentscreateorupdate";
import KubeEnvironments_Delete from "./kubeenvironmentsdelete";
import KubeEnvironments_Update from "./kubeenvironmentsupdate";
import Provider_GetAvailableStacks from "./providergetavailablestacks";
import Provider_GetFunctionAppStacks from "./providergetfunctionappstacks";
import Provider_GetFunctionAppStacksForLocation from "./providergetfunctionappstacksforlocation";
import Provider_GetWebAppStacksForLocation from "./providergetwebappstacksforlocation";
import Provider_ListOperations from "./providerlistoperations";
import Provider_GetWebAppStacks from "./providergetwebappstacks";
import Provider_GetAvailableStacksOnPrem from "./providergetavailablestacksonprem";
import Recommendations_List from "./recommendationslist";
import Recommendations_ResetAllFilters from "./recommendationsresetallfilters";
import Recommendations_DisableRecommendationForSubscription from "./recommendationsdisablerecommendationforsubscription";
import Recommendations_ListHistoryForHostingEnvironment from "./recommendationslisthistoryforhostingenvironment";
import Recommendations_ListRecommendedRulesForHostingEnvironment from "./recommendationslistrecommendedrulesforhostingenvironment";
import Recommendations_DisableAllForHostingEnvironment from "./recommendationsdisableallforhostingenvironment";
import Recommendations_ResetAllFiltersForHostingEnvironment from "./recommendationsresetallfiltersforhostingenvironment";
import Recommendations_GetRuleDetailsByHostingEnvironment from "./recommendationsgetruledetailsbyhostingenvironment";
import Recommendations_DisableRecommendationForHostingEnvironment from "./recommendationsdisablerecommendationforhostingenvironment";
import Recommendations_ListHistoryForWebApp from "./recommendationslisthistoryforwebapp";
import Recommendations_ListRecommendedRulesForWebApp from "./recommendationslistrecommendedrulesforwebapp";
import Recommendations_DisableAllForWebApp from "./recommendationsdisableallforwebapp";
import Recommendations_ResetAllFiltersForWebApp from "./recommendationsresetallfiltersforwebapp";
import Recommendations_GetRuleDetailsByWebApp from "./recommendationsgetruledetailsbywebapp";
import Recommendations_DisableRecommendationForSite from "./recommendationsdisablerecommendationforsite";
import ResourceHealthMetadata_List from "./resourcehealthmetadatalist";
import ResourceHealthMetadata_ListByResourceGroup from "./resourcehealthmetadatalistbyresourcegroup";
import ResourceHealthMetadata_ListBySite from "./resourcehealthmetadatalistbysite";
import ResourceHealthMetadata_GetBySite from "./resourcehealthmetadatagetbysite";
import ResourceHealthMetadata_ListBySiteSlot from "./resourcehealthmetadatalistbysiteslot";
import ResourceHealthMetadata_GetBySiteSlot from "./resourcehealthmetadatagetbysiteslot";
import GetPublishingUser from "./getpublishinguser";
import UpdatePublishingUser from "./updatepublishinguser";
import ListSourceControls from "./listsourcecontrols";
import GetSourceControl from "./getsourcecontrol";
import UpdateSourceControl from "./updatesourcecontrol";
import ListBillingMeters from "./listbillingmeters";
import CheckNameAvailability from "./checknameavailability";
import ListCustomHostNameSites from "./listcustomhostnamesites";
import GetSubscriptionDeploymentLocations from "./getsubscriptiondeploymentlocations";
import ListAseRegions from "./listaseregions";
import ListGeoRegions from "./listgeoregions";
import ListSiteIdentifiersAssignedToHostName from "./listsiteidentifiersassignedtohostname";
import RegionalCheckNameAvailability from "./regionalchecknameavailability";
import ListPremierAddOnOffers from "./listpremieraddonoffers";
import ListSkus from "./listskus";
import GetUsagesInLocation_list from "./getusagesinlocationlist";
import VerifyHostingEnvironmentVnet from "./verifyhostingenvironmentvnet";
import Move from "./move";
import Validate from "./validate";
import ValidateMove from "./validatemove";
import SiteCertificates_List from "./sitecertificateslist";
import SiteCertificates_Get from "./sitecertificatesget";
import SiteCertificates_CreateOrUpdate from "./sitecertificatescreateorupdate";
import SiteCertificates_Delete from "./sitecertificatesdelete";
import SiteCertificates_Update from "./sitecertificatesupdate";
import SiteCertificates_ListSlot from "./sitecertificateslistslot";
import SiteCertificates_GetSlot from "./sitecertificatesgetslot";
import SiteCertificates_CreateOrUpdateSlot from "./sitecertificatescreateorupdateslot";
import SiteCertificates_DeleteSlot from "./sitecertificatesdeleteslot";
import SiteCertificates_UpdateSlot from "./sitecertificatesupdateslot";
import StaticSites_PreviewWorkflow from "./staticsitespreviewworkflow";
import StaticSites_List from "./staticsiteslist";
import StaticSites_GetStaticSitesByResourceGroup from "./staticsitesgetstaticsitesbyresourcegroup";
import StaticSites_GetStaticSite from "./staticsitesgetstaticsite";
import StaticSites_CreateOrUpdateStaticSite from "./staticsitescreateorupdatestaticsite";
import StaticSites_DeleteStaticSite from "./staticsitesdeletestaticsite";
import StaticSites_UpdateStaticSite from "./staticsitesupdatestaticsite";
import StaticSites_ListStaticSiteUsers from "./staticsitesliststaticsiteusers";
import StaticSites_DeleteStaticSiteUser from "./staticsitesdeletestaticsiteuser";
import StaticSites_UpdateStaticSiteUser from "./staticsitesupdatestaticsiteuser";
import StaticSites_GetStaticSiteBuilds from "./staticsitesgetstaticsitebuilds";
import StaticSites_GetStaticSiteBuild from "./staticsitesgetstaticsitebuild";
import StaticSites_DeleteStaticSiteBuild from "./staticsitesdeletestaticsitebuild";
import StaticSites_CreateOrUpdateStaticSiteBuildAppSettings from "./staticsitescreateorupdatestaticsitebuildappsettings";
import StaticSites_CreateOrUpdateStaticSiteBuildFunctionAppSettings from "./staticsitescreateorupdatestaticsitebuildfunctionappsettings";
import StaticSites_GetBuildDatabaseConnections from "./staticsitesgetbuilddatabaseconnections";
import StaticSites_GetBuildDatabaseConnection from "./staticsitesgetbuilddatabaseconnection";
import StaticSites_CreateOrUpdateBuildDatabaseConnection from "./staticsitescreateorupdatebuilddatabaseconnection";
import StaticSites_DeleteBuildDatabaseConnection from "./staticsitesdeletebuilddatabaseconnection";
import StaticSites_UpdateBuildDatabaseConnection from "./staticsitesupdatebuilddatabaseconnection";
import StaticSites_GetBuildDatabaseConnectionWithDetails from "./staticsitesgetbuilddatabaseconnectionwithdetails";
import StaticSites_ListStaticSiteBuildFunctions from "./staticsitesliststaticsitebuildfunctions";
import StaticSites_ListStaticSiteBuildAppSettings from "./staticsitesliststaticsitebuildappsettings";
import StaticSites_ListStaticSiteBuildFunctionAppSettings from "./staticsitesliststaticsitebuildfunctionappsettings";
import StaticSites_GetBuildDatabaseConnectionsWithDetails from "./staticsitesgetbuilddatabaseconnectionswithdetails";
import StaticSites_GetUserProvidedFunctionAppsForStaticSiteBuild from "./staticsitesgetuserprovidedfunctionappsforstaticsitebuild";
import StaticSites_GetUserProvidedFunctionAppForStaticSiteBuild from "./staticsitesgetuserprovidedfunctionappforstaticsitebuild";
import StaticSites_RegisterUserProvidedFunctionAppWithStaticSiteBuild from "./staticsitesregisteruserprovidedfunctionappwithstaticsitebuild";
import StaticSites_DetachUserProvidedFunctionAppFromStaticSiteBuild from "./staticsitesdetachuserprovidedfunctionappfromstaticsitebuild";
import StaticSites_CreateZipDeploymentForStaticSiteBuild from "./staticsitescreatezipdeploymentforstaticsitebuild";
import StaticSites_CreateOrUpdateStaticSiteAppSettings from "./staticsitescreateorupdatestaticsiteappsettings";
import StaticSites_ListBasicAuth from "./staticsiteslistbasicauth";
import StaticSites_GetBasicAuth from "./staticsitesgetbasicauth";
import StaticSites_CreateOrUpdateBasicAuth from "./staticsitescreateorupdatebasicauth";
import StaticSites_CreateOrUpdateStaticSiteFunctionAppSettings from "./staticsitescreateorupdatestaticsitefunctionappsettings";
import StaticSites_CreateUserRolesInvitationLink from "./staticsitescreateuserrolesinvitationlink";
import StaticSites_ListStaticSiteCustomDomains from "./staticsitesliststaticsitecustomdomains";
import StaticSites_GetStaticSiteCustomDomain from "./staticsitesgetstaticsitecustomdomain";
import StaticSites_CreateOrUpdateStaticSiteCustomDomain from "./staticsitescreateorupdatestaticsitecustomdomain";
import StaticSites_DeleteStaticSiteCustomDomain from "./staticsitesdeletestaticsitecustomdomain";
import StaticSites_ValidateCustomDomainCanBeAddedToStaticSite from "./staticsitesvalidatecustomdomaincanbeaddedtostaticsite";
import StaticSites_GetDatabaseConnections from "./staticsitesgetdatabaseconnections";
import StaticSites_GetDatabaseConnection from "./staticsitesgetdatabaseconnection";
import StaticSites_CreateOrUpdateDatabaseConnection from "./staticsitescreateorupdatedatabaseconnection";
import StaticSites_DeleteDatabaseConnection from "./staticsitesdeletedatabaseconnection";
import StaticSites_UpdateDatabaseConnection from "./staticsitesupdatedatabaseconnection";
import StaticSites_GetDatabaseConnectionWithDetails from "./staticsitesgetdatabaseconnectionwithdetails";
import StaticSites_DetachStaticSite from "./staticsitesdetachstaticsite";
import StaticSites_ListStaticSiteFunctions from "./staticsitesliststaticsitefunctions";
import StaticSites_ListStaticSiteAppSettings from "./staticsitesliststaticsiteappsettings";
import StaticSites_ListStaticSiteConfiguredRoles from "./staticsitesliststaticsiteconfiguredroles";
import StaticSites_ListStaticSiteFunctionAppSettings from "./staticsitesliststaticsitefunctionappsettings";
import StaticSites_ListStaticSiteSecrets from "./staticsitesliststaticsitesecrets";
import StaticSites_GetPrivateEndpointConnectionList from "./staticsitesgetprivateendpointconnectionlist";
import StaticSites_GetPrivateEndpointConnection from "./staticsitesgetprivateendpointconnection";
import StaticSites_ApproveOrRejectPrivateEndpointConnection from "./staticsitesapproveorrejectprivateendpointconnection";
import StaticSites_DeletePrivateEndpointConnection from "./staticsitesdeleteprivateendpointconnection";
import StaticSites_GetPrivateLinkResources from "./staticsitesgetprivatelinkresources";
import StaticSites_ResetStaticSiteApiKey from "./staticsitesresetstaticsiteapikey";
import StaticSites_GetDatabaseConnectionsWithDetails from "./staticsitesgetdatabaseconnectionswithdetails";
import StaticSites_GetUserProvidedFunctionAppsForStaticSite from "./staticsitesgetuserprovidedfunctionappsforstaticsite";
import StaticSites_GetUserProvidedFunctionAppForStaticSite from "./staticsitesgetuserprovidedfunctionappforstaticsite";
import StaticSites_RegisterUserProvidedFunctionAppWithStaticSite from "./staticsitesregisteruserprovidedfunctionappwithstaticsite";
import StaticSites_DetachUserProvidedFunctionAppFromStaticSite from "./staticsitesdetachuserprovidedfunctionappfromstaticsite";
import StaticSites_CreateZipDeploymentForStaticSite from "./staticsitescreatezipdeploymentforstaticsite";
import StaticSites_ValidateBackend from "./staticsitesvalidatebackend";
import StaticSites_ValidateBackendForBuild from "./staticsitesvalidatebackendforbuild";
import StaticSites_GetLinkedBackends from "./staticsitesgetlinkedbackends";
import StaticSites_GetLinkedBackendsForBuild from "./staticsitesgetlinkedbackendsforbuild";
import StaticSites_GetLinkedBackend from "./staticsitesgetlinkedbackend";
import StaticSites_LinkBackend from "./staticsiteslinkbackend";
import StaticSites_UnlinkBackend from "./staticsitesunlinkbackend";
import StaticSites_GetLinkedBackendForBuild from "./staticsitesgetlinkedbackendforbuild";
import StaticSites_LinkBackendToBuild from "./staticsiteslinkbackendtobuild";
import StaticSites_UnlinkBackendFromBuild from "./staticsitesunlinkbackendfrombuild";
import WebApps_List from "./webappslist";
import WebApps_ListByResourceGroup from "./webappslistbyresourcegroup";
import WebApps_Get from "./webappsget";
import WebApps_CreateOrUpdate from "./webappscreateorupdate";
import WebApps_Delete from "./webappsdelete";
import WebApps_Update from "./webappsupdate";
import WebApps_AnalyzeCustomHostname from "./webappsanalyzecustomhostname";
import WebApps_ApplySlotConfigToProduction from "./webappsapplyslotconfigtoproduction";
import WebApps_Backup from "./webappsbackup";
import WebApps_ListBackups from "./webappslistbackups";
import WebApps_GetBackupStatus from "./webappsgetbackupstatus";
import WebApps_DeleteBackup from "./webappsdeletebackup";
import WebApps_ListBackupStatusSecrets from "./webappslistbackupstatussecrets";
import WebApps_Restore from "./webappsrestore";
import WebApps_ListBasicPublishingCredentialsPolicies from "./webappslistbasicpublishingcredentialspolicies";
import WebApps_GetFtpAllowed from "./webappsgetftpallowed";
import WebApps_UpdateFtpAllowed from "./webappsupdateftpallowed";
import WebApps_GetScmAllowed from "./webappsgetscmallowed";
import WebApps_UpdateScmAllowed from "./webappsupdatescmallowed";
import WebApps_ListConfigurations from "./webappslistconfigurations";
import WebApps_UpdateApplicationSettings from "./webappsupdateapplicationsettings";
import WebApps_ListApplicationSettings from "./webappslistapplicationsettings";
import WebApps_UpdateAuthSettings from "./webappsupdateauthsettings";
import WebApps_GetAuthSettings from "./webappsgetauthsettings";
import WebApps_GetAuthSettingsV2WithoutSecrets from "./webappsgetauthsettingsv2withoutsecrets";
import WebApps_UpdateAuthSettingsV2 from "./webappsupdateauthsettingsv2";
import WebApps_GetAuthSettingsV2 from "./webappsgetauthsettingsv2";
import WebApps_UpdateAzureStorageAccounts from "./webappsupdateazurestorageaccounts";
import WebApps_ListAzureStorageAccounts from "./webappslistazurestorageaccounts";
import WebApps_UpdateBackupConfiguration from "./webappsupdatebackupconfiguration";
import WebApps_DeleteBackupConfiguration from "./webappsdeletebackupconfiguration";
import WebApps_GetBackupConfiguration from "./webappsgetbackupconfiguration";
import WebApps_GetAppSettingsKeyVaultReferences from "./webappsgetappsettingskeyvaultreferences";
import WebApps_GetAppSettingKeyVaultReference from "./webappsgetappsettingkeyvaultreference";
import WebApps_GetSiteConnectionStringKeyVaultReferences from "./webappsgetsiteconnectionstringkeyvaultreferences";
import WebApps_GetSiteConnectionStringKeyVaultReference from "./webappsgetsiteconnectionstringkeyvaultreference";
import WebApps_UpdateConnectionStrings from "./webappsupdateconnectionstrings";
import WebApps_ListConnectionStrings from "./webappslistconnectionstrings";
import WebApps_GetDiagnosticLogsConfiguration from "./webappsgetdiagnosticlogsconfiguration";
import WebApps_UpdateDiagnosticLogsConfig from "./webappsupdatediagnosticlogsconfig";
import WebApps_UpdateMetadata from "./webappsupdatemetadata";
import WebApps_ListMetadata from "./webappslistmetadata";
import WebApps_ListPublishingCredentials from "./webappslistpublishingcredentials";
import WebApps_UpdateSitePushSettings from "./webappsupdatesitepushsettings";
import WebApps_ListSitePushSettings from "./webappslistsitepushsettings";
import WebApps_ListSlotConfigurationNames from "./webappslistslotconfigurationnames";
import WebApps_UpdateSlotConfigurationNames from "./webappsupdateslotconfigurationnames";
import WebApps_GetConfiguration from "./webappsgetconfiguration";
import WebApps_CreateOrUpdateConfiguration from "./webappscreateorupdateconfiguration";
import WebApps_UpdateConfiguration from "./webappsupdateconfiguration";
import WebApps_ListConfigurationSnapshotInfo from "./webappslistconfigurationsnapshotinfo";
import WebApps_GetConfigurationSnapshot from "./webappsgetconfigurationsnapshot";
import WebApps_RecoverSiteConfigurationSnapshot from "./webappsrecoversiteconfigurationsnapshot";
import WebApps_GetWebSiteContainerLogs from "./webappsgetwebsitecontainerlogs";
import WebApps_GetContainerLogsZip from "./webappsgetcontainerlogszip";
import WebApps_ListContinuousWebJobs from "./webappslistcontinuouswebjobs";
import WebApps_GetContinuousWebJob from "./webappsgetcontinuouswebjob";
import WebApps_DeleteContinuousWebJob from "./webappsdeletecontinuouswebjob";
import WebApps_StartContinuousWebJob from "./webappsstartcontinuouswebjob";
import WebApps_StopContinuousWebJob from "./webappsstopcontinuouswebjob";
import WebApps_ListProductionSiteDeploymentStatuses from "./webappslistproductionsitedeploymentstatuses";
import WebApps_GetProductionSiteDeploymentStatus from "./webappsgetproductionsitedeploymentstatus";
import WebApps_ListDeployments from "./webappslistdeployments";
import WebApps_GetDeployment from "./webappsgetdeployment";
import WebApps_CreateDeployment from "./webappscreatedeployment";
import WebApps_DeleteDeployment from "./webappsdeletedeployment";
import WebApps_ListDeploymentLog from "./webappslistdeploymentlog";
import WebApps_DiscoverBackup from "./webappsdiscoverbackup";
import WebApps_ListDomainOwnershipIdentifiers from "./webappslistdomainownershipidentifiers";
import WebApps_GetDomainOwnershipIdentifier from "./webappsgetdomainownershipidentifier";
import WebApps_CreateOrUpdateDomainOwnershipIdentifier from "./webappscreateorupdatedomainownershipidentifier";
import WebApps_DeleteDomainOwnershipIdentifier from "./webappsdeletedomainownershipidentifier";
import WebApps_UpdateDomainOwnershipIdentifier from "./webappsupdatedomainownershipidentifier";
import WebApps_GetMSDeployStatus from "./webappsgetmsdeploystatus";
import WebApps_CreateMSDeployOperation from "./webappscreatemsdeployoperation";
import WebApps_GetMSDeployLog from "./webappsgetmsdeploylog";
import WebApps_GetOneDeployStatus from "./webappsgetonedeploystatus";
import WebApps_CreateOneDeployOperation from "./webappscreateonedeployoperation";
import WebApps_ListFunctions from "./webappslistfunctions";
import WebApps_GetFunctionsAdminToken from "./webappsgetfunctionsadmintoken";
import WebApps_GetFunction from "./webappsgetfunction";
import WebApps_CreateFunction from "./webappscreatefunction";
import WebApps_DeleteFunction from "./webappsdeletefunction";
import WebApps_CreateOrUpdateFunctionSecret from "./webappscreateorupdatefunctionsecret";
import WebApps_DeleteFunctionSecret from "./webappsdeletefunctionsecret";
import WebApps_ListFunctionKeys from "./webappslistfunctionkeys";
import WebApps_ListFunctionSecrets from "./webappslistfunctionsecrets";
import WebApps_ListHostKeys from "./webappslisthostkeys";
import WebApps_ListSyncStatus from "./webappslistsyncstatus";
import WebApps_SyncFunctions from "./webappssyncfunctions";
import WebApps_CreateOrUpdateHostSecret from "./webappscreateorupdatehostsecret";
import WebApps_DeleteHostSecret from "./webappsdeletehostsecret";
import WebApps_ListHostNameBindings from "./webappslisthostnamebindings";
import WebApps_GetHostNameBinding from "./webappsgethostnamebinding";
import WebApps_CreateOrUpdateHostNameBinding from "./webappscreateorupdatehostnamebinding";
import WebApps_DeleteHostNameBinding from "./webappsdeletehostnamebinding";
import WebApps_GetHybridConnection from "./webappsgethybridconnection";
import WebApps_CreateOrUpdateHybridConnection from "./webappscreateorupdatehybridconnection";
import WebApps_DeleteHybridConnection from "./webappsdeletehybridconnection";
import WebApps_UpdateHybridConnection from "./webappsupdatehybridconnection";
import WebApps_ListHybridConnections from "./webappslisthybridconnections";
import WebApps_ListRelayServiceConnections from "./webappslistrelayserviceconnections";
import WebApps_GetRelayServiceConnection from "./webappsgetrelayserviceconnection";
import WebApps_CreateOrUpdateRelayServiceConnection from "./webappscreateorupdaterelayserviceconnection";
import WebApps_DeleteRelayServiceConnection from "./webappsdeleterelayserviceconnection";
import WebApps_UpdateRelayServiceConnection from "./webappsupdaterelayserviceconnection";
import WebApps_ListInstanceIdentifiers from "./webappslistinstanceidentifiers";
import WebApps_GetInstanceInfo from "./webappsgetinstanceinfo";
import WebApps_GetInstanceMsDeployStatus from "./webappsgetinstancemsdeploystatus";
import WebApps_CreateInstanceMSDeployOperation from "./webappscreateinstancemsdeployoperation";
import WebApps_GetInstanceMSDeployLog from "./webappsgetinstancemsdeploylog";
import WebApps_ListInstanceProcesses from "./webappslistinstanceprocesses";
import WebApps_GetInstanceProcess from "./webappsgetinstanceprocess";
import WebApps_DeleteInstanceProcess from "./webappsdeleteinstanceprocess";
import WebApps_GetInstanceProcessDump from "./webappsgetinstanceprocessdump";
import WebApps_ListInstanceProcessModules from "./webappslistinstanceprocessmodules";
import WebApps_GetInstanceProcessModule from "./webappsgetinstanceprocessmodule";
import WebApps_ListInstanceProcessThreads from "./webappslistinstanceprocessthreads";
import WebApps_IsCloneable from "./webappsiscloneable";
import WebApps_ListSiteBackups from "./webappslistsitebackups";
import WebApps_ListSyncFunctionTriggers from "./webappslistsyncfunctiontriggers";
import WebApps_UpdateMachineKey from "./webappsupdatemachinekey";
import WebApps_MigrateStorage from "./webappsmigratestorage";
import WebApps_MigrateMySql from "./webappsmigratemysql";
import WebApps_GetMigrateMySqlStatus from "./webappsgetmigratemysqlstatus";
import WebApps_GetSwiftVirtualNetworkConnection from "./webappsgetswiftvirtualnetworkconnection";
import WebApps_CreateOrUpdateSwiftVirtualNetworkConnectionWithCheck from "./webappscreateorupdateswiftvirtualnetworkconnectionwithcheck";
import WebApps_DeleteSwiftVirtualNetwork from "./webappsdeleteswiftvirtualnetwork";
import WebApps_UpdateSwiftVirtualNetworkConnectionWithCheck from "./webappsupdateswiftvirtualnetworkconnectionwithcheck";
import WebApps_ListNetworkFeatures from "./webappslistnetworkfeatures";
import WebApps_GetNetworkTraceOperation from "./webappsgetnetworktraceoperation";
import WebApps_StartWebSiteNetworkTrace from "./webappsstartwebsitenetworktrace";
import WebApps_StartWebSiteNetworkTraceOperation from "./webappsstartwebsitenetworktraceoperation";
import WebApps_StopWebSiteNetworkTrace from "./webappsstopwebsitenetworktrace";
import WebApps_GetNetworkTraces from "./webappsgetnetworktraces";
import WebApps_GetNetworkTraceOperationV2 from "./webappsgetnetworktraceoperationv2";
import WebApps_GetNetworkTracesV2 from "./webappsgetnetworktracesv2";
import WebApps_GenerateNewSitePublishingPassword from "./webappsgeneratenewsitepublishingpassword";
import WebApps_ListPerfMonCounters from "./webappslistperfmoncounters";
import WebApps_GetSitePhpErrorLogFlag from "./webappsgetsitephperrorlogflag";
import WebApps_ListPremierAddOns from "./webappslistpremieraddons";
import WebApps_GetPremierAddOn from "./webappsgetpremieraddon";
import WebApps_AddPremierAddOn from "./webappsaddpremieraddon";
import WebApps_DeletePremierAddOn from "./webappsdeletepremieraddon";
import WebApps_UpdatePremierAddOn from "./webappsupdatepremieraddon";
import WebApps_GetPrivateAccess from "./webappsgetprivateaccess";
import WebApps_PutPrivateAccessVnet from "./webappsputprivateaccessvnet";
import WebApps_GetPrivateEndpointConnectionList from "./webappsgetprivateendpointconnectionlist";
import WebApps_GetPrivateEndpointConnection from "./webappsgetprivateendpointconnection";
import WebApps_ApproveOrRejectPrivateEndpointConnection from "./webappsapproveorrejectprivateendpointconnection";
import WebApps_DeletePrivateEndpointConnection from "./webappsdeleteprivateendpointconnection";
import WebApps_GetPrivateLinkResources from "./webappsgetprivatelinkresources";
import WebApps_ListProcesses from "./webappslistprocesses";
import WebApps_GetProcess from "./webappsgetprocess";
import WebApps_DeleteProcess from "./webappsdeleteprocess";
import WebApps_GetProcessDump from "./webappsgetprocessdump";
import WebApps_ListProcessModules from "./webappslistprocessmodules";
import WebApps_GetProcessModule from "./webappsgetprocessmodule";
import WebApps_ListProcessThreads from "./webappslistprocessthreads";
import WebApps_ListPublicCertificates from "./webappslistpubliccertificates";
import WebApps_GetPublicCertificate from "./webappsgetpubliccertificate";
import WebApps_CreateOrUpdatePublicCertificate from "./webappscreateorupdatepubliccertificate";
import WebApps_DeletePublicCertificate from "./webappsdeletepubliccertificate";
import WebApps_ListPublishingProfileXmlWithSecrets from "./webappslistpublishingprofilexmlwithsecrets";
import WebApps_ResetProductionSlotConfig from "./webappsresetproductionslotconfig";
import WebApps_Restart from "./webappsrestart";
import WebApps_RestoreFromBackupBlob from "./webappsrestorefrombackupblob";
import WebApps_RestoreFromDeletedApp from "./webappsrestorefromdeletedapp";
import WebApps_RestoreSnapshot from "./webappsrestoresnapshot";
import WebApps_ListSiteContainers from "./webappslistsitecontainers";
import WebApps_GetSiteContainer from "./webappsgetsitecontainer";
import WebApps_CreateOrUpdateSiteContainer from "./webappscreateorupdatesitecontainer";
import WebApps_DeleteSiteContainer from "./webappsdeletesitecontainer";
import WebApps_ListSiteExtensions from "./webappslistsiteextensions";
import WebApps_GetSiteExtension from "./webappsgetsiteextension";
import WebApps_InstallSiteExtension from "./webappsinstallsiteextension";
import WebApps_DeleteSiteExtension from "./webappsdeletesiteextension";
import WebApps_ListSlots from "./webappslistslots";
import WebApps_GetSlot from "./webappsgetslot";
import WebApps_CreateOrUpdateSlot from "./webappscreateorupdateslot";
import WebApps_DeleteSlot from "./webappsdeleteslot";
import WebApps_UpdateSlot from "./webappsupdateslot";
import WebApps_AnalyzeCustomHostnameSlot from "./webappsanalyzecustomhostnameslot";
import WebApps_ApplySlotConfigurationSlot from "./webappsapplyslotconfigurationslot";
import WebApps_BackupSlot from "./webappsbackupslot";
import WebApps_ListBackupsSlot from "./webappslistbackupsslot";
import WebApps_GetBackupStatusSlot from "./webappsgetbackupstatusslot";
import WebApps_DeleteBackupSlot from "./webappsdeletebackupslot";
import WebApps_ListBackupStatusSecretsSlot from "./webappslistbackupstatussecretsslot";
import WebApps_RestoreSlot from "./webappsrestoreslot";
import WebApps_ListBasicPublishingCredentialsPoliciesSlot from "./webappslistbasicpublishingcredentialspoliciesslot";
import WebApps_GetFtpAllowedSlot from "./webappsgetftpallowedslot";
import WebApps_UpdateFtpAllowedSlot from "./webappsupdateftpallowedslot";
import WebApps_GetScmAllowedSlot from "./webappsgetscmallowedslot";
import WebApps_UpdateScmAllowedSlot from "./webappsupdatescmallowedslot";
import WebApps_ListConfigurationsSlot from "./webappslistconfigurationsslot";
import WebApps_UpdateApplicationSettingsSlot from "./webappsupdateapplicationsettingsslot";
import WebApps_ListApplicationSettingsSlot from "./webappslistapplicationsettingsslot";
import WebApps_UpdateAuthSettingsSlot from "./webappsupdateauthsettingsslot";
import WebApps_GetAuthSettingsSlot from "./webappsgetauthsettingsslot";
import WebApps_GetAuthSettingsV2WithoutSecretsSlot from "./webappsgetauthsettingsv2withoutsecretsslot";
import WebApps_UpdateAuthSettingsV2Slot from "./webappsupdateauthsettingsv2slot";
import WebApps_GetAuthSettingsV2Slot from "./webappsgetauthsettingsv2slot";
import WebApps_UpdateAzureStorageAccountsSlot from "./webappsupdateazurestorageaccountsslot";
import WebApps_ListAzureStorageAccountsSlot from "./webappslistazurestorageaccountsslot";
import WebApps_UpdateBackupConfigurationSlot from "./webappsupdatebackupconfigurationslot";
import WebApps_DeleteBackupConfigurationSlot from "./webappsdeletebackupconfigurationslot";
import WebApps_GetBackupConfigurationSlot from "./webappsgetbackupconfigurationslot";
import WebApps_GetAppSettingsKeyVaultReferencesSlot from "./webappsgetappsettingskeyvaultreferencesslot";
import WebApps_GetAppSettingKeyVaultReferenceSlot from "./webappsgetappsettingkeyvaultreferenceslot";
import WebApps_GetSiteConnectionStringKeyVaultReferencesSlot from "./webappsgetsiteconnectionstringkeyvaultreferencesslot";
import WebApps_GetSiteConnectionStringKeyVaultReferenceSlot from "./webappsgetsiteconnectionstringkeyvaultreferenceslot";
import WebApps_UpdateConnectionStringsSlot from "./webappsupdateconnectionstringsslot";
import WebApps_ListConnectionStringsSlot from "./webappslistconnectionstringsslot";
import WebApps_GetDiagnosticLogsConfigurationSlot from "./webappsgetdiagnosticlogsconfigurationslot";
import WebApps_UpdateDiagnosticLogsConfigSlot from "./webappsupdatediagnosticlogsconfigslot";
import WebApps_UpdateMetadataSlot from "./webappsupdatemetadataslot";
import WebApps_ListMetadataSlot from "./webappslistmetadataslot";
import WebApps_ListPublishingCredentialsSlot from "./webappslistpublishingcredentialsslot";
import WebApps_UpdateSitePushSettingsSlot from "./webappsupdatesitepushsettingsslot";
import WebApps_ListSitePushSettingsSlot from "./webappslistsitepushsettingsslot";
import WebApps_GetConfigurationSlot from "./webappsgetconfigurationslot";
import WebApps_CreateOrUpdateConfigurationSlot from "./webappscreateorupdateconfigurationslot";
import WebApps_UpdateConfigurationSlot from "./webappsupdateconfigurationslot";
import WebApps_ListConfigurationSnapshotInfoSlot from "./webappslistconfigurationsnapshotinfoslot";
import WebApps_GetConfigurationSnapshotSlot from "./webappsgetconfigurationsnapshotslot";
import WebApps_RecoverSiteConfigurationSnapshotSlot from "./webappsrecoversiteconfigurationsnapshotslot";
import WebApps_GetWebSiteContainerLogsSlot from "./webappsgetwebsitecontainerlogsslot";
import WebApps_GetContainerLogsZipSlot from "./webappsgetcontainerlogszipslot";
import WebApps_ListContinuousWebJobsSlot from "./webappslistcontinuouswebjobsslot";
import WebApps_GetContinuousWebJobSlot from "./webappsgetcontinuouswebjobslot";
import WebApps_DeleteContinuousWebJobSlot from "./webappsdeletecontinuouswebjobslot";
import WebApps_StartContinuousWebJobSlot from "./webappsstartcontinuouswebjobslot";
import WebApps_StopContinuousWebJobSlot from "./webappsstopcontinuouswebjobslot";
import WebApps_ListSlotSiteDeploymentStatusesSlot from "./webappslistslotsitedeploymentstatusesslot";
import WebApps_GetSlotSiteDeploymentStatusSlot from "./webappsgetslotsitedeploymentstatusslot";
import WebApps_ListDeploymentsSlot from "./webappslistdeploymentsslot";
import WebApps_GetDeploymentSlot from "./webappsgetdeploymentslot";
import WebApps_CreateDeploymentSlot from "./webappscreatedeploymentslot";
import WebApps_DeleteDeploymentSlot from "./webappsdeletedeploymentslot";
import WebApps_ListDeploymentLogSlot from "./webappslistdeploymentlogslot";
import WebApps_DiscoverBackupSlot from "./webappsdiscoverbackupslot";
import WebApps_ListDomainOwnershipIdentifiersSlot from "./webappslistdomainownershipidentifiersslot";
import WebApps_GetDomainOwnershipIdentifierSlot from "./webappsgetdomainownershipidentifierslot";
import WebApps_CreateOrUpdateDomainOwnershipIdentifierSlot from "./webappscreateorupdatedomainownershipidentifierslot";
import WebApps_DeleteDomainOwnershipIdentifierSlot from "./webappsdeletedomainownershipidentifierslot";
import WebApps_UpdateDomainOwnershipIdentifierSlot from "./webappsupdatedomainownershipidentifierslot";
import WebApps_GetMSDeployStatusSlot from "./webappsgetmsdeploystatusslot";
import WebApps_CreateMSDeployOperationSlot from "./webappscreatemsdeployoperationslot";
import WebApps_GetMSDeployLogSlot from "./webappsgetmsdeploylogslot";
import WebApps_ListInstanceFunctionsSlot from "./webappslistinstancefunctionsslot";
import WebApps_GetFunctionsAdminTokenSlot from "./webappsgetfunctionsadmintokenslot";
import WebApps_GetInstanceFunctionSlot from "./webappsgetinstancefunctionslot";
import WebApps_CreateInstanceFunctionSlot from "./webappscreateinstancefunctionslot";
import WebApps_DeleteInstanceFunctionSlot from "./webappsdeleteinstancefunctionslot";
import WebApps_CreateOrUpdateFunctionSecretSlot from "./webappscreateorupdatefunctionsecretslot";
import WebApps_DeleteFunctionSecretSlot from "./webappsdeletefunctionsecretslot";
import WebApps_ListFunctionKeysSlot from "./webappslistfunctionkeysslot";
import WebApps_ListFunctionSecretsSlot from "./webappslistfunctionsecretsslot";
import WebApps_ListHostKeysSlot from "./webappslisthostkeysslot";
import WebApps_ListSyncStatusSlot from "./webappslistsyncstatusslot";
import WebApps_SyncFunctionsSlot from "./webappssyncfunctionsslot";
import WebApps_CreateOrUpdateHostSecretSlot from "./webappscreateorupdatehostsecretslot";
import WebApps_DeleteHostSecretSlot from "./webappsdeletehostsecretslot";
import WebApps_ListHostNameBindingsSlot from "./webappslisthostnamebindingsslot";
import WebApps_GetHostNameBindingSlot from "./webappsgethostnamebindingslot";
import WebApps_CreateOrUpdateHostNameBindingSlot from "./webappscreateorupdatehostnamebindingslot";
import WebApps_DeleteHostNameBindingSlot from "./webappsdeletehostnamebindingslot";
import WebApps_GetHybridConnectionSlot from "./webappsgethybridconnectionslot";
import WebApps_CreateOrUpdateHybridConnectionSlot from "./webappscreateorupdatehybridconnectionslot";
import WebApps_DeleteHybridConnectionSlot from "./webappsdeletehybridconnectionslot";
import WebApps_UpdateHybridConnectionSlot from "./webappsupdatehybridconnectionslot";
import WebApps_ListHybridConnectionsSlot from "./webappslisthybridconnectionsslot";
import WebApps_ListRelayServiceConnectionsSlot from "./webappslistrelayserviceconnectionsslot";
import WebApps_GetRelayServiceConnectionSlot from "./webappsgetrelayserviceconnectionslot";
import WebApps_CreateOrUpdateRelayServiceConnectionSlot from "./webappscreateorupdaterelayserviceconnectionslot";
import WebApps_DeleteRelayServiceConnectionSlot from "./webappsdeleterelayserviceconnectionslot";
import WebApps_UpdateRelayServiceConnectionSlot from "./webappsupdaterelayserviceconnectionslot";
import WebApps_ListInstanceIdentifiersSlot from "./webappslistinstanceidentifiersslot";
import WebApps_GetInstanceInfoSlot from "./webappsgetinstanceinfoslot";
import WebApps_GetInstanceMsDeployStatusSlot from "./webappsgetinstancemsdeploystatusslot";
import WebApps_CreateInstanceMSDeployOperationSlot from "./webappscreateinstancemsdeployoperationslot";
import WebApps_GetInstanceMSDeployLogSlot from "./webappsgetinstancemsdeploylogslot";
import WebApps_ListInstanceProcessesSlot from "./webappslistinstanceprocessesslot";
import WebApps_GetInstanceProcessSlot from "./webappsgetinstanceprocessslot";
import WebApps_DeleteInstanceProcessSlot from "./webappsdeleteinstanceprocessslot";
import WebApps_GetInstanceProcessDumpSlot from "./webappsgetinstanceprocessdumpslot";
import WebApps_ListInstanceProcessModulesSlot from "./webappslistinstanceprocessmodulesslot";
import WebApps_GetInstanceProcessModuleSlot from "./webappsgetinstanceprocessmoduleslot";
import WebApps_ListInstanceProcessThreadsSlot from "./webappslistinstanceprocessthreadsslot";
import WebApps_IsCloneableSlot from "./webappsiscloneableslot";
import WebApps_ListSiteBackupsSlot from "./webappslistsitebackupsslot";
import WebApps_ListSyncFunctionTriggersSlot from "./webappslistsyncfunctiontriggersslot";
import WebApps_GetMigrateMySqlStatusSlot from "./webappsgetmigratemysqlstatusslot";
import WebApps_GetSwiftVirtualNetworkConnectionSlot from "./webappsgetswiftvirtualnetworkconnectionslot";
import WebApps_CreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlot from "./webappscreateorupdateswiftvirtualnetworkconnectionwithcheckslot";
import WebApps_DeleteSwiftVirtualNetworkSlot from "./webappsdeleteswiftvirtualnetworkslot";
import WebApps_UpdateSwiftVirtualNetworkConnectionWithCheckSlot from "./webappsupdateswiftvirtualnetworkconnectionwithcheckslot";
import WebApps_ListNetworkFeaturesSlot from "./webappslistnetworkfeaturesslot";
import WebApps_GetNetworkTraceOperationSlot from "./webappsgetnetworktraceoperationslot";
import WebApps_StartWebSiteNetworkTraceSlot from "./webappsstartwebsitenetworktraceslot";
import WebApps_StartWebSiteNetworkTraceOperationSlot from "./webappsstartwebsitenetworktraceoperationslot";
import WebApps_StopWebSiteNetworkTraceSlot from "./webappsstopwebsitenetworktraceslot";
import WebApps_GetNetworkTracesSlot from "./webappsgetnetworktracesslot";
import WebApps_GetNetworkTraceOperationSlotV2 from "./webappsgetnetworktraceoperationslotv2";
import WebApps_GetNetworkTracesSlotV2 from "./webappsgetnetworktracesslotv2";
import WebApps_GenerateNewSitePublishingPasswordSlot from "./webappsgeneratenewsitepublishingpasswordslot";
import WebApps_ListPerfMonCountersSlot from "./webappslistperfmoncountersslot";
import WebApps_GetSitePhpErrorLogFlagSlot from "./webappsgetsitephperrorlogflagslot";
import WebApps_ListPremierAddOnsSlot from "./webappslistpremieraddonsslot";
import WebApps_GetPremierAddOnSlot from "./webappsgetpremieraddonslot";
import WebApps_AddPremierAddOnSlot from "./webappsaddpremieraddonslot";
import WebApps_DeletePremierAddOnSlot from "./webappsdeletepremieraddonslot";
import WebApps_UpdatePremierAddOnSlot from "./webappsupdatepremieraddonslot";
import WebApps_GetPrivateAccessSlot from "./webappsgetprivateaccessslot";
import WebApps_PutPrivateAccessVnetSlot from "./webappsputprivateaccessvnetslot";
import WebApps_GetPrivateEndpointConnectionListSlot from "./webappsgetprivateendpointconnectionlistslot";
import WebApps_GetPrivateEndpointConnectionSlot from "./webappsgetprivateendpointconnectionslot";
import WebApps_ApproveOrRejectPrivateEndpointConnectionSlot from "./webappsapproveorrejectprivateendpointconnectionslot";
import WebApps_DeletePrivateEndpointConnectionSlot from "./webappsdeleteprivateendpointconnectionslot";
import WebApps_GetPrivateLinkResourcesSlot from "./webappsgetprivatelinkresourcesslot";
import WebApps_ListProcessesSlot from "./webappslistprocessesslot";
import WebApps_GetProcessSlot from "./webappsgetprocessslot";
import WebApps_DeleteProcessSlot from "./webappsdeleteprocessslot";
import WebApps_GetProcessDumpSlot from "./webappsgetprocessdumpslot";
import WebApps_ListProcessModulesSlot from "./webappslistprocessmodulesslot";
import WebApps_GetProcessModuleSlot from "./webappsgetprocessmoduleslot";
import WebApps_ListProcessThreadsSlot from "./webappslistprocessthreadsslot";
import WebApps_ListPublicCertificatesSlot from "./webappslistpubliccertificatesslot";
import WebApps_GetPublicCertificateSlot from "./webappsgetpubliccertificateslot";
import WebApps_CreateOrUpdatePublicCertificateSlot from "./webappscreateorupdatepubliccertificateslot";
import WebApps_DeletePublicCertificateSlot from "./webappsdeletepubliccertificateslot";
import WebApps_ListPublishingProfileXmlWithSecretsSlot from "./webappslistpublishingprofilexmlwithsecretsslot";
import WebApps_ResetSlotConfigurationSlot from "./webappsresetslotconfigurationslot";
import WebApps_RestartSlot from "./webappsrestartslot";
import WebApps_RestoreFromBackupBlobSlot from "./webappsrestorefrombackupblobslot";
import WebApps_RestoreFromDeletedAppSlot from "./webappsrestorefromdeletedappslot";
import WebApps_RestoreSnapshotSlot from "./webappsrestoresnapshotslot";
import WebApps_ListSiteContainersSlot from "./webappslistsitecontainersslot";
import WebApps_GetSiteContainerSlot from "./webappsgetsitecontainerslot";
import WebApps_CreateOrUpdateSiteContainerSlot from "./webappscreateorupdatesitecontainerslot";
import WebApps_DeleteSiteContainerSlot from "./webappsdeletesitecontainerslot";
import WebApps_ListSiteExtensionsSlot from "./webappslistsiteextensionsslot";
import WebApps_GetSiteExtensionSlot from "./webappsgetsiteextensionslot";
import WebApps_InstallSiteExtensionSlot from "./webappsinstallsiteextensionslot";
import WebApps_DeleteSiteExtensionSlot from "./webappsdeletesiteextensionslot";
import WebApps_ListSlotDifferencesSlot from "./webappslistslotdifferencesslot";
import WebApps_SwapSlotSlot from "./webappsswapslotslot";
import WebApps_ListSnapshotsSlot from "./webappslistsnapshotsslot";
import WebApps_ListSnapshotsFromDRSecondarySlot from "./webappslistsnapshotsfromdrsecondaryslot";
import WebApps_GetSourceControlSlot from "./webappsgetsourcecontrolslot";
import WebApps_CreateOrUpdateSourceControlSlot from "./webappscreateorupdatesourcecontrolslot";
import WebApps_DeleteSourceControlSlot from "./webappsdeletesourcecontrolslot";
import WebApps_UpdateSourceControlSlot from "./webappsupdatesourcecontrolslot";
import WebApps_StartSlot from "./webappsstartslot";
import WebApps_StartNetworkTraceSlot from "./webappsstartnetworktraceslot";
import WebApps_StopSlot from "./webappsstopslot";
import WebApps_StopNetworkTraceSlot from "./webappsstopnetworktraceslot";
import WebApps_SyncRepositorySlot from "./webappssyncrepositoryslot";
import WebApps_SyncFunctionTriggersSlot from "./webappssyncfunctiontriggersslot";
import WebApps_ListTriggeredWebJobsSlot from "./webappslisttriggeredwebjobsslot";
import WebApps_GetTriggeredWebJobSlot from "./webappsgettriggeredwebjobslot";
import WebApps_DeleteTriggeredWebJobSlot from "./webappsdeletetriggeredwebjobslot";
import WebApps_ListTriggeredWebJobHistorySlot from "./webappslisttriggeredwebjobhistoryslot";
import WebApps_GetTriggeredWebJobHistorySlot from "./webappsgettriggeredwebjobhistoryslot";
import WebApps_RunTriggeredWebJobSlot from "./webappsruntriggeredwebjobslot";
import WebApps_ListUsagesSlot from "./webappslistusagesslot";
import WebApps_ListVnetConnectionsSlot from "./webappslistvnetconnectionsslot";
import WebApps_GetVnetConnectionSlot from "./webappsgetvnetconnectionslot";
import WebApps_CreateOrUpdateVnetConnectionSlot from "./webappscreateorupdatevnetconnectionslot";
import WebApps_DeleteVnetConnectionSlot from "./webappsdeletevnetconnectionslot";
import WebApps_UpdateVnetConnectionSlot from "./webappsupdatevnetconnectionslot";
import WebApps_GetVnetConnectionGatewaySlot from "./webappsgetvnetconnectiongatewayslot";
import WebApps_CreateOrUpdateVnetConnectionGatewaySlot from "./webappscreateorupdatevnetconnectiongatewayslot";
import WebApps_UpdateVnetConnectionGatewaySlot from "./webappsupdatevnetconnectiongatewayslot";
import WebApps_ListWebJobsSlot from "./webappslistwebjobsslot";
import WebApps_GetWebJobSlot from "./webappsgetwebjobslot";
import WebApps_ListSlotDifferencesFromProduction from "./webappslistslotdifferencesfromproduction";
import WebApps_SwapSlotWithProduction from "./webappsswapslotwithproduction";
import WebApps_ListSnapshots from "./webappslistsnapshots";
import WebApps_ListSnapshotsFromDRSecondary from "./webappslistsnapshotsfromdrsecondary";
import WebApps_GetSourceControl from "./webappsgetsourcecontrol";
import WebApps_CreateOrUpdateSourceControl from "./webappscreateorupdatesourcecontrol";
import WebApps_DeleteSourceControl from "./webappsdeletesourcecontrol";
import WebApps_UpdateSourceControl from "./webappsupdatesourcecontrol";
import WebApps_Start from "./webappsstart";
import WebApps_StartNetworkTrace from "./webappsstartnetworktrace";
import WebApps_Stop from "./webappsstop";
import WebApps_StopNetworkTrace from "./webappsstopnetworktrace";
import WebApps_SyncRepository from "./webappssyncrepository";
import WebApps_SyncFunctionTriggers from "./webappssyncfunctiontriggers";
import WebApps_ListTriggeredWebJobs from "./webappslisttriggeredwebjobs";
import WebApps_GetTriggeredWebJob from "./webappsgettriggeredwebjob";
import WebApps_DeleteTriggeredWebJob from "./webappsdeletetriggeredwebjob";
import WebApps_ListTriggeredWebJobHistory from "./webappslisttriggeredwebjobhistory";
import WebApps_GetTriggeredWebJobHistory from "./webappsgettriggeredwebjobhistory";
import WebApps_RunTriggeredWebJob from "./webappsruntriggeredwebjob";
import WebApps_ListUsages from "./webappslistusages";
import WebApps_ListVnetConnections from "./webappslistvnetconnections";
import WebApps_GetVnetConnection from "./webappsgetvnetconnection";
import WebApps_CreateOrUpdateVnetConnection from "./webappscreateorupdatevnetconnection";
import WebApps_DeleteVnetConnection from "./webappsdeletevnetconnection";
import WebApps_UpdateVnetConnection from "./webappsupdatevnetconnection";
import WebApps_GetVnetConnectionGateway from "./webappsgetvnetconnectiongateway";
import WebApps_CreateOrUpdateVnetConnectionGateway from "./webappscreateorupdatevnetconnectiongateway";
import WebApps_UpdateVnetConnectionGateway from "./webappsupdatevnetconnectiongateway";
import WebApps_ListWebJobs from "./webappslistwebjobs";
import WebApps_GetWebJob from "./webappsgetwebjob";
import WebApps_DeployWorkflowArtifacts from "./webappsdeployworkflowartifacts";
import WebApps_DeployWorkflowArtifactsSlot from "./webappsdeployworkflowartifactsslot";
import WebApps_ListInstanceWorkflowsSlot from "./webappslistinstanceworkflowsslot";
import WebApps_GetInstanceWorkflowSlot from "./webappsgetinstanceworkflowslot";
import WebApps_ListWorkflowsConnectionsSlot from "./webappslistworkflowsconnectionsslot";
import WebApps_ListWorkflows from "./webappslistworkflows";
import WebApps_GetWorkflow from "./webappsgetworkflow";
import WebApps_ListWorkflowsConnections from "./webappslistworkflowsconnections";
import Workflows_RegenerateAccessKey from "./workflowsregenerateaccesskey";
import WorkflowRuns_List from "./workflowrunslist";
import WorkflowRuns_Get from "./workflowrunsget";
import WorkflowRunActions_List from "./workflowrunactionslist";
import WorkflowRunActions_Get from "./workflowrunactionsget";
import WorkflowRunActions_ListExpressionTraces from "./workflowrunactionslistexpressiontraces";
import WorkflowRunActionRepetitions_List from "./workflowrunactionrepetitionslist";
import WorkflowRunActionRepetitions_Get from "./workflowrunactionrepetitionsget";
import WorkflowRunActionRepetitions_ListExpressionTraces from "./workflowrunactionrepetitionslistexpressiontraces";
import WorkflowRunActionRepetitionsRequestHistories_List from "./workflowrunactionrepetitionsrequesthistorieslist";
import WorkflowRunActionRepetitionsRequestHistories_Get from "./workflowrunactionrepetitionsrequesthistoriesget";
import WorkflowRunActionScopeRepetitions_List from "./workflowrunactionscoperepetitionslist";
import WorkflowRunActionScopeRepetitions_Get from "./workflowrunactionscoperepetitionsget";
import WorkflowRuns_Cancel from "./workflowrunscancel";
import WorkflowTriggers_List from "./workflowtriggerslist";
import WorkflowTriggers_Get from "./workflowtriggersget";
import WorkflowTriggerHistories_List from "./workflowtriggerhistorieslist";
import WorkflowTriggerHistories_Get from "./workflowtriggerhistoriesget";
import WorkflowTriggerHistories_Resubmit from "./workflowtriggerhistoriesresubmit";
import WorkflowTriggers_ListCallbackUrl from "./workflowtriggerslistcallbackurl";
import WorkflowTriggers_Run from "./workflowtriggersrun";
import WorkflowTriggers_GetSchemaJson from "./workflowtriggersgetschemajson";
import Workflows_Validate from "./workflowsvalidate";
import WorkflowVersions_List from "./workflowversionslist";
import WorkflowVersions_Get from "./workflowversionsget";
import AppServiceCertificateOrders_List from "./appservicecertificateorderslist";
import AppServiceCertificateOrders_ValidatePurchaseInformation from "./appservicecertificateordersvalidatepurchaseinformation";
import AppServiceCertificateOrders_ListByResourceGroup from "./appservicecertificateorderslistbyresourcegroup";
import AppServiceCertificateOrders_Get from "./appservicecertificateordersget";
import AppServiceCertificateOrders_CreateOrUpdate from "./appservicecertificateorderscreateorupdate";
import AppServiceCertificateOrders_Delete from "./appservicecertificateordersdelete";
import AppServiceCertificateOrders_Update from "./appservicecertificateordersupdate";
import AppServiceCertificateOrders_ListCertificates from "./appservicecertificateorderslistcertificates";
import AppServiceCertificateOrders_GetCertificate from "./appservicecertificateordersgetcertificate";
import AppServiceCertificateOrders_CreateOrUpdateCertificate from "./appservicecertificateorderscreateorupdatecertificate";
import AppServiceCertificateOrders_DeleteCertificate from "./appservicecertificateordersdeletecertificate";
import AppServiceCertificateOrders_UpdateCertificate from "./appservicecertificateordersupdatecertificate";
import AppServiceCertificateOrders_Reissue from "./appservicecertificateordersreissue";
import AppServiceCertificateOrders_Renew from "./appservicecertificateordersrenew";
import AppServiceCertificateOrders_ResendEmail from "./appservicecertificateordersresendemail";
import AppServiceCertificateOrders_ResendRequestEmails from "./appservicecertificateordersresendrequestemails";
import AppServiceCertificateOrders_RetrieveSiteSeal from "./appservicecertificateordersretrievesiteseal";
import AppServiceCertificateOrders_VerifyDomainOwnership from "./appservicecertificateordersverifydomainownership";
import AppServiceCertificateOrders_RetrieveCertificateActions from "./appservicecertificateordersretrievecertificateactions";
import AppServiceCertificateOrders_RetrieveCertificateEmailHistory from "./appservicecertificateordersretrievecertificateemailhistory";
import CertificateOrdersDiagnostics_ListAppServiceCertificateOrderDetectorResponse from "./certificateordersdiagnosticslistappservicecertificateorderdetectorresponse";
import CertificateOrdersDiagnostics_GetAppServiceCertificateOrderDetectorResponse from "./certificateordersdiagnosticsgetappservicecertificateorderdetectorresponse";
import CertificateRegistrationProvider_ListOperations from "./certificateregistrationproviderlistoperations";
import DomainRegistrationProvider_ListOperations from "./domainregistrationproviderlistoperations";
import Domains_CheckAvailability from "./domainscheckavailability";
import Domains_List from "./domainslist";
import Domains_GetControlCenterSsoRequest from "./domainsgetcontrolcenterssorequest";
import Domains_ListRecommendations from "./domainslistrecommendations";
import Domains_ListByResourceGroup from "./domainslistbyresourcegroup";
import Domains_Get from "./domainsget";
import Domains_CreateOrUpdate from "./domainscreateorupdate";
import Domains_Delete from "./domainsdelete";
import Domains_Update from "./domainsupdate";
import Domains_ListOwnershipIdentifiers from "./domainslistownershipidentifiers";
import Domains_GetOwnershipIdentifier from "./domainsgetownershipidentifier";
import Domains_CreateOrUpdateOwnershipIdentifier from "./domainscreateorupdateownershipidentifier";
import Domains_DeleteOwnershipIdentifier from "./domainsdeleteownershipidentifier";
import Domains_UpdateOwnershipIdentifier from "./domainsupdateownershipidentifier";
import Domains_Renew from "./domainsrenew";
import Domains_TransferOut from "./domainstransferout";
import TopLevelDomains_List from "./topleveldomainslist";
import TopLevelDomains_Get from "./topleveldomainsget";
import TopLevelDomains_ListAgreements from "./topleveldomainslistagreements";

export const blocks = {
  AppServiceEnvironments_List,
  AppServiceEnvironments_ListByResourceGroup,
  AppServiceEnvironments_Get,
  AppServiceEnvironments_CreateOrUpdate,
  AppServiceEnvironments_Delete,
  AppServiceEnvironments_Update,
  AppServiceEnvironments_ListCapacities,
  AppServiceEnvironments_GetVipInfo,
  AppServiceEnvironments_ChangeVnet,
  AppServiceEnvironments_GetAseCustomDnsSuffixConfiguration,
  AppServiceEnvironments_UpdateAseCustomDnsSuffixConfiguration,
  AppServiceEnvironments_DeleteAseCustomDnsSuffixConfiguration,
  AppServiceEnvironments_GetAseV3NetworkingConfiguration,
  AppServiceEnvironments_UpdateAseNetworkingConfiguration,
  AppServiceEnvironments_ListDiagnostics,
  AppServiceEnvironments_GetDiagnosticsItem,
  AppServiceEnvironments_GetInboundNetworkDependenciesEndpoints,
  AppServiceEnvironments_ListMultiRolePools,
  AppServiceEnvironments_GetMultiRolePool,
  AppServiceEnvironments_CreateOrUpdateMultiRolePool,
  AppServiceEnvironments_UpdateMultiRolePool,
  AppServiceEnvironments_ListMultiRolePoolInstanceMetricDefinitions,
  AppServiceEnvironments_ListMultiRoleMetricDefinitions,
  AppServiceEnvironments_ListMultiRolePoolSkus,
  AppServiceEnvironments_TestUpgradeAvailableNotification,
  AppServiceEnvironments_Upgrade,
  AppServiceEnvironments_ListMultiRoleUsages,
  AppServiceEnvironments_ListOperations,
  AppServiceEnvironments_GetOutboundNetworkDependenciesEndpoints,
  AppServiceEnvironments_GetPrivateEndpointConnectionList,
  AppServiceEnvironments_GetPrivateEndpointConnection,
  AppServiceEnvironments_ApproveOrRejectPrivateEndpointConnection,
  AppServiceEnvironments_DeletePrivateEndpointConnection,
  AppServiceEnvironments_GetPrivateLinkResources,
  AppServiceEnvironments_Reboot,
  AppServiceEnvironments_Resume,
  AppServiceEnvironments_ListAppServicePlans,
  AppServiceEnvironments_ListWebApps,
  AppServiceEnvironments_Suspend,
  AppServiceEnvironments_ListUsages,
  AppServiceEnvironments_ListWorkerPools,
  AppServiceEnvironments_GetWorkerPool,
  AppServiceEnvironments_CreateOrUpdateWorkerPool,
  AppServiceEnvironments_UpdateWorkerPool,
  AppServiceEnvironments_ListWorkerPoolInstanceMetricDefinitions,
  AppServiceEnvironments_ListWebWorkerMetricDefinitions,
  AppServiceEnvironments_ListWorkerPoolSkus,
  AppServiceEnvironments_ListWebWorkerUsages,
  AppServicePlans_List,
  AppServicePlans_ListByResourceGroup,
  AppServicePlans_Get,
  AppServicePlans_CreateOrUpdate,
  AppServicePlans_Delete,
  AppServicePlans_Update,
  AppServicePlans_ListCapabilities,
  AppServicePlans_GetHybridConnection,
  AppServicePlans_DeleteHybridConnection,
  AppServicePlans_ListHybridConnectionKeys,
  AppServicePlans_ListWebAppsByHybridConnection,
  AppServicePlans_GetHybridConnectionPlanLimit,
  AppServicePlans_ListHybridConnections,
  AppServicePlans_RestartWebApps,
  AppServicePlans_ListWebApps,
  AppServicePlans_GetServerFarmSkus,
  AppServicePlans_ListUsages,
  AppServicePlans_ListVnets,
  AppServicePlans_GetVnetFromServerFarm,
  AppServicePlans_GetVnetGateway,
  AppServicePlans_UpdateVnetGateway,
  AppServicePlans_ListRoutesForVnet,
  AppServicePlans_GetRouteForVnet,
  AppServicePlans_CreateOrUpdateVnetRoute,
  AppServicePlans_DeleteVnetRoute,
  AppServicePlans_UpdateVnetRoute,
  AppServicePlans_RebootWorker,
  Certificates_List,
  Certificates_ListByResourceGroup,
  Certificates_Get,
  Certificates_CreateOrUpdate,
  Certificates_Delete,
  Certificates_Update,
  DeletedWebApps_List,
  DeletedWebApps_ListByLocation,
  DeletedWebApps_GetDeletedWebAppByLocation,
  Diagnostics_ListHostingEnvironmentDetectorResponses,
  Diagnostics_GetHostingEnvironmentDetectorResponse,
  Diagnostics_ListSiteDetectorResponses,
  Diagnostics_GetSiteDetectorResponse,
  Diagnostics_ListSiteDiagnosticCategories,
  Diagnostics_GetSiteDiagnosticCategory,
  Diagnostics_ListSiteAnalyses,
  Diagnostics_GetSiteAnalysis,
  Diagnostics_ExecuteSiteAnalysis,
  Diagnostics_ListSiteDetectors,
  Diagnostics_GetSiteDetector,
  Diagnostics_ExecuteSiteDetector,
  Diagnostics_ListSiteDetectorResponsesSlot,
  Diagnostics_GetSiteDetectorResponseSlot,
  Diagnostics_ListSiteDiagnosticCategoriesSlot,
  Diagnostics_GetSiteDiagnosticCategorySlot,
  Diagnostics_ListSiteAnalysesSlot,
  Diagnostics_GetSiteAnalysisSlot,
  Diagnostics_ExecuteSiteAnalysisSlot,
  Diagnostics_ListSiteDetectorsSlot,
  Diagnostics_GetSiteDetectorSlot,
  Diagnostics_ExecuteSiteDetectorSlot,
  Global_GetDeletedWebApp,
  Global_GetDeletedWebAppSnapshots,
  Global_GetSubscriptionOperationWithAsyncResponse,
  KubeEnvironments_ListBySubscription,
  KubeEnvironments_ListByResourceGroup,
  KubeEnvironments_Get,
  KubeEnvironments_CreateOrUpdate,
  KubeEnvironments_Delete,
  KubeEnvironments_Update,
  Provider_GetAvailableStacks,
  Provider_GetFunctionAppStacks,
  Provider_GetFunctionAppStacksForLocation,
  Provider_GetWebAppStacksForLocation,
  Provider_ListOperations,
  Provider_GetWebAppStacks,
  Provider_GetAvailableStacksOnPrem,
  Recommendations_List,
  Recommendations_ResetAllFilters,
  Recommendations_DisableRecommendationForSubscription,
  Recommendations_ListHistoryForHostingEnvironment,
  Recommendations_ListRecommendedRulesForHostingEnvironment,
  Recommendations_DisableAllForHostingEnvironment,
  Recommendations_ResetAllFiltersForHostingEnvironment,
  Recommendations_GetRuleDetailsByHostingEnvironment,
  Recommendations_DisableRecommendationForHostingEnvironment,
  Recommendations_ListHistoryForWebApp,
  Recommendations_ListRecommendedRulesForWebApp,
  Recommendations_DisableAllForWebApp,
  Recommendations_ResetAllFiltersForWebApp,
  Recommendations_GetRuleDetailsByWebApp,
  Recommendations_DisableRecommendationForSite,
  ResourceHealthMetadata_List,
  ResourceHealthMetadata_ListByResourceGroup,
  ResourceHealthMetadata_ListBySite,
  ResourceHealthMetadata_GetBySite,
  ResourceHealthMetadata_ListBySiteSlot,
  ResourceHealthMetadata_GetBySiteSlot,
  GetPublishingUser,
  UpdatePublishingUser,
  ListSourceControls,
  GetSourceControl,
  UpdateSourceControl,
  ListBillingMeters,
  CheckNameAvailability,
  ListCustomHostNameSites,
  GetSubscriptionDeploymentLocations,
  ListAseRegions,
  ListGeoRegions,
  ListSiteIdentifiersAssignedToHostName,
  RegionalCheckNameAvailability,
  ListPremierAddOnOffers,
  ListSkus,
  GetUsagesInLocation_list,
  VerifyHostingEnvironmentVnet,
  Move,
  Validate,
  ValidateMove,
  SiteCertificates_List,
  SiteCertificates_Get,
  SiteCertificates_CreateOrUpdate,
  SiteCertificates_Delete,
  SiteCertificates_Update,
  SiteCertificates_ListSlot,
  SiteCertificates_GetSlot,
  SiteCertificates_CreateOrUpdateSlot,
  SiteCertificates_DeleteSlot,
  SiteCertificates_UpdateSlot,
  StaticSites_PreviewWorkflow,
  StaticSites_List,
  StaticSites_GetStaticSitesByResourceGroup,
  StaticSites_GetStaticSite,
  StaticSites_CreateOrUpdateStaticSite,
  StaticSites_DeleteStaticSite,
  StaticSites_UpdateStaticSite,
  StaticSites_ListStaticSiteUsers,
  StaticSites_DeleteStaticSiteUser,
  StaticSites_UpdateStaticSiteUser,
  StaticSites_GetStaticSiteBuilds,
  StaticSites_GetStaticSiteBuild,
  StaticSites_DeleteStaticSiteBuild,
  StaticSites_CreateOrUpdateStaticSiteBuildAppSettings,
  StaticSites_CreateOrUpdateStaticSiteBuildFunctionAppSettings,
  StaticSites_GetBuildDatabaseConnections,
  StaticSites_GetBuildDatabaseConnection,
  StaticSites_CreateOrUpdateBuildDatabaseConnection,
  StaticSites_DeleteBuildDatabaseConnection,
  StaticSites_UpdateBuildDatabaseConnection,
  StaticSites_GetBuildDatabaseConnectionWithDetails,
  StaticSites_ListStaticSiteBuildFunctions,
  StaticSites_ListStaticSiteBuildAppSettings,
  StaticSites_ListStaticSiteBuildFunctionAppSettings,
  StaticSites_GetBuildDatabaseConnectionsWithDetails,
  StaticSites_GetUserProvidedFunctionAppsForStaticSiteBuild,
  StaticSites_GetUserProvidedFunctionAppForStaticSiteBuild,
  StaticSites_RegisterUserProvidedFunctionAppWithStaticSiteBuild,
  StaticSites_DetachUserProvidedFunctionAppFromStaticSiteBuild,
  StaticSites_CreateZipDeploymentForStaticSiteBuild,
  StaticSites_CreateOrUpdateStaticSiteAppSettings,
  StaticSites_ListBasicAuth,
  StaticSites_GetBasicAuth,
  StaticSites_CreateOrUpdateBasicAuth,
  StaticSites_CreateOrUpdateStaticSiteFunctionAppSettings,
  StaticSites_CreateUserRolesInvitationLink,
  StaticSites_ListStaticSiteCustomDomains,
  StaticSites_GetStaticSiteCustomDomain,
  StaticSites_CreateOrUpdateStaticSiteCustomDomain,
  StaticSites_DeleteStaticSiteCustomDomain,
  StaticSites_ValidateCustomDomainCanBeAddedToStaticSite,
  StaticSites_GetDatabaseConnections,
  StaticSites_GetDatabaseConnection,
  StaticSites_CreateOrUpdateDatabaseConnection,
  StaticSites_DeleteDatabaseConnection,
  StaticSites_UpdateDatabaseConnection,
  StaticSites_GetDatabaseConnectionWithDetails,
  StaticSites_DetachStaticSite,
  StaticSites_ListStaticSiteFunctions,
  StaticSites_ListStaticSiteAppSettings,
  StaticSites_ListStaticSiteConfiguredRoles,
  StaticSites_ListStaticSiteFunctionAppSettings,
  StaticSites_ListStaticSiteSecrets,
  StaticSites_GetPrivateEndpointConnectionList,
  StaticSites_GetPrivateEndpointConnection,
  StaticSites_ApproveOrRejectPrivateEndpointConnection,
  StaticSites_DeletePrivateEndpointConnection,
  StaticSites_GetPrivateLinkResources,
  StaticSites_ResetStaticSiteApiKey,
  StaticSites_GetDatabaseConnectionsWithDetails,
  StaticSites_GetUserProvidedFunctionAppsForStaticSite,
  StaticSites_GetUserProvidedFunctionAppForStaticSite,
  StaticSites_RegisterUserProvidedFunctionAppWithStaticSite,
  StaticSites_DetachUserProvidedFunctionAppFromStaticSite,
  StaticSites_CreateZipDeploymentForStaticSite,
  StaticSites_ValidateBackend,
  StaticSites_ValidateBackendForBuild,
  StaticSites_GetLinkedBackends,
  StaticSites_GetLinkedBackendsForBuild,
  StaticSites_GetLinkedBackend,
  StaticSites_LinkBackend,
  StaticSites_UnlinkBackend,
  StaticSites_GetLinkedBackendForBuild,
  StaticSites_LinkBackendToBuild,
  StaticSites_UnlinkBackendFromBuild,
  WebApps_List,
  WebApps_ListByResourceGroup,
  WebApps_Get,
  WebApps_CreateOrUpdate,
  WebApps_Delete,
  WebApps_Update,
  WebApps_AnalyzeCustomHostname,
  WebApps_ApplySlotConfigToProduction,
  WebApps_Backup,
  WebApps_ListBackups,
  WebApps_GetBackupStatus,
  WebApps_DeleteBackup,
  WebApps_ListBackupStatusSecrets,
  WebApps_Restore,
  WebApps_ListBasicPublishingCredentialsPolicies,
  WebApps_GetFtpAllowed,
  WebApps_UpdateFtpAllowed,
  WebApps_GetScmAllowed,
  WebApps_UpdateScmAllowed,
  WebApps_ListConfigurations,
  WebApps_UpdateApplicationSettings,
  WebApps_ListApplicationSettings,
  WebApps_UpdateAuthSettings,
  WebApps_GetAuthSettings,
  WebApps_GetAuthSettingsV2WithoutSecrets,
  WebApps_UpdateAuthSettingsV2,
  WebApps_GetAuthSettingsV2,
  WebApps_UpdateAzureStorageAccounts,
  WebApps_ListAzureStorageAccounts,
  WebApps_UpdateBackupConfiguration,
  WebApps_DeleteBackupConfiguration,
  WebApps_GetBackupConfiguration,
  WebApps_GetAppSettingsKeyVaultReferences,
  WebApps_GetAppSettingKeyVaultReference,
  WebApps_GetSiteConnectionStringKeyVaultReferences,
  WebApps_GetSiteConnectionStringKeyVaultReference,
  WebApps_UpdateConnectionStrings,
  WebApps_ListConnectionStrings,
  WebApps_GetDiagnosticLogsConfiguration,
  WebApps_UpdateDiagnosticLogsConfig,
  WebApps_UpdateMetadata,
  WebApps_ListMetadata,
  WebApps_ListPublishingCredentials,
  WebApps_UpdateSitePushSettings,
  WebApps_ListSitePushSettings,
  WebApps_ListSlotConfigurationNames,
  WebApps_UpdateSlotConfigurationNames,
  WebApps_GetConfiguration,
  WebApps_CreateOrUpdateConfiguration,
  WebApps_UpdateConfiguration,
  WebApps_ListConfigurationSnapshotInfo,
  WebApps_GetConfigurationSnapshot,
  WebApps_RecoverSiteConfigurationSnapshot,
  WebApps_GetWebSiteContainerLogs,
  WebApps_GetContainerLogsZip,
  WebApps_ListContinuousWebJobs,
  WebApps_GetContinuousWebJob,
  WebApps_DeleteContinuousWebJob,
  WebApps_StartContinuousWebJob,
  WebApps_StopContinuousWebJob,
  WebApps_ListProductionSiteDeploymentStatuses,
  WebApps_GetProductionSiteDeploymentStatus,
  WebApps_ListDeployments,
  WebApps_GetDeployment,
  WebApps_CreateDeployment,
  WebApps_DeleteDeployment,
  WebApps_ListDeploymentLog,
  WebApps_DiscoverBackup,
  WebApps_ListDomainOwnershipIdentifiers,
  WebApps_GetDomainOwnershipIdentifier,
  WebApps_CreateOrUpdateDomainOwnershipIdentifier,
  WebApps_DeleteDomainOwnershipIdentifier,
  WebApps_UpdateDomainOwnershipIdentifier,
  WebApps_GetMSDeployStatus,
  WebApps_CreateMSDeployOperation,
  WebApps_GetMSDeployLog,
  WebApps_GetOneDeployStatus,
  WebApps_CreateOneDeployOperation,
  WebApps_ListFunctions,
  WebApps_GetFunctionsAdminToken,
  WebApps_GetFunction,
  WebApps_CreateFunction,
  WebApps_DeleteFunction,
  WebApps_CreateOrUpdateFunctionSecret,
  WebApps_DeleteFunctionSecret,
  WebApps_ListFunctionKeys,
  WebApps_ListFunctionSecrets,
  WebApps_ListHostKeys,
  WebApps_ListSyncStatus,
  WebApps_SyncFunctions,
  WebApps_CreateOrUpdateHostSecret,
  WebApps_DeleteHostSecret,
  WebApps_ListHostNameBindings,
  WebApps_GetHostNameBinding,
  WebApps_CreateOrUpdateHostNameBinding,
  WebApps_DeleteHostNameBinding,
  WebApps_GetHybridConnection,
  WebApps_CreateOrUpdateHybridConnection,
  WebApps_DeleteHybridConnection,
  WebApps_UpdateHybridConnection,
  WebApps_ListHybridConnections,
  WebApps_ListRelayServiceConnections,
  WebApps_GetRelayServiceConnection,
  WebApps_CreateOrUpdateRelayServiceConnection,
  WebApps_DeleteRelayServiceConnection,
  WebApps_UpdateRelayServiceConnection,
  WebApps_ListInstanceIdentifiers,
  WebApps_GetInstanceInfo,
  WebApps_GetInstanceMsDeployStatus,
  WebApps_CreateInstanceMSDeployOperation,
  WebApps_GetInstanceMSDeployLog,
  WebApps_ListInstanceProcesses,
  WebApps_GetInstanceProcess,
  WebApps_DeleteInstanceProcess,
  WebApps_GetInstanceProcessDump,
  WebApps_ListInstanceProcessModules,
  WebApps_GetInstanceProcessModule,
  WebApps_ListInstanceProcessThreads,
  WebApps_IsCloneable,
  WebApps_ListSiteBackups,
  WebApps_ListSyncFunctionTriggers,
  WebApps_UpdateMachineKey,
  WebApps_MigrateStorage,
  WebApps_MigrateMySql,
  WebApps_GetMigrateMySqlStatus,
  WebApps_GetSwiftVirtualNetworkConnection,
  WebApps_CreateOrUpdateSwiftVirtualNetworkConnectionWithCheck,
  WebApps_DeleteSwiftVirtualNetwork,
  WebApps_UpdateSwiftVirtualNetworkConnectionWithCheck,
  WebApps_ListNetworkFeatures,
  WebApps_GetNetworkTraceOperation,
  WebApps_StartWebSiteNetworkTrace,
  WebApps_StartWebSiteNetworkTraceOperation,
  WebApps_StopWebSiteNetworkTrace,
  WebApps_GetNetworkTraces,
  WebApps_GetNetworkTraceOperationV2,
  WebApps_GetNetworkTracesV2,
  WebApps_GenerateNewSitePublishingPassword,
  WebApps_ListPerfMonCounters,
  WebApps_GetSitePhpErrorLogFlag,
  WebApps_ListPremierAddOns,
  WebApps_GetPremierAddOn,
  WebApps_AddPremierAddOn,
  WebApps_DeletePremierAddOn,
  WebApps_UpdatePremierAddOn,
  WebApps_GetPrivateAccess,
  WebApps_PutPrivateAccessVnet,
  WebApps_GetPrivateEndpointConnectionList,
  WebApps_GetPrivateEndpointConnection,
  WebApps_ApproveOrRejectPrivateEndpointConnection,
  WebApps_DeletePrivateEndpointConnection,
  WebApps_GetPrivateLinkResources,
  WebApps_ListProcesses,
  WebApps_GetProcess,
  WebApps_DeleteProcess,
  WebApps_GetProcessDump,
  WebApps_ListProcessModules,
  WebApps_GetProcessModule,
  WebApps_ListProcessThreads,
  WebApps_ListPublicCertificates,
  WebApps_GetPublicCertificate,
  WebApps_CreateOrUpdatePublicCertificate,
  WebApps_DeletePublicCertificate,
  WebApps_ListPublishingProfileXmlWithSecrets,
  WebApps_ResetProductionSlotConfig,
  WebApps_Restart,
  WebApps_RestoreFromBackupBlob,
  WebApps_RestoreFromDeletedApp,
  WebApps_RestoreSnapshot,
  WebApps_ListSiteContainers,
  WebApps_GetSiteContainer,
  WebApps_CreateOrUpdateSiteContainer,
  WebApps_DeleteSiteContainer,
  WebApps_ListSiteExtensions,
  WebApps_GetSiteExtension,
  WebApps_InstallSiteExtension,
  WebApps_DeleteSiteExtension,
  WebApps_ListSlots,
  WebApps_GetSlot,
  WebApps_CreateOrUpdateSlot,
  WebApps_DeleteSlot,
  WebApps_UpdateSlot,
  WebApps_AnalyzeCustomHostnameSlot,
  WebApps_ApplySlotConfigurationSlot,
  WebApps_BackupSlot,
  WebApps_ListBackupsSlot,
  WebApps_GetBackupStatusSlot,
  WebApps_DeleteBackupSlot,
  WebApps_ListBackupStatusSecretsSlot,
  WebApps_RestoreSlot,
  WebApps_ListBasicPublishingCredentialsPoliciesSlot,
  WebApps_GetFtpAllowedSlot,
  WebApps_UpdateFtpAllowedSlot,
  WebApps_GetScmAllowedSlot,
  WebApps_UpdateScmAllowedSlot,
  WebApps_ListConfigurationsSlot,
  WebApps_UpdateApplicationSettingsSlot,
  WebApps_ListApplicationSettingsSlot,
  WebApps_UpdateAuthSettingsSlot,
  WebApps_GetAuthSettingsSlot,
  WebApps_GetAuthSettingsV2WithoutSecretsSlot,
  WebApps_UpdateAuthSettingsV2Slot,
  WebApps_GetAuthSettingsV2Slot,
  WebApps_UpdateAzureStorageAccountsSlot,
  WebApps_ListAzureStorageAccountsSlot,
  WebApps_UpdateBackupConfigurationSlot,
  WebApps_DeleteBackupConfigurationSlot,
  WebApps_GetBackupConfigurationSlot,
  WebApps_GetAppSettingsKeyVaultReferencesSlot,
  WebApps_GetAppSettingKeyVaultReferenceSlot,
  WebApps_GetSiteConnectionStringKeyVaultReferencesSlot,
  WebApps_GetSiteConnectionStringKeyVaultReferenceSlot,
  WebApps_UpdateConnectionStringsSlot,
  WebApps_ListConnectionStringsSlot,
  WebApps_GetDiagnosticLogsConfigurationSlot,
  WebApps_UpdateDiagnosticLogsConfigSlot,
  WebApps_UpdateMetadataSlot,
  WebApps_ListMetadataSlot,
  WebApps_ListPublishingCredentialsSlot,
  WebApps_UpdateSitePushSettingsSlot,
  WebApps_ListSitePushSettingsSlot,
  WebApps_GetConfigurationSlot,
  WebApps_CreateOrUpdateConfigurationSlot,
  WebApps_UpdateConfigurationSlot,
  WebApps_ListConfigurationSnapshotInfoSlot,
  WebApps_GetConfigurationSnapshotSlot,
  WebApps_RecoverSiteConfigurationSnapshotSlot,
  WebApps_GetWebSiteContainerLogsSlot,
  WebApps_GetContainerLogsZipSlot,
  WebApps_ListContinuousWebJobsSlot,
  WebApps_GetContinuousWebJobSlot,
  WebApps_DeleteContinuousWebJobSlot,
  WebApps_StartContinuousWebJobSlot,
  WebApps_StopContinuousWebJobSlot,
  WebApps_ListSlotSiteDeploymentStatusesSlot,
  WebApps_GetSlotSiteDeploymentStatusSlot,
  WebApps_ListDeploymentsSlot,
  WebApps_GetDeploymentSlot,
  WebApps_CreateDeploymentSlot,
  WebApps_DeleteDeploymentSlot,
  WebApps_ListDeploymentLogSlot,
  WebApps_DiscoverBackupSlot,
  WebApps_ListDomainOwnershipIdentifiersSlot,
  WebApps_GetDomainOwnershipIdentifierSlot,
  WebApps_CreateOrUpdateDomainOwnershipIdentifierSlot,
  WebApps_DeleteDomainOwnershipIdentifierSlot,
  WebApps_UpdateDomainOwnershipIdentifierSlot,
  WebApps_GetMSDeployStatusSlot,
  WebApps_CreateMSDeployOperationSlot,
  WebApps_GetMSDeployLogSlot,
  WebApps_ListInstanceFunctionsSlot,
  WebApps_GetFunctionsAdminTokenSlot,
  WebApps_GetInstanceFunctionSlot,
  WebApps_CreateInstanceFunctionSlot,
  WebApps_DeleteInstanceFunctionSlot,
  WebApps_CreateOrUpdateFunctionSecretSlot,
  WebApps_DeleteFunctionSecretSlot,
  WebApps_ListFunctionKeysSlot,
  WebApps_ListFunctionSecretsSlot,
  WebApps_ListHostKeysSlot,
  WebApps_ListSyncStatusSlot,
  WebApps_SyncFunctionsSlot,
  WebApps_CreateOrUpdateHostSecretSlot,
  WebApps_DeleteHostSecretSlot,
  WebApps_ListHostNameBindingsSlot,
  WebApps_GetHostNameBindingSlot,
  WebApps_CreateOrUpdateHostNameBindingSlot,
  WebApps_DeleteHostNameBindingSlot,
  WebApps_GetHybridConnectionSlot,
  WebApps_CreateOrUpdateHybridConnectionSlot,
  WebApps_DeleteHybridConnectionSlot,
  WebApps_UpdateHybridConnectionSlot,
  WebApps_ListHybridConnectionsSlot,
  WebApps_ListRelayServiceConnectionsSlot,
  WebApps_GetRelayServiceConnectionSlot,
  WebApps_CreateOrUpdateRelayServiceConnectionSlot,
  WebApps_DeleteRelayServiceConnectionSlot,
  WebApps_UpdateRelayServiceConnectionSlot,
  WebApps_ListInstanceIdentifiersSlot,
  WebApps_GetInstanceInfoSlot,
  WebApps_GetInstanceMsDeployStatusSlot,
  WebApps_CreateInstanceMSDeployOperationSlot,
  WebApps_GetInstanceMSDeployLogSlot,
  WebApps_ListInstanceProcessesSlot,
  WebApps_GetInstanceProcessSlot,
  WebApps_DeleteInstanceProcessSlot,
  WebApps_GetInstanceProcessDumpSlot,
  WebApps_ListInstanceProcessModulesSlot,
  WebApps_GetInstanceProcessModuleSlot,
  WebApps_ListInstanceProcessThreadsSlot,
  WebApps_IsCloneableSlot,
  WebApps_ListSiteBackupsSlot,
  WebApps_ListSyncFunctionTriggersSlot,
  WebApps_GetMigrateMySqlStatusSlot,
  WebApps_GetSwiftVirtualNetworkConnectionSlot,
  WebApps_CreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlot,
  WebApps_DeleteSwiftVirtualNetworkSlot,
  WebApps_UpdateSwiftVirtualNetworkConnectionWithCheckSlot,
  WebApps_ListNetworkFeaturesSlot,
  WebApps_GetNetworkTraceOperationSlot,
  WebApps_StartWebSiteNetworkTraceSlot,
  WebApps_StartWebSiteNetworkTraceOperationSlot,
  WebApps_StopWebSiteNetworkTraceSlot,
  WebApps_GetNetworkTracesSlot,
  WebApps_GetNetworkTraceOperationSlotV2,
  WebApps_GetNetworkTracesSlotV2,
  WebApps_GenerateNewSitePublishingPasswordSlot,
  WebApps_ListPerfMonCountersSlot,
  WebApps_GetSitePhpErrorLogFlagSlot,
  WebApps_ListPremierAddOnsSlot,
  WebApps_GetPremierAddOnSlot,
  WebApps_AddPremierAddOnSlot,
  WebApps_DeletePremierAddOnSlot,
  WebApps_UpdatePremierAddOnSlot,
  WebApps_GetPrivateAccessSlot,
  WebApps_PutPrivateAccessVnetSlot,
  WebApps_GetPrivateEndpointConnectionListSlot,
  WebApps_GetPrivateEndpointConnectionSlot,
  WebApps_ApproveOrRejectPrivateEndpointConnectionSlot,
  WebApps_DeletePrivateEndpointConnectionSlot,
  WebApps_GetPrivateLinkResourcesSlot,
  WebApps_ListProcessesSlot,
  WebApps_GetProcessSlot,
  WebApps_DeleteProcessSlot,
  WebApps_GetProcessDumpSlot,
  WebApps_ListProcessModulesSlot,
  WebApps_GetProcessModuleSlot,
  WebApps_ListProcessThreadsSlot,
  WebApps_ListPublicCertificatesSlot,
  WebApps_GetPublicCertificateSlot,
  WebApps_CreateOrUpdatePublicCertificateSlot,
  WebApps_DeletePublicCertificateSlot,
  WebApps_ListPublishingProfileXmlWithSecretsSlot,
  WebApps_ResetSlotConfigurationSlot,
  WebApps_RestartSlot,
  WebApps_RestoreFromBackupBlobSlot,
  WebApps_RestoreFromDeletedAppSlot,
  WebApps_RestoreSnapshotSlot,
  WebApps_ListSiteContainersSlot,
  WebApps_GetSiteContainerSlot,
  WebApps_CreateOrUpdateSiteContainerSlot,
  WebApps_DeleteSiteContainerSlot,
  WebApps_ListSiteExtensionsSlot,
  WebApps_GetSiteExtensionSlot,
  WebApps_InstallSiteExtensionSlot,
  WebApps_DeleteSiteExtensionSlot,
  WebApps_ListSlotDifferencesSlot,
  WebApps_SwapSlotSlot,
  WebApps_ListSnapshotsSlot,
  WebApps_ListSnapshotsFromDRSecondarySlot,
  WebApps_GetSourceControlSlot,
  WebApps_CreateOrUpdateSourceControlSlot,
  WebApps_DeleteSourceControlSlot,
  WebApps_UpdateSourceControlSlot,
  WebApps_StartSlot,
  WebApps_StartNetworkTraceSlot,
  WebApps_StopSlot,
  WebApps_StopNetworkTraceSlot,
  WebApps_SyncRepositorySlot,
  WebApps_SyncFunctionTriggersSlot,
  WebApps_ListTriggeredWebJobsSlot,
  WebApps_GetTriggeredWebJobSlot,
  WebApps_DeleteTriggeredWebJobSlot,
  WebApps_ListTriggeredWebJobHistorySlot,
  WebApps_GetTriggeredWebJobHistorySlot,
  WebApps_RunTriggeredWebJobSlot,
  WebApps_ListUsagesSlot,
  WebApps_ListVnetConnectionsSlot,
  WebApps_GetVnetConnectionSlot,
  WebApps_CreateOrUpdateVnetConnectionSlot,
  WebApps_DeleteVnetConnectionSlot,
  WebApps_UpdateVnetConnectionSlot,
  WebApps_GetVnetConnectionGatewaySlot,
  WebApps_CreateOrUpdateVnetConnectionGatewaySlot,
  WebApps_UpdateVnetConnectionGatewaySlot,
  WebApps_ListWebJobsSlot,
  WebApps_GetWebJobSlot,
  WebApps_ListSlotDifferencesFromProduction,
  WebApps_SwapSlotWithProduction,
  WebApps_ListSnapshots,
  WebApps_ListSnapshotsFromDRSecondary,
  WebApps_GetSourceControl,
  WebApps_CreateOrUpdateSourceControl,
  WebApps_DeleteSourceControl,
  WebApps_UpdateSourceControl,
  WebApps_Start,
  WebApps_StartNetworkTrace,
  WebApps_Stop,
  WebApps_StopNetworkTrace,
  WebApps_SyncRepository,
  WebApps_SyncFunctionTriggers,
  WebApps_ListTriggeredWebJobs,
  WebApps_GetTriggeredWebJob,
  WebApps_DeleteTriggeredWebJob,
  WebApps_ListTriggeredWebJobHistory,
  WebApps_GetTriggeredWebJobHistory,
  WebApps_RunTriggeredWebJob,
  WebApps_ListUsages,
  WebApps_ListVnetConnections,
  WebApps_GetVnetConnection,
  WebApps_CreateOrUpdateVnetConnection,
  WebApps_DeleteVnetConnection,
  WebApps_UpdateVnetConnection,
  WebApps_GetVnetConnectionGateway,
  WebApps_CreateOrUpdateVnetConnectionGateway,
  WebApps_UpdateVnetConnectionGateway,
  WebApps_ListWebJobs,
  WebApps_GetWebJob,
  WebApps_DeployWorkflowArtifacts,
  WebApps_DeployWorkflowArtifactsSlot,
  WebApps_ListInstanceWorkflowsSlot,
  WebApps_GetInstanceWorkflowSlot,
  WebApps_ListWorkflowsConnectionsSlot,
  WebApps_ListWorkflows,
  WebApps_GetWorkflow,
  WebApps_ListWorkflowsConnections,
  Workflows_RegenerateAccessKey,
  WorkflowRuns_List,
  WorkflowRuns_Get,
  WorkflowRunActions_List,
  WorkflowRunActions_Get,
  WorkflowRunActions_ListExpressionTraces,
  WorkflowRunActionRepetitions_List,
  WorkflowRunActionRepetitions_Get,
  WorkflowRunActionRepetitions_ListExpressionTraces,
  WorkflowRunActionRepetitionsRequestHistories_List,
  WorkflowRunActionRepetitionsRequestHistories_Get,
  WorkflowRunActionScopeRepetitions_List,
  WorkflowRunActionScopeRepetitions_Get,
  WorkflowRuns_Cancel,
  WorkflowTriggers_List,
  WorkflowTriggers_Get,
  WorkflowTriggerHistories_List,
  WorkflowTriggerHistories_Get,
  WorkflowTriggerHistories_Resubmit,
  WorkflowTriggers_ListCallbackUrl,
  WorkflowTriggers_Run,
  WorkflowTriggers_GetSchemaJson,
  Workflows_Validate,
  WorkflowVersions_List,
  WorkflowVersions_Get,
  AppServiceCertificateOrders_List,
  AppServiceCertificateOrders_ValidatePurchaseInformation,
  AppServiceCertificateOrders_ListByResourceGroup,
  AppServiceCertificateOrders_Get,
  AppServiceCertificateOrders_CreateOrUpdate,
  AppServiceCertificateOrders_Delete,
  AppServiceCertificateOrders_Update,
  AppServiceCertificateOrders_ListCertificates,
  AppServiceCertificateOrders_GetCertificate,
  AppServiceCertificateOrders_CreateOrUpdateCertificate,
  AppServiceCertificateOrders_DeleteCertificate,
  AppServiceCertificateOrders_UpdateCertificate,
  AppServiceCertificateOrders_Reissue,
  AppServiceCertificateOrders_Renew,
  AppServiceCertificateOrders_ResendEmail,
  AppServiceCertificateOrders_ResendRequestEmails,
  AppServiceCertificateOrders_RetrieveSiteSeal,
  AppServiceCertificateOrders_VerifyDomainOwnership,
  AppServiceCertificateOrders_RetrieveCertificateActions,
  AppServiceCertificateOrders_RetrieveCertificateEmailHistory,
  CertificateOrdersDiagnostics_ListAppServiceCertificateOrderDetectorResponse,
  CertificateOrdersDiagnostics_GetAppServiceCertificateOrderDetectorResponse,
  CertificateRegistrationProvider_ListOperations,
  DomainRegistrationProvider_ListOperations,
  Domains_CheckAvailability,
  Domains_List,
  Domains_GetControlCenterSsoRequest,
  Domains_ListRecommendations,
  Domains_ListByResourceGroup,
  Domains_Get,
  Domains_CreateOrUpdate,
  Domains_Delete,
  Domains_Update,
  Domains_ListOwnershipIdentifiers,
  Domains_GetOwnershipIdentifier,
  Domains_CreateOrUpdateOwnershipIdentifier,
  Domains_DeleteOwnershipIdentifier,
  Domains_UpdateOwnershipIdentifier,
  Domains_Renew,
  Domains_TransferOut,
  TopLevelDomains_List,
  TopLevelDomains_Get,
  TopLevelDomains_ListAgreements,
};
