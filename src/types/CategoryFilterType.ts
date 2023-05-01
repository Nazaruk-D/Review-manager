import { Category } from '../enums/category';

export type CategoryFilterType =
    | Category.All
    | Category.Movies
    | Category.Books
    | Category.Games
    | Category.Food
    | Category.Cars
    | Category.Other
    | Category.Empty;
