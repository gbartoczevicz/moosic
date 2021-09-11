export interface HttpResponse {
  statusCode: number;
  body?: any;
}

export interface HttpRequest {
  body?: any;
  applicationData: ApplicationData;
}

export interface ApplicationData {
  userId?: string;
  restaurateurId?: string;
}
