import { TrainerSortBy } from '../enums/trainer-sort-by.enum';
import { TrainerSortType } from '../enums/trainer-sort-type.enum';
export class TrainerSearchCriteriaDto {
  preferences: string[];
  sortBy: TrainerSortBy;
  sortType: TrainerSortType;
  limit: number;
}
