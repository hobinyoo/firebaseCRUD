import '../styles/globals.css'
import type { AppProps } from 'next/app'
import wrapper from '../store/index'
import { Provider } from 'react-redux'


const MyApp = ({ Component, ...rest }: AppProps) => {

  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  )
}

export default wrapper.withRedux(MyApp)
