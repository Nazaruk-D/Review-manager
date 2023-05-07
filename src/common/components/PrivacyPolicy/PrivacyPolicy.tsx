import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container sx={{ mt: 2 }}>
            <Grid item xs={12}>
                <Typography variant="h4">Privacy Policy</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    This Privacy Policy describes how we collect, use, and share information about you when you use our services.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Information We Collect</Typography>
                <Typography>
                    We may collect information about you when you use our services. This information may include your name, email
                    address, phone number, address, and other information you choose to provide. We may also collect information
                    automatically, such as your IP address, device information, and usage information.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">How We Use Information</Typography>
                <Typography>
                    We may use the information we collect to provide and improve our services, to communicate with you, and to
                    personalize your experience. We may also use the information for research and analytics purposes.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">How We Share Information</Typography>
                <Typography>
                    We may share information with third-party service providers who perform services on our behalf. These
                    providers may have access to your personal information only to perform these tasks on our behalf and are
                    obligated not to disclose or use it for any other purpose. We may also share information if required by law or
                    to protect our rights or the rights of others.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Your Choices</Typography>
                <Typography>
                    You may choose to limit the information you provide to us. However, if you choose not to provide certain
                    information, you may not be able to use some of our services. You may also opt-out of receiving promotional
                    communications from us by following the instructions in those communications.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Data Retention</Typography>
                <Typography>
                    We will retain your information for as long as necessary to provide our services, and as necessary to comply
                    with our legal obligations, resolve disputes, and enforce our policies.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Changes to this Privacy Policy</Typography>
                <Typography>
                    We may update this Privacy Policy from time to time. If we make any material changes, we will notify you by
                    posting the updated policy on our website.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Contact Us</Typography>
                <Typography>
                    If you have any questions about this Privacy Policy, please contact us at [insert contact information]. Please
                    note that this is just a sample privacy policy and you should consult with a lawyer to ensure that your
                    privacy policy complies with all applicable laws and regulations.
                </Typography>
            </Grid>
        </Container>
    );
};

export default PrivacyPolicy;
