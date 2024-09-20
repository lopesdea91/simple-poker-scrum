import React from 'react';

import './@core/assets/css/App.scss';

import { Header } from './@core/presentation/layout/Header';
import { Main } from './@core/presentation/layout/Main';
import { Toaster } from './@core/presentation/ui/Toaster';
import { ContentView } from './@core/framework/views/content';
import { useInitHook } from './@core/framework/hooks/init';

function App() {

  useInitHook()

  return (
    <>
      <Header />
      <Main>
        <ContentView />
        <Toaster />
      </Main>
    </>
  );
}

export default App;


