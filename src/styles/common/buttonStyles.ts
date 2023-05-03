export const buttonStyles = (themeColor: 'dark' | 'light') => ({
    backgroundColor: themeColor === 'dark' ? 'primary.dark' : undefined,
    color: themeColor === 'dark' ? 'white' : undefined,
    '&:hover': {
        backgroundColor: themeColor === 'dark' ? 'primary.dark' : undefined,
    },
    mt: 2,
    mb: 2,
});
