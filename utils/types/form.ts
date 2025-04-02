export interface Form {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export interface Question {
  id: string;
  name: string;
  type: string;
  options: Option[];
  order: number;
  style: FormStyle;
}

export interface Option {
  id: string;
  name: string;
}

export interface FormWithAnswers {
  id: string;
  questions: QuestionWithAnswers[];
}

export interface QuestionWithAnswers {
  id: string;
  selectedOptions: string[];
}

export interface FormStyle {
  background: {
    image: string;
  };
}
