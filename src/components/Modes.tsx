import '../styles/modes.css';

import {observer} from 'mobx-react-lite';
import ModesList from './sections/modeslist';


//Wrapper for page with a list of modes
const Modes = observer(() => {
  return (
    <div className='modesWrapper'>
        <ModesList />
    </div>
  );
})

export default Modes;
