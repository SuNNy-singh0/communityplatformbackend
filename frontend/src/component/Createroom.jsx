import React from 'react'
import '../index.css'
function Createroom() {
  return (
    <>
    <div id='createroom'>
        <div className='createroombox'>
        <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Join/Create Room ..</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Room Id</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Terms & Condition*</label>
  </div>
  <button type="submit" class="btn btn-warning w-50 mx-1">Create Room</button>
  <button type="submit" class="btn btn-success w-25 mx-1">Join Room</button>
</form>
        </div>
    </div>
    </>
  )
}

export default Createroom