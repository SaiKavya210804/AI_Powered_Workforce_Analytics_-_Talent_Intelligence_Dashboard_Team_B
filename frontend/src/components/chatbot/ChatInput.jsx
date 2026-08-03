import "./ChatInput.css";

import SendIcon from "@mui/icons-material/Send";


function ChatInput({

  value,

  onChange,

  onSend

}) {


  const handleSend = () => {

    if (!value.trim()) return;

    onSend();

  };



  return (

    <div className="chat-input-wrapper">


      <textarea

        className="chat-textarea"

        rows="1"

        placeholder="Ask something about your workforce..."

        value={value}

        onChange={onChange}

        onKeyDown={(e)=>{


          if(e.key==="Enter" && !e.shiftKey){

            e.preventDefault();

            handleSend();

          }


        }}

      />



      <button

        className="send-button"

        onClick={handleSend}

      >

        <SendIcon />

      </button>



    </div>

  );

}


export default ChatInput;