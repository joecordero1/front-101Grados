export interface ParticipantConfig {
  forms: FormParticipant[];
}

export interface FormParticipant {
  id: string;
  name: string;
  type: string;
}
