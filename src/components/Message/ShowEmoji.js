import React from "react";
import Moveable from 'react-moveable'
import CloseIcon from '@material-ui/icons/Close';
import EmojiPicker, {EmojiStyle} from 'emoji-picker-react';
import { IconButton } from '@material-ui/core';




export default function ShowEmoji({showEmoji, toggleEmoji, getEmoji}) {
  const targetRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="container">
    <div style={{zIndex: 11}} className="target" ref={targetRef}>
      {showEmoji && <IconButton><CloseIcon onClick={toggleEmoji}/></IconButton>}
      {showEmoji && <EmojiPicker emojiStyle={EmojiStyle.FACEBOOK} onEmojiClick={getEmoji} autoFocusSearch={false} width={270} height={300} previewConfig={{showPreview: false}} skinTonesDisabled/>}
    </div>
    <Moveable
      target={targetRef}
      draggable={true}
      throttleDrag={1}
      edgeDraggable={false}
      startDragRotate={0}
      throttleDragRotate={0}
      onDrag={e => {
          e.target.style.transform = e.transform;
      }}
    />
  </div>
  );
}