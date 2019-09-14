import React, {Component} from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'tachyons';
import {connect} from 'react-redux'

import Scroll from './components/Scroll/Scroll'
import CreateMatch from './components/CreateMatch/CreateMatch'
import DialogBox from './components/DialogBox/DialogBox'
import Ball from './components/Ball/Ball'

import {ballClick, ballTypeChange,ballClose, ballSet, runTypeChange,runsChange,requestBalls,matchOpen,backClick,
  createMatch
} from './actions'

const mapStateToProps=(state)=>{
  return  {
    isPending : state.isPending,
    error : state.error,
    balls : state.balls,
    show:state.show,
    score:state.score,
    wks:state.wks,
    score2:state.score2,
    wks2:state.wks2,
    currentBall:state.currentBall,
    currentInn:state.currentInn,
    nextBall:state.nextBall,
    lastRT:state.lastRT,
    lastBT:state.lastBT,
    lastRun:state.lastRun,
    runsOnBall:state.runsOnBall,
    wksOnBall:state.wksOnBall,
    btOnBall:state.btOnBall,
    route:state.route,
    match:state.match,
    numOfBalls1:state.numOfBalls1,
    numOfBalls2:state.numOfBalls2
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    onBallClick:(e)=>dispatch(ballClick(e)),
    onBallTypeChange:(event)=>dispatch(ballTypeChange(event.target.value)),
    onRunTypeChange:(event)=>dispatch(runTypeChange(event.target.value)),
    onRunsChange:(event)=>dispatch(runsChange(event.target.value)),
    onBallSet:(event)=>dispatch(ballSet(event.target.value)),
    onBallClose:()=>dispatch(ballClose(false)),
    onRequestBalls:(e)=>requestBalls(dispatch, e),
    onMatchOpen:(e)=>dispatch(matchOpen(e)),
    //onMatchOpen:(e)=>matchOpen(e, dispatch),
    onBackClick:()=>dispatch(backClick()),
    onCreateMatch:(e)=>dispatch(createMatch(e))
  }
}
class App extends Component{
  constructor(props) {
        super(props);
         
        this.state = {
            columnDefs: [
                {headerName: 'Match Id', field: 'matchid'},
                {headerName: 'Match Name', field: 'name'},
                {headerName: 'Date', field: 'matchdate'},
                {headerName: 'Team1', field: 'team1'},
                {headerName: 'Team2', field: 'team2'},
                {headerName: 'Overs', field: 'overs'}

            ],
            rowData: []
        }
    }

componentDidMount() {
    fetch('http://localhost:3000', ).then(
      res => res.json()).then(data =>{
         this.state.rowData = data.slice();
         this.setState(this.state);
      })


      //this.props.onRequestBalls();
  }    

   render(){ 
    console.log('props',this.props);
    console.log('balls',this.props.balls[this.props.balls.findIndex((ball)=>
      parseInt(ball.ballid) === parseInt(parseInt(this.props.currentBall)+1) && 
            parseInt(ball.inningid) === parseInt(this.props.currentInn))]);
    const {show, onBallClick,onBallTypeChange, onBallClose, onBallSet, onRunTypeChange, 
      onRunsChange, onBallContinue, balls, score, wks, lastRT, lastBT, lastRun, onMatchOpen, route,
      onBackClick, match, onCreateMatch, score2,onRequestBalls, wks2, numOfBalls1, numOfBalls2} 
      = this.props;
    return (
      <div> 
       
        {
          route === 'ball'?
            <div>
              <div>
                <button onClick={onBackClick} className='b ph3 pv2 ma2 center input-reset ba b--yellow 
                yellow bg-transparent grow pointer f6 dib'>{'Back'}</button>
                <h2 className='tc bg-washed-green pa1 br4'>{match.name}</h2>
              </div>
                  <h2 className='tc bg-washed-yellow pa1 br4'>{match.team1+' : '+score+'/'+wks 
                  +' '+'Overs :'+parseInt(parseInt(numOfBalls1)/6)+'.'+parseInt(parseInt(numOfBalls1)%6)} </h2>
                  <Scroll >
                  {
                      balls.filter((inning)=>parseInt(inning.inningid) === 1).map((ball, i)=>{
                        return (
                          <div key={i } className="dib grow br2 pa2 ma2 bw2 " >
                            <Ball key={i} onClick={onBallClick.bind(this,{inningid: ball.inningid, ballid:ball.ballid})} 
                            ballDisplay={ball.balldisplay} show={ball.visible} ballId={ball.ballid}/> 
                          </div>
                        );
                      })
                    }

                    <DialogBox show = {show} close={onBallClose} ballChange = {onBallTypeChange} 
                    rtChange = {onRunTypeChange} runChange = {onRunsChange} continue = {onBallSet}/>
                  </Scroll>
              
               
                    <h2 className='tc bg-washed-yellow  pa1 br4'>{match.team2+' : '+score2+'/'+wks2
                    +' '+'Overs :'+parseInt(parseInt(numOfBalls2)/6)+'.'+parseInt(parseInt(numOfBalls2)%6)+''+'Target :'+parseInt(parseInt(score)+1)} </h2>
                  <Scroll >
                  {
                      balls.filter((inning)=>parseInt(inning.inningid) === 2).map((ball, i)=>{
                        return (
                          <div key={i } className="dib grow br2 pa2 ma2 bw2 " >
                            <Ball key={ball.ballid} onClick={onBallClick.bind(this,{inningid: ball.inningid, ballid:ball.ballid})} 
                            ballDisplay={ball.balldisplay} show={ball.visible} ballId={ball.ballid}/> 
                          </div>
                        );
                      })
                    }
                    <DialogBox show = {show} close={onBallClose} ballChange = {onBallTypeChange} 
                    rtChange = {onRunTypeChange} runChange = {onRunsChange} continue = {onBallSet}/>
                </Scroll>
              </div>
          :
          route === 'match'?
                <div className="gradient center ag-theme-balham pa4"
                      style={{height: '700px', width:'1100px', justifyContent:'center'}} >
                  <div>
                    <h2 className='tc ph3 ma2 f2 pv2 b b--yellow pa1 yellow br4'>{'Matches'} </h2>
                    <button className='b ph3 pv2 ma2 center yellow input-reset ba b--yellow bg-transparent 
                    grow pointer f6 dib' onClick={onCreateMatch}>{'Create Match'}</button>
                  </div>
                  
                <AgGridReact className="bg-transparent"
                    enableSorting={true}
                    enableFilter={true}
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    rowSelection='single'
                    onRowClicked= {onRequestBalls}
                    onRowSelected={onMatchOpen}>

                </AgGridReact>
                  
                </div>
                :
                <div>
                  <CreateMatch onClick={onBackClick}/>
                </div>
    }
        
      </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
