import { Sort } from '../enums/sort';

export type ReviewFilterType =
    | Sort.NameAZ
    | Sort.NameZA
    | Sort.DateNewOld
    | Sort.DateOldNew
    | Sort.Likes
    | Sort.Assessment
    | Sort.AvgRating
    | Sort.None
    | Sort.Empty;
