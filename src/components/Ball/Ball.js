import React,{Component} from 'react'
import {Button} from 'react-bootstrap';
import './Ball.css';

const Ball  = ({onClick, ballDisplay, show, ballId})=>{
	
		return(

			<div style={{
                    transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}>	
				<Button type="button" className="btn btn-success btn-circle btn-xl bg-transparent b yellow b--yellow" 
					onClick = {onClick.bind(this, ballId)} id = {ballId}>
					{ballDisplay}		
				</Button>
				<p className="tc bg-yellow btn-circle btn-l btn-success">{ballId}</p>				
			</div>
			);
	
}

export default Ball;