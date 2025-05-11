export interface Trivia {
  id: string;
  teams: Teams;
  style: TriviaStyle;
}

export interface Teams {
  home: Away;
  away: Away;
}

export interface Away {
  name: string;
  logo: string;
}

export interface Prediction {
  triviaId: string;
  homeScore: number;
  awayScore: number;
}

export interface TriviaStyle {
  background: {
    image: string;
  };
}

export interface PredictedTrivia {
  id: string;
  participantId: number;
  matchTriviaId: string;
  predictedHomeScore: number;
  predictedAwayScore: number;
  createdAt: Date;
  updatedAt: Date;
}
