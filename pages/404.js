import { Router, useRouter } from 'next/router';
import { Button, Box, Text } from '@skynexui/components';
import appConfig from '../config.json';

export default function page404() {
    const router = useRouter();

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundImage: 'url(https://a-static.besthdwallpaper.com/arvores-cobertas-de-neve-papel-de-parede-1600x900-28495_47.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'center', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'left',
                        justifyContent: 'space-around',
                        flexDirection: 'column',
                        width: '100%', maxWidth: '700px',
                        borderRadius: '10px', padding: '50px', margin: 'auto',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[200],
                    }}
                >
                    <Text tag="h1">Oops! Parece que nos perdemos na neve . . .</Text>
                    <Text variant="body" styleSheet={{ marginBottom: '32px', marginTop: '4px', color: appConfig.theme.colors.neutrals[100]}}>
                        Infelizmente a página que você procura não existe !
                    </Text>
                    <Box styleSheet={{ width: '50%' }}>
                        <Button
                            rounded="md"
                            size="sm"
                            type='submit'
                            label='HOME PAGE'
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.neutrals[300],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            onClick={() => {
                                router.push('/');
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
}