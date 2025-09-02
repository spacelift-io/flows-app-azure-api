import ContainerRegistry_CheckDockerV2Support from "./containerregistrycheckdockerv2support";
import ContainerRegistry_GetManifest from "./containerregistrygetmanifest";
import ContainerRegistry_CreateManifest from "./containerregistrycreatemanifest";
import ContainerRegistry_DeleteManifest from "./containerregistrydeletemanifest";
import ContainerRegistryBlob_GetBlob from "./containerregistryblobgetblob";
import ContainerRegistryBlob_CheckBlobExists from "./containerregistryblobcheckblobexists";
import ContainerRegistryBlob_DeleteBlob from "./containerregistryblobdeleteblob";
import ContainerRegistryBlob_MountBlob from "./containerregistryblobmountblob";
import ContainerRegistryBlob_GetUploadStatus from "./containerregistryblobgetuploadstatus";
import ContainerRegistryBlob_UploadChunk from "./containerregistryblobuploadchunk";
import ContainerRegistryBlob_CompleteUpload from "./containerregistryblobcompleteupload";
import ContainerRegistryBlob_CancelUpload from "./containerregistryblobcancelupload";
import ContainerRegistry_GetRepositories from "./containerregistrygetrepositories";
import ContainerRegistry_GetProperties from "./containerregistrygetproperties";
import ContainerRegistry_DeleteRepository from "./containerregistrydeleterepository";
import ContainerRegistry_UpdateProperties from "./containerregistryupdateproperties";
import ContainerRegistry_GetTags from "./containerregistrygettags";
import ContainerRegistry_GetTagProperties from "./containerregistrygettagproperties";
import ContainerRegistry_UpdateTagAttributes from "./containerregistryupdatetagattributes";
import ContainerRegistry_DeleteTag from "./containerregistrydeletetag";
import ContainerRegistry_GetManifests from "./containerregistrygetmanifests";
import ContainerRegistry_GetManifestProperties from "./containerregistrygetmanifestproperties";
import ContainerRegistry_UpdateManifestProperties from "./containerregistryupdatemanifestproperties";
import Authentication_ExchangeAadAccessTokenForAcrRefreshToken from "./authenticationexchangeaadaccesstokenforacrrefreshtoken";
import Authentication_ExchangeAcrRefreshTokenForAcrAccessToken from "./authenticationexchangeacrrefreshtokenforacraccesstoken";
import Authentication_GetAcrAccessTokenFromLogin from "./authenticationgetacraccesstokenfromlogin";

export const blocks = {
  ContainerRegistry_CheckDockerV2Support,
  ContainerRegistry_GetManifest,
  ContainerRegistry_CreateManifest,
  ContainerRegistry_DeleteManifest,
  ContainerRegistryBlob_GetBlob,
  ContainerRegistryBlob_CheckBlobExists,
  ContainerRegistryBlob_DeleteBlob,
  ContainerRegistryBlob_MountBlob,
  ContainerRegistryBlob_GetUploadStatus,
  ContainerRegistryBlob_UploadChunk,
  ContainerRegistryBlob_CompleteUpload,
  ContainerRegistryBlob_CancelUpload,
  ContainerRegistry_GetRepositories,
  ContainerRegistry_GetProperties,
  ContainerRegistry_DeleteRepository,
  ContainerRegistry_UpdateProperties,
  ContainerRegistry_GetTags,
  ContainerRegistry_GetTagProperties,
  ContainerRegistry_UpdateTagAttributes,
  ContainerRegistry_DeleteTag,
  ContainerRegistry_GetManifests,
  ContainerRegistry_GetManifestProperties,
  ContainerRegistry_UpdateManifestProperties,
  Authentication_ExchangeAadAccessTokenForAcrRefreshToken,
  Authentication_ExchangeAcrRefreshTokenForAcrAccessToken,
  Authentication_GetAcrAccessTokenFromLogin,
};
