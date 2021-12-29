import 'jest-fetch-mock'

import { renderHook, act } from '@testing-library/react-hooks';

import { AuthProvider, useAuth } from './auth';
import { startAsync } from 'expo-auth-session';
import { mocked } from 'ts-jest/utils';
import fetchMock from 'jest-fetch-mock';
import AsyncStorage from '@react-native-async-storage/async-storage';

fetchMock.enableMocks();

const userTest = {
  id: 'any_id',
  email: 'john.doe@email.com',
  name: 'John Doe',
  photo: 'any_photo.png'
};

jest.mock('expo-auth-session');

describe('Auth Hook',() =>{
  beforeEach(async () => {
    const userCollectionKey = '@gofinances:user'
    await AsyncStorage.removeItem(userCollectionKey)
 })
  it('should be able to sign in with Google account existing', async () =>{
    const googleMocked= mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type : 'success',
      params : {
        access_token: 'any_token'
    }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email)
      .toBe(userTest.email);
  });


  it('user should not be connect if cancel authentication with Google', async () =>{
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });
});