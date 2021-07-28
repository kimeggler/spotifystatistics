import { useHistory } from 'react-router-dom';

function Redirect() {
  const history = useHistory();

  history.push('/overview');

  return null;
}

export default Redirect;
