export interface AzureBaseResponse {
  value: any;
}

export interface AzureListTeamsResponse extends AzureBaseResponse {
  value: AzureTeamMetadata[];
}

export interface AzureTeamMetadata {
  id: string;
  displayName: string;
  description: string;
}

export interface AzureListChannelResponse extends AzureBaseResponse {
  value: AzureChannelMetadata[];
}

export interface AzureChannelMetadata {
  id: string;
  createdDateTime: string;
  displayName: string;
  description: string;
  membershipType: string;
}

/**
 * REQUEST TYPES
 */

export interface AzureBaseRequest {
  body: any;
}

export interface AzureMessageRequestBody {
  content: string;
}

export interface AzureMessageRequest extends AzureBaseRequest {
  body: AzureMessageRequestBody;
}
