import Service_SetProperties from "./servicesetproperties";
import Service_GetProperties from "./servicegetproperties";
import Service_GetStatistics from "./servicegetstatistics";
import Service_ListContainersSegment from "./servicelistcontainerssegment";
import Service_GetUserDelegationKey from "./servicegetuserdelegationkey";
import Service_GetAccountInfo from "./servicegetaccountinfo";
import Service_SubmitBatch from "./servicesubmitbatch";
import Service_FilterBlobs from "./servicefilterblobs";
import Container_Create from "./containercreate";
import Container_GetProperties from "./containergetproperties";
import Container_Delete from "./containerdelete";
import Container_SetMetadata from "./containersetmetadata";
import Container_GetAccessPolicy from "./containergetaccesspolicy";
import Container_SetAccessPolicy from "./containersetaccesspolicy";
import Container_Restore from "./containerrestore";
import Container_Rename from "./containerrename";
import Container_SubmitBatch from "./containersubmitbatch";
import Container_FilterBlobs from "./containerfilterblobs";
import Container_AcquireLease from "./containeracquirelease";
import Container_ReleaseLease from "./containerreleaselease";
import Container_RenewLease from "./containerrenewlease";
import Container_BreakLease from "./containerbreaklease";
import Container_ChangeLease from "./containerchangelease";
import Container_ListBlobFlatSegment from "./containerlistblobflatsegment";
import Container_ListBlobHierarchySegment from "./containerlistblobhierarchysegment";
import Container_GetAccountInfo from "./containergetaccountinfo";
import Blob_Download from "./blobdownload";
import Blob_GetProperties from "./blobgetproperties";
import Blob_Delete from "./blobdelete";
import PageBlob_Create from "./pageblobcreate";
import AppendBlob_Create from "./appendblobcreate";
import BlockBlob_Upload from "./blockblobupload";
import BlockBlob_PutBlobFromUrl from "./blockblobputblobfromurl";
import Blob_Undelete from "./blobundelete";
import Blob_SetExpiry from "./blobsetexpiry";
import Blob_SetHTTPHeaders from "./blobsethttpheaders";
import Blob_SetImmutabilityPolicy from "./blobsetimmutabilitypolicy";
import Blob_DeleteImmutabilityPolicy from "./blobdeleteimmutabilitypolicy";
import Blob_SetLegalHold from "./blobsetlegalhold";
import Blob_SetMetadata from "./blobsetmetadata";
import Blob_AcquireLease from "./blobacquirelease";
import Blob_ReleaseLease from "./blobreleaselease";
import Blob_RenewLease from "./blobrenewlease";
import Blob_ChangeLease from "./blobchangelease";
import Blob_BreakLease from "./blobbreaklease";
import Blob_CreateSnapshot from "./blobcreatesnapshot";
import Blob_StartCopyFromURL from "./blobstartcopyfromurl";
import Blob_CopyFromURL from "./blobcopyfromurl";
import Blob_AbortCopyFromURL from "./blobabortcopyfromurl";
import Blob_SetTier from "./blobsettier";
import Blob_GetAccountInfo from "./blobgetaccountinfo";
import BlockBlob_StageBlock from "./blockblobstageblock";
import BlockBlob_StageBlockFromURL from "./blockblobstageblockfromurl";
import BlockBlob_CommitBlockList from "./blockblobcommitblocklist";
import BlockBlob_GetBlockList from "./blockblobgetblocklist";
import PageBlob_UploadPages from "./pageblobuploadpages";
import PageBlob_ClearPages from "./pageblobclearpages";
import PageBlob_UploadPagesFromURL from "./pageblobuploadpagesfromurl";
import PageBlob_GetPageRanges from "./pageblobgetpageranges";
import PageBlob_GetPageRangesDiff from "./pageblobgetpagerangesdiff";
import PageBlob_Resize from "./pageblobresize";
import PageBlob_UpdateSequenceNumber from "./pageblobupdatesequencenumber";
import PageBlob_CopyIncremental from "./pageblobcopyincremental";
import AppendBlob_AppendBlock from "./appendblobappendblock";
import AppendBlob_AppendBlockFromUrl from "./appendblobappendblockfromurl";
import AppendBlob_Seal from "./appendblobseal";
import Blob_Query from "./blobquery";
import Blob_GetTags from "./blobgettags";
import Blob_SetTags from "./blobsettags";

export const blocks = {
  Service_SetProperties,
  Service_GetProperties,
  Service_GetStatistics,
  Service_ListContainersSegment,
  Service_GetUserDelegationKey,
  Service_GetAccountInfo,
  Service_SubmitBatch,
  Service_FilterBlobs,
  Container_Create,
  Container_GetProperties,
  Container_Delete,
  Container_SetMetadata,
  Container_GetAccessPolicy,
  Container_SetAccessPolicy,
  Container_Restore,
  Container_Rename,
  Container_SubmitBatch,
  Container_FilterBlobs,
  Container_AcquireLease,
  Container_ReleaseLease,
  Container_RenewLease,
  Container_BreakLease,
  Container_ChangeLease,
  Container_ListBlobFlatSegment,
  Container_ListBlobHierarchySegment,
  Container_GetAccountInfo,
  Blob_Download,
  Blob_GetProperties,
  Blob_Delete,
  PageBlob_Create,
  AppendBlob_Create,
  BlockBlob_Upload,
  BlockBlob_PutBlobFromUrl,
  Blob_Undelete,
  Blob_SetExpiry,
  Blob_SetHTTPHeaders,
  Blob_SetImmutabilityPolicy,
  Blob_DeleteImmutabilityPolicy,
  Blob_SetLegalHold,
  Blob_SetMetadata,
  Blob_AcquireLease,
  Blob_ReleaseLease,
  Blob_RenewLease,
  Blob_ChangeLease,
  Blob_BreakLease,
  Blob_CreateSnapshot,
  Blob_StartCopyFromURL,
  Blob_CopyFromURL,
  Blob_AbortCopyFromURL,
  Blob_SetTier,
  Blob_GetAccountInfo,
  BlockBlob_StageBlock,
  BlockBlob_StageBlockFromURL,
  BlockBlob_CommitBlockList,
  BlockBlob_GetBlockList,
  PageBlob_UploadPages,
  PageBlob_ClearPages,
  PageBlob_UploadPagesFromURL,
  PageBlob_GetPageRanges,
  PageBlob_GetPageRangesDiff,
  PageBlob_Resize,
  PageBlob_UpdateSequenceNumber,
  PageBlob_CopyIncremental,
  AppendBlob_AppendBlock,
  AppendBlob_AppendBlockFromUrl,
  AppendBlob_Seal,
  Blob_Query,
  Blob_GetTags,
  Blob_SetTags,
};
