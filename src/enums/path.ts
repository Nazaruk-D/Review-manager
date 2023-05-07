export enum Path {
    Root = '/',
    Login = '/login',
    Register = '/register',
    Profile = '/profile/:userId',
    AdminPage = '/admin',
    Review = '/review/:reviewId',
    Result = 'result',
    BlockedPage = '/blocked',
    CreateReview = '/create-review/:userId',
    UpdateReview = '/update-review/:reviewId',
    PrivacyPolicy = '/privacy-policy',
}
