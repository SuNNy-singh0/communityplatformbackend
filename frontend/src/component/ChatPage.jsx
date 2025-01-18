import React from 'react'
import '../index.css'
function ChatPage() {
  return (
    <>
    <div>
        {/* part1 */}
        <div id='chatpagepart1'>
            <div>
            <h3>Room id: <span>123456</span></h3>
            </div>
           <div>
           <h3>User: <span>Ravi Gupta</span></h3>
           </div>
            <div>
            <button className='btn btn-danger'>Leave Room</button>
            </div>
            
        </div>
        <div id='chatpagepart1' className='lastbox' style={{
            marginTop:'10vh'
        }}>
            <div>
            <input type='text' class="form-control" placeholder='Type You Message'></input>
            </div>
           <div>
           <h3>**</h3>
           </div>
            <div>
            <button className='btn btn-info'>send</button>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default ChatPage