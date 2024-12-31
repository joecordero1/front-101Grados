export interface Participant {
  id: number;
  name: string;
  username: string;
  identifier: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  mobile: string;
  document: string;
  isActive: boolean;
  approvedPolicy: boolean;
  approvedTermsAndConditions: boolean;
  isAConsumerRegistrar: boolean;
  passwordUpdatedAt?: string;
}

export interface EditParticipant
  extends Omit<Partial<Participant>, 'id' | 'identifier'> {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
