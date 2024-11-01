export interface TransferRequest {
  startLocationCode?: string;
  startGeoCode?: string;
  startAddressLine?: string;
  startCountryCode?: string;
  endLocationCode?: string;
  endGeoCode?: string;
  endAddressLine?: string;
  endCountryCode?: string;
  transferType: string;
  startDateTime: string;
  passengers: number;
}
