import {useEffect} from 'react'

const ReadyPlayerCreditRedirect = () => {
  useEffect(() => {
    window.location.href = 'https://readyplayercredit.netlify.app/';
  }, []);

  return null; // Render nothing or a loading indicator
}

export default ReadyPlayerCreditRedirect