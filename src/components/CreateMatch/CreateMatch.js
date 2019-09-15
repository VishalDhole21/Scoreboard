import React,{Component} from 'react'


class CreateMatch extends Component{
	constructor(props){
		super(props);
		this.state = {
			creatematchTeam1:'',
			creatematchTeam2:'',
			creatematchOvers:4
		};
		this.onTeam1Change=this.onTeam1Change.bind(this);
		this.onTeam2Change=this.onTeam2Change.bind(this);
		this.onOversChange=this.onOversChange.bind(this);
		this.onSubmitCreateMatch=this.onSubmitCreateMatch.bind(this);
	}

	onTeam1Change(event){
		console.log(this.state);
		this.setState({creatematchTeam1:event.target.value});
	}

	onTeam2Change(event){
		this.setState({creatematchTeam2:event.target.value});
	}

	onOversChange(event){
		this.setState({creatematchOvers:event.target.value});
	}

	onSubmitCreateMatch(){
		fetch('https://obscure-lowlands-46028.herokuapp.com/creatematch', {
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({team1: this.state.creatematchTeam1,
				team2:this.state.creatematchTeam2,
				overs:this.state.creatematchOvers,
				matchdate: new Date()
				})
		}).then(res=> res.json())
		.then(data =>{
			var i;
			var createBalls = []
			for(i = 1; i <= parseInt(data.overs)*6; i++)
			{
				createBalls.push({
					ballid: i,
					matchid: data.matchid,
					inningid:1,
					visible:true
				});
			}

			for(i = 1; i <= parseInt(data.overs)*6; i++)
			{
				createBalls.push({
					ballid: i,
					matchid: data.matchid,
					inningid:2,
					visible:true
				});
			}
			
			fetch('https://obscure-lowlands-46028.herokuapp.com/createOvers', {
				method:'post',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify(createBalls)
			})
		})

		this.props.onClick();
	}

	render(){
		const {onClick} = this.props;
		console.log(this.state);

	return(	
	<div className='center'>
		<button className='b ph3 pv2 ma2 center input-reset ba yellow b--yellow 
					bg-transparent grow pointer f6' onClick={onClick}>{'Back'}</button>
		<article className="br3 center ma6 ba yellow shadow-5 mw5">

			<main className="pa4 black-80">

			  <form className="measure center">

			    <fieldset id="newmatch" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 yellow b--yellow ph0 mh0">New Match</legend>
			      <div className="mt3">
			        <label className="db tc fw6 yellow b--yellow lh-copy f6">Team 1</label>
			        <input onChange={this.onTeam1Change} className="pa2 input-reset yellow b--yellow ba bg-transparent hover-bg-black 
			        hover-white w-100" name="team1"  id="team1" />
			      </div>
			      <div className="mt3">
			        <label className="db tc fw6 yellow b--yellow lh-copy f6">Team 2</label>
			        <input onChange={this.onTeam2Change} className="pa2 yellow b--yellow input-reset ba bg-transparent hover-bg-black 
			        hover-white w-100" name="team2"  id="team2" />
			      </div>
			      <div className="mt3">
			        <label className="db tc fw6 yellow b--yellow lh-copy f6">Overs</label>
			        <input onChange={this.onOversChange} type="number" className="pa2 yellow b--yellow input-reset ba bg-transparent 
			        hover-bg-black hover-white w-100" name="overs"  id="overs" />
			      </div>
			    </fieldset>
			    <div>
			      <button className="b ph3 pv2 center yellow b--yellow input-reset ba bg-transparent 
			      grow pointer f6"   onClick={this.onSubmitCreateMatch}>{"Create Match"}</button>
			      
			    </div>
			    
			  </form>
			</main>
		</article>
	</div>
		);
	}
			
}

export default CreateMatch;