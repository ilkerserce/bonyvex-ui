
export class AddFAQRequestModel implements IAddFAQRequestModel {
  questionTR: string;
  questionENG: string;
  questionARB: string;
  answerTR: string;
  answerENG: string;
  answerARB: string;
}

interface IAddFAQRequestModel {
  questionTR: string;
  questionENG: string;
  questionARB: string;
  answerTR: string;
  answerENG: string;
  answerARB: string;
}


export class EditFAQRequestModel implements IEditFAQRequestModel {
  questionTR: string;
  questionENG: string;
  questionARB: string;
  answerTR: string;
  answerENG: string;
  answerARB: string;
  faqId: number;
}

interface IEditFAQRequestModel {
  questionTR: string;
  questionENG: string;
  questionARB: string;
  answerTR: string;
  answerENG: string;
  answerARB: string;
  faqId: number;
}