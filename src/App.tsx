import React, { useState } from 'react';

import './@core/assets/css/App.scss';

import { Header } from './@core/presentation/layout/Header';
import { Main } from './@core/presentation/layout/Main';
import { ContentView } from './@core/framework/Views/Content';

function App() {
  const [value] = useState<'principal' | 'room'>('principal')

  return (
    <>
      <Header />
      <Main>
        <ContentView value={value} />
      </Main>
    </>
  );
}

export default App;


