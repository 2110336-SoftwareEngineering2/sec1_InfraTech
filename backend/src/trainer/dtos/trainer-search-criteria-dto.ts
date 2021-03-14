import { TrainerSortBy } from '../enums/trainer-sort-by.enum';
export class TrainerSearchCriteriaDto {
  preferences: string[];
  sortBy: TrainerSortBy;
}
