import { CategoryType } from './CategoryType';

export type TableRowType = {
    id: string;
    image: string;
    name: string;
    category: CategoryType;
    createdAt: string;
    rating: number;
};
