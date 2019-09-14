import {BALL_CLICK, BALL_SET, BALL_CLOSE, 
	BALLTYPE_CHANGE, RUNTYPE_CHANGE, RUNS_CHANGE,
	REQUEST_BALLS_PENDING,REQUEST_BALLS_SUCCESS,REQUEST_BALLS_FAILED,
	MATCH_OPEN,BACK_CLICK,CREATEMATCH_CLICK
} from './constants'

import update from 'react-addons-update';


const initialState ={
	isPending : false,
	error : '',
	balls : [],
	show:false,
	score:0,
	wks:0,
	score2:0,
	wks2:0,
	currentBall:1,
	currentInn:1,
	lastRT:0,
	lastBT:0,
	LastRun:0,
	lastBD:'',
	runsOnBall:0,
	wksOnBall:0,
	btOnBall:0,
	ballRT:0,
	ballBT:0,
	route:'match',
	ballRuns:0,
	ballBD:'',
	match:[],
	numOfBalls1:0,
	numOfBalls2:0
}

export const setBalls=(state =initialState, action = {})=>{
	switch(action.type){
		case REQUEST_BALLS_PENDING:
		return Object.assign({},state, {isPending:true});

		case REQUEST_BALLS_SUCCESS:	 
		return {...state, ispending:false, route:action.route, match:action.event.data,currentBall:0, balls:action.payload};

		case REQUEST_BALLS_FAILED:	 
		return Object.assign({},state, {isPending:false, error : action.payload});

		case BALL_CLICK:
		return {...state, 
					show:action.payload, currentBall:parseInt(action.event.ballid)-1,
					currentInn:parseInt(action.event.inningid),
					runsOnBall:state.balls[state.balls.findIndex((ball)=>parseInt(ball.ballid) === parseInt(parseInt(action.event.ballid)) && 
            parseInt(ball.inningid) === parseInt(action.event.inningid))].runs,
					wksOnBall:parseInt(state.balls[state.balls.findIndex((ball)=>parseInt(ball.ballid) === parseInt(parseInt(action.event.ballid)) && 
            parseInt(ball.inningid) === parseInt(action.event.inningid))].runtype) === 3?1:0,
					btOnBall:parseInt(state.balls[state.balls.findIndex((ball)=>parseInt(ball.ballid) === parseInt(parseInt(action.event.ballid)) && 
            parseInt(ball.inningid) === parseInt(action.event.inningid))].balltype)
				}

		case MATCH_OPEN:
		return Object.assign({},state, {route:action.route, match:action.event.data});

		case CREATEMATCH_CLICK:
		return Object.assign({},state, {route:action.route});

		case BACK_CLICK:
		return Object.assign({},state, {route:action.route});

		case BALLTYPE_CHANGE:
			return {...state, ballBT:action.payload	}
			
		case RUNTYPE_CHANGE:
		return {...state, ballRT:action.payload }

		case RUNS_CHANGE:
		return {...state, ballRuns:action.payload }

		case BALL_CLOSE:
			return {...state,show:action.payload}

		case BALL_SET:
		{	
			var wks = 0;
			var score=0;
			var ballDisp = "";
			var numOfBalls = 0;
			var isset = state.balls[state.balls.findIndex((ball)=>parseInt(ball.ballid) === parseInt(parseInt(state.currentBall)+1) && 
            parseInt(ball.inningid) === parseInt(state.currentInn))].isset;

			numOfBalls = parseInt(state.currentInn)==1?
							parseInt(state.numOfBalls1):
							parseInt(state.numOfBalls2);

			numOfBalls =  isset === true && parseInt(state.btOnBall) === 0?parseInt(numOfBalls)-1:parseInt(numOfBalls);
			
			wks = parseInt(state.currentInn)==1?
							parseInt(state.wks)-parseInt(state.wksOnBall):
							parseInt(state.wks2)-parseInt(state.wksOnBall);
			

			score = parseInt(state.currentInn) == 1 ?
				parseInt(state.score)+parseInt(state.ballRuns)-parseInt(state.runsOnBall):
				parseInt(state.score2)+parseInt(state.ballRuns)-parseInt(state.runsOnBall);

			switch(state.ballBT){
				case "0":
				ballDisp= state.ballRuns+"";
				if(isset === true && parseInt(state.btOnBall) !== 0)
				{
					//Remove added ball
					state.balls.pop();
				}
				break;

				case "1":
				ballDisp= state.ballRuns+"NB";
				if(isset === true && parseInt(state.btOnBall) === 0)
				{
					state.balls.push({matchid:state.match.matchid, inningid:state.currentInn, 
					ballid:state.balls.filter(ball => ball.inningid === state.currentInn).length+1, visible:true});
				}
				else if(isset === false)
				{
					state.balls.push({matchid:state.match.matchid, inningid:state.currentInn, 
					ballid:state.balls.filter(ball => ball.inningid === state.currentInn).length+1, visible:true});
				}
				break;

				case "2":
				ballDisp= state.ballRuns+'WD';
				if(isset === true && parseInt(state.btOnBall) === 0)
				{
					state.balls.push({matchid:state.match.matchid, inningid:state.currentInn, 
					ballid:state.balls.filter(ball => ball.inningid === state.currentInn).length+1, visible:true});
				}
				else if(isset === false)
				{
					state.balls.push({matchid:state.match.matchid, inningid:state.currentInn, 
					ballid:state.balls.filter(ball => ball.inningid === state.currentInn).length+1, visible:true});
				}
				break;

				default :
				ballDisp= state.ballRuns+'';
				break;
			}

			switch(state.ballRT){
				case "0":
				ballDisp= ballDisp+'';
				break;

				case "1":
				ballDisp= ballDisp+'B';
				break;

				case "2":
				ballDisp= ballDisp+'LB';
				break;

				case "3":
				{
					ballDisp= ballDisp+'WK';
					wks = parseInt(wks)+1;
				}
				
				break;

				default :
				ballDisp= ballDisp+'';
				break;
			}
			if(parseInt(state.currentInn) === 1)
			{
			return update(state, 
				{
					balls:{
					[state.balls.findIndex((ball)=>parseInt(ball.ballid) === parseInt(parseInt(state.currentBall)+1) && 
            parseInt(ball.inningid) === parseInt(state.currentInn))]:{	
						balldisplay:{$set:ballDisp},
						balltype:{$set:state.ballBT},
						runtype:{$set:state.ballRT},
						runs:{$set:state.ballRuns},
						isset:{$set:true}
						}
					},
					score:{$set:score},
					wks:{$set:wks},
					lastBT:{$set:state.ballBT},
					lastRT:{$set:state.ballRT},
					LastRun:{$set:state.ballRuns},
					numOfBalls1:{$set:parseInt(state.ballBT) === 0?parseInt(numOfBalls)+1:numOfBalls}
				,show:{$set:false}});
		}
		else{
			return update(state, 
				{
					balls:{
					[state.balls.findIndex((ball)=>parseInt(ball.ballid) === parseInt(parseInt(state.currentBall)+1) && 
            parseInt(ball.inningid) === parseInt(state.currentInn))]:{	
						balldisplay:{$set:ballDisp},
						balltype:{$set:state.ballBT},
						runtype:{$set:state.ballRT},
						runs:{$set:state.ballRuns},
						isset:{$set:true}
						}
					},
					score2:{$set:score},
					wks2:{$set:wks},
					lastBT:{$set:state.ballBT},
					lastRT:{$set:state.ballRT},
					LastRun:{$set:state.ballRuns},
					numOfBalls2:{$set:parseInt(state.ballBT) === 0?parseInt(numOfBalls)+1:numOfBalls}
				,show:{$set:false}});
		}
	}
		default:
		return initialState;
		break;
	}
}
