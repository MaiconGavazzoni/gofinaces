import React, { useState, useEffect, useCallback } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFocusEffect } from '@react-navigation/native';

import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Previous,
  Month,
   LoadContainer
} from './styles'
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}


export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date);
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();

  function handleDateChange(action: 'next' | 'prev'){
   
    if(action === 'next'){  
     setSelectedDate(addMonths(selectedDate, 1));
       console.log(selectedDate);
    }else{    
       setSelectedDate(subMonths(selectedDate, 1));
        console.log(selectedDate);
    }
  
  }

  async function loadData() {
     setIsLoading(true);
    const dataKey = '@gofinances:transaction';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response!) : [];

    const expensives = responseFormatted
      .filter((expensive: TransactionData) => 
      expensive.type === 'negative' &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      );



    const expensivesTotal = expensives.reduce((acumullator: number, expensive: TransactionData) => {
      return acumullator + Number(expensive.amount);
    }, 0);
    console.log(expensivesTotal);
    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted: total,
          color: category.color,
          percent: percent
        });
      }

    });
    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }


  //evita renderização desnecessárias sempre vendo se mudou alguma coisa quando a tela está em foco
  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]));

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      { isLoading?
       <LoadContainer>
        <ActivityIndicator 
        color={theme.colors.primary}
        size='large'
        />
        </LoadContainer> :
      <>
      <Content showsVerticalScrollIndicator={false}>

        <MonthSelect>
          <MonthSelectButton title='<' onPress={()=>handleDateChange('prev')}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>


          <Month>{ format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

          <MonthSelectButton title='>' onPress={()=>handleDateChange('next')}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>



        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
            }}
            labelRadius={50}
            x="percent"
            y="total"
          />
        </ChartContainer>
        {
          totalByCategories.map(item =>
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          )
        }
      </Content>
    </>
}

    </Container>
  )
}