import { ResponseType, makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  display_name: string;
  email: string;
  profile_image_url: string;
}

interface AuthContextData {
  user: User;
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderData {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

const twitchEndpoints = {
  authorizationEndpoint: 'https://id.twitch.tv/oauth2/authorize',
  tokenEndpoint: 'https://id.twitch.tv/oauth2/token',
  revocationEndpoint: 'https://id.twitch.tv/oauth2/revoke',
};

WebBrowser.maybeCompleteAuthSession();
function AuthProvider({ children }: AuthProviderData) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState({} as User);
  const [userToken, setUserToken] = useState('');

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_TWITCH_ID!,
      redirectUri: makeRedirectUri({
        scheme: "https://auth.expo.io/@enoqbank/stream-data",
      }),
      scopes: ['user:read:email', 'analytics:read:games'],
      
    },
    twitchEndpoints
  );


  async function signIn() {
    try {
      setIsLoggingIn(true);

     await promptAsync();

    //  if (response?.type === 'success') {
    //   const { code } = response.params;
    //   console.log(response)
    // }
    } catch (error) {
      throw new Error()
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function signOut() {
    try {
      // set isLoggingOut to true

      // call revokeAsync with access_token, client_id and twitchEndpoint revocation
    } catch (error) {
    } finally {
      // set user state to an empty User object
      // set userToken state to an empty string

      // remove "access_token" from request's authorization header

      // set isLoggingOut to false
    }
  }

  useEffect(() => {
    // add client_id to request's "Client-Id" header
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoggingOut, isLoggingIn, signIn, signOut }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };



      // //URL de redirecionamento 
      // const REDIRECT_URI = makeRedirectUri();

      // //Tipo de resposta que se espera
      // const RESPONSE_TYPE = 'token';

      // //permissões que você solicita do usuário ao fazer o login
      // const SCOPE = ["openid user:read:email", "user:read:follows"];

      // //Sempre solicita a autorização do usuário ao logar no app
      // const FORCE_VERIFY = true;

      // //String aleatória que você deve gerar para aumentar a segurança do seu app
      // const STATE = generateRandom(30);

      // //Montar a authUrl com twitchEndpoint authorization client_id redirect_uri response_type scope force_verify e state
      // const authUrl = twitchEndpoints.authorization +
      //   `?client_id=${CLIENT_ID}` +
      //   `&redirect_uri=${REDIRECT_URI}` +
      //   `&response_type=${RESPONSE_TYPE}` +
      //   `&scope=${SCOPE}` +
      //   `&force_verify=${FORCE_VERIFY}` +
      //   `&state=${STATE}`;

      //   const x = await AuthSession.sta
      // const response = await loadAsync({ 
      //   clientId: CLIENT_ID,
      //   redirectUri: REDIRECT_URI,
      //   responseType: RESPONSE_TYPE,
      //   scopes: SCOPE,
      //   state: STATE,
      //   extraParams: {
      //     FORCE_VERIFY: String(FORCE_VERIFY),
      //   }
      //  }, {});

      //  console.log(response.)
      // if (response.type === 'success' && response.params.error !== 'access_denied') {
      //   if (response.params.state !== STATE) {
      //     throw new Error('Invalid state value');
      //   }
      //   api.defaults.headers.common['Authorization'] = `Bearer ${response.params.access_token}`;

      //   const userResponse = await api.get('/users');
      //   setUser({
      //     id: userResponse.data.data[0].id,
      //     display_name: userResponse.data.data[0].display_name,
      //     email: userResponse.data.data[0].email,
      //     profile_image_url: userResponse.data.data[0].profile_image_url
      //   });
      //   setUserToken(response.params.access_token);
      // }