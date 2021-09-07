export interface HttpResponse {
  statusCode: number;
  body?: unknown;
}

export interface HttpRequest {
  body?: unknown;
  applicationData: ApplicationData;
}

export interface ApplicationData {
  userId?: string;
  restaurateurId?: string;
  artistId?: string;
}
