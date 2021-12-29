import React from 'react';
import { render} from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile', () =>{
  it('should check if show correctly user input name placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />);
    
    const inputName = getByPlaceholderText('Nome');
    
    expect(inputName).toBeTruthy();
    
  });
  
  it('should checks if user data has been loaded', () => {
    const { getByTestId } = render(<Profile />);
  
    const inputName = getByTestId('input-name')
    const inputSurName = getByTestId('input-surname')
  
    expect(inputName.props.value).toEqual('Maicon');
    expect(inputSurName.props.value).toEqual('Gavazzoni');
  });
  
  it('should checks if title is render correctly', () => {
    const { getByTestId } = render(<Profile />);
  
    const textTitle = getByTestId('text-title');
  
    expect(textTitle.props.children).toContain('Perfil');
  });

})

