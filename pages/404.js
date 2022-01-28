import { Box, Text, Button } from '@skynexui/components';
import React from 'react';
import appConfig from "../config.json";

export default function error404() {

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#FFFAF0',
                    backgroundImage: 'url(http://assets.stickpng.com/images/5a0c69ce82e02d31ecb8d013.png)',
                    backgroundRepeat: 'no-repeat', backgroundSize: '45%', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        }
                    }}
                >
                    <Box
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '100%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Text variant="body1" styleSheet={{ marginBottom: '20px', color: appConfig.theme.colors.neutrals[400] }}>
                            <h1>AWWW ... DON'T CRY!</h1>
                        </Text>

                        <Text variant="body4" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[400] }}>
                            It's just a 404 Error! <br />
                            What you're looking for may have been misplaced in long Term Memory.
                        </Text>

                        <Button
                            type='button'
                            onClick={() => window.location.href = "/"}
                            label='BACK TO HOMEPAGE'
                            fullWidth
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}