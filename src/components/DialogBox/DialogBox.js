import React from 'react';
import './dialogBox.css'
import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap';

const DialogBox = (props) =>{
	return (
        <div>
            <div className=" modal-fixed modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>Ball</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <ToggleButtonGroup name='validBall' defaultValue={0}>
                    	<ToggleButton className='pa1' value={0} onChange={props.ballChange}> B</ToggleButton>
                    	<ToggleButton className='pa1' value={1} onChange={props.ballChange}> NB</ToggleButton>
                    	<ToggleButton className='pa1' value={2} onChange={props.ballChange}> WD</ToggleButton>
                    </ToggleButtonGroup>

                    <ToggleButtonGroup name='validRun' defaultValue={0}>
                    	<ToggleButton className='pa1' value={0} onChange={props.rtChange}> R</ToggleButton>
                    	<ToggleButton className='pa1' value={1} onChange={props.rtChange}> By</ToggleButton>
                    	<ToggleButton className='pa1' value={2} onChange={props.rtChange}> LB</ToggleButton>
                    	<ToggleButton className='pa1' value={3} onChange={props.rtChange}> WK</ToggleButton>
                    </ToggleButtonGroup>

                    <ToggleButtonGroup name='runs' defaultValue={0}>
                    	<ToggleButton className='pa1' value={0} onChange={props.runChange}> 0</ToggleButton>
                    	<ToggleButton className='pa1' value={1} onChange={props.runChange}> 1</ToggleButton>
                    	<ToggleButton className='pa1' value={2} onChange={props.runChange}> 2</ToggleButton>
                    	<ToggleButton className='pa1'value={3} onChange={props.runChange}> 3</ToggleButton>
                    	<ToggleButton className='pa1'value={4} onChange={props.runChange}> 4</ToggleButton>
                    	<ToggleButton className='pa1'value={5} onChange={props.runChange}> 5</ToggleButton>
                    	<ToggleButton className='pa1'value={6} onChange={props.runChange}> 6</ToggleButton>
                    	<ToggleButton className='pa1'value={7} onChange={props.runChange}> 7</ToggleButton>
                    	<ToggleButton className='pa1'value={8} onChange={props.runChange}> 8</ToggleButton>
                    	<ToggleButton className='pa1'value={9} onChange={props.runChange}> 9</ToggleButton>
                    	<ToggleButton className='pa1'value={10} onChange={props.runChange}> 10</ToggleButton>
                    	<ToggleButton className='pa1'value={11} onChange={props.runChange}> 11</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                    <button className="btn-continue" onClick={props.continue}>CONTINUE</button>
                </div>
            </div>
        </div>
    );
}

export default DialogBox;