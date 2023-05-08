import { CategoryFilterType } from './CategoryFilterType';

export type ReviewType = {
    title: string;
    review_title: string;
    category: CategoryFilterType;
    body: string;
    assessment: string;
    tags: string[];
    images?: string[];
};
