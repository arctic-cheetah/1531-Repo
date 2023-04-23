import { Badge, IconButton } from '@material-ui/core';
import EmojiPicker, {EmojiStyle} from 'emoji-picker-react';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import AuthContext from '../../AuthContext';
import { makeRequest } from '../../utils/axios_wrapper';
import { StepContext } from '../Channel/ChannelMessages';
import { StepContextDm } from '../Dm/DmMessages';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import PanToolIcon from '@material-ui/icons/PanTool';
import Reactions from './Reactions';
import Moveable from 'react-moveable';

// References:
// https://stackoverflow.com/questions/62858054/how-get-real-char-code-from-an-emoji-in-javascript
// https://www.shecodes.io/athena/9351-how-to-hide-a-button-in-react#:~:text=To%20hide%20a%20button%20in%20React%2C%20you%20can%20use%20the,class%20in%20your%20button%20element.
// https://daybrush.com/moveable/release/latest/doc/Moveable.html#.RenderDirections
// https://stackoverflow.com/questions/70394751/useref-in-typescript-returning-a-boolean
// https://stackoverflow.com/questions/66788247/react-moveable-and-css-modules-cant-apply-css-styling
// 
function MessageReact({ messageId, reacts = [] /* [{ reactId, uIds, isThisUserReacted }] */ }) {
  const token = React.useContext(AuthContext);
  let step = React.useContext(StepContext);
  let stepDm = React.useContext(StepContextDm);
  const [users, setUsers] = React.useState([]);
  const [showEmoji, setShowEmoji] = React.useState(false);
  const targetRef = React.useRef(null);

  let reactionCount = 0;

  reacts.forEach(r => {
    reactionCount += r.uIds.length;
    r['usersReacted'] = users.filter(u => r.uIds.find(e => e === u.uId));
  });
  console.log(reacts);

  
  const toggleEmoji = () => {
    setShowEmoji(!showEmoji);
  };
  const getEmoji = (emojiData) => {
    // Get the selected emoji and, and convert it to a number
    let emojiCode = emojiData.emoji.codePointAt();
    messageReact(emojiCode);
  };


  React.useEffect(() => {
    function fetchUserData() {
      makeRequest('GET', 'USERS_ALL', { token })
        .then(({ data }) => {
          setUsers(data['users']);
        })
        .catch(err => console.log(err));
    }
    fetchUserData();
  }, [token]);
  
  step = step ? step : () => {}; // sanity check
  stepDm = stepDm ? stepDm : () => {}; // sanity check

  const messageReact = (reactId) => {
    // Find the react for the user
    let foundReaction = reacts.find(r => r.reactId === reactId);
    if (foundReaction === undefined) {
      makeRequest('POST', 'MESSAGE_REACT', {
        token,
        messageId: Number.parseInt(messageId),
        reactId,
      }).then(() => {
        step();
        stepDm();
      }).catch(err => console.log(err));
    }
    else {
      if (foundReaction.isThisUserReacted === true) {        
        makeRequest('POST', 'MESSAGE_UNREACT', {
          token,
          messageId: Number.parseInt(messageId),
          reactId,
        }).then(() => {
          step();
          stepDm();
        }).catch(err => console.log(err));
      }
      else {
        makeRequest('POST', 'MESSAGE_REACT', {
          token,
          messageId: Number.parseInt(messageId),
          reactId,
        }).then(() => {
          step();
          stepDm();
        }).catch(err => console.log(err));
      }
    } 
    

  };

  return (
      <>
        {showEmoji && 
          <div className="container" style={{zIndex: 50}}>
            <div style={{zIndex: 50}} className="target" ref={targetRef} title='Drag me!🤏'>
              <IconButton><CloseIcon onClick={toggleEmoji}/></IconButton>
              <IconButton><DragIndicatorIcon/><PanToolIcon/></IconButton>
              <EmojiPicker emojiStyle={EmojiStyle.FACEBOOK} searchDisabled onEmojiClick={getEmoji} autoFocusSearch={false} width={270} height={300} previewConfig={{showPreview: false}} skinTonesDisabled/>
            </div>
            <Moveable
              target={targetRef}
              draggable={true}
              edgeDraggable={true}
              onDrag={e => {
                  e.target.style.transform = e.transform;
              }}
              // Zoom determines whether the border and drag point is shown
              zoom={0}
              renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
            />
          </div>
        }
        <Badge
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            badgeContent={reactionCount}
            color="secondary"
        >

          <IconButton
            onClick={() => {toggleEmoji();}}
            style={{ margin: 1 }}
            size="small"
            edge="end"
            aria-label="delete"
          >
          <EmojiEmotionsIcon fontSize="small"/>
          </IconButton>
          
{/*                   
          <div style={{fontSize: 10}} title={getUserReactedName}>
            1🔔
          </div>
          <div style={{fontSize: 10}}>
            2🙂
          </div> */}
          {reacts.length > 0 ? <Reactions reactions={reacts}/> : null}

          
        </Badge>
    </>
  );
}

export default MessageReact;
