import Text from '../components/typography.component'
import Input from "../components/form.screen"

const LoginScreen = () : JSX.Element => {

  return (
    <main id="login" className="s-layout s-layout--primary s--layout--primary__login">
      <form>
        <Text as="h1">Signin</Text>
        <Input info="lasdfadsf" label="test label" placeholder="placeholder" />
      </form>
    </main>
  )
}

export default LoginScreen