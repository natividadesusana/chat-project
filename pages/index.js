import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Title(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 28px;
                font-weight:500;
                font-family: 'Ink Free';
            }
            `}</style>
    </>
  );
}

// function HomePage() {
//   return (
//     <div>
//       <GlobalStyle />
//       <Title tag="h2">Boas vindas de volta!</Title>
//       <h2>Discord - Sana Natividade</h2>
//     </div>
//   )
// }
// export default HomePage

export default function PaginaInicial() {
  //Rook para atualizar os dados
  const [username, setUsername] = React.useState('');
  //username recebe o nome do usuário
  //setUserName é a função para alterar o valor de username, em qualquer lugar que username é chamado
  const validateInput = username.length > 2
  const router = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: 'url(https://wallpapercave.com/wp/wp4676582.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[100],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event) { //Ao submeter o formulário...
              event.preventDefault() //Previna o comportamento padrão de enviar os dados
              router.push(`/chat?username=${username}`) //Adicione a página do chat na pilha de rotas
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Welcome Back!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[200] }}>
              {appConfig.name}
            </Text>

            {/* <input
              type="text"
              value={username}
              onChange={function (event) {
                console.log('usuario digitou', event.target.value);
                // Onde ta o valor?
                const valor = event.target.value;
                // Trocar o valor da variavel
                // através do React e avise quem precisa
                setUsername(valor);
              }}
            /> */}

            <TextField
              value={username} //Valor inicial do input é a variavel username
              onChange={function (event) {//Quando o input for alterado...
                const newValue = event.target.value;//Guarda o valor que o usuário está digitando em uma variável
                setUsername(newValue)//Altera o valor de username para a variavel acima, toda vez que o input muda
              }}
              placeholder='Digite o seu usuário do Github...'
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorHighlight: appConfig.theme.colors.neutrals["000"],
                  backgroundColor: appConfig.theme.colors.neutrals[100],
                },
              }}
            />
            <Button
              type='submit'
              label='Login'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.neutrals[100],
                mainColorLight: appConfig.theme.colors.primary[100],
                mainColorStrong: appConfig.theme.colors.primary[500],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[100],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[400],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={validateInput ? `https://github.com/${username}.png` : 'https://i.pinimg.com/originals/11/8e/6f/118e6f39fac9344d6589c84d5ee9e667.png'}
            //Se o input ter mais que 2 caracteres, mostra a foto, se não, não mostra nada.
            //Como username sempre é atualizado quando o input muda, essa verificação sempre é feita
            />
            <Text
              variant="body4"
              tag={validateInput ? "a" : "span"}//Se o campo tiver mais que 2 caracteres é um link, se não um span
              target="_blank"
              href={`https://github.com/${username}`}
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.primary[999],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[400],
                borderRadius: '10px',
                padding: '3px 10px',
                borderRadius: '1000px',
              }}
            >
              {username || "GitHub"}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}