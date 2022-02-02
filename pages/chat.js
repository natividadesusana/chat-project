import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ3OTY1MywiZXhwIjoxOTU5MDU1NjUzfQ.DM8M610mzswaalPq8drvePj_JwROj0K1M-1tHcJRSrI';
const SUPABASE_URL = 'https://lffitukqrbtbypnmxnnk.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}

export default function ChatPage() {
    const router = useRouter();
    const usuarioLogado = router.query.username;
    // console.log('router.query'.router.query);
    // console.log('usuarioLogado', usuarioLogado);
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                // console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
            });

        const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
            console.log('Nova mensagem:', novaMensagem);
            console.log('listaDeMensagens:', listaDeMensagens);
            setListaDeMensagens((valorAtualDaLista) => {
                console.log('valorAtualDaLista:', valorAtualDaLista);
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data);
            });

        setMensagem('');
    }

    function handleDeletaMensagem(mensagemAtual) {
        supabaseClient
            .from("mensagens")
            .delete()
            .match({ id: mensagemAtual.id })
            .then(({ data }) => {
                const listaDeMensagensFiltrada = listaDeMensagens.filter((mensagem) => {
                    return mensagem.id != data[0].id;
                });
                setListaDeMensagens(listaDeMensagensFiltrada);
            });
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals[200],
                backgroundImage: `url(https://wallpapercave.com/wp/wp4676582.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '10px',
                    backgroundColor: appConfig.theme.colors.neutrals[100],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[100],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList
                        mensagens={listaDeMensagens}
                        handleDeletaMensagem={handleDeletaMensagem}
                    />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                                <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '15px 8px',
                                marginRight: '12px',
                                backgroundColor: appConfig.theme.colors.primary[800],
                                color: appConfig.theme.colors.neutrals["000"],
                            }}
                        />
                        {/* CallBack */}
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                                handleNovaMensagem(':sticker: ' + sticker);
                            }}
                        />
                        <Button styleSheet={{
                            borderRadius: '50%',
                            minWidth: '50px',
                            minHeight: '50px',
                            fontSize: '20px',
                            marginBottom: '8px',
                            margin: '5px',
                            lineHeight: '',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            iconName="FaPaperPlane"
                            type="button"
                            variant='secondary'
                            colorVariant='positive'

                            onClick={(event) => {
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading4'>
                    CHAT
                </Text>
                <Button
                    variant='secondary'
                    colorVariant='light'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log("MessageList", props);

    const handleDeletaMensagem = props.handleDeletaMensagem;
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[100],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                                tag="span"
                            >
                                {new Date().toLocaleDateString("pt-br", { hour: "numeric", minute: "numeric", second: "numeric" })}
                            </Text>

                            <Icon
                                name={"FaTrash"}
                                styleSheet={{
                                    marginLeft: "12px",
                                    width: "15px",
                                    height: "15px",
                                    color: appConfig.theme.colors.primary["100"],
                                    hover: {
                                        color: "orange",
                                    },
                                    display: "inline-block",
                                }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleDeletaMensagem(mensagem);
                                }}
                            />

                        </Box>

                        {mensagem.texto.startsWith(':sticker:')
                                ? (
                                    <Image src={mensagem.texto.replace(':sticker:', '')} />
                                )
                                : (
                                    mensagem.texto
                                )}
                        {/* if mensagem de texto possui stickers:
                           mostra a imagem
                        else 
                           mensagem.texto */}
                        {/* {mensagem.texto} */}
                    </Text>
                );
            })}
        </Box>
    );
}