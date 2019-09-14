import {BALL_CLICK, BALL_CLOSE, BALL_SET, 
	BALLTYPE_CHANGE, RUNTYPE_CHANGE, RUNS_CHANGE,
	REQUEST_BALLS_PENDING,REQUEST_BALLS_SUCCESS,REQUEST_BALLS_FAILED,
	MATCH_OPEN,BACK_CLICK,CREATEMATCH_CLICK
} from './constants'

export const createMatch=(e)=>{
	return({type:CREATEMATCH_CLICK, event:e,route:'newmatch'});
}


export const matchOpen=(e)=>{
	return({type:MATCH_OPEN, event:e,route:'ball'});
}

export const backClick=()=>{
	return({type:BACK_CLICK, route:'match'});
}
export const ballClick=(e)=>{
	console.log('event',e)
	return({type:BALL_CLICK, payload:true, event:e});
}

export const ballClose=(value)=>{
	return({type:BALL_CLOSE, payload:value});
}

export const ballSet=(value)=>{
	return({type:BALL_SET, payload:value});
}

export const ballTypeChange=(value)=>{
	return({type:BALLTYPE_CHANGE, payload:value});
}

export const runTypeChange=(value)=>{
	return({type:RUNTYPE_CHANGE, payload:value});
}

export const runsChange=(value)=>{
	return({type:RUNS_CHANGE, payload:value});
}

export const requestBalls=(dispatch,e)=>{	
console.log('event-',e);
	dispatch({type:REQUEST_BALLS_PENDING});
	fetch('https://young-escarpment-31641.herokuapp.com/balls',
		{method:'post',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify({matchid: e.data.matchid})
		})
	.then(res => res.json())
	.then(data => dispatch({type:REQUEST_BALLS_SUCCESS, route:'ball', event:e,payload: data}))	
	.catch(err => dispatch({type:REQUEST_BALLS_FAILED, payload:err}));
}

