export enum PathAPI {
    Auth = '/auth',
    Register = '/auth/register',
    Login = '/auth/login',
    Logout = '/auth/logout',
    Review = '/review',
    GetReview = '/review/get-reviews',
    GetPopularTags = '/review/get-popular-tags',
    GetLatestReviews = '/review/last-reviews',
    GetPopularReviews = '/review/popular-reviews',
    Rating = '/review/rating',
    Like = '/review/like',
    GetUsers = '/admin/get-users',
    ChangeAdminStatus = '/admin/change-role',
    ChangeIsBlockedStatus = '/admin/change-status',
    DeleteUser = '/admin/delete-user',
    GetUser = '/user/get-user',
    UploadPhoto = '/user/upload-info',
    Comment = '/comment',
    Tags = '/tags',
    Search = '/search',
}
